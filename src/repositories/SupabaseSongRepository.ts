import { supabase } from "../lib/supabase";
import Song from "../domain/models/Song";

export default class SupabaseSongRepository {
  private DEFAULT_LIMIT = 10;

  async getAllSongs(page: number = 1, limit: number = this.DEFAULT_LIMIT): Promise<Song[]> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .range(from, to);

    if (error) throw new Error(error.message);

    return data.map((song) => new Song(song));
  }

  async getSongById(id: string): Promise<Song | null> {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    
    return new Song(data);
  }
}
