import { Star } from "lucide-react";
import { memo, type ReactNode } from "react";

interface PlayerHeaderProps {
  title: string;
  artist: string;
  category?: string;
  favorite?: boolean;
  playing?: boolean;
  leading?: ReactNode;
}

const PlayerHeader = ({ title, artist, category, favorite = false, playing = false, leading }: PlayerHeaderProps) => {
  return (
    <>
     
      <div className="player-mobile-plate relative w-full min-h-0 shrink-0 overflow-hidden border-b px-4 py-3 font-sans sm:py-4 lg:hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-2xl dark:bg-blue-400/8"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-8 -top-10 h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl dark:bg-cyan-400/8"
          aria-hidden="true"
        />
        <p className="player-mobile-label font-label relative text-[0.55rem] tracking-[0.28em]">NOW PLAYING</p>
        <h1 className="font-heading relative truncate text-lg leading-tight tracking-tight sm:text-xl lg:text-2xl">
          {title}
        </h1>
        <p className="font-reading relative mt-0.5 truncate text-xs font-medium tracking-wide sm:text-sm">
          {artist}
        </p>
        {(category || favorite) && (
          <div className="player-mobile-meta absolute bottom-3 right-4 flex max-w-[42%] items-center gap-2 sm:bottom-4 sm:right-5">
            {category && (
              <span className="font-label max-w-28 truncate text-[0.55rem] uppercase tracking-[0.16em]">
                {category}
              </span>
            )}
            {favorite && <Star className="h-3.5 w-3.5 shrink-0 fill-current" aria-label="Favorite song" />}
          </div>
        )}
      </div>

      
      <div className="player-plate hidden min-h-[8rem] w-full shrink-0 items-center gap-5 bg-[#f4e8d8] px-6 py-5 text-[#5b3424] shadow-[0_12px_30px_rgba(91,52,36,0.12)] dark:bg-[#2b1d1b] dark:text-[#fbeedb] dark:shadow-[0_12px_30px_rgba(0,0,0,0.25)] lg:flex">
        {leading}
        <div className="player-vinyl" data-playing={playing} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="font-label text-[0.65rem] tracking-[0.3em] text-[#9a5c35] dark:text-[#e8b27c]">NOW PLAYING</p>
          <h1 className="font-heading truncate text-2xl leading-tight text-[#5b3424] dark:text-[#fbeedb] xl:text-3xl">{title}</h1>
          <p className="font-reading truncate text-base font-medium text-[#80513a] dark:text-[#dcbf9f]">{artist}</p>
        </div>
        <div className="player-meta flex shrink-0 items-center gap-3 self-stretch">
          {category && (
            <span className="font-label max-w-36 truncate text-[0.6rem] uppercase tracking-[0.18em] text-[#e8b27c] dark:text-[#e8b27c]">
              {category}
            </span>
          )}
          {favorite && (
            <Star
              className="h-4 w-4 shrink-0 fill-[#e8b27c] text-[#e8b27c]"
              aria-label="Favorite song"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(PlayerHeader);