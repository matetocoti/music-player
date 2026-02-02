import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSong from "../../hooks/useSong";
import SongPlayer from "../../components/SongPlayer";

import { resolveSong } from "../../services/musicProvider";
import YTPlayer from "../../components/YTPlayer";

const PlayerPage = () => {
  const { id } = useParams<{ id?: string }>();
  const { song, loading, error } = useSong(`${id}`);

  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    if (!song) return;

    const fetchVideoId = async () => {
      try {
        setVideoLoading(true);
        const result = await resolveSong(song.title, song.artist);
        setVideoId(result.videoId);
      } catch (err) {
        console.error("Erro ao resolver vídeo:", err);
      } finally {
        setVideoLoading(false);
      }
    };

    fetchVideoId();
  }, [song]);

  if (loading) {
    return <div>Loading song...</div>;
  }

  if (error) {
    return <div>Error loading song: {error}</div>;
  }

  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <main>
      {videoLoading && <div>Loading video...</div>}
      {videoId && <YTPlayer videoId={videoId} />}
      <SongPlayer song={song} />
    </main>
  );
};

export default memo(PlayerPage);
