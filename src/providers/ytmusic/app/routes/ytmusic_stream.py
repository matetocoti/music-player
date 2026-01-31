from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import yt_dlp

from app.services.ytmusic_service import YTMusicService

router = APIRouter()
service = YTMusicService()


@router.get("/stream-url")
def get_stream_url(
    video_id: Optional[str] = Query(None, description="YouTube videoId obtido via /resolve"),
    title: Optional[str] = Query(None),
    artist: Optional[str] = Query(None),
):
    target_video_id = video_id

    # fallback se não vier video_id
    if not target_video_id and title and artist:
        result = service.search_song(title, artist)
        if not result or "videoId" not in result:
            raise HTTPException(404, "Não foi possível resolver o videoId")
        target_video_id = result["videoId"]

    if not target_video_id:
        raise HTTPException(400, "Forneça video_id ou title + artist")

    ydl_opts: dict[str, object] = {
        "format": "bestaudio/best",
        "quiet": True,
        "no_warnings": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl: # type: ignore
            url = f"https://www.youtube.com/watch?v={target_video_id}"
            info = ydl.extract_info(url, download=False)

            audio_formats = [
                f for f in info.get("formats", []) # type: ignore
                if f.get("vcodec") == "none" and f.get("acodec") != "none"
            ]

            if not audio_formats:
                raise Exception("Nenhum áudio encontrado")

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
        raise HTTPException(500, f"Erro ao extrair stream: {str(e)}")
