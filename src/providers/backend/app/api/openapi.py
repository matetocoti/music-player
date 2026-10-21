from collections.abc import Callable
from typing import Any

from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

# Docs endpoint: /docs
def configure_openapi(app: FastAPI, list_categories: Callable[[], list[str]],) -> None:
    def custom_openapi() -> dict[str, Any]:
        if app.openapi_schema:
            return app.openapi_schema

        schema = get_openapi(
            title=app.title,
            version="1.0.0",
            routes=app.routes,
        )
        categories = list_categories()
        songs_get = schema.get("paths", {}).get("/songs", {}).get("get", {})

        for parameter in songs_get.get("parameters", []):
            if parameter.get("name") == "category":
                parameter["schema"]["enum"] = categories
                parameter["description"] = (
                    "Filter by category. Select an available category or leave empty."
                )
                break

        for schema_name in ("SaveSongRequest", "UpdateSongRequest"):
            category_schema = (
                schema.get("components", {})
                .get("schemas", {})
                .get(schema_name, {})
                .get("properties", {})
                .get("category")
            )
            if category_schema is None:
                continue

            category_schema["description"] = (
                "Select an existing category or enter a new category name."
            )
            category_schema["anyOf"] = [
                {"type": "null"},
                {
                    "type": "string",
                    "enum": categories,
                    "description": "Use an existing category.",
                },
                {
                    "type": "string",
                    "maxLength": 100,
                    "description": "Enter a new category.",
                },
            ]

        app.openapi_schema = schema
        return schema

    app.openapi = custom_openapi
