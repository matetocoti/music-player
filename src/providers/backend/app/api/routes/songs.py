from typing import Annotated
from fastapi import APIRouter, Query, status
from app.core.entities.song import SongEntity
from app.schemas.error_responses import (
    BAD_REQUEST_RESPONSE,
    ErrorMessages,
    NOT_FOUND_RESPONSE,
    create_http_exception,
)
from app.schemas.request_models import SaveSongRequest, SongListParams
from app.schemas.response_models import PaginatedSongsResponseDTO, SongResponseDTO
from app.services.songs_service import songs_service

router = APIRouter()


@router.get("", tags=["songs"])
def list_songs(params: Annotated[SongListParams, Query()],) -> PaginatedSongsResponseDTO:
    result = songs_service.list_songs(params.query, params.page, params.per_page)
    return PaginatedSongsResponseDTO(
        data=[SongResponseDTO.from_entity(song) for song in result["data"]],
        total=result["total"],
        page=result["page"],
        per_page=result["per_page"],
    )


@router.get("/{song_id}", responses=NOT_FOUND_RESPONSE, tags=["songs"])
def get_song(song_id: str) -> SongResponseDTO:
    song = songs_service.get_song_by_id(song_id)
    if not song:
        raise create_http_exception(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ErrorMessages.SONG_NOT_FOUND,
        )
    return SongResponseDTO.from_entity(song)


@router.post("", status_code=status.HTTP_204_NO_CONTENT, responses=BAD_REQUEST_RESPONSE, tags=["songs"],)
def save_song(payload: SaveSongRequest) -> None:
    entity = SongEntity.from_mapping(payload.model_dump())
    saved_song = songs_service.save_song(entity)
    if not saved_song:
        raise create_http_exception(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorMessages.INVALID_PAYLOAD,
        )
