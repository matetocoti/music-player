import { memo } from "react";

interface PlayerHeaderProps {
  title: string;
  artist: string;
}

const PlayerHeader = ({ title, artist }: PlayerHeaderProps) => {
  return (
    <div className="relative w-full min-h-0 shrink-0 overflow-hidden border-b border-zinc-200/60 bg-gradient-to-r from-white/35 via-sky-50/35 to-zinc-100/35 px-4 py-3 font-sans dark:border-zinc-700/60 dark:from-zinc-900/35 dark:via-slate-900/35 dark:to-zinc-950/35 sm:py-4">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-2xl dark:bg-blue-400/8"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl dark:bg-cyan-400/8"
        aria-hidden="true"
      />
      <h1 className="relative truncate font-mono text-lg font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-xl lg:text-2xl">
        {title}
      </h1>
      <p className="relative mt-0.5 truncate text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400 sm:text-sm">
        {artist}
      </p>
    </div>
  );
};

export default memo(PlayerHeader);