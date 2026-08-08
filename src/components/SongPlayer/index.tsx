import { memo } from "react";
import { Play, Pause } from "lucide-react";
import Song from "../../domain/models/Song";


interface SongPlayerProps {
  song: Song;
  playing?: boolean;
  onPlayToggle?: () => void;
}

const SongPlayer = ({ song, playing = false, onPlayToggle }: SongPlayerProps) => {
  return (
    <section 
      className="flex w-full items-center gap-4 rounded-2xl bg-zinc-100 px-5 py-4 shadow-sm transition-colors duration-300 dark:bg-zinc-800"
    >
      <button
        onClick={onPlayToggle}
        aria-label={playing ? "Pause song" : "Play song"}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white shadow-md transition-all hover:scale-105 hover:bg-zinc-700 focus:outline-none focus:ring-4 focus:ring-zinc-900/20 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus:ring-zinc-100/20"
      >
        {playing ? (
          <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
        ) : (
          <Play className="ml-1 h-5 w-5 fill-current" aria-hidden="true" />
        )}
      </button>
      <div className="flex flex-col overflow-hidden">
        <strong className="truncate text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {song.title}
        </strong>
        <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">
          {song.artist}
        </span>
      </div>
    </section>
  );
};

export default memo(SongPlayer);