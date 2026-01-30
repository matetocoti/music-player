export type ResolveResponse = {
  provider: string;
  videoId: string;
  title: string;
  artist: string;
  duration?: number;
};

export async function resolveSong(title: string, artist: string): Promise<ResolveResponse> {
  const params = new URLSearchParams({ title, artist });

  // Aqui eu chamo a minha rota python
  const res = await fetch(`http://localhost:8000/ytmusic/resolve?${params}`);

  if (!res.ok) {
    throw new Error("Failed to resolve song");
  }

  // Retorno os dados em json
  return res.json();
}
