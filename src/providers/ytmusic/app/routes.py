from fastapi import APIRouter

router = APIRouter()

@router.get("/resolve")
def resolve(title: str, artist: str):
    return {
        "provider": "YTMusic",
        "title": title,
        "artist": artist,
        "streamUrl": None
    }
