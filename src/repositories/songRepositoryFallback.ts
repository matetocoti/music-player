import Song from "../domain/models/Song";
import { isSupabaseConfigured } from "../lib/supabase";
import InMemorySongRepository from "./InMemorySongRepository";
import SupabaseSongRepository from "./SupabaseSongRepository";

class SongRepositoryWithFallback {
  private readonly fallbackRepository = new InMemorySongRepository();
  private readonly supabaseRepository = isSupabaseConfigured
    ? new SupabaseSongRepository()
    : null;

  async getAllSongs(page: number = 1, limit: number = 10): Promise<Song[]> {
    if (!this.supabaseRepository) {
      return this.fallbackRepository.getAllSongs(page, limit);
    }

    try {
      return await this.supabaseRepository.getAllSongs(page, limit);
    } catch {
      return this.fallbackRepository.getAllSongs(page, limit);
    }
  }

  async getSongById(id: string): Promise<Song | null> {
    if (!this.supabaseRepository) {
      return this.fallbackRepository.getSongById(id);
    }

    try {
      const song = await this.supabaseRepository.getSongById(id);
      if (song) {
        return song;
      }
    } catch {
      // Fall back to the local mock data below.
    }

    return this.fallbackRepository.getSongById(id);
  }
}

export const songRepository = new SongRepositoryWithFallback();