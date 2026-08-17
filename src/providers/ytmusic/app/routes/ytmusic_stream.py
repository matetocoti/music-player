from fastapi import APIRouter, Depends, Query, status
from typing import Annotated
import yt_dlp

from app.services.ytmusic_service import YTMusicService
from app.schemas.http_responses import create_http_exception, ErrorMessages

router = APIRouter()
service = YTMusicService()


class StreamUrlParams:
    def __init__(
        self,
        video_id: Annotated[str | None, Query(description="YouTube videoId obtained via /resolve")] = None,
        title: Annotated[str | None, Query(description="Title of the song")] = None,
        artist: Annotated[str | None, Query(description="Artist of the song")] = None,
    ):
        self.video_id = video_id
        self.title = title
        self.artist = artist



# Doc: This endpoint resolves a song based on title and artist, returning the videoId if found
@router.get("/stream-url", response_model=dict, status_code=status.HTTP_200_OK)
def get_stream_url(params: Annotated[StreamUrlParams, Depends()]):
    target_video_id = params.video_id
    title = params.title
    artist = params.artist

    if not target_video_id and title and artist:
        result = service.search_song(title, artist)
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

    ydl_opts: dict[str, object] = {
        "format": "bestaudio/best",
        "quiet": True,
        "no_warnings": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:  # type: ignore
            url = f"https://www.youtube.com/watch?v={target_video_id}"
            info = ydl.extract_info(url, download=False)

            audio_formats = [
                f for f in info.get("formats", [])  # type: ignore
                if f.get("vcodec") == "none" and f.get("acodec") != "none"
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

    except Exception as e:
        raise create_http_exception(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error to extract stream: {str(e)}",
        )
