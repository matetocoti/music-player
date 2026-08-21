from __future__ import annotations

from typing import TYPE_CHECKING, Optional

from pydantic import BaseModel

if TYPE_CHECKING:
    from app.core.entities.song import SongEntity


class SongResponseDTO(BaseModel):
    id: str
    title: str
    artist: str
    album: Optional[str] = "Unknown Album"
    duration: Optional[int] = None
    url: Optional[str] = None

    @property
    def duration_in_minutes(self) -> Optional[float]:
        if self.duration is not None:
            return self.duration / 60
        return None

    @classmethod
    def from_entity(cls, song: SongEntity) -> "SongResponseDTO":
        return cls(
            id=song.id,
            title=song.title,
            artist=song.artist,
            album=song.album or "Unknown Album",
            duration=song.duration,
            url=song.url or None,
        )


class PaginatedSongsResponseDTO(BaseModel):
    data: list[SongResponseDTO]
    total: int
    page: int
    per_page: int
