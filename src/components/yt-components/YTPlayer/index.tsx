import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";

import "./YTPlayer.css";

// Define the interface for the methods exposed by the YTPlayer component
export interface YTPlayerHandle {
  play: () => void;
  pause: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  setVolume: (volume: number) => void;
  seekTo: (seconds: number) => void;
  restart: () => void;
}

// Define the props for the YTPlayer component
interface YTPlayerProps {
  videoId?: string;
}

// Define the type for the YouTube Player instance
type YTPlayerInstance = {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number) => void;
  restart: () => void;
  destroy?: () => void;
};

// Extend the global Window interface to include YouTube Player types
declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: { videoId: string; playerVars?: Record<string, unknown> },
      ) => YTPlayerInstance;
      event: {
        onReady: (event: { target: YTPlayerInstance }) => void;
        onStateChange: (event: { target: YTPlayerInstance; data: number }) => void;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YOUTUBE_API_URL = "https://www.youtube.com/iframe_api";
const PLAYER_VARS = {
  rel: 0,
  modestbranding: 1,
  playsinline: 1,
} as const;




const YTPlayer = forwardRef<YTPlayerHandle, YTPlayerProps>(({ videoId }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  
  useImperativeHandle(ref, () => ({
    play: () => playerRef.current?.playVideo(),
    pause: () => playerRef.current?.pauseVideo(),
    setVolume: (volume: number) => playerRef.current?.setVolume(volume),
    getCurrentTime: () => playerRef.current?.getCurrentTime() ?? 0,
    getDuration: () => playerRef.current?.getDuration() ?? 0,
    seekTo: (seconds: number) => playerRef.current?.seekTo(seconds),
    restart: () => {
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        playerRef.current.playVideo();
      }
    },
  }));

  const createPlayer = useCallback(() => {
    if (!containerRef.current || !window.YT?.Player) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: videoId!,
      playerVars: PLAYER_VARS,
    });
  }, [videoId]);

  useEffect(() => {
    if (!videoId) return;

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const script = document.createElement("script");
      script.src = YOUTUBE_API_URL;
      script.async = true;
      const onReady = () => {
        if (window.YT?.Player) {
          createPlayer();
        }
      };
      window.onYouTubeIframeAPIReady = onReady;
      document.body.appendChild(script);
    }

    return () => {
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId, createPlayer]);

  if (!videoId) {
    return (
      <div className="yt-player yt-player--empty">
        <span>No video selected</span>
      </div>
    );
  }

  return <div className="yt-player" ref={containerRef} />;
});

YTPlayer.displayName = "YTPlayer";

export default memo(YTPlayer);
