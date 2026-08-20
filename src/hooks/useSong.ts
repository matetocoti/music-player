import { useState, useEffect } from "react";
import { getSong } from "../api/songs";
import type { Song } from "../api/types";

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
        const oneSong = await getSong(id);

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
