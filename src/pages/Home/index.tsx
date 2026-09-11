import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle, Plus, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";

import MyGridContainer from "../../components/MyGridContainer";
import SongBox from "../../components/SongBox";
import useSongs from "../../hooks/useSongs";
import SearchBar from "../../components/pagination-components/SearchBar";
import PaginationBar from "../../components/pagination-components/PaginationBar";
import  PaginationSelect  from "../../components/pagination-components/PaginationSelect";
import { useSongActions } from "../../hooks/useSongActions";
import Modal from "../../components/UI/Modal";
import SongForm from "../../components/SongForm";
import type { Song } from "../../api/types";
import { getFormString ,formatDurationForForm } from "../../utils/formDataValidation";

const Home = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [deletingSongId, setDeletingSongId] = useState<string | null>(null);
  const [songToDelete, setSongToDelete] = useState<{ id: string; title: string } | null>(null);
  const [songToEdit, setSongToEdit] = useState<Song | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { songs, total, loading, error, reload } = useSongs(search, page, pageSize);
  const { create, deleteSong, update, loading: actionLoading } = useSongActions();
  const totalPages = Math.ceil(total / pageSize);
  const containerStyle = "flex h-full w-full flex-1 flex-col overflow-hidden gap-6 sm:gap-8 lg:gap-10 pb-48";

  const handleDelete = async (songId: string, title: string) => {
    setDeletingSongId(songId);
    const deleted = await deleteSong(songId);
    if (deleted) {
      reload();
      toast.success(`Deleted "${title}"`);
    }
    setDeletingSongId(null);
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!songToEdit) return;

    const formData = new FormData(event.currentTarget);
    const durationValue = getFormString(formData, "duration").trim();
    const duration = durationValue ? Number(durationValue) : undefined;

    if (duration !== undefined && (!Number.isFinite(duration) || duration < 0 || duration > 1440)) {
      toast.error("Invalid duration", {
        description: "Duration must be between 0 and 1440 minutes.",
      });
      return;
    }

    const updatedSong = await update(songToEdit.id, {
      title: getFormString(formData, "title"),
      artist: getFormString(formData, "artist"),
      album: getFormString(formData, "album").trim() || undefined,
      duration,
    });

    if (updatedSong) {
      setSongToEdit(null);
      reload();
      toast.success(`"${updatedSong.title}" updated successfully`);
    }
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const durationValue = getFormString(formData, "duration").trim();
    const duration = durationValue ? Number(durationValue) : undefined;

    if (duration !== undefined && (!Number.isFinite(duration) || duration < 0 || duration > 1440)) {
      toast.error("Invalid duration", {
        description: "Duration must be between 0 and 1440 minutes.",
      });
      return;
    }

    const createdSong = await create({
      title: getFormString(formData, "title"),
      artist: getFormString(formData, "artist"),
      album: getFormString(formData, "album").trim() || undefined,
      duration,
    });

    if (createdSong) {
      setIsCreateModalOpen(false);
      reload();
      toast.success(`"${createdSong.title}" added successfully`);
    }
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
            onClick={() => setIsCreateModalOpen(true)}
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
                        setSongToDelete({ id: song.id, title: song.title });
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
                        setSongToEdit(song);
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
          </>
        )}
      </div>
      <div className="fixed bottom-20 left-0 right-0 z-50 pointer-events-none px-5 sm:bottom-20">
        <div className="relative flex w-full items-center justify-center">
          <div className="pointer-events-auto flex w-full max-w-sm items-center justify-center rounded-2xl border border-zinc-200/60 bg-white/50 px-3 py-3 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
            <PaginationBar page={page} totalPages={totalPages} setPage={setPage} />
          </div>
          <div className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 hidden sm:block sm:right-4">
            <PaginationSelect
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => {
                setPageSize(newPageSize);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={songToDelete !== null}
        onClose={() => setSongToDelete(null)}
        title="Delete song(Metadata only)"
      >
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Are you sure you want to delete "{songToDelete?.title}" from your library?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setSongToDelete(null)}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (!songToDelete) return;
              const song = songToDelete;
              setSongToDelete(null);
              void handleDelete(song.id, song.title);
            }}
            className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-wait disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={songToEdit !== null}
        onClose={() => setSongToEdit(null)}
        title="Edit song(Metadata only)"
      >
        {songToEdit && (
          <SongForm
            key={songToEdit.id}
            onSubmit={handleUpdate}
            loading={actionLoading}
            submitLabel="Update Song"
            initialValues={{
              title: songToEdit.title,
              artist: songToEdit.artist,
              album: songToEdit.album === "Unknown Album" ? "" : songToEdit.album,
              duration: formatDurationForForm(songToEdit.duration),
            }}
          />
        )}
      </Modal>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add song (Metadata only)"
      >
        <SongForm
          onSubmit={handleCreate}
          loading={actionLoading}
          submitLabel="Save Song"
        />
      </Modal>
    </section>
  );
};

export default memo(Home);