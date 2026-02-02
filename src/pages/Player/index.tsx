import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useSong from "../../hooks/useSong";
import { resolveSong } from "../../services/musicProvider";

import SongPlayer from "../../components/SongPlayer";
import YTPlayer from "../../components/YTPlayer";

const PlayerPage = () => {
  const { id } = useParams<{ id?: string }>();
  const { song, loading, error } = useSong(id ?? "");

  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    if (!song) return;

    let cancelled = false;

    const fetchVideoId = async () => {
      try {
        setVideoLoading(true);
        setVideoError(null);

        const result = await resolveSong(song.title, song.artist);

        if (!cancelled) {
          setVideoId(result.videoId);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Erro ao resolver vídeo:", err);
          setVideoError("Unable to load video source");
          setVideoId(null);
        }
      } finally {
        if (!cancelled) {
          setVideoLoading(false);
        }
      }
    };

    fetchVideoId();

    return () => {
      cancelled = true;
    };
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
      {videoError && <div>{videoError}</div>}

      {videoId && <YTPlayer videoId={videoId} />}

      <SongPlayer song={song} />
    </main>
  );
};

export default memo(PlayerPage);
