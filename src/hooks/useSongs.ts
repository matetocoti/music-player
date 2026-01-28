import {  useState, useEffect } from 'react';
import InMemorySongRepository from '../repositories/InMemorySongRepository';
import Song from '../domain/models/Song';

// ejection point for SongRepository implementation
const songRepository = new InMemorySongRepository();

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const allSongs = await songRepository.getAllSongs();
        setSongs(allSongs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, []);

  return { songs, loading, error };
}