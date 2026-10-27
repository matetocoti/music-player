from typing import Annotated
from fastapi import APIRouter, Query, Request, Response, status
from app.api.song_openapi import (
    CSV_IMPORT_DESCRIPTION,
    CSV_IMPORT_REQUEST_BODY,
    CSV_IMPORT_RESPONSES,
    CSV_IMPORT_SUMMARY,
)
from app.core.entities.song import SongEntity
from app.schemas.error_responses import (
    BAD_REQUEST_RESPONSE,
    ErrorMessages,
    NOT_FOUND_RESPONSE,
    create_http_exception,
)
from app.schemas.request_models import SaveSongRequest, UpdateSongRequest, SongListParams
from app.schemas.response_models import (
    PaginatedSongsResponseDTO,
    SongResponseDTO,
    CsvImportResponseDTO,
    create_csv_import_response,
)
from app.services.songs_service import songs_service


router = APIRouter()


@router.get("/categories")
def list_categories() -> list[str]:
    return songs_service.list_categories()


@router.get("")
def list_songs(params: Annotated[SongListParams, Query()],) -> PaginatedSongsResponseDTO:
    result = songs_service.list_songs(
        params.query,
        params.page,
        params.per_page,
        params.order_by,
        params.order_direction,
        params.category,
        params.favorite,
    )
    return PaginatedSongsResponseDTO(
        data=[SongResponseDTO.from_entity(song) for song in result["data"]],
        total=result["total"],
        page=result["page"],
        per_page=result["per_page"],
    )


@router.get("/{song_id}", responses=NOT_FOUND_RESPONSE)
def get_song(song_id: str) -> SongResponseDTO:
    song = songs_service.get_song_by_id(song_id)
    if not song:
        raise create_http_exception(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ErrorMessages.SONG_NOT_FOUND,
        )
    return SongResponseDTO.from_entity(song)


@router.post("", status_code=status.HTTP_202_ACCEPTED, responses=BAD_REQUEST_RESPONSE)
def save_song(payload: SaveSongRequest) -> Response:
    entity = SongEntity.from_mapping(payload.model_dump())
    saved_song = songs_service.save_song(entity)
    if not saved_song:
        raise create_http_exception(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorMessages.INVALID_PAYLOAD,
        )
    return Response(status_code=status.HTTP_202_ACCEPTED)


@router.post(
    "/csv",
    status_code=status.HTTP_202_ACCEPTED,
    summary=CSV_IMPORT_SUMMARY,
    description=CSV_IMPORT_DESCRIPTION,
    responses=CSV_IMPORT_RESPONSES,
    openapi_extra=CSV_IMPORT_REQUEST_BODY,
)
async def save_songs_csv(request: Request) -> CsvImportResponseDTO:
    content = await request.body()
    try:
        csv_content = content.decode("utf-8-sig")
    except UnicodeDecodeError:
        raise create_http_exception(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O arquivo CSV deve usar codificação UTF-8.",
        )
    return create_csv_import_response(
        songs_service.save_songs_csv(csv_content)
    )


@router.put("/{song_id}", responses=NOT_FOUND_RESPONSE)
def update_song(song_id: str, payload: UpdateSongRequest) -> SongResponseDTO:
    updates = payload.model_dump(exclude_unset=True)
    updated_song = songs_service.update_song(song_id, updates)
    if not updated_song:
        raise create_http_exception(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ErrorMessages.SONG_NOT_FOUND,
        )
    return SongResponseDTO.from_entity(updated_song)


@router.delete("/{song_id}", status_code=status.HTTP_204_NO_CONTENT, responses=NOT_FOUND_RESPONSE)
def delete_song(song_id: str) -> None:
    deleted = songs_service.delete_song(song_id)
    if not deleted:
        raise create_http_exception(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ErrorMessages.SONG_NOT_FOUND,
        )