import { ArrowDown, ArrowDownAZ, ArrowUp, Plus, Settings2 } from "lucide-react";

import type { SongOrderBy, SongOrderDirection } from "../../../api/types";
import SearchBar from "../../pagination-components/SearchBar";

interface LibraryToolbarProps {
  search: string;
  onSearchChange: (search: string) => void;
  onAddSong: () => void;
  onOpenSettings: () => void;
  totalSongs: number;
  orderBy: SongOrderBy;
  orderDirection: SongOrderDirection;
  onOrderByChange: (orderBy: SongOrderBy) => void;
  onOrderDirectionChange: (orderDirection: SongOrderDirection) => void;
}

const LibraryToolbar = ({
  search,
  onSearchChange,
  onAddSong,
  onOpenSettings,
  totalSongs,
  orderBy,
  orderDirection,
  onOrderByChange,
  onOrderDirectionChange,
}: LibraryToolbarProps) => (
  <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">Discover</p>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Find your next favorite song</h2>
      <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {totalSongs} {totalSongs === 1 ? "item" : "items"} in your library
      </p>
    </div>
    <div className="flex flex-wrap items-center justify-end gap-3 sm:w-[620px]">
      <div className="min-w-0 flex-1">
        <SearchBar search={search} onSearchChange={onSearchChange} />
      </div>
      <label className="flex h-12 items-center gap-2 rounded-2xl border border-zinc-200/70 bg-white/60 px-3 text-xs font-bold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
        <ArrowDownAZ className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
        <span className="sr-only">Sort by</span>
        <select
          value={orderBy}
          onChange={(event) => onOrderByChange(event.target.value as SongOrderBy)}
          aria-label="Sort by"
          className="max-w-24 cursor-pointer bg-transparent text-xs font-bold text-emerald-600 outline-none dark:text-emerald-400"
        >
          <option value="id">Default</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="duration">Duration</option>
        </select>
      </label>
      <button
        type="button"
        disabled={orderBy === "id"}
        onClick={() => onOrderDirectionChange(orderDirection === "asc" ? "desc" : "asc")}
        title={orderBy === "id" ? "Default order" : orderDirection === "asc" ? "Ascending order" : "Descending order"}
        aria-label={orderBy === "id" ? "Default order" : orderDirection === "asc" ? "Ascending order" : "Descending order"}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/60 text-zinc-500 transition hover:scale-[1.02] hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:text-emerald-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:border-zinc-200/70 disabled:hover:bg-white/60 disabled:hover:text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-emerald-500/60 dark:hover:text-emerald-400 dark:disabled:hover:border-zinc-700 dark:disabled:hover:bg-zinc-900/60 dark:disabled:hover:text-zinc-400"
      >
        {orderDirection === "asc" ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
      </button>
      <button
        type="button"
        onClick={onOpenSettings}
        title="Settings"
        aria-label="Settings"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/60 text-zinc-500 transition hover:scale-[1.02] hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:text-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-emerald-500/60 dark:hover:text-emerald-400"
      >
        <Settings2 className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={onAddSong}
        title="Add song(metadata only)"
        aria-label="Add song(metadata only)"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/15 text-emerald-300 transition hover:scale-[1.02] hover:bg-emerald-500/25"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  </div>
);

export default LibraryToolbar;
