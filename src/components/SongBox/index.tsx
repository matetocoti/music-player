import { memo, useMemo, Children, isValidElement, type CSSProperties, type ReactNode } from 'react';
import { Disc3, PlayCircle } from 'lucide-react';
import type { Song } from '../../api/types';
import { formatDuration } from '../../utils/formatTime';



const noiseUrl = (baseFrequency: string, alpha: number, size: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
      `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='3' stitchTiles='stitch'/>` +
      `<feColorMatrix values='0 0 0 0 .32  0 0 0 0 .24  0 0 0 0 .18  0 0 0 ${alpha} 0'/></filter>` +
      `<rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  )}")`;

const GRAIN_STYLE: CSSProperties = { backgroundImage: noiseUrl('.9', 0.7, 160) };
const MOTTLE_STYLE: CSSProperties = { backgroundImage: noiseUrl('.045', 1.1, 320) };


const LIGHTING_STYLE: CSSProperties = {
  background:
    'linear-gradient(90deg, var(--paper-lo) 0, transparent 7%), linear-gradient(135deg, var(--paper-hi), transparent 45%, var(--paper-lo))',
};

const RING_WEAR_STYLE: CSSProperties = {
  background:
    'radial-gradient(circle, transparent 0, transparent calc(50% - 9px), var(--ring-hi) calc(50% - 7px), var(--ring-lo) calc(50% - 2px), transparent 50%)',
};

const GROOVES_STYLE: CSSProperties = {
  background: [
    'repeating-radial-gradient(circle at 50% 50%, transparent 0 17px, rgba(0,0,0,0.55) 17px 19px)',
    'repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.065) 0 1px, transparent 1px 3px)',
    'radial-gradient(circle at 50% 50%, #1d1d22 0%, #0c0c0e 72%)',
  ].join(', '),
};

const SHEEN_STYLE: CSSProperties = {
  background:
    'conic-gradient(from 35deg, transparent 0deg, rgba(255,255,255,0.24) 24deg, transparent 68deg, transparent 180deg, rgba(255,255,255,0.17) 204deg, transparent 248deg, transparent 360deg)',
  boxShadow:
    'inset 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 0 5px rgba(0,0,0,0.55), 0 6px 14px rgba(0,0,0,0.38)',
};

const LABEL_STYLE: CSSProperties = {
  background: 'radial-gradient(circle at 35% 30%, #c98260, #a56345 55%, #7f452c)',
  boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.18), inset 0 0 0 5px rgba(0,0,0,0.12)',
};

const PaperTexture = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 [--paper-hi:rgba(255,255,255,0.55)] [--paper-lo:rgba(70,55,45,0.1)] [--ring-hi:rgba(255,255,255,0.95)] [--ring-lo:rgba(70,55,45,0.18)] dark:[--paper-hi:rgba(255,255,255,0.05)] dark:[--paper-lo:rgba(0,0,0,0.35)] dark:[--ring-hi:rgba(255,255,255,0.12)] dark:[--ring-lo:rgba(0,0,0,0.5)]"
  >
    <div className="absolute inset-0" style={LIGHTING_STYLE} />
    <div className="absolute inset-0 opacity-[0.09] dark:opacity-[0.05] dark:invert" style={MOTTLE_STYLE} />
    <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.07] dark:invert" style={GRAIN_STYLE} />
    
    <div className="absolute inset-1.5 rounded-[10px] border border-[#a56345]/25 sm:rounded-[18px] dark:border-[#d59672]/20" />
    
    <div
      className="absolute -bottom-[68px] -right-[68px] h-[136px] w-[136px] rounded-full sm:-bottom-[76px] sm:-right-[76px] sm:h-[152px] sm:w-[152px]"
      style={RING_WEAR_STYLE}
    />
  </div>
);

