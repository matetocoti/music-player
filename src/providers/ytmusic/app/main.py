from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.ytmusic_routes import router as resolve_router
from app.routes.ytmusic_stream import router as stream_router

app = FastAPI(title="YTMusic Provider")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite / React
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas api
app.include_router(resolve_router, prefix="/ytmusic", tags=["YTMusic"])
app.include_router(stream_router, prefix="/ytmusic", tags=["YTMusic"])


@app.get("/")
def health():
    return {
        "status": "ok",
        "service": "ytmusic-provider"
    }
