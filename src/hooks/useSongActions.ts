import { useState, useCallback } from "react";
import { createSong, deleteSong as deleteSongApi, updateSong as updateSongApi } from "../api/songs";
import type { CreateSongRequest, Song, UpdateSongRequest } from "../api/types";

export function useSongActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<Song | null>(null);

  const create = useCallback(async (song: CreateSongRequest): Promise<Song | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);

    try {
      const createdSong = await createSong(song);
      setSuccess(true);
      setData(createdSong);
      return createdSong;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeSong = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await deleteSongApi(id);
      setSuccess(true);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, updates: UpdateSongRequest): Promise<Song | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);

    try {
      const updatedSong = await updateSongApi(id, updates);
      if (!updatedSong) {
        setError("Song not found");
        return null;
      }
      setSuccess(true);
      setData(updatedSong);
      return updatedSong;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    success,
    data,
    create,
    update,
    deleteSong: removeSong,
  };
}