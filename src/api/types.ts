export type Song = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  url?: string;
};

export type CreateSongRequest = {
  title: string;
  artist: string;
  album?: string;
  duration?: number;
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
