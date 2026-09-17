import { memo } from "react";
import { Play, Pause } from "lucide-react";
import type { Song } from "../../api/types";

interface SongPlayerProps {
  song: Song;
  playing?: boolean;
  onPlayToggle?: () => void;
}

const SongPlayer = ({ song, playing = false, onPlayToggle }: SongPlayerProps) => {
  return (
    <section className="flex w-full min-w-0 items-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-100 px-4 py-3 shadow-sm transition-colors duration-300 sm:gap-4 sm:rounded-3xl sm:px-5 sm:py-4 dark:border-zinc-800 dark:bg-zinc-800">
      <button
        type="button"
        onClick={onPlayToggle}
        aria-label={playing ? "Pause song" : "Play song"}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white shadow-md transition-all duration-300 ease-out hover:bg-zinc-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-zinc-900/20 sm:h-12 sm:w-12 sm:hover:scale-100 sm:hover:shadow-lg sm:active:scale-100 sm:active:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus:ring-zinc-100/20"
      >
        {playing ? (
          <Pause className="h-5 w-5 fill-current sm:h-5 sm:w-5" aria-hidden="true" />
        ) : (
          <Play className="ml-1 h-5 w-5 fill-current sm:h-5 sm:w-5" aria-hidden="true" />
        )}
      </button>
      <div className="flex min-w-0 flex-col justify-center overflow-hidden">
        <strong className="truncate text-sm font-semibold tracking-tight text-zinc-900 sm:text-base dark:text-zinc-100">
          {song.title}
        </strong>
        <span className="truncate text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
          {song.artist}
        </span>
      </div>
    </section>
  );
};

export default memo(SongPlayer);