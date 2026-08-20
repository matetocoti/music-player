from typing import Annotated

import yt_dlp
from fastapi import APIRouter, HTTPException, Query, status

from app.schemas.error_responses import ErrorMessages, create_http_exception
from app.schemas.request_models import StreamUrlParams
from app.services.ytmusic_service import YTMusicService

router = APIRouter()
service = YTMusicService()

@router.get("/stream-url", response_model=dict, status_code=status.HTTP_200_OK)
def get_stream_url(params: Annotated[StreamUrlParams, Query()]):
    target_video_id = params.video_id

    if not target_video_id and params.title and params.artist:
        result = service.search_song(params.title, params.artist)
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

    try:
        with yt_dlp.YoutubeDL({"format": "bestaudio/best", "quiet": True, "no_warnings": True}) as ydl:
            info = ydl.extract_info(
                f"https://www.youtube.com/watch?v={target_video_id}",
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

            best_audio = audio_formats[0]
            return {
                "videoId": target_video_id,
                "audioUrl": best_audio["url"],
                "title": info.get("title"),
                "artist": info.get("uploader"),
                "duration": info.get("duration"),
                "mimeType": best_audio.get("acodec"),
            }
    except HTTPException:
        raise
    except Exception as error:
        raise create_http_exception(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error to extract stream: {error}",
        )
