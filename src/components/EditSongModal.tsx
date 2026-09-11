import type { FormEvent } from "react";

import type { Song } from "../api/types";
import { formatDurationForForm } from "../utils/formDataValidation";
import Modal from "./UI/Modal";
import SongForm from "./SongForm";

interface EditSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const EditSongModal = ({ isOpen, onClose, song, onSubmit, loading }: EditSongModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Edit song (Metadata only)">
    {song && (
      <SongForm
        key={song.id}
        onSubmit={onSubmit}
        loading={loading}
        submitLabel="Update Song"
        initialValues={{
          title: song.title,
          artist: song.artist,
          album: song.album === "Unknown Album" ? "" : song.album,
          duration: formatDurationForForm(song.duration),
        }}
      />
    )}
  </Modal>
);

export default EditSongModal;
