import { memo } from "react";

interface PlayerHeaderProps {
  title: string;
  artist: string;
}

const PlayerHeader = ({ title, artist }: PlayerHeaderProps) => {
  return (
    <div className="w-full min-h-0 shrink-0 border-b border-zinc-200/50 px-4 pb-3 text-center font-sans dark:border-zinc-600 sm:pb-4">
      <h1 className="truncate text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl lg:text-3xl">
        {title}
      </h1>
      <p className="mt-1 truncate text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:text-sm">
        {artist}
      </p>
    </div>
  );
};

export default memo(PlayerHeader);