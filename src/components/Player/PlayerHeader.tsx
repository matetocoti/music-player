import { memo, type ReactNode } from "react";

interface PlayerHeaderProps {
  title: string;
  artist: string;
  playing?: boolean;
  leading?: ReactNode;
}

const EQ_BARS = [0, 1, 2, 3, 4];

const PlayerHeader = ({ title, artist, playing = false, leading }: PlayerHeaderProps) => {
  return (
    <>
     
      <div className="relative w-full min-h-0 shrink-0 overflow-hidden border-b border-zinc-200/60 bg-gradient-to-r from-white/35 via-sky-50/35 to-zinc-100/35 px-4 py-3 font-sans dark:border-zinc-700/60 dark:from-zinc-900/35 dark:via-slate-900/35 dark:to-zinc-950/35 sm:py-4 lg:hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-2xl dark:bg-blue-400/8"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-8 -top-10 h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl dark:bg-cyan-400/8"
          aria-hidden="true"
        />
        <h1 className="font-heading relative truncate text-lg leading-tight tracking-tight text-slate-950 dark:text-white sm:text-xl lg:text-2xl">
          {title}
        </h1>
        <p className="font-reading relative mt-0.5 truncate text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400 sm:text-sm">
          {artist}
        </p>
      </div>

      
      <div className="player-plate hidden min-h-[8rem] w-full shrink-0 items-center gap-5 bg-[#f4e8d8] px-6 py-5 text-[#5b3424] shadow-[0_12px_30px_rgba(91,52,36,0.12)] dark:bg-[#2b1d1b] dark:text-[#fbeedb] dark:shadow-[0_12px_30px_rgba(0,0,0,0.25)] lg:flex">
        {leading}
        <div className="player-vinyl" data-playing={playing} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="font-label text-[0.65rem] tracking-[0.3em] text-[#9a5c35] dark:text-[#e8b27c]">NOW PLAYING</p>
          <h1 className="font-heading truncate text-2xl leading-tight text-[#5b3424] dark:text-[#fbeedb] xl:text-3xl">{title}</h1>
          <p className="font-reading truncate text-base font-medium text-[#80513a] dark:text-[#dcbf9f]">{artist}</p>
        </div>
        <div className="player-eq" data-playing={playing} aria-hidden="true">
          {EQ_BARS.map((bar) => (
            <span key={bar} />
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(PlayerHeader);