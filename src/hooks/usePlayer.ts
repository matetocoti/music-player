import { useEffect, useRef, useState } from "react";

import type { Song } from "../api/types";
import { resolveSong } from "../api/ytmusic";
import type { YTPlayerHandle } from "../components/yt-components/YTPlayer";

function usePlayer(song: Song | null) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const lastVolumeRef = useRef(100);
  const playerRef = useRef<YTPlayerHandle | null>(null);

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
          setCurrentTime(0);
          setDuration(0);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Erro ao resolver vídeo:", err);
          setVideoError("Unable to load video source.");
          setVideoId(null);
        }
      } finally {
        if (!cancelled) setVideoLoading(false);
      }
    };

    void fetchVideoId();

    return () => {
      cancelled = true;
    };
  }, [song]);

  useEffect(() => {
    if (!videoId) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const checkDuration = () => {
      if (cancelled) return;

      const getDuration = playerRef.current?.getDuration;
      if (typeof getDuration !== "function") {
        timeoutId = setTimeout(checkDuration, 300);
        return;
      }

      const playerDuration = getDuration();
      if (playerDuration > 0) setDuration(playerDuration);
      else timeoutId = setTimeout(checkDuration, 800);
    };

    checkDuration();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [videoId, playing]);

  useEffect(() => {
    if (!playing) return;

    const intervalId = setInterval(() => {
      const getCurrentTime = playerRef.current?.getCurrentTime;
      if (typeof getCurrentTime !== "function") return;

      const time = getCurrentTime();
      if (typeof time === "number") setCurrentTime(time);
    }, 500);

    return () => clearInterval(intervalId);
  }, [playing]);

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (playing) playerRef.current.pause();
    else playerRef.current.play();

    setPlaying((currentPlaying) => !currentPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0) lastVolumeRef.current = newVolume;
    playerRef.current?.setVolume(newVolume);
  };

  const handleMuteToggle = () => {
    if (volume > 0) {
      lastVolumeRef.current = volume;
      setVolume(0);
      playerRef.current?.setVolume(0);
      return;
    }

    const restoredVolume = lastVolumeRef.current || 100;
    setVolume(restoredVolume);
    playerRef.current?.setVolume(restoredVolume);
  };

  const handleRestart = () => {
    if (!playerRef.current) return;
    playerRef.current.restart();
    setPlaying(true);
    setCurrentTime(0);
  };

  return {
    videoId,
    videoLoading,
    videoError,
    playing,
    volume,
    currentTime,
    duration,
    playerRef,
    togglePlay,
    handleVolumeChange,
    handleMuteToggle,
    handleRestart,
  };
}

export default usePlayer;