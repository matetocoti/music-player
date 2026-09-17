import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";


import useSong from "../../hooks/useSong";
import { resolveSong } from "../../api/ytmusic";

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
  const lastVolumeRef = useRef(100);
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
  }, [videoId, playing]);

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
    if (newVolume > 0) {
      lastVolumeRef.current = newVolume;
    }
    ytRef.current?.setVolume?.(newVolume);
  };

  const handleMuteToggle = () => {
    if (volume > 0) {
      lastVolumeRef.current = volume;
      setVolume(0);
      ytRef.current?.setVolume?.(0);
    } else {
      const restoredVolume = lastVolumeRef.current || 100;
      setVolume(restoredVolume);
      ytRef.current?.setVolume?.(restoredVolume);
    }
  };

  const handleRestart = () => {
    if (!ytRef.current) return;
    ytRef.current.restart();
    setPlaying(true);
    setCurrentTime(0);
  };

  const containerStyle =
    "relative flex h-full w-full flex-1 flex-col overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm transition-colors duration-300 sm:p-5 lg:p-6 dark:border-zinc-800 dark:bg-zinc-900/60";

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
          <BackButton>BACK</BackButton>
        </div>
      </main>
    );
  }

  return (
    <main className={containerStyle}>
      <div className="absolute left-4 top-4 z-10 sm:left-5 sm:top-5">
        <BackButton
          fallbackTo="/"
          ariaLabel="Back to Home"
          className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 p-0 text-zinc-600 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 sm:h-10 sm:w-10 sm:active:scale-100 sm:active:opacity-70 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
        />
          
      </div>

      <div className="mx-auto flex w-full min-h-0 max-w-2xl flex-1 flex-col items-center justify-center gap-3 pt-10 sm:gap-5 sm:pt-2">
        <div className="w-full min-h-0 shrink-0 border-b border-zinc-200/50 px-4 pb-3 text-center font-sans dark:border-zinc-600 sm:pb-4">
          <h1 className="truncate text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl lg:text-3xl">
            {song.title}
          </h1>
          <p className="mt-1 truncate text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:text-sm">
            {song.artist}
          </p>
        </div>

        <div className="relative flex w-full min-h-0 flex-1 flex-col items-center justify-center overflow-hidden">
          {videoLoading && (
            <p className="absolute -top-5 animate-pulse text-xs text-zinc-400 dark:text-zinc-500">
              Connecting to audio source...
            </p>
          )}
          {videoError && (
            <p className="absolute -top-5 text-xs text-rose-500">
              {videoError}
            </p>
          )}
          <div
            className={`flex max-h-full w-full items-center justify-center ${
              videoId ? "opacity-100 transition-opacity duration-500" : "opacity-0"
            }`}
          >
            {videoId && <YTPlayer ref={ytRef} videoId={videoId} />}
          </div>
        </div>

        <div className="w-full shrink-0">
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

      <footer className="mt-2 flex shrink-0 items-center justify-center pt-1 sm:mt-3">
        <Powered provider="YouTube" url="https://www.youtube.com/" />
      </footer>
    </main>
  );
};

export default memo(PlayerPage);