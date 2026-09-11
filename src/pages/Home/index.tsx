import { memo, useState } from "react";

import type { Song } from "../../api/types";
import CreateSongModal from "../../components/CreateSongModal";
import DeleteSongModal from "../../components/DeleteSongModal";
import EditSongModal from "../../components/EditSongModal";
import LibraryGrid from "../../components/LibraryGrid";
import LibraryToolbar from "../../components/LibraryToolbar";
import PaginationFooter from "../../components/PaginationFooter";
import useSongOperations from "../../hooks/useSongOperations";
import useSongs from "../../hooks/useSongs";

const Home = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const { songs, total, loading, error, reload } = useSongs(search, page, pageSize);
  const operations = useSongOperations(reload);
  const totalPages = Math.ceil(total / pageSize);
  const containerStyle = "flex h-full w-full flex-1 flex-col overflow-hidden gap-6 sm:gap-8 lg:gap-10 pb-48";

  const openDeleteModal = (song: Pick<Song, "id" | "title">) => {
    operations.setSongToDelete(song);
  };

  return (
    <section className={`home-page ${containerStyle}`}>
      <LibraryToolbar
        search={search}
        onSearchChange={(newSearch) => {
          setSearch(newSearch);
          setPage(1);
        }}
        onAddSong={() => operations.setIsCreateModalOpen(true)}
      />

      <LibraryGrid
        songs={songs}
        loading={loading}
        error={error}
        deletingSongId={operations.deletingSongId}
        onDeleteSong={openDeleteModal}
        onEditSong={operations.setSongToEdit}
      />

      <PaginationFooter
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(1);
        }}
      />

      <DeleteSongModal
        isOpen={operations.songToDelete !== null}
        onClose={() => operations.setSongToDelete(null)}
        song={operations.songToDelete}
        onConfirm={() => void operations.handleDelete()}
        loading={operations.deletingSongId !== null}
      />
      <EditSongModal
        isOpen={operations.songToEdit !== null}
        onClose={() => operations.setSongToEdit(null)}
        song={operations.songToEdit}
        onSubmit={operations.handleUpdate}
        loading={operations.actionLoading}
      />
      <CreateSongModal
        isOpen={operations.isCreateModalOpen}
        onClose={() => operations.setIsCreateModalOpen(false)}
        onSubmit={operations.handleCreate}
        loading={operations.actionLoading}
      />
    </section>
  );
};

export default memo(Home);
