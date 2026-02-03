import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import "./YTPlayer.css";

export interface YTPlayerHandle {
  play: () => void;
  pause: () => void;
}

interface YTPlayerProps {
  videoId?: string;
}

type YTPlayerInstance = {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy?: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: { videoId: string; playerVars?: Record<string, unknown> }
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YTPlayer = forwardRef<YTPlayerHandle, YTPlayerProps> (({ videoId }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YTPlayerInstance | null>(null);

    useImperativeHandle(ref, () => ({
      play: () => playerRef.current?.playVideo(),
      pause: () => playerRef.current?.pauseVideo(),
    }));

    useEffect(() => {
      if (!videoId || !containerRef.current) return;

      const createPlayer = () => {
        playerRef.current = new window.YT!.Player(containerRef.current!, {
          videoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },
        });
      };

      if (window.YT?.Player) {
        createPlayer();
      } else {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);

        window.onYouTubeIframeAPIReady = createPlayer;
      }

      return () => {
        playerRef.current?.destroy?.();
        playerRef.current = null;
      };
    }, [videoId]);

    if (!videoId) {
      return (
        <div className="yt-player yt-player--empty">
          <span>No video selected</span>
        </div>
      );
    }

    return <div className="yt-player" ref={containerRef} />;
  }
);

export default memo(YTPlayer);
