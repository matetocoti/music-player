export type ResolveResponse = {
  provider: string;
  videoId: string;
  title: string;
  artist: string;
  duration?: number;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function resolveSong(
  title: string,
  artist: string,
  signal?: AbortSignal
): Promise<ResolveResponse> {
  const params = new URLSearchParams({ title, artist });

  const res = await fetch(
    `${API_URL}/ytmusic/resolve?${params.toString()}`,
    { signal }
  );

  if (!res.ok) {
    const message = await res.text();
    throw new Error(
      `Failed to resolve song (${res.status}): ${message}`
    );
  }

  const data: ResolveResponse = await res.json();

  return data;
}
