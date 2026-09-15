import type { Song, SongOrderBy, SongOrderDirection } from "../api/types";

export const getPageAnimationKey = (songs: Song[]): string => {
  if (songs.length === 0) {
    return "empty";
  }

  return `${songs[0].id}-${songs[songs.length - 1].id}`;
};

export const getLibraryGridKey = (songs: Song[]): string =>
  `${songs.map((song) => song.id).join("-")}-${getPageAnimationKey(songs)}`;

export const getOrderDirectionLabel = (
  orderBy: SongOrderBy,
  orderDirection: SongOrderDirection,
): string => {
  if (orderBy === "id") {
    return "Default order";
  }

  return orderDirection === "asc" ? "Ascending order" : "Descending order";
};

export const getAvailableGridColumns = (maxColumns: number): number[] =>
  Array.from({ length: Math.max(0, maxColumns) }, (_, index) => index + 1);

export const clampGridColumns = (columns: number, maxColumns: number): number =>
  Math.min(columns, maxColumns);

export const getPreviousPage = (page: number): number => Math.max(1, page - 1);

export const getNextPage = (page: number, totalPages: number): number =>
  Math.min(totalPages, page + 1);

export const getTotalPages = (totalItems: number, pageSize: number): number => {
  if (totalItems <= 0 || pageSize <= 0) {
    return 0;
  }

  return Math.ceil(totalItems / pageSize);
};
