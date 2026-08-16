from __future__ import annotations
from typing import Any
from fastapi import HTTPException


class ErrorMessages:
    """Centralized API error messages to avoid duplicated literals."""

    SONG_NOT_FOUND = "Song not found in the database."
    PLAYLIST_NOT_FOUND = "Playlist could not be located."
    INVALID_URL = "The provided provider URL is invalid."
    INVALID_PAYLOAD = "Invalid input provided."

def build_error_response(status_code: int, description: str, example_detail: str,) -> dict[int | str, dict[str, Any]]:
    return {
        status_code: {
            "description": description,
            "content": {
                "application/json": {
                    "example": {"detail": example_detail}
                }
            },
        }
    }


def create_http_exception(status_code: int, detail: str) -> HTTPException:
    """Creates a standardized FastAPI exception instance."""
    return HTTPException(status_code=status_code, detail=detail)


NOT_FOUND_RESPONSE = build_error_response(
    404,
    "Resource not found",
    ErrorMessages.SONG_NOT_FOUND,
)

BAD_REQUEST_RESPONSE = build_error_response(
    400,
    "Bad Request",
    ErrorMessages.INVALID_PAYLOAD,
)

STANDARD_ERRORS = {
    **NOT_FOUND_RESPONSE,
    **BAD_REQUEST_RESPONSE,
}