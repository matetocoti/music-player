import { supabase } from "../lib/supabase";
import Song from "../domain/models/Song";

export default class SupabaseSongRepository {
  async getAllSongs(page = 1, limit = 9): Promise<Song[]> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .range(from, to);

    if (error) throw new Error(error.message);

    return data.map((s) => new Song(s));
  }

  async getSongById(id: string): Promise<Song | null> {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return new Song(data);
  }
}
