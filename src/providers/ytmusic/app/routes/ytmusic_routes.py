from fastapi import APIRouter, HTTPException ,status
from app.services.ytmusic_service import YTMusicService
from app.schemas.http_responses import create_http_exception, ErrorMessages 

router = APIRouter()
service = YTMusicService()

@router.get("/resolve")
def resolve(title: str, artist: str):
    result = service.search_song(title ,artist)
    if not result:
        raise create_http_exception(status_code=status.HTTP_404_NOT_FOUND, detail=ErrorMessages.SONG_NOT_FOUND)
    return result



