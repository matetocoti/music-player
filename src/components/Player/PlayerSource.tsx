import { memo, type RefObject } from "react";

import YTPlayer, { type YTPlayerHandle } from "../yt-components/YTPlayer";

interface PlayerSourceProps {
  videoId: string | null;
  loading: boolean;
  error: string | null;
  playerRef: RefObject<YTPlayerHandle | null>;
}

const PlayerSource = ({ videoId, loading, error, playerRef }: PlayerSourceProps) => {
  return (
    <div className="relative flex w-full min-h-0 flex-1 flex-col items-center justify-center overflow-hidden">
      {loading && (
        <p className="absolute -top-5 animate-pulse text-xs text-zinc-400 dark:text-zinc-500">
          Connecting to audio source...
        </p>
      )}
      {error && <p className="absolute -top-5 text-xs text-rose-500">{error}</p>}
      <div
        className={`flex max-h-full w-full items-center justify-center ${
          videoId ? "opacity-100 transition-opacity duration-500" : "opacity-0"
        }`}
      >
        {videoId && <YTPlayer ref={playerRef} videoId={videoId} />}
      </div>
    </div>
  );
};

export default memo(PlayerSource);