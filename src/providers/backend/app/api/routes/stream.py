import threading
import time
from typing import Annotated, Any, cast

import yt_dlp
from fastapi import APIRouter, HTTPException, Query, status
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse

from app.schemas.error_responses import ErrorMessages, create_http_exception
from app.schemas.request_models import StreamUrlParams
from app.services.ytmusic_service import YTMusicService

router = APIRouter()
service = YTMusicService()

_STREAM_CACHE_TTL_SECONDS = 120
_stream_cache: dict[str, tuple[float, dict[str, Any]]] = {}
_stream_cache_lock = threading.Lock()

# This function retrieves a cached response for a given key if it exists and hasn't expired. If the cached response has expired, it removes it from the cache and returns None. The cache is implemented as a dictionary where the key is a string and the value is a tuple containing the expiration time and the cached payload.
def _cache_get(key: str) -> dict[str, Any] | None:
    now = time.monotonic()
    with _stream_cache_lock:
        cached = _stream_cache.get(key)
        if not cached:
            return None
        expires_at, payload = cached
        if expires_at <= now:
            _stream_cache.pop(key, None)
            return None
        return payload
# This function sets a cached response for a given key with a specified payload. It calculates the expiration time by adding the current time to the defined cache TTL (time-to-live) and stores the key-value pair in the cache dictionary. The cache is protected by a lock to ensure thread safety when accessing or modifying the cache.
def _cache_set(key: str, payload: dict[str, Any]) -> None:
    with _stream_cache_lock:
        _stream_cache[key] = (time.monotonic() + _STREAM_CACHE_TTL_SECONDS, payload)
# This function extracts the stream payload for a given YouTube video ID using the yt_dlp library. It retrieves the video information, filters for audio formats, and selects the best audio format based on bitrate. If no suitable audio format is found, it raises an HTTP 404 exception. The function returns a dictionary containing the video ID, audio URL, title, artist, duration, and MIME type of the best audio format.
def _extract_stream_payload(video_id: str) -> dict[str, Any]:
    ydl_params = cast(
        Any,
        {
            "format": "bestaudio/best",
            "quiet": True,
            "no_warnings": True,
            "noplaylist": True,
            "skip_download": True,
        },
    )
    with yt_dlp.YoutubeDL(ydl_params) as ydl:
        info = ydl.extract_info(
            f"https://www.youtube.com/watch?v={video_id}",
            download=False,
        )
        audio_formats = [
            item
            for item in info.get("formats") or []
            if item.get("vcodec") == "none" and item.get("acodec") != "none"
        ]
        if not audio_formats:
            raise create_http_exception(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=ErrorMessages.SONG_NOT_FOUND,
            )

        best_audio = max(audio_formats, key=lambda item: item.get("abr") or item.get("tbr") or 0)
        return {
            "videoId": video_id,
            "audioUrl": best_audio["url"],
            "title": info.get("title"),
            "artist": info.get("uploader"),
            "duration": info.get("duration"),
            "mimeType": best_audio.get("acodec"),
        }

# OBS: Now The time to load is 2 seconds ,the goal is to reduce the time to 1 second and after 0.5 seconds.
# Internal API endpoint to get the stream URL for a song, either by video ID or by searching with title and artist.
# Provider Router
@router.get("/stream-url", response_model=dict, status_code=status.HTTP_200_OK)
async def get_stream_url(params: Annotated[StreamUrlParams, Query()]):
    target_video_id = params.video_id

    if not target_video_id and params.title and params.artist:
        result = await run_in_threadpool(service.search_song, params.title, params.artist)
        if not result or "videoId" not in result:
            raise create_http_exception(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=ErrorMessages.SONG_NOT_FOUND,
            )
        target_video_id = result["videoId"]

    if not target_video_id:
        raise create_http_exception(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorMessages.INVALID_URL,
        )

    cache_key = f"stream:{target_video_id}"
    cached_response = _cache_get(cache_key)
    if cached_response is not None:
        return JSONResponse(
            content=cached_response,
            headers={"Cache-Control": f"public, max-age={_STREAM_CACHE_TTL_SECONDS}"},
        )

    try:
        payload = await run_in_threadpool(_extract_stream_payload, target_video_id)
        _cache_set(cache_key, payload)
        return JSONResponse(
            content=payload,
            headers={"Cache-Control": f"public, max-age={_STREAM_CACHE_TTL_SECONDS}"},
        )
    except HTTPException:
        raise
    except Exception as error:
        raise create_http_exception(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error to extract stream: {error}",
        )
