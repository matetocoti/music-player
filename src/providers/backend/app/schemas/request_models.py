from pydantic import BaseModel, ConfigDict, Field
from pydantic import field_validator, model_validator

from app.Common.Security.validation import (
	validate_optional_text,
	validate_required_text,
	validate_stream_params,
)


class SongListParams(BaseModel):
	page: int = Field(default=1, ge=1)
	per_page: int = Field(default=15, ge=1, le=100)
	query: str = Field(default="", max_length=100)

	@field_validator("query")
	@classmethod
	def normalize_query(cls, value: str) -> str:
		return validate_optional_text(value) or ""


class ResolveSongParams(BaseModel):
	title: str
	artist: str

	@field_validator("title", "artist")
	@classmethod
	def validate_text(cls, value: str, info) -> str:
		return validate_required_text(value, info.field_name)


class SaveSongRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str
    artist: str
    album: str | None = None
    duration: int | None = Field(default=None, ge=0) 

    @field_validator("title", "artist")
    @classmethod
    def validate_required_fields(cls, value: str, info) -> str:
        return validate_required_text(value, info.field_name)

    @field_validator("album")
    @classmethod
    def normalize_optional_fields(cls, value: str | None) -> str | None:
        return validate_optional_text(value)

    @field_validator("duration", mode="before")
    @classmethod
    def convert_minutes_to_seconds(cls, value) -> int | None:
        if value is None:
            return None
            
        try:
            float_val = float(value)
            minutes = int(float_val)
            seconds = round((float_val - minutes) * 100)
            return (minutes * 60) + seconds
            
        except (TypeError, ValueError):
            raise ValueError("Duration must be a valid number.")

		
class StreamUrlParams(BaseModel):
	video_id: str | None = None
	title: str | None = None
	artist: str | None = None

	@field_validator("video_id", "title", "artist")
	@classmethod
	def normalize_text(cls, value: str | None) -> str | None:
		return validate_optional_text(value)

	@model_validator(mode="after")
	def validate_combination(self):
		validate_stream_params(self.model_dump())
		return self