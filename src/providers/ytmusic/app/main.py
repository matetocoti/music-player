from fastapi import FastAPI
from app.routes.ytmusic_routes import router as resolve_router
from app.routes.ytmusic_stream import router as stream_router

app = FastAPI(title="YTMusic Provider")

# Rotas api
app.include_router(resolve_router, prefix="/ytmusic", tags=["YTMusic"])
app.include_router(stream_router, prefix="/ytmusic", tags=["YTMusic"])


# Rota raiz teste
@app.get("/")
def health():
    return {
        "status": "ok",
        "service": "ytmusic-provider"
    }



