from typing import Any


def validate_required_text(value: str, field_name: str) -> str:
	normalized_value = value.strip()
	if not normalized_value:
		raise ValueError(f"{field_name} must not be empty")
	return normalized_value


def validate_optional_text(value: str | None) -> str | None:
	if value is None:
		return None
	normalized_value = value.strip()
	return normalized_value or None


def validate_stream_params(values: dict[str, Any]) -> None:
	video_id = values.get("video_id")
	title = values.get("title")
	artist = values.get("artist")

	if video_id:
		if title or artist:
			raise ValueError("Use video_id or title and artist, not both")
		return

	if title and artist:
		return

	raise ValueError("Provide video_id or both title and artist")
