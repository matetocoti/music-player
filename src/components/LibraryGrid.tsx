import { LoaderCircle, Settings, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import type { Song } from "../api/types";
import MyGridContainer from "./MyGridContainer";
import SongBox from "./SongBox";

interface LibraryGridProps {
  songs: Song[];
  loading: boolean;
  error: string | null;
  deletingSongId: string | null;
  onDeleteSong: (song: Pick<Song, "id" | "title">) => void;
  onEditSong: (song: Song) => void;
}

const LibraryGrid = ({
  songs,
  loading,
  error,
  deletingSongId,
  onDeleteSong,
  onEditSong,
}: LibraryGridProps) => (
  <div className="flex min-h-0 flex-1 flex-col">
    {loading ? (
      <div className="flex flex-1 items-center justify-center rounded-3xl border border-zinc-200/70 bg-white/70 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="animate-pulse text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Loading songs...
        </p>
      </div>
    ) : error ? (
      <div className="flex flex-1 items-center justify-center rounded-3xl border border-rose-200 bg-rose-50 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/30">
        <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
          Error loading songs: {error}
        </p>
      </div>
    ) : (
      <MyGridContainer className="flex-0 gap-1 overflow-y-auto pr-5 sm:gap-1 lg:gap-1">
        {songs.map((song) => (
          <div key={song.id} className="group/song-card relative ml-5 mr-5 mt-4">
            <Link
              to={`/player/${song.id}`}
              className="block max-h-fit rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 dark:focus-visible:ring-offset-zinc-900"
            >
              <SongBox song={song} className="pb-12" />
            </Link>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onDeleteSong(song);
              }}
              disabled={deletingSongId === song.id}
              title={`Delete ${song.title}`}
              aria-label={`Delete ${song.title}`}
              className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-rose-200/80 bg-white/90 text-rose-500 opacity-70 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-rose-50 hover:text-rose-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-wait disabled:opacity-100 dark:border-rose-900/70 dark:bg-zinc-900/90 dark:text-rose-400 dark:hover:bg-rose-950/50 dark:hover:text-rose-300 sm:opacity-0 sm:group-hover/song-card:opacity-100"
            >
              {deletingSongId === song.id ? (
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onEditSong(song);
              }}
              disabled={deletingSongId === song.id}
              title={`Edit ${song.title}`}
              aria-label={`Edit ${song.title}`}
              className="absolute bottom-3 right-14 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200/80 bg-white/90 text-emerald-600 opacity-70 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-emerald-900/70 dark:bg-zinc-900/90 dark:text-emerald-400 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-300 sm:opacity-0 sm:group-hover/song-card:opacity-100"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </MyGridContainer>
    )}
  </div>
);

export default LibraryGrid;
