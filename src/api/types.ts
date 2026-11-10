export type Song = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  url?: string;
  category?: string;
  favorite?: boolean;
};

export type SongOrderBy = "id" | "title" | "artist" | "album" | "duration";
export type SongOrderDirection = "asc" | "desc";

export type CreateSongRequest = {
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  category?: string;
};

export type UpdateSongRequest = {
  title?: string;
  artist?: string;
  album?: string;
  duration?: number;
  category?: string;
};


export type PaginatedSongs = {
  data: Song[];
  total: number;
  page: number;
  perPage: number;
};

export type ResolveResponse = {
  provider: string;
  videoId: string;
  title: string;
  artist: string;
  duration?: number;
};

export type RequestOptions = {
  action: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
  allowNotFound?: boolean;
};

export type ListSongsParams = {
  query?: string;
  page: number;
  perPage: number;
  orderBy?: SongOrderBy;
  orderDirection?: SongOrderDirection;
  category?: string;
  favorite?: boolean;
};

export type PaginatedSongsResponse = {
  data: Song[];
  total: number;
  page: number;
  per_page: number;
};

export type CsvImportError = {
  line: number;
  error: string;
};

export type CsvImportResponse = {
  total: number;
  saved: number;
  failed: number;
  errors: CsvImportError[];
};
