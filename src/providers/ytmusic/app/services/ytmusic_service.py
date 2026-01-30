from ytmusicapi import YTMusic


class YTMusicService:
    def __init__(self) -> None:
        # Sem authentication for public data access
        self.ytmusic_client = YTMusic()

    def search_song(self ,title: str ,artist: str) -> dict | None:
        query = f"{title} {artist}" # Texto da Busca 
        results = self.ytmusic_client.search(query, filter="songs", limit=1) # Busca
        # Se não há resultados
        if not results: 
            return None
        song = results[0]
        return {
            "provider": "ytmusic",
            "videoId": song.get("videoId"),
            "title": song.get("title"),
            "artist": song["artists"][0]["name"] if song.get("artists") else None,
            "duration": song.get("duration_seconds")
        }




