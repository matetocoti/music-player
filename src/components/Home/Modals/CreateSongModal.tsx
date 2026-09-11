import type { FormEvent } from "react";

import Modal from "../../UI/Modal";
import SongForm from "../../SongForm";

interface CreateSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const CreateSongModal = ({ isOpen, onClose, onSubmit, loading }: CreateSongModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Add song (Metadata only)">
    <SongForm onSubmit={onSubmit} loading={loading} submitLabel="Save Song" />
  </Modal>
);

export default CreateSongModal;
