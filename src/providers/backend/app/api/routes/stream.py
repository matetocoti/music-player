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


_YDL_PARAMS = cast(
    Any,
    {
        "format": "bestaudio/best",
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        "skip_download": True,
        "extract_flat": "in_playlist", 
    },
)
_ydl_instance = yt_dlp.YoutubeDL(_YDL_PARAMS)

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

def _cache_set(key: str, payload: dict[str, Any]) -> None:
    with _stream_cache_lock:
        _stream_cache[key] = (time.monotonic() + _STREAM_CACHE_TTL_SECONDS, payload)

def _extract_stream_payload(video_id: str) -> dict[str, Any]:
    info = _ydl_instance.extract_info(
        video_id,
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