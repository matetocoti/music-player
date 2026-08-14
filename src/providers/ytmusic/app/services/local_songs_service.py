from __future__ import annotations

import re
import sqlite3
from pathlib import Path
from typing import Any


class LocalSongsService:
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
        return connection

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

            cursor = connection.execute("SELECT COUNT(*) FROM songs")
            count = cursor.fetchone()[0]

            if count == 0:
                self._seed_database(connection)

    def _seed_database(self, connection: sqlite3.Connection) -> None:
        songs = self._load_seed_songs()

        connection.executemany(
            """
            INSERT OR REPLACE INTO songs (id, title, artist, album, duration, url)
            VALUES (:id, :title, :artist, :album, :duration, :url)
            """,
            songs,
        )

    def _load_seed_songs(self) -> list[dict[str, Any]]:
        source = self.seed_path.read_text(encoding="utf-8")
        blocks = re.findall(r"new Song\(\{(.*?)\}\)", source, flags=re.S)
        songs: list[dict[str, Any]] = []

        for block in blocks:
            values: dict[str, Any] = {}
            for key, text_value, number_value in re.findall(
                r'(\w+):\s*(?:"((?:[^"\\]|\\.)*)"|(\d+))', block
            ):
                values[key] = text_value if text_value != "" else int(number_value)

            if "id" in values and "title" in values and "artist" in values:
                songs.append(
                    {
                        "id": str(values.get("id", "")),
                        "title": str(values.get("title", "")),
                        "artist": str(values.get("artist", "")),
                        "album": str(values.get("album", "")),
                        "duration": int(values.get("duration", 0)),
                        "url": str(values.get("url", "")),
                    }
                )

        return songs

    def list_songs(self) -> list[dict[str, Any]]:
        with self._connect() as connection:
            rows = connection.execute(
                """
                SELECT id, title, artist, album, duration, url
                FROM songs
                ORDER BY CAST(id AS INTEGER), id
                """
            ).fetchall()

        return [dict(row) for row in rows]

    def get_song_by_id(self, song_id: str) -> dict[str, Any] | None:
        with self._connect() as connection:
            row = connection.execute(
                """
                SELECT id, title, artist, album, duration, url
                FROM songs
                WHERE id = ?
                LIMIT 1
                """,
                (song_id,),
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
                """,
                payload,
            )

        return payload


songs_service = LocalSongsService()