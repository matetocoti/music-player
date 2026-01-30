import Song  from "../domain/models/Song";

// Contrato há para ser implementado
export interface SongRepository {
  getAllSongs(): Promise<Song[]>;
  getSongById(id: string): Promise<Song | null>;
  saveSong(song: Song): Promise<void>;
}

