import { useState, useEffect, useCallback } from "react";
import { listSongs } from "../api/songs";
import type { Song } from "../api/types";

const PAGE_SIZE = 15;

function useSongs(search: string, page: number) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function fetchSongs() {
      try {
        setLoading(true);

        const result = await listSongs(search, page, PAGE_SIZE);

        setSongs(result.data);
        setTotal(result.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, [search, page, reloadKey]);

  const reload = useCallback(() => {
    setReloadKey((currentKey) => currentKey + 1);
  }, []);

  return {
    songs,
    total,
    pageSize: PAGE_SIZE,
    loading,
    error,
    reload,
  };
}

export default useSongs;
