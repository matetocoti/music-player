import type { Song } from "../api/types";
import Modal from "./UI/Modal";

interface DeleteSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Pick<Song, "id" | "title"> | null;
  onConfirm: () => void;
  loading: boolean;
}

const DeleteSongModal = ({ isOpen, onClose, song, onConfirm, loading }: DeleteSongModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Delete song (Metadata only)">
    <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
      Are you sure you want to delete "{song?.title}" from your library?
    </p>
    <div className="mt-6 flex justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={loading || !song}
        className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-wait disabled:opacity-60"
      >
        Delete
      </button>
    </div>
  </Modal>
);

export default DeleteSongModal;