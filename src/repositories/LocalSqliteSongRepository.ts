import Song from "../domain/models/Song";

type SongPayload = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  url?: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const SONGS_API_URL = `${API_URL}/songs`;

export default class LocalSqliteSongRepository {
  async getAllSongs(): Promise<Song[]> {
    const response = await fetch(SONGS_API_URL);

    if (!response.ok) {
      throw new Error(`Failed to load songs (${response.status})`);
    }

    const data: SongPayload[] = await response.json();
    return data.map((song) => new Song(song));
  }

  async getSongById(id: string): Promise<Song | null> {
    const response = await fetch(`${SONGS_API_URL}/${encodeURIComponent(id)}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to load song (${response.status})`);
    }

    const data: SongPayload = await response.json();
    return new Song(data);
  }

  async saveSong(song: Song): Promise<void> {
    const response = await fetch(SONGS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song.toJSON()),
    });

    if (!response.ok) {
      throw new Error(`Failed to save song (${response.status})`);
    }
  }
}