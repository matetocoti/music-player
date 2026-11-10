import type {
  PaginatedSongs,
  Song,
  CreateSongRequest,
  ListSongsParams,
  PaginatedSongsResponse,
  RequestOptions,
  CsvImportResponse,
  UpdateSongRequest,
} from "./types";
import { ApiError } from "../errors/ApiError";

const configuredApiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const API_URL = configuredApiUrl.endsWith("/") ? configuredApiUrl.slice(0, -1) : configuredApiUrl;
const SONGS_API_URL = `${API_URL}/songs`;

const songUrl = (id: string, suffix = "") => `${SONGS_API_URL}/${encodeURIComponent(id)}${suffix}`;


async function request(
  url: string,
  { action, method = "GET", body, signal, allowNotFound = false }: RequestOptions,
): Promise<Response> {
  const response = await fetch(url, {
    method,
    signal,
    ...(body !== undefined && {
      headers: { "Content-Type": typeof body === "string" ? "text/csv" : "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  });

  if (!response.ok && !(allowNotFound && response.status === 404)) {
    throw new ApiError(action, response.status);
  }
  return response;
}

export async function listSongs(
  {
    query = "",
    page,
    perPage,
    orderBy = "id",
    orderDirection = "asc",
    category,
    favorite,
  }: ListSongsParams,
  signal?: AbortSignal,
): Promise<PaginatedSongs> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    per_page: String(perPage),
    order_by: orderBy,
    order_direction: orderDirection,
  });
  if (category) params.set("category", category);
  if (favorite !== undefined) params.set("favorite", String(favorite));

  const response = await request(`${SONGS_API_URL}?${params}`, {
    action: "Failed to load songs",
    signal,
  });
  const payload: PaginatedSongsResponse = await response.json();

  return {
    data: payload.data,
    total: payload.total,
    page: payload.page,
    perPage: payload.per_page,
  };
}

export async function listCategories(signal?: AbortSignal): Promise<string[]> {
  const response = await request(`${SONGS_API_URL}/categories`, {
    action: "Failed to load song categories",
    signal,
  });
  return response.json();
}

export async function getSong(id: string, signal?: AbortSignal): Promise<Song | null> {
  const response = await request(songUrl(id), {
    action: "Failed to load song",
    signal,
    allowNotFound: true,
  });
  return response.status === 404 ? null : response.json();
}

export async function createSong(song: CreateSongRequest, signal?: AbortSignal): Promise<void> {
  await request(SONGS_API_URL, {
    action: "Failed to create song",
    method: "POST",
    body: song,
    signal,
  });
}

export async function saveSongsCsv(csv: string, signal?: AbortSignal): Promise<CsvImportResponse> {
  const response = await request(`${SONGS_API_URL}/csv`, {
    action: "Failed to save songs CSV",
    method: "POST",
    body: csv,
    signal,
  });
  return response.json();
}

export async function updateSong(id: string, updates: UpdateSongRequest, signal?: AbortSignal,): Promise<Song | null> {
  const response = await request(songUrl(id), {
    action: "Failed to update song",
    method: "PUT",
    body: updates,
    signal,
    allowNotFound: true,
  });
  return response.status === 404 ? null : response.json();
}

export async function toggleFavorite(id: string, signal?: AbortSignal): Promise<boolean> {
  const response = await request(songUrl(id, "/favorite"), {
    action: "Failed to toggle favorite",
    method: "PATCH",
    signal,
    allowNotFound: true,
  });
  return response.status !== 404;
}

export async function deleteSong(id: string, signal?: AbortSignal): Promise<void> {
  await request(songUrl(id), {
    action: "Failed to delete song",
    method: "DELETE",
    signal,
  });
}