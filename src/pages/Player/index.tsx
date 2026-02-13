import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import useSong from "../../hooks/useSong";
import { resolveSong } from "../../services/musicProvider";

import YTPlayer from "../../components/yt-components/YTPlayer";
import Powered from "../../components/Powered";
import Controler from "../../components/Controler";

import "./Player.css";

// Define the interface for the YouTube player controls
type YTControls = {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number) => void;
  restart: () => void;
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


  // Resolve video ID when song changes
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
  // Update duration when video ID changes
  useEffect(() => {
    if (!videoId || !ytRef.current) return;

    let cancelled = false;
    
    // Check duration every 800ms until we get a valid value
    // This is needed because the YouTube player may not have the duration available immediately after loading
    // for some reason ,it only works with async check and not with onReady callback, maybe a bug in the library or YouTube API
    const checkDuration  = async () => {
      if (!ytRef.current || cancelled) return;

      const dur = ytRef.current.getDuration();

      if (dur && dur > 0) {
        setDuration(dur);
      } else {
        setTimeout(checkDuration, 800);
      }
    };

    checkDuration();

    return () => {
      cancelled = true;
    };
  }, [videoId]);

  // Update current time every 500ms when playing
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

  const handleMuteToggle = () => {
    if (volume > 0) {
      setVolume(0);
      ytRef.current?.setVolume?.(0);
    } else {
      setVolume(100);
      ytRef.current?.setVolume?.(100);
    }
  };

  const handleRestart = () => {
    if (!ytRef.current) return;
    ytRef.current.restart();
    setPlaying(true);
    setCurrentTime(0);
  }  

  //#endregion

  //#region Render
  if (loading) return <div>Loading song...</div>;
  if (error) return <div>Error loading song: {error}</div>;
  if (!song) return <div>Song not found</div>;
  if (videoError) return <div>{videoError}</div>;
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
        onMuteToggle={handleMuteToggle}
        onRestart={handleRestart}
      />
      <Powered provider="YouTube" url="https://www.youtube.com/" />
    </main>
  );
};

export default memo(PlayerPage);

