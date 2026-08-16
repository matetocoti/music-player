from fastapi import APIRouter, status

from app.schemas.http_responses import (BAD_REQUEST_RESPONSE, ErrorMessages, NOT_FOUND_RESPONSE, create_http_exception,)
from app.schemas.responses_model import SongResponse
from app.services.local_songs_service import songs_service


router = APIRouter()

@router.get("", tags=["songs"])
def list_songs() -> list[SongResponse]:
    return [SongResponse(**song) for song in songs_service.list_songs()]

@router.get("/{song_id}", responses=NOT_FOUND_RESPONSE, tags=["songs"],)
def get_song(song_id: str) -> SongResponse:
    song = songs_service.get_song_by_id(song_id)
    if not song:
        raise create_http_exception(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ErrorMessages.SONG_NOT_FOUND,
        )
    return SongResponse(**song)

@router.post("",status_code=status.HTTP_204_NO_CONTENT, responses=BAD_REQUEST_RESPONSE, tags=["songs"],)
def save_song(payload: SongResponse) -> None:
    saved_song = songs_service.save_song(payload.model_dump())
    if not saved_song:
        raise create_http_exception(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorMessages.INVALID_PAYLOAD,
        )