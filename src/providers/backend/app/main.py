from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from app.api.openapi import configure_openapi
from app.api.routes.songs import router as songs_router
from app.api.routes.stream import router as stream_router
from app.api.routes.ytmusic import router as resolve_router
from app.services.songs_service import songs_service

app = FastAPI(title="Music Player Backend")

app.add_middleware(GZipMiddleware, minimum_size=500)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
          
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(resolve_router, prefix="/ytmusic", tags=["YTMusic"])
app.include_router(stream_router, prefix="/ytmusic", tags=["YTMusic"])
app.include_router(songs_router, prefix="/songs", tags=["Songs"])


configure_openapi(app, songs_service.list_categories)


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "service": "music-player-backend"
    }
