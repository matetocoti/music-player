import Song from "../domain/models/Song";
import InMemorySongRepository from "./InMemorySongRepository";
import LocalSqliteSongRepository from "./LocalSqliteSongRepository";

class SongRepositoryWithFallback {
  private readonly fallbackRepository = new InMemorySongRepository();
  private readonly localRepository = new LocalSqliteSongRepository();

  async getAllSongs(): Promise<Song[]> {
    try {
      return await this.localRepository.getAllSongs();
    } catch {
      return this.fallbackRepository.getAllSongs();
    }
  }

  async getSongById(id: string): Promise<Song | null> {
    try {
      const song = await this.localRepository.getSongById(id);
      if (song) {
        return song;
      }
    } catch {
      // Ignore the error and fall back to the local mock data.
    }

    return this.fallbackRepository.getSongById(id);
  }
}

export const songRepository = new SongRepositoryWithFallback();