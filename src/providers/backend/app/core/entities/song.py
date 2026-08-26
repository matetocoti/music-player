from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Mapping
from uuid import uuid4


@dataclass(frozen=True)
class SongEntity:
    id: str
    title: str
    artist: str
    album: str = ""
    duration: int = 0
    url: str = ""

    @classmethod
    def from_mapping(cls, payload: Mapping[str, Any]) -> "SongEntity":
        return cls(
            id=str(payload.get("id") or uuid4()),
            title=str(payload["title"]),
            artist=str(payload["artist"]),
            album=str(payload.get("album") or ""),
            duration=int(payload.get("duration") or 0),
            url=str(payload.get("url") or ""),
        )

    def to_storage_payload(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "artist": self.artist,
            "album": self.album,
            "duration": self.duration,
            "url": self.url,
        }
