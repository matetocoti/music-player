from fastapi import APIRouter, HTTPException ,FastAPI
from app.services.ytmusic_service import YTMusicService
from app.schemas.responses_model import SongResponse


router = APIRouter()
service = YTMusicService()



@router.get("/resolve")
def resolve(title: str, artist: str):
    result = service.search_song(title ,artist)
    if not result:
        raise HTTPException(status_code=404, detail="Song not found" )
    return result



