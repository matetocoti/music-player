import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import useSong from "../../hooks/useSong";
import { resolveSong } from "../../services/musicProvider";

import YTPlayer from "../../components/yt-components/YTPlayer";
import Powered from "../../components/Powered";
import Controler from "../../components/Controler";
import BackButton from "../../components/UI/BackButton";

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
          setVideoError("Unable to load video source.");
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
    const checkDuration = async () => {
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

  const containerStyle = "flex h-full w-full flex-1 flex-col overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm sm:p-5 lg:p-6 dark:border-zinc-800 dark:bg-zinc-900/60";

  if (loading) {
    return (
      <main className={containerStyle}>
        <div className="flex flex-1 items-center justify-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Loading song details...
        </div>
      </main>
    );
  }

  if (error || !song) {
    return (
      <main className={containerStyle}>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
            {error || "Song not found."}
          </p>
          <BackButton />
        </div>
      </main>
    );
  }
  

  return (
    <main className={containerStyle}>
      <header className="flex shrink-0 mb-4 width-full">
        <BackButton className="flex-1 px-4 py-2 "/>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center w-full max-w-2xl mx-auto gap-8">
        <div className="text-center px-4 w-full  border-b   border-zinc-200/50 dark:border-zinc-600 pb-4 sm:pb-6 lg:pb-8 font-sans">
          <h1 className="truncate text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            {song.title}
          </h1>
          <p className="truncate mt-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:text-base">
            {song.artist}
          </p>
        </div>
        <div className="w-full relative flex flex-col items-center justify-center">
          {videoLoading && (
            <p className="absolute -top-6 text-xs animate-pulse text-zinc-400 dark:text-zinc-500">
              Connecting to audio source...
            </p>
          )}
          {videoError && (
            <p className="absolute -top-6 text-xs text-rose-500">
              {videoError}
            </p>
          )}
          <div className={videoId ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
            {videoId && <YTPlayer ref={ytRef} videoId={videoId} />}
          </div>
        </div>
        <div className="w-full">
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
        </div>
      </div>
      <footer className="mt-4 flex shrink-0 items-center justify-center pt-2">
        <Powered provider="YouTube" url="https://www.youtube.com/" />
      </footer>
    </main>
  );
};

export default memo(PlayerPage);