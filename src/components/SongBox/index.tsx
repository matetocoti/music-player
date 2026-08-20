import { memo, useMemo, type ReactNode } from 'react';
import { Disc3, PlayCircle } from 'lucide-react';
import type { Song } from '../../api/types';

interface SongBoxProps {
  song: Song;
  className?: string;
  children?: ReactNode;
}

const formatDuration = (seconds?: number | null): string | null => {
  if (!seconds || seconds <= 0) return null;
  const minutes = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${secs}`;
};

const SongBox = ({ song, className = '', children }: SongBoxProps) => {
  const { title, artist, album = 'Unknown Album', duration: songDuration } = song;
  const duration = useMemo(() => formatDuration(songDuration), [songDuration]);

  return (
    <article 
      className={`group relative flex min-h-[120px] min-w-[120px] flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:hover:-translate-y-1.5 sm:hover:shadow-xl hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700 dark:hover:shadow-zinc-950/50 ${className}`.trim()}
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4 sm:gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold tracking-tight text-zinc-900 sm:text-base dark:text-zinc-100">
              {title}
            </h3>
            <p className="truncate text-xs font-medium text-zinc-500 sm:text-sm dark:text-zinc-400">
              {artist}
            </p>
          </div>
          <div className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold tracking-widest text-zinc-600 sm:px-3 sm:py-1.5 sm:text-[11px] dark:bg-zinc-800 dark:text-zinc-300">
            {duration ?? '—'}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 sm:gap-2 sm:text-sm dark:text-zinc-400">
          <Disc3 className="h-3.5 w-3.5 shrink-0 text-zinc-400 sm:h-4 sm:w-4 dark:text-zinc-500 group-hover:animate-[spin_3s_linear_infinite]" aria-hidden="true" />
          <p className="truncate">
            <span className="sr-only">Album: </span>
            {album}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 group-hover:text-emerald-500 sm:mt-6 sm:gap-2 sm:text-[11px] dark:text-zinc-600 dark:group-hover:text-emerald-400">
        <PlayCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        <span>Tap to play</span>
      </div>
      {children}
    </article>
  );
};

SongBox.displayName = 'SongBox';
export default memo(SongBox);