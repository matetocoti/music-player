from fastapi import APIRouter, HTTPException
from app.services.ytmusic_service import YTMusicService


router = APIRouter()
service = YTMusicService()

@router.get("/resolve")
def resolve(title: str, artist: str):
    result = service.search_song(title ,artist)
    if not result:
        raise HTTPException(status_code=404, detail="Song not found")
    return result