const VinylDisc = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-14 -right-14 -z-10 h-28 w-28 transition-transform duration-500 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2 motion-reduce:transition-none sm:-bottom-16 sm:-right-16 sm:h-32 sm:w-32"
  >
    <div
      className="absolute inset-0 animate-spin rounded-full [animation-duration:10s] [animation-play-state:paused] group-hover:[animation-play-state:running] motion-reduce:animate-none"
      style={GROOVES_STYLE}
    >
      <div className="absolute inset-[30%] rounded-full" style={LABEL_STYLE}>
        <div className="absolute inset-[40%] rounded-full bg-[#f6f3ee] shadow-[inset_0_1px_2px_rgba(0,0,0,0.45)] dark:bg-zinc-900" />
      </div>
    </div>
    <div className="absolute inset-0 rounded-full" style={SHEEN_STYLE} />
  </div>
);



interface SongBoxProps {
  song: Song;
  className?: string;
  children?: ReactNode;
}

const SongBox = ({ song, className = '', children }: SongBoxProps) => {
  const { title, artist, album = 'Unknown Album', duration: songDuration } = song;
  const duration = useMemo(() => formatDuration(songDuration), [songDuration]);

  const actionItems = Children.toArray(children).filter(Boolean);

  return (
    <article
      className={`song-box group relative isolate flex min-h-[120px] min-w-[120px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-stone-300/80 bg-[#f6f3ee] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-2px_0_rgba(70,55,45,0.07),0_1px_0_rgba(70,55,45,0.12),0_8px_18px_-8px_rgba(70,55,45,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-2px_0_rgba(70,55,45,0.07),0_1px_0_rgba(70,55,45,0.12),0_16px_28px_-10px_rgba(70,55,45,0.45)] active:translate-y-0 active:scale-[0.98] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_0_rgba(70,55,45,0.12),0_3px_8px_-4px_rgba(70,55,45,0.35)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-2px_0_rgba(0,0,0,0.35),0_8px_18px_-8px_rgba(0,0,0,0.7)] dark:hover:border-zinc-700 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-2px_0_rgba(0,0,0,0.35),0_16px_28px_-10px_rgba(0,0,0,0.85)] sm:rounded-3xl sm:p-5 sm:hover:-translate-y-1.5 sm:active:scale-100 ${className}`.trim()}
    >
      <PaperTexture />
      <VinylDisc />

      <div>
        <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4 sm:gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-reading truncate text-sm font-semibold tracking-normal text-zinc-900 sm:text-base dark:text-zinc-100">
              {title}
            </h3>
            <p className="truncate text-xs font-medium text-zinc-500 sm:text-sm dark:text-zinc-400">
              {artist}
            </p>
          </div>
          <div className="shrink-0 rounded-full border border-stone-300/70 bg-stone-200/70 px-2.5 py-1 text-[10px] font-bold tabular-nums tracking-widest text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] sm:px-3 sm:py-1.5 sm:text-[11px] dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:shadow-none">
            {duration ?? '—'}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 sm:gap-2 sm:text-sm dark:text-zinc-400">
          <Disc3
            className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition-colors duration-300 group-hover:text-[#a56345] sm:h-4 sm:w-4 dark:text-zinc-500 dark:group-hover:text-[#d59672]"
            aria-hidden="true"
          />
          <p className="truncate">
            <span className="sr-only">Album: </span>
            {album}
          </p>
        </div>
      </div>

      <div className="song-box-waveform" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:mt-6">
        <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-500 transition-colors duration-300 group-hover:text-[#a56345] sm:gap-2 sm:text-[11px] sm:tracking-[0.2em] dark:text-zinc-500 dark:group-hover:text-[#d59672]">
          <PlayCircle className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
          <span className="min-w-0 truncate">Play it</span>
        </div>

        {actionItems.length > 0 && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {actionItems.map((child, index) => (
              <div
                key={isValidElement(child) && child.key != null ? child.key : index}
                className="flex h-7 w-7 shrink-0 items-center justify-center sm:h-8 sm:w-8 [&>*]:h-full [&>*]:w-full"
              >
                {child}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

SongBox.displayName = 'SongBox';
export default memo(SongBox);