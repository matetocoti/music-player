from pydantic import BaseModel, Field
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