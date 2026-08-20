import type { ResolveResponse } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function resolveSong(
  title: string,
  artist: string,
  signal?: AbortSignal,
): Promise<ResolveResponse> {
  const params = new URLSearchParams({ title, artist });
  const response = await fetch(
    `${API_URL}/ytmusic/resolve?${params.toString()}`,
    { signal },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to resolve song (${response.status}): ${message}`);
  }

  return response.json();
}
