from pydantic import BaseModel
from typing import Optional

class SongResponse(BaseModel):
    id: str
    title: str
    artist: str
    album: Optional[str] = "Unknown Album"
    duration: Optional[int] = None
    provider_url: Optional[str] = None

    @property
    def duration_in_minutes(self) -> Optional[float]:
        if self.duration is not None:
            return self.duration / 60
        return None

    class Config:
        from_attributes = True