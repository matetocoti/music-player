import { useState, type FormEvent } from "react";
import { FileUp, Save } from "lucide-react";

import Modal from "../../UI/Modal";
import SongForm from "../../SongForm";

interface CreateSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const CreateSongModal = ({ isOpen, onClose, onSubmit, loading }: CreateSongModalProps) => (
  <CreateSongModalContent isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} loading={loading} />
);

const CreateSongModalContent = ({ isOpen, onClose, onSubmit, loading }: CreateSongModalProps) => {
  const [isCsvImport, setIsCsvImport] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isCsvImport ? "Import songs" : "Add song (Metadata only)"}
      headerAction={
        <button
          type="button"
          onClick={() => setIsCsvImport((current) => !current)}
          disabled={loading}
          aria-label={isCsvImport ? "Switch to manual song form" : "Import songs from CSV"}
          title={isCsvImport ? "Switch to manual song form" : "Import songs from CSV"}
          className="flex h-7 w-7 items-center justify-center rounded border border-transparent text-zinc-500 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-600 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:hover:text-emerald-400"
        >
          {isCsvImport ? <Save className="h-4 w-4" aria-hidden="true" /> : <FileUp className="h-4 w-4" aria-hidden="true" />}
        </button>
      }
    >
      <SongForm
        onSubmit={onSubmit}
        loading={loading}
        submitLabel="Save Song"
        isCsvImport={isCsvImport}
      />
    </Modal>
  );
};

export default CreateSongModal;
