import type { CSSProperties, ReactNode } from "react";
import { LoaderCircle, MoreVertical, Settings, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import type { Song } from "../../../api/types";
import { getLibraryGridKey } from "../../../utils/library";
import MyGridContainer from "../../MyGridContainer";
import SongBox from "../../SongBox";

interface LibraryGridProps {
  songs: Song[];
  loading: boolean;
  error: string | null;
  deletingSongId: string | null;
  columns: number;
  keyboardControls: boolean;
  onDeleteSong: (song: Pick<Song, "id" | "title">) => void;
  onEditSong: (song: Song) => void;
}

interface SongCardActionsProps {
  song: Song;
  deletingSongId: string | null;
  onDeleteSong: (song: Pick<Song, "id" | "title">) => void;
  onEditSong: (song: Song) => void;
}

const SongCardActions = ({ song, deletingSongId, onDeleteSong, onEditSong }: SongCardActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-3 right-3 z-10 flex shrink-0 items-center gap-2 opacity-70 transition sm:opacity-0 sm:group-hover/song-card:opacity-100">
      <div
        className={`flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-zinc-200/80 bg-white/90 p-1 shadow-sm backdrop-blur transition-[max-width,opacity,transform] duration-300 ease-out motion-reduce:transition-none dark:border-zinc-700 dark:bg-zinc-900/90 ${
          isOpen ? "max-w-24 translate-x-0 scale-100 opacity-100" : "pointer-events-none max-w-0 translate-x-2 scale-95 border-transparent p-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onEditSong(song);
              setIsOpen(false);
            }}
            disabled={deletingSongId === song.id}
            title={`Edit ${song.title}`}
            aria-label={`Edit ${song.title}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-200/80 bg-white/90 text-emerald-600 transition hover:scale-105 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:cursor-wait dark:border-emerald-900/70 dark:bg-zinc-900/90 dark:text-emerald-400 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-300"
          >
            <Settings className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onDeleteSong(song);
              setIsOpen(false);
            }}
            disabled={deletingSongId === song.id}
            title={`Delete ${song.title}`}
            aria-label={`Delete ${song.title}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rose-200/80 bg-white/90 text-rose-500 transition hover:scale-105 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-wait dark:border-rose-900/70 dark:bg-zinc-900/90 dark:text-rose-400 dark:hover:bg-rose-950/50 dark:hover:text-rose-300"
          >
            {deletingSongId === song.id ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" aria-hidden="true" />}
          </button>
      </div>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsOpen((open) => !open);
        }}
        title="Song actions"
        aria-label={`Song actions for ${song.title}`}
        aria-expanded={isOpen}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200/80 bg-white/90 text-zinc-500 shadow-sm backdrop-blur transition hover:scale-105 hover:border-emerald-400 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
      >
        <MoreVertical className={`h-4 w-4 transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-90" : "rotate-0"}`} aria-hidden="true" />
      </button>
    </div>
  );
};

const LibraryGrid = ({ songs, loading, error, deletingSongId, columns, keyboardControls, onDeleteSong, onEditSong }: LibraryGridProps) => {
  const songLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    if (!keyboardControls || songs.length === 0) return;

    const activeElement = document.activeElement;
    const isInsideLibrary = activeElement instanceof HTMLElement && activeElement.closest("#library-content");
    const isPageNavigation = activeElement instanceof HTMLButtonElement && activeElement.closest("[aria-label=\"Previous page\"], [aria-label=\"Next page\"]");

    if (!activeElement || activeElement === document.body || isInsideLibrary || isPageNavigation) {
      songLinkRefs.current[0]?.focus();
    }
  }, [keyboardControls, songs]);

  const handleSongKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (!keyboardControls) return;

    const key = event.key;
    let nextIndex = index;

    if (key.toLowerCase() === "d") nextIndex = index + 1;
    if (key.toLowerCase() === "a") nextIndex = index - 1;
    if (key.toLowerCase() === "s") nextIndex = index + columns;
    if (key.toLowerCase() === "w") nextIndex = index - columns;
    if (key === "Home") nextIndex = 0;
    if (key === "End") nextIndex = songs.length - 1;

    if (nextIndex === index || nextIndex < 0 || nextIndex >= songs.length) return;

    event.preventDefault();
    songLinkRefs.current[nextIndex]?.focus();
  };

  let content: ReactNode;

  if (loading && songs.length === 0) {
    content = (
      <div className="flex flex-1 items-center justify-center rounded-3xl border border-zinc-200/70 bg-white/70 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="animate-pulse text-sm font-medium text-zinc-500 dark:text-zinc-400">Loading songs...</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex flex-1 items-center justify-center rounded-3xl border border-rose-200 bg-rose-50 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/30">
        <p className="text-sm font-medium text-rose-700 dark:text-rose-300">Error loading songs: {error}</p>
      </div>
    );
  } else {
    content = (
      <div id="library-content" className="relative flex min-h-fit flex-col" aria-busy={loading}>
        <MyGridContainer
        key={getLibraryGridKey(songs)}
        className={`library-grid library-grid-enter min-w-0 gap-1 overflow-visible pr-0 sm:gap-1 sm:pr-5 lg:gap-1 ${columns >= 5 ? "sm:pr-1" : ""}`}
        style={{
          "--library-grid-columns": columns,
        } as CSSProperties}
      >
        {songs.map((song, index) => (
          <div key={song.id} className={`group/song-card relative flex h-full min-h-0 min-w-0 flex-col mt-3 sm:mt-4 ${columns < 5 ? "sm:mx-5" : "sm:mx-1"}`}>
            <Link
              ref={(element) => {
                songLinkRefs.current[index] = element;
              }}
              to={`/player/${song.id}`}
              aria-label={`Play ${song.title}`}
              onKeyDown={(event) => handleSongKeyDown(event, index)}
              className="block h-full min-h-0 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 dark:focus-visible:ring-offset-zinc-900"
            >
              <SongBox song={song} className={`h-full pb-12 ${columns === 6 ? "song-box-expanded" : ""}`} />
            </Link>
            <SongCardActions
              song={song}
              deletingSongId={deletingSongId}
              onDeleteSong={onDeleteSong}
              onEditSong={onEditSong}
            />
          </div>
        ))}
        </MyGridContainer>
        {loading && (
          <div className="pointer-events-none absolute inset-x-0 top-2 flex justify-center">
            <span className="rounded-full border border-emerald-200/70 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 shadow-sm backdrop-blur-sm dark:border-emerald-900/60 dark:bg-zinc-900/90 dark:text-emerald-400">
              Updating
            </span>
          </div>
        )}
      </div>
    );
  }

  return <div className="flex min-h-0 min-w-0 flex-1 flex-col">{content}</div>;
};


export default LibraryGrid;
