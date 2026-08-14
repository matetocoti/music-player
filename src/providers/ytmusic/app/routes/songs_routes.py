from fastapi import APIRouter, HTTPException 
from pydantic import BaseModel

from app.services.local_songs_service import songs_service


router = APIRouter()


class SongPayload(BaseModel):
    id: str
    title: str
    artist: str
    album: str = ""
    duration: int = 0
    url: str = ""


@router.get("")
def list_songs():
    return songs_service.list_songs()


@router.get("/{song_id}")
def get_song(song_id: str):
    song = songs_service.get_song_by_id(song_id)
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")
    return song


@router.post("")
def save_song(payload: SongPayload):
    return songs_service.save_song(payload.model_dump())