import { type SongRepository } from "./SongRepository";
import Song from "../domain/models/Song";
import songsDB from "../data/songs.mock";

class InMemorySongRepository implements SongRepository {
  private songs: Song[];

  constructor() {
    this.songs = [...songsDB];
  }

  async getAllSongs(_page: number = 1, _limit: number = 10): Promise<Song[]> {
    return this.songs;
  }

  async getSongById(id: string): Promise<Song | null> {
    const song = this.songs.find((song) => song.id === id);
    return song || null;
  }

  async saveSong(song: Song): Promise<void> {
    const index = this.songs.findIndex((s) => s.id === song.id);
    if (index === -1) {
      this.songs.push(song);
    } else {
      this.songs[index] = song;
    }
  }
}

export default InMemorySongRepository;