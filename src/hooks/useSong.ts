import { useState, useEffect } from "react";
//import InMemorySongRepository from "../repositories/InMemorySongRepository";
import Song from "../domain/models/Song";
import SupabaseSongRepository from "../repositories/SupabaseSongRepository";

// ejection point for SongRepository implementation
const songRepository = new SupabaseSongRepository();

function useSong(id: string) {
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchSong() {
      try {
        const oneSong = await songRepository.getSongById(id);

        if (!oneSong) {
          setError("Song not found");
          return;
        }

        setSong(oneSong);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchSong();
  }, [id]);

  return { song, loading, error };
}

export default useSong;
