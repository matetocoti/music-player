import { useState, useEffect } from "react";
import Song from "../domain/models/Song";
import { songRepository } from "../repositories/songRepositoryFallback";

const PAGE_SIZE = 15;

function useSongs(search: string, page: number) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSongs() {
      try {
        setLoading(true);

        const allSongs = await songRepository.getAllSongs();

        const q = search.toLowerCase();
        const filtered = allSongs.filter(
          (song) =>
            song.title.toLowerCase().includes(q) ||
            song.artist.toLowerCase().includes(q)
        );

    
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;

        setSongs(filtered.slice(start, end));
        setTotal(filtered.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, [search, page]);

  return {
    songs,
    total,
    pageSize: PAGE_SIZE,
    loading,
    error,
  };
}

export default useSongs;
