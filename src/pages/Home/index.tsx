import { memo, useState } from "react";

import type { Song, SongOrderBy, SongOrderDirection } from "../../api/types";
import CreateSongModal from "../../components/Home/Modals/CreateSongModal";
import DeleteSongModal from "../../components/Home/Modals/DeleteSongModal";
import EditSongModal from "../../components/Home/Modals/EditSongModal";
import LibrarySettingsModal from "../../components/Home/Modals/LibrarySettingsModal";
import LibraryGrid from "../../components/Home/Sections/LibraryGrid";
import LibraryToolbar from "../../components/Home/Sections/LibraryToolbar";
import PaginationFooter from "../../components/Home/Pagination/PaginationFooter";
import usePersistedState from "../../hooks/usePersistedState";
import useResponsiveGridColumns, { getDefaultGridColumns, getDefaultPageSize } from "../../hooks/useResponsiveGridColumns";
import useSongOperations from "../../hooks/useSongOperations";
import useSongs from "../../hooks/useSongs";

const Home = () => {
  const maxGridColumns = useResponsiveGridColumns();
  const defaultGridColumns = getDefaultGridColumns(window.innerWidth);
  const defaultPageSize = getDefaultPageSize(window.innerWidth);
  const [search, setSearch] = usePersistedState("music-player-search", "");
  const [page, setPage] = usePersistedState("music-player-page", 1);
  const [pageSize, setPageSize] = usePersistedState("music-player-page-size", defaultPageSize);
  const [gridColumns, setGridColumns] = usePersistedState("music-player-grid-columns", defaultGridColumns);
  const [orderBy, setOrderBy] = usePersistedState<SongOrderBy>("music-player-order-by", "id");
  const [orderDirection, setOrderDirection] = usePersistedState<SongOrderDirection>("music-player-order-direction", "asc");
  const [isGridSettingsOpen, setIsGridSettingsOpen] = useState(false);
  const { songs, total, loading, error, reload } = useSongs(
    search,
    page,
    pageSize,
    orderBy,
    orderDirection,
  );
  const operations = useSongOperations(reload);
  const totalPages = Math.ceil(total / pageSize);
  const containerStyle = "flex h-full w-full flex-1 flex-col overflow-hidden gap-6 sm:gap-8 lg:gap-10 pb-48";

  const openDeleteModal = (song: Pick<Song, "id" | "title">) => {
    operations.setSongToDelete(song);
  };

  const resetLibraryDefaults = () => {
    setGridColumns(defaultGridColumns);
    setPageSize(defaultPageSize);
    setPage(1);
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
        onOpenSettings={() => setIsGridSettingsOpen(true)}
        totalSongs={total}
        orderBy={orderBy}
        orderDirection={orderDirection}
        onOrderByChange={(newOrderBy) => {
          setOrderBy(newOrderBy);
          if (newOrderBy === "id") {
            setOrderDirection("asc");
          }
          setPage(1);
        }}
        onOrderDirectionChange={(newOrderDirection) => {
          setOrderDirection(newOrderDirection);
          setPage(1);
        }}
      />

      <LibraryGrid
        songs={songs}
        loading={loading}
        error={error}
        deletingSongId={operations.deletingSongId}
        columns={Math.min(gridColumns, maxGridColumns)}
        onDeleteSong={openDeleteModal}
        onEditSong={operations.setSongToEdit}
      />

      <PaginationFooter
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
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
      <LibrarySettingsModal
        isOpen={isGridSettingsOpen}
        onClose={() => setIsGridSettingsOpen(false)}
        columns={gridColumns}
        pageSize={pageSize}
        onColumnsChange={setGridColumns}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(1);
        }}
        onResetDefaults={resetLibraryDefaults}
      />
    </section>
  );
};

export default memo(Home);
