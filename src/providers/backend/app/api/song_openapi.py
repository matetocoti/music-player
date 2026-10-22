from typing import Any


TXT_IMPORT_SUMMARY = "Import songs from a TXT file"

TXT_IMPORT_DESCRIPTION = (
    "Upload a UTF-8 plain-text file. Use one song per line with fields separated "
    "by periods: title.artist.album.duration.category.favorite. "
    "The last four fields are optional."
)

TXT_IMPORT_RESPONSES: dict[int | str, dict[str, Any]] = {
    400: {
        "description": "The file is not valid UTF-8.",
        "content": {
            "application/json": {
                "example": {"detail": "O arquivo TXT deve usar codificação UTF-8."}
            }
        },
    }
}

TXT_IMPORT_REQUEST_BODY: dict[str, Any] = {
    "requestBody": {
        "required": True,
        "content": {
            "text/plain": {
                "schema": {
                    "type": "string",
                    "format": "binary",
                    "description": "UTF-8 TXT file contents",
                }
            }
        },
    }
}
