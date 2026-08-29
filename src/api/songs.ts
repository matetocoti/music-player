import type { PaginatedSongs, Song ,CreateSongRequest} from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const SONGS_API_URL = `${API_URL}/songs`;

async function ensureOk(response: Response, action: string): Promise<void> {
  if (!response.ok) {
    throw new Error(`${action} (${response.status})`);
  }
}

export async function listSongs(
  query: string,
  page: number,
  perPage: number,
  signal?: AbortSignal,
): Promise<PaginatedSongs> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    per_page: String(perPage),
  });
  const response = await fetch(`${SONGS_API_URL}?${params.toString()}`, { signal });
  await ensureOk(response, "Failed to load songs");

  const payload: { data: Song[]; total: number; page: number; per_page: number } =
    await response.json();

  return {
    data: payload.data,
    total: payload.total,
    page: payload.page,
    perPage: payload.per_page,
  };
}

export async function getSong(id: string, signal?: AbortSignal): Promise<Song | null> {
  const response = await fetch(`${SONGS_API_URL}/${encodeURIComponent(id)}`, { signal });
  if (response.status === 404) {
    return null;
  }
  await ensureOk(response, "Failed to load song");
  return response.json();
}

export async function createSong(song: CreateSongRequest, signal?: AbortSignal): Promise<Song> {
  const response = await fetch(SONGS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
    signal,
  });
  await ensureOk(response, "Failed to create song");
  return response.json();
}

export async function deleteSong(id: string, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${SONGS_API_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
    signal,
  });
  await ensureOk(response, "Failed to delete song");
}