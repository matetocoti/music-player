from typing import Annotated

from fastapi import APIRouter, Query, status

from app.schemas.error_responses import ErrorMessages, create_http_exception
from app.schemas.request_models import ResolveSongParams
from app.services.ytmusic_service import YTMusicService

router = APIRouter()
service = YTMusicService()


@router.get("/resolve")
def resolve_song(params: Annotated[ResolveSongParams, Query()]):
    result = service.search_song(params.title, params.artist)
    if not result:
        raise create_http_exception(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ErrorMessages.SONG_NOT_FOUND,
        )
    return result
