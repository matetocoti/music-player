from __future__ import annotations

import csv
import io
import re
import sqlite3
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path
from typing import Any, ClassVar, TypedDict

from app.core.entities.song import SongEntity
from app.data.songs_queries import SongsQueries
from app.schemas.request_models import SaveSongRequest


class PaginatedSongs(TypedDict):
    data: list[SongEntity]
    total: int
    page: int
    per_page: int


class CsvImportResult(TypedDict):
    total: int
    saved: int
    failed: int
    errors: list[dict[str, Any]]


class SongsService:
    # ------------------------------------------------------------------
    # Constantes | Constants
    # ------------------------------------------------------------------

    
    ORDER_DIRECTIONS: ClassVar[dict[str, str]] = {"asc": "ASC", "desc": "DESC"}

    ORDER_BY: ClassVar[dict[str, str]] = {
        "id": "CAST(id AS INTEGER)",
        "title": "CASEFOLD(title)",
        "artist": "CASEFOLD(artist)",
        "album": "CASEFOLD(album)",
        "duration": "duration",
    }

    
    _MIGRATION_COLUMNS: ClassVar[dict[str, str]] = {
        "category": "TEXT NOT NULL DEFAULT ''",
        "favorite": "INTEGER NOT NULL DEFAULT 0",
    }

    _UPDATE_FIELDS: ClassVar[tuple[str, ...]] = (
        "title",
        "artist",
        "album",
        "duration",
        "url",
        "category",
        "favorite",
    )

    _TABLE_INFO: ClassVar[str] = "PRAGMA table_info(songs)"
    _DELETE_BY_ID: ClassVar[str] = "DELETE FROM songs WHERE id = ?"
    _SEARCH_FILTER: ClassVar[str] = (
        "(CASEFOLD(title) LIKE ? "
        "OR CASEFOLD(artist) LIKE ? "
        "OR CASEFOLD(album) LIKE ?)"
    )

  
    _SEED_BLOCK: ClassVar[re.Pattern[str]] = re.compile(r"new Song\(\{(.*?)\}\)", re.S)
    _SEED_FIELD: ClassVar[re.Pattern[str]] = re.compile(
        r'(\w+)\s*:\s*("(?:[^"\\]|\\.)*"|\d+)'
    )
    _SEED_REQUIRED: ClassVar[frozenset[str]] = frozenset({"id", "title", "artist"})

    
    _CSV_MAX_FIELDS: ClassVar[int] = 6
    _TRUE_VALUES: ClassVar[frozenset[str]] = frozenset({"true", "1", "sim", "yes"})
    _FALSE_VALUES: ClassVar[frozenset[str]] = frozenset(
        {"false", "0", "nao", "não", "no"}
    )

    # ------------------------------------------------------------------
    # Infraestrutura (conexão, schema, seed) | Infrastructure (connection, schema, seed)
    # ------------------------------------------------------------------

    def __init__(self) -> None:
        here = Path(__file__).resolve()
        app_root = here.parents[1]
        workspace_root = here.parents[5]
        self.db_path = app_root / "data" / "music.sqlite"
        self.seed_path = workspace_root / "src" / "data" / "songs.mock.ts"
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._ensure_database()

    @contextmanager
    def _connect(self) -> Iterator[sqlite3.Connection]:
        """Abre uma conexão, faz commit/rollback e sempre a fecha ao sair.

        O `with sqlite3.connect(...)` puro só faz commit/rollback: a conexão
        continuava aberta até o garbage collector recolhê-la.
        """
        connection = sqlite3.connect(self.db_path)
        connection.row_factory = sqlite3.Row
        connection.create_function("CASEFOLD", 1, self._casefold)
        try:
            with connection:
                yield connection
        finally:
            connection.close()

    @staticmethod
    def _casefold(value: str | None) -> str:
        return value.casefold() if value is not None else ""

    def _ensure_database(self) -> None:
        with self._connect() as connection:
            connection.execute(SongsQueries.CREATE_TABLE)
            existing = {row["name"] for row in connection.execute(self._TABLE_INFO)}
            for name, definition in self._MIGRATION_COLUMNS.items():
                if name not in existing:
                    connection.execute(
                        f"ALTER TABLE songs ADD COLUMN {name} {definition}"
                    )
            if connection.execute(SongsQueries.COUNT_ALL).fetchone()[0] == 0:
                self._seed_database(connection)

    def _seed_database(self, connection: sqlite3.Connection) -> None:
        connection.executemany(
            SongsQueries.INSERT,
            [song.to_storage_payload() for song in self._load_seed_songs()],
        )

    def _load_seed_songs(self) -> list[SongEntity]:
        source = self.seed_path.read_text(encoding="utf-8")
        songs: list[SongEntity] = []
        for block in self._SEED_BLOCK.findall(source):
            values: dict[str, Any] = {}
            for key, raw_value in self._SEED_FIELD.findall(block):
                values[key] = (
                    raw_value[1:-1] if raw_value.startswith('"') else int(raw_value)
                )
            if self._SEED_REQUIRED.issubset(values):
                songs.append(SongEntity.from_mapping(values))
        return songs

    # ------------------------------------------------------------------
    # Leitura|Reaad
    # ------------------------------------------------------------------

    @classmethod
    def _build_filters(
        cls, query: str, category: str, favorite: bool | None
    ) -> tuple[str, list[Any]]:
        search = f"%{query}%".casefold()
        filters = [cls._SEARCH_FILTER]
        parameters: list[Any] = [search, search, search]
        if category:
            filters.append("CASEFOLD(category) = ?")
            parameters.append(category.casefold())
        if favorite is not None:
            filters.append("favorite = ?")
            parameters.append(int(favorite))
        return " AND ".join(filters), parameters

    def list_songs(
        self,
        query: str,
        page: int,
        per_page: int,
        order_by: str = "id",
        order_direction: str = "asc",
        category: str = "",
        favorite: bool | None = None,
    ) -> PaginatedSongs:
        page = max(page, 1)
        per_page = max(per_page, 1)
        order_clause = self.ORDER_BY.get(order_by, self.ORDER_BY["id"])
        direction_clause = self.ORDER_DIRECTIONS.get(
            order_direction, self.ORDER_DIRECTIONS["asc"]
        )
        where_clause, parameters = self._build_filters(query, category, favorite)

        with self._connect() as connection:
            total = connection.execute(
                SongsQueries.COUNT.format(filters=where_clause), parameters
            ).fetchone()[0]
            rows = connection.execute(
                SongsQueries.LIST.format(
                    filters=where_clause,
                    order_by=order_clause,
                    order_direction=direction_clause,
                ),
                [*parameters, per_page, (page - 1) * per_page],
            ).fetchall()
            songs = [SongEntity.from_mapping(dict(row)) for row in rows]

        return {"data": songs, "total": total, "page": page, "per_page": per_page}

    def list_categories(self) -> list[str]:
        with self._connect() as connection:
            names = [
                row["category"].strip()
                for row in connection.execute(SongsQueries.LIST_CATEGORIES)
            ]
        categories: dict[str, str] = {}
        for name in names:
            categories.setdefault(name.casefold(), name)
        return list(categories.values())

    def get_song_by_id(self, song_id: str) -> SongEntity | None:
        with self._connect() as connection:
            row = connection.execute(SongsQueries.GET_BY_ID, (song_id,)).fetchone()
            return SongEntity.from_mapping(dict(row)) if row else None

    # ------------------------------------------------------------------
    # Escrita|Write
    # ------------------------------------------------------------------

    @staticmethod
    def _insert(connection: sqlite3.Connection, song: SongEntity) -> None:
        connection.execute(SongsQueries.INSERT, song.to_storage_payload())

    def save_song(self, song: SongEntity) -> SongEntity:
        with self._connect() as connection:
            self._insert(connection, song)
        return song

    def update_song(self, song_id: str, updates: dict[str, Any]) -> SongEntity | None:
        with self._connect() as connection:
            row = connection.execute(SongsQueries.GET_BY_ID, (song_id,)).fetchone()
            if row is None:
                return None

            payload = SongEntity.from_mapping(
                {**dict(row), **updates}
            ).to_storage_payload()
            connection.execute(
                SongsQueries.UPDATE,
                (*(payload[field] for field in self._UPDATE_FIELDS), song_id),
            )

        return SongEntity.from_mapping(payload)

    def delete_song(self, song_id: str) -> bool:
        with self._connect() as connection:
            deleted = connection.execute(self._DELETE_BY_ID, (song_id,)).rowcount
        return deleted > 0

    # ------------------------------------------------------------------
    # Importação CSV | CSV Import
    # ------------------------------------------------------------------

    def save_songs_csv(self, csv_content: str) -> CsvImportResult:
        result: CsvImportResult = {
            "total": 0,
            "saved": 0,
            "failed": 0,
            "errors": [],
        }

        with self._connect() as connection:
            reader = csv.reader(io.StringIO(csv_content), strict=True)
            while True:
                try:
                    row = next(reader)
                except StopIteration:
                    break
                except csv.Error as error:
                    result["total"] += 1
                    self._record_csv_error(result, reader.line_num, str(error))
                    break

                line_number = reader.line_num
                if not row or not any(field.strip() for field in row):
                    continue

                result["total"] += 1
                try:
                    title, artist, album, duration, category, favorite = self._split_csv_row(row)
                    payload = SaveSongRequest(
                        title=title,
                        artist=artist,
                        album=album or None,
                        duration=duration or None,  # type: ignore
                        category=category or None,
                        favorite=self._parse_csv_boolean(favorite),
                    )
                    self._insert(
                        connection, SongEntity.from_mapping(payload.model_dump())
                    )
                except (csv.Error, TypeError, ValueError, sqlite3.Error) as error:
                    self._record_csv_error(result, line_number, str(error))
                else:
                    result["saved"] += 1

        return result

    @classmethod
    def _split_csv_row(cls, row: list[str]) -> list[str]:
        parts = [part.strip() for part in row]
        if len(parts) > cls._CSV_MAX_FIELDS:
            raise ValueError(
                f"The row has too many fields (expected {cls._CSV_MAX_FIELDS}, got {len(parts)})."
            )
        parts.extend([""] * (cls._CSV_MAX_FIELDS - len(parts)))
        return parts

    @classmethod
    def _parse_csv_boolean(cls, value: str) -> bool:
        if not value:
            return False
        normalized = value.casefold()
        if normalized in cls._TRUE_VALUES:
            return True
        if normalized in cls._FALSE_VALUES:
            return False
        raise ValueError("favorite must be a boolean value (true/false, 1/0, yes/no).")

    @staticmethod
    def _record_csv_error(result: CsvImportResult, line_number: int, message: str) -> None:
        result["failed"] += 1
        result["errors"].append({"line": line_number, "error": message})


songs_service = SongsService()