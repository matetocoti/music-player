from typing import Annotated

from fastapi import APIRouter, Query, status

from app.schemas.error_responses import (
    BAD_REQUEST_RESPONSE,
    ErrorMessages,
    NOT_FOUND_RESPONSE,
    create_http_exception,
)
from app.schemas.request_models import SongListParams
from app.schemas.response_models import PaginatedSongsResponse, SongResponse
from app.services.songs_service import songs_service

router = APIRouter()


@router.get("", tags=["songs"])
def list_songs(params: Annotated[SongListParams, Query()],) -> PaginatedSongsResponse:
    result = songs_service.list_songs(params.query, params.page, params.per_page)
    return PaginatedSongsResponse(
        data=[SongResponse(**song) for song in result["data"]],
        total=result["total"],
        page=result["page"],
        per_page=result["per_page"],
    )


@router.get("/{song_id}", responses=NOT_FOUND_RESPONSE, tags=["songs"])
def get_song(song_id: str) -> SongResponse:
    song = songs_service.get_song_by_id(song_id)
    if not song:
        raise create_http_exception(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ErrorMessages.SONG_NOT_FOUND,
        )
    return SongResponse(**song)


@router.post(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=BAD_REQUEST_RESPONSE,
    tags=["songs"],
)
def save_song(payload: SongResponse) -> None:
    saved_song = songs_service.save_song(payload.model_dump())
    if not saved_song:
        raise create_http_exception(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorMessages.INVALID_PAYLOAD,
        )
