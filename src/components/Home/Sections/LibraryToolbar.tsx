import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownAZ, ChevronDown, Plus, Settings2, SlidersHorizontal } from "lucide-react";

import type { SongOrderBy, SongOrderDirection } from "../../../api/types";
import { getOrderDirectionLabel } from "../../../utils/library";
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
}: LibraryToolbarProps) => {
  const orderDirectionLabel = getOrderDirectionLabel(orderBy, orderDirection);
  const [areControlsOpen, setAreControlsOpen] = useState(true);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const sortOptions: Array<{ value: SongOrderBy; label: string }> = [
    { value: "id", label: "Default" },
    { value: "title", label: "Title" },
    { value: "artist", label: "Artist" },
    { value: "album", label: "Album" },
    { value: "duration", label: "Duration" },
  ];
  const selectedSortLabel = sortOptions.find((option) => option.value === orderBy)?.label ?? "Default";

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!sortMenuRef.current?.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
  <div className="relative z-30 flex flex-col gap-3 rounded-xl border border-zinc-200/60 bg-white/40 p-3 shadow-sm backdrop-blur-xl transition-all duration-500 dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:gap-4 sm:rounded-2xl sm:p-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="group cursor-default">
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 transition-colors duration-300 dark:text-emerald-500">
        Discover
      </p>
      <h2 className="text-base font-semibold tracking-tight text-zinc-900 transition-colors duration-300 sm:text-lg dark:text-zinc-100">
        Find your next favorite song
      </h2>
      <p className="mt-1 text-xs font-medium text-zinc-500 transition-colors duration-300 dark:text-zinc-400">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">{totalSongs}</span> {totalSongs === 1 ? "item" : "items"} in your library
      </p>
    </div>
    
    <div className="flex flex-wrap items-center justify-end gap-2 sm:w-[620px] sm:gap-3">
      <div className="min-w-0 basis-full transition-all duration-300 ease-out sm:flex-1 sm:basis-auto">
        <SearchBar search={search} onSearchChange={onSearchChange} />
      </div>

      <button
        type="button"
        onClick={() => setAreControlsOpen((isOpen) => !isOpen)}
        aria-expanded={areControlsOpen}
        aria-controls="library-toolbar-controls"
        className="group flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200/70 bg-white/60 px-3 text-xs font-bold text-zinc-500 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-500 sm:hidden dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-emerald-500/50 dark:hover:text-emerald-400"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        <span>Library controls</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${areControlsOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true" />
      </button>

      <div
        id="library-toolbar-controls"
        className={`grid w-full transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:contents ${areControlsOpen ? "grid-rows-[1fr] overflow-visible" : "grid-rows-[0fr] overflow-hidden"}`}
      >
        <div className={`flex min-h-0 flex-wrap gap-2 sm:contents ${areControlsOpen ? "overflow-visible" : "overflow-hidden"}`}>
        <label className="group flex h-12 items-center gap-2 rounded-2xl border border-zinc-200/70 bg-white/60 px-3 text-xs font-bold text-zinc-500 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:border-emerald-400/50 hover:bg-white/80 focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/10 dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-emerald-500/50 dark:hover:bg-zinc-800/80 dark:focus-within:border-emerald-500/50 dark:focus-within:ring-emerald-500/10">
        <ArrowDownAZ className="h-4 w-4 shrink-0 text-emerald-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" aria-hidden="true" />
        <span className="sr-only">Sort by</span>
        <div ref={sortMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsSortMenuOpen((isOpen) => !isOpen)}
            aria-expanded={isSortMenuOpen}
            aria-haspopup="listbox"
            aria-label="Sort by"
            className="flex max-w-28 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold text-emerald-700 outline-none transition-colors duration-200 hover:bg-emerald-500/10 focus-visible:ring-2 focus-visible:ring-emerald-500/25 dark:text-emerald-300 dark:hover:bg-emerald-500/15 dark:focus-visible:ring-emerald-400/25"
          >
            <span className="truncate">{selectedSortLabel}</span>
            <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${isSortMenuOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true" />
          </button>
          <div
            role="listbox"
            aria-label="Sort options"
            className={`absolute right-0 top-[calc(100%+0.5rem)] z-[60] min-w-32 origin-top-right rounded-xl border border-zinc-200/90 bg-white/95 p-1.5 text-left shadow-xl shadow-zinc-950/10 backdrop-blur-xl transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none dark:border-zinc-700/90 dark:bg-zinc-900/95 dark:shadow-black/40 ${isSortMenuOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"}`}
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === orderBy}
                onClick={() => {
                  onOrderByChange(option.value);
                  setIsSortMenuOpen(false);
                }}
                className={`flex w-full items-center rounded-lg px-2.5 py-2 text-xs font-medium transition-colors duration-150 ${option.value === orderBy ? "bg-emerald-500/12 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        </label>

        <button
        type="button"
        disabled={orderBy === "id"}
        onClick={() => onOrderDirectionChange(orderDirection === "asc" ? "desc" : "asc")}
        title={orderDirectionLabel}
        aria-label={orderDirectionLabel}
        className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/60 text-zinc-500 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:text-emerald-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:border-zinc-200/70 disabled:hover:bg-white/60 disabled:hover:text-zinc-500 dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-emerald-500/60 dark:hover:text-emerald-400 dark:disabled:hover:border-zinc-700/80 dark:disabled:hover:bg-zinc-800/50 dark:disabled:hover:text-zinc-400"
      >
        <ArrowDown
          className={`h-5 w-5 transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
            orderDirection === "asc" ? "rotate-180" : "rotate-0"
          } group-active:scale-90`}
        />
        </button>

        <button
        type="button"
        onClick={onOpenSettings}
        title="Settings"
        aria-label="Settings"
        className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/60 text-zinc-500 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:text-emerald-500 active:scale-95 dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-emerald-500/60 dark:hover:text-emerald-400"
      >
        <Settings2 className="h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-90" />
        </button>

        <button
        type="button"
        onClick={onAddSong}
        title="Add song (metadata only)"
        aria-label="Add song (metadata only)"
        className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-600 shadow-[0_0_15px_rgba(var(--brand-rgb),0.15)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:border-emerald-400/60 hover:bg-emerald-500/25 hover:text-emerald-500 hover:shadow-[0_0_25px_rgba(var(--brand-rgb),0.3)] active:scale-95 dark:text-emerald-300"
      >
        <Plus className="h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110" />
        </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LibraryToolbar;