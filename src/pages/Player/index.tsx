import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import useSong from "../../hooks/useSong";
import { resolveSong } from "../../services/musicProvider";

import YTPlayer from "../../components/yt-components/YTPlayer";
import Powered from "../../components/Powered";
import Controler from "../../components/Controler";

import "./Player.css";

type YTControls = {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
};

const PlayerPage = () => {
  //#region State and Refs
  const { id } = useParams<{ id?: string }>();
  const { song, loading, error } = useSong(id ?? "");

  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const ytRef = useRef<YTControls | null>(null);
  const [playing, setPlaying] = useState(false);

  
  const [volume, setVolume] = useState(100);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  //#endregion

  //#region Effects 
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
  useEffect(() => {
  if (!videoId || !ytRef.current) return;
    const timeout = setTimeout(() => {
      const dur = ytRef.current?.getDuration();
      if (dur && dur > 0) {
        setDuration(dur);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [videoId]);
  useEffect(() => {
  if (!playing || !ytRef.current) return;

  const interval = setInterval(() => {
    const time = ytRef.current?.getCurrentTime();
    if (typeof time === "number") {
      setCurrentTime(time);
    }
  }, 500);

  return () => clearInterval(interval);
}, [playing]);
  //#endregion

  //#region Handlers
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
  //#endregion

  //#region Render
  if (loading) return <div>Loading song...</div>;
  if (error) return <div>Error loading song: {error}</div>;
  if (!song) return <div>Song not found</div>;
  //#endregion
 
  return (
    <main className="player-page">
      {videoLoading && <div>Loading video...</div>}
      {videoError && <div>{videoError}</div>}
      {videoId && <YTPlayer ref={ytRef} videoId={videoId} />}
      <Controler
        playing={playing}
        disabled={videoLoading || !videoId}
        volume={volume}
        onTogglePlay={togglePlay}
        onVolumeChange={handleVolumeChange}
        currentTime={currentTime}
        duration={duration}
      />
      <Powered provider="YouTube" url="https://www.youtube.com/" />
    </main>
  );
};

export default memo(PlayerPage);
