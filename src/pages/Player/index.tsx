import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import useSong from "../../hooks/useSong";
import { resolveSong } from "../../services/musicProvider";

import YTPlayer from "../../components/yt-components/YTPlayer";
import Powered from "../../components/Powered";
import PlayToggle from "../../components/PlayToggle";
import VolumeBar from "../../components/VolumeBar";

type YTControls = {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
};

const PlayerPage = () => {
  const { id } = useParams<{ id?: string }>();
  const { song, loading, error } = useSong(id ?? "");

  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const ytRef = useRef<YTControls | null>(null);
  const [playing, setPlaying] = useState(false);

  // TODO(v1): implementar controle de volume
  const [volume, setVolume] = useState(100);



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
          setPlaying(false);
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

  const togglePlay = () => {
    if (!ytRef.current) return;

    if (playing) {
      ytRef.current.pause();
    } else {
      ytRef.current.play();
    }

    setPlaying(!playing);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    ytRef.current?.setVolume?.(newVolume);
  };


  if (loading) return <div>Loading song...</div>;
  if (error) return <div>Error loading song: {error}</div>;
  if (!song) return <div>Song not found</div>;

  return (
    <main>
      {videoLoading && <div>Loading video...</div>}
      {videoError && <div>{videoError}</div>}

      {videoId && <YTPlayer ref={ytRef} videoId={videoId} />}
      {/* TODO(v1): extrair controller para PlayerControls */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="controler">
        <PlayToggle
          playing={playing}
          onToggle={togglePlay}
          disabled={videoLoading || !videoId}
        />

        <VolumeBar volume={volume} onVolumeChange={handleVolumeChange} />
      </div>

      <Powered provider="YouTube" url="https://www.youtube.com/" />
    </main>
  );
};

export default memo(PlayerPage);
