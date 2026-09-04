import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import MyGridContainer from "../../components/MyGridContainer";
import SongBox from "../../components/SongBox";
import useSongs from "../../hooks/useSongs";
import SearchBar from "../../components/pagination-components/SearchBar";
import PaginationBar from "../../components/pagination-components/PaginationBar";
import { useSongActions } from "../../hooks/useSongActions";

const Home = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deletingSongId, setDeletingSongId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { songs, total, pageSize, loading, error, reload } = useSongs(search, page);
  const { deleteSong } = useSongActions();
  const totalPages = Math.ceil(total / pageSize);
  const containerStyle = "flex h-full w-full flex-1 flex-col overflow-hidden gap-6 sm:gap-8 lg:gap-10 pb-48";

  const handleDelete = async (songId: string, title: string) => {
    if (!window.confirm(`Delete "${title}" from your library?`)) {
      return;
    }

    setDeletingSongId(songId);
    const deleted = await deleteSong(songId);
    if (deleted) {
      reload();
      toast.success(`Deleted "${title}"`);
    }
    setDeletingSongId(null);
  };

  return (
    <section className={`home-page ${containerStyle}`}>
      <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
            Discover
          </p>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Find your next favorite song
          </h2>
        </div>

        <div className="flex items-center gap-3 sm:w-[480px]">
          <div className="flex-1">
            <SearchBar
              search={search}
              onSearchChange={(newSearch) => {
                setSearch(newSearch);
                setPage(1);
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => navigate("/save-song")}
            title="Add song(metadata only)"
            aria-label="Add song(metadata only)"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/15 text-emerald-300 transition hover:scale-[1.02] hover:bg-emerald-500/25"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        {loading ? (
          <div className="flex flex-1 items-center justify-center rounded-3xl border border-zinc-200/70 bg-white/70 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="animate-pulse text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Loading songs...
            </p>
          </div>
        ) : (
          <>
            {error ? (
          <div className="flex flex-1 items-center justify-center rounded-3xl border border-rose-200 bg-rose-50 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/30">
            <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
              Error loading songs: {error}
            </p>
          </div>
            ) : (
              <MyGridContainer className="flex-0 overflow-y-auto pr-5 gap-1 sm:gap-1 lg:gap-1">
                {songs.map((song) => (
                  <div key={song.id} className="group/song-card relative ml-5 mr-5 mt-4">
                    <Link
                      to={`/player/${song.id}`}
                      className="block max-h-fit outline-none rounded-3xl focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 dark:focus-visible:ring-offset-zinc-900"
                    >
                      <SongBox song={song} className="pb-12" />
                    </Link>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        void handleDelete(song.id, song.title);
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
                  </div>
                ))}
              </MyGridContainer>
            )}
          </>
        )}
      </div>
      <div className="fixed left-0 right-0 bottom-20 sm:bottom-20 z-50 flex justify-center pointer-events-none px-5">
        <div className="pointer-events-auto w-full max-w-sm rounded-2xl border border-zinc-200/60 bg-white/50 px-3 py-3 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
          <PaginationBar page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </section>
  );
};

export default memo(Home);