from __future__ import annotations

import re
import sqlite3
from pathlib import Path
from typing import Any, TypedDict


class PaginatedSongs(TypedDict):
    data: list[dict[str, Any]]
    total: int
    page: int
    per_page: int


class SongsService:
    def __init__(self) -> None:
        app_root = Path(__file__).resolve().parents[1]
        workspace_root = Path(__file__).resolve().parents[5]
        self.db_path = app_root / "data" / "music.sqlite"
        self.seed_path = workspace_root / "src" / "data" / "songs.mock.ts"
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._ensure_database()

    def _connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.db_path)
        connection.row_factory = sqlite3.Row
        connection.create_function("CASEFOLD", 1, self._casefold)
        return connection

    @staticmethod
    def _casefold(value: str | None) -> str:
        return value.casefold() if value is not None else ""

    def _ensure_database(self) -> None:
        with self._connect() as connection:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS songs (
                    id TEXT PRIMARY KEY,
                    title TEXT NOT NULL,
                    artist TEXT NOT NULL,
                    album TEXT NOT NULL DEFAULT '',
                    duration INTEGER NOT NULL DEFAULT 0,
                    url TEXT NOT NULL DEFAULT ''
                )
                """
            )
            if connection.execute("SELECT COUNT(*) FROM songs").fetchone()[0] == 0:
                self._seed_database(connection)

    def _seed_database(self, connection: sqlite3.Connection) -> None:
        connection.executemany(
            """
            INSERT OR REPLACE INTO songs (id, title, artist, album, duration, url)
            VALUES (:id, :title, :artist, :album, :duration, :url)
            """,
            self._load_seed_songs(),
        )

    def _load_seed_songs(self) -> list[dict[str, Any]]:
        source = self.seed_path.read_text(encoding="utf-8")
        songs: list[dict[str, Any]] = []
        for block in re.findall(r"new Song\(\{(.*?)\}\)", source, flags=re.S):
            values: dict[str, Any] = {}
            for field in block.split(","):
                key, separator, raw_value = field.partition(":")
                if not separator:
                    continue
                key = key.strip()
                raw_value = raw_value.strip()
                if raw_value.startswith('"') and raw_value.endswith('"'):
                    values[key] = raw_value[1:-1]
                elif raw_value.isdigit():
                    values[key] = int(raw_value)
            if {"id", "title", "artist"}.issubset(values):
                songs.append({
                    "id": str(values["id"]),
                    "title": str(values["title"]),
                    "artist": str(values["artist"]),
                    "album": str(values.get("album", "")),
                    "duration": int(values.get("duration", 0)),
                    "url": str(values.get("url", "")),
                })
        return songs

    def list_songs(self, query: str, page: int, per_page: int) -> PaginatedSongs:
        page = max(page, 1)
        per_page = max(per_page, 1)
        search = f"%{query}%"
        where_clause = """
            WHERE CASEFOLD(title) LIKE CASEFOLD(?)
               OR CASEFOLD(artist) LIKE CASEFOLD(?)
        """
        with self._connect() as connection:
            total = connection.execute(
                f"SELECT COUNT(*) FROM songs {where_clause}", (search, search)
            ).fetchone()[0]
            rows = connection.execute(
                f"""
                SELECT id, title, artist, album, duration, url
                FROM songs {where_clause}
                ORDER BY CAST(id AS INTEGER), id
                LIMIT ? OFFSET ?
                """,
                (search, search, per_page, (page - 1) * per_page),
            ).fetchall()
        return {
            "data": [dict(row) for row in rows],
            "total": total,
            "page": page,
            "per_page": per_page,
        }

    def get_song_by_id(self, song_id: str) -> dict[str, Any] | None:
        with self._connect() as connection:
            row = connection.execute(
                """
                SELECT id, title, artist, album, duration, url
                FROM songs WHERE id = ? LIMIT 1
                """, (song_id,)
            ).fetchone()
        return dict(row) if row else None

    def save_song(self, song: dict[str, Any]) -> dict[str, Any]:
        payload = {
            "id": str(song["id"]),
            "title": str(song["title"]),
            "artist": str(song["artist"]),
            "album": str(song.get("album", "")),
            "duration": int(song.get("duration", 0)),
            "url": str(song.get("url", "")),
        }
        with self._connect() as connection:
            connection.execute(
                """
                INSERT OR REPLACE INTO songs (id, title, artist, album, duration, url)
                VALUES (:id, :title, :artist, :album, :duration, :url)
                """, payload
            )
        return payload


songs_service = SongsService()
