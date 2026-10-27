from typing import Any


CSV_IMPORT_SUMMARY = "Import songs from a CSV file"

CSV_IMPORT_DESCRIPTION = (
    "Upload a UTF-8 CSV file. Use one song per row with fields in this order: "
    "title,artist,album,duration,category,favorite. The last four fields are optional. "
    "Fields containing commas must be quoted according to CSV rules."
)

CSV_IMPORT_RESPONSES: dict[int | str, dict[str, Any]] = {
    400: {
        "description": "The file is not valid UTF-8.",
        "content": {
            "application/json": {
                "example": {"detail": "The CSV file must be UTF-8 encoded."}
            }
        },
    }
}

CSV_IMPORT_REQUEST_BODY: dict[str, Any] = {
    "requestBody": {
        "required": True,
        "content": {
            "text/csv": {
                "schema": {
                    "type": "string",
                    "format": "binary",
                    "description": "UTF-8 CSV file contents",
                }
            }
        },
    }
}
