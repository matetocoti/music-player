from fastapi import FastAPI
from app.routes import router as ytmusic_router

app = FastAPI(title="YTMusic Provider")

app.include_router(ytmusic_router, prefix="/ytmusic", tags=["YTMusic"])

@app.get("/")
def health():
    return {
        "status": "ok",
        "service": "ytmusic-provider"
    }
