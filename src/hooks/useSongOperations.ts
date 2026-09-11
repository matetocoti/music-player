import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import type { Song } from "../api/types";
import { useSongActions } from "./useSongActions";
import { getFormString } from "../utils/formDataValidation";

type DeleteTarget = Pick<Song, "id" | "title">;

const getSongFormData = (formData: FormData) => {
  const durationValue = getFormString(formData, "duration").trim();
  const duration = durationValue ? Number(durationValue) : undefined;

  return {
    title: getFormString(formData, "title"),
    artist: getFormString(formData, "artist"),
    album: getFormString(formData, "album").trim() || undefined,
    duration,
  };
};

const isInvalidDuration = (duration: number | undefined) =>
  duration !== undefined && (!Number.isFinite(duration) || duration < 0 || duration > 1440);

const showInvalidDurationToast = () => {
  toast.error("Invalid duration", {
    description: "Duration must be between 0 and 1440 minutes.",
  });
};

const useSongOperations = (reload: () => void) => {
  const { create, deleteSong, update, loading: actionLoading } = useSongActions();
  const [deletingSongId, setDeletingSongId] = useState<string | null>(null);
  const [songToDelete, setSongToDelete] = useState<DeleteTarget | null>(null);
  const [songToEdit, setSongToEdit] = useState<Song | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleDelete = async () => {
    if (!songToDelete) return;

    setDeletingSongId(songToDelete.id);
    const deleted = await deleteSong(songToDelete.id);
    if (deleted) {
      setSongToDelete(null);
      reload();
      toast.success(`Deleted "${songToDelete.title}"`);
    }
    setDeletingSongId(null);
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!songToEdit) return;

    const songData = getSongFormData(new FormData(event.currentTarget));
    if (isInvalidDuration(songData.duration)) {
      showInvalidDurationToast();
      return;
    }

    const updatedSong = await update(songToEdit.id, songData);
    if (updatedSong) {
      setSongToEdit(null);
      reload();
      toast.success(`"${updatedSong.title}" updated successfully`);
    }
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const songData = getSongFormData(new FormData(event.currentTarget));
    if (isInvalidDuration(songData.duration)) {
      showInvalidDurationToast();
      return;
    }

    const createdSong = await create(songData);
    if (createdSong) {
      setIsCreateModalOpen(false);
      reload();
      toast.success(`"${createdSong.title}" added successfully`);
    }
  };

  return {
    actionLoading,
    deletingSongId,
    songToDelete,
    songToEdit,
    isCreateModalOpen,
    setSongToDelete,
    setSongToEdit,
    setIsCreateModalOpen,
    handleDelete,
    handleUpdate,
    handleCreate,
  };
};

export default useSongOperations;
