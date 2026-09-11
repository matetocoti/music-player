import { Plus, Settings2 } from "lucide-react";

import SearchBar from "../../pagination-components/SearchBar";

interface LibraryToolbarProps {
  search: string;
  onSearchChange: (search: string) => void;
  onAddSong: () => void;
  onOpenSettings: () => void;
}

const LibraryToolbar = ({ search, onSearchChange, onAddSong, onOpenSettings }: LibraryToolbarProps) => (
  <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">Discover</p>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Find your next favorite song</h2>
    </div>
    <div className="flex items-center gap-3 sm:w-[520px]">
      <div className="min-w-0 flex-1">
        <SearchBar search={search} onSearchChange={onSearchChange} />
      </div>
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
