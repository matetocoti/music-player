import Song from "../domain/models/Song";

export const PAGE_SIZE = 9;

interface PaginatedSongs {
  data: Song[];
  total: number;
  page: number;
  pageSize: number;
}

export function searchAndPaginateSongs(songs: Song[] ,query: string ,page: number): PaginatedSongs {
  const q = query.toLowerCase();

  const filtered = songs.filter((s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize: PAGE_SIZE,
  };
}
