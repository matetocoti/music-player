import { useId, useMemo, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowDown, ArrowDownAZ, ChevronDown, Filter, Plus, Settings2, SlidersHorizontal, Star } from "lucide-react";

import type { SongOrderBy, SongOrderDirection } from "../../../api/types";
import { getOrderDirectionLabel } from "../../../utils/library";
import SearchBar from "../../pagination-components/SearchBar";
import Select from "../../UI/Select";



const SORT_OPTIONS: Array<{ value: SongOrderBy; label: string }> = [
  { value: "id", label: "Default" },
  { value: "title", label: "Title" },
  { value: "artist", label: "Artist" },
  { value: "album", label: "Album" },
  { value: "duration", label: "Duration" },
];

const ALL_CATEGORIES = { value: "", label: "All categories" };


const ICON_SPRING =
  "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none";


const BUTTON_TONES = {
  neutral:
    "border-zinc-200/80 bg-white text-zinc-500 shadow-sm focus-visible:ring-emerald-500/20 enabled:hover:border-emerald-400/60 enabled:hover:bg-emerald-500/10 enabled:hover:text-emerald-600 dark:border-zinc-700/80 dark:bg-zinc-800/90 dark:text-zinc-400 dark:enabled:hover:border-emerald-500/60 dark:enabled:hover:text-emerald-400",
  accent:
    "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 shadow-[0_0_15px_rgba(var(--brand-rgb),0.15)] focus-visible:ring-emerald-500/25 hover:border-emerald-500/60 hover:bg-emerald-500/25 hover:shadow-[0_0_25px_rgba(var(--brand-rgb),0.3)] dark:text-emerald-300",
  favorite:
    "border-zinc-200/80 bg-white text-zinc-500 shadow-sm focus-visible:ring-amber-500/20 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 dark:border-zinc-700/80 dark:bg-zinc-800/90 dark:text-zinc-400 dark:hover:border-amber-500/60 dark:hover:bg-amber-950/30 dark:hover:text-amber-300",
  favoriteActive:
    "border-amber-400 bg-amber-400/20 text-amber-600 shadow-[0_0_18px_rgba(245,158,11,0.3)] focus-visible:ring-amber-500/20 dark:border-amber-400/80 dark:text-amber-300",
} as const;

type ButtonTone = keyof typeof BUTTON_TONES;



interface ToolbarButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title" | "aria-label" | "className"> {
  label: string;
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
}


const ToolbarButton = ({ label, tone = "neutral", className = "", children, ...props }: ToolbarButtonProps) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    className={`group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10 sm:rounded-xl sm:active:scale-100 sm:active:opacity-70 ${BUTTON_TONES[tone]} ${className}`}
    {...props}
  >
    {children}
  </button>
);


const FilterField = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <div className="group flex h-12 min-w-0 items-center gap-2 rounded-2xl border border-zinc-200/80 bg-white px-3 text-xs font-bold text-zinc-500 shadow-sm transition-colors duration-200 focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/10 hover:border-emerald-400/60 sm:h-10 sm:rounded-xl dark:border-zinc-700/80 dark:bg-zinc-800/90 dark:text-zinc-400 dark:hover:border-emerald-500/60 dark:focus-within:border-emerald-500/50">
    <span className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true">
      {icon}
    </span>
    {children}
  </div>
);



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
  category: string;
  favoritesOnly: boolean;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onFavoritesChange: (favoritesOnly: boolean) => void;
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
  category,
  favoritesOnly,
  categories,
  onCategoryChange,
  onFavoritesChange,
}: LibraryToolbarProps) => {
  const controlsId = useId();
  const [areControlsOpen, setAreControlsOpen] = useState(true);

  const isDefaultOrder = orderBy === "id";
  const orderDirectionLabel = getOrderDirectionLabel(orderBy, orderDirection);
  
  const activeFilters = Number(Boolean(category)) + Number(favoritesOnly) + Number(!isDefaultOrder);

  const categoryOptions = useMemo(
    () => [ALL_CATEGORIES, ...categories.map((name) => ({ value: name, label: name }))],
    [categories],
  );

  
  const handleSortChange = (value: string) => {
    const option = SORT_OPTIONS.find((item) => item.value === value);
    if (option) onOrderByChange(option.value);
  };

  return (
    <div className="relative z-30 flex flex-col gap-3 rounded-xl border border-zinc-200/80 bg-zinc-100/80 p-3 shadow-[0_5px_18px_rgba(24,24,27,0.06)] transition-all duration-500 sm:gap-4 sm:rounded-2xl sm:p-4 sm:shadow-[0_2px_12px_rgba(24,24,27,0.04)] lg:flex-row lg:items-center lg:justify-between dark:border-zinc-800/60 dark:bg-zinc-900/85">
      
      <div className="lg:shrink-0">
        <p className="font-label text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Discover
        </p>
        <h2 className="font-reading text-lg font-semibold leading-snug text-zinc-900 sm:text-xl dark:text-zinc-100">
          Find your next favorite song
        </h2>
        <p
          className="font-reading mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400"
          aria-live="polite"
        >
          <span className="font-bold tabular-nums text-zinc-700 dark:text-zinc-300">{totalSongs}</span>{" "}
          {totalSongs === 1 ? "item" : "items"} in your library
        </p>
      </div>

      <div className="flex min-w-0 flex-col gap-2 sm:gap-3 lg:max-w-[820px] lg:flex-1 lg:items-end">
        <div className="w-full sm:max-w-[480px] lg:max-w-[600px]">
          <SearchBar search={search} onSearchChange={onSearchChange} />
        </div>

        
        <button
          type="button"
          onClick={() => setAreControlsOpen((isOpen) => !isOpen)}
          aria-expanded={areControlsOpen}
          aria-controls={controlsId}
          className="group flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200/80 bg-white px-3 text-xs font-bold text-zinc-500 shadow-sm transition-all duration-300 ease-out hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20 sm:hidden dark:border-zinc-700/80 dark:bg-zinc-800/90 dark:text-zinc-400 dark:hover:border-emerald-500/50 dark:hover:text-emerald-400"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          <span>Library controls</span>
          {activeFilters > 0 && (
            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold leading-none tabular-nums text-emerald-700 dark:text-emerald-300">
              {activeFilters}
              <span className="sr-only"> active</span>
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 ${ICON_SPRING} ${areControlsOpen ? "rotate-180" : "rotate-0"}`}
            aria-hidden="true"
          />
        </button>

        
        <div
          id={controlsId}
          className={`grid w-full transition-[grid-template-rows,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:block ${
            areControlsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] max-sm:invisible max-sm:overflow-hidden"
          }`}
        >
          <div
            className={`flex min-h-0 flex-wrap items-center gap-2 sm:justify-start sm:gap-3 lg:justify-end ${
              areControlsOpen ? "" : "max-sm:overflow-hidden"
            }`}
          >
            
            <div className="flex w-full gap-2 sm:contents">
              <FilterField icon={<Filter className="h-4 w-4" />}>
                <Select
                  value={category}
                  options={categoryOptions}
                  onChange={onCategoryChange}
                  ariaLabel="Filter by category"
                  className="max-w-32"
                  menuClassName="left-0 right-auto min-w-40"
                />
              </FilterField>

              <FilterField
                icon={
                  <ArrowDownAZ className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 motion-reduce:transition-none" />
                }
              >
                <Select
                  value={orderBy}
                  options={SORT_OPTIONS}
                  onChange={handleSortChange}
                  ariaLabel="Sort by"
                  className="max-w-28"
                  menuClassName="min-w-36"
                />
              </FilterField>
            </div>

           
            <div className="flex w-full justify-start gap-2 sm:contents">
              <ToolbarButton
                label={favoritesOnly ? "Showing favorite songs" : "Show favorite songs"}
                tone={favoritesOnly ? "favoriteActive" : "favorite"}
                aria-pressed={favoritesOnly}
                onClick={() => onFavoritesChange(!favoritesOnly)}
              >
                <Star
                  className={`h-4 w-4 transition-all duration-300 ${
                    favoritesOnly ? "scale-110 fill-current" : "group-hover:scale-110"
                  }`}
                  aria-hidden="true"
                />
              </ToolbarButton>

              <ToolbarButton
                label={orderDirectionLabel}
                disabled={isDefaultOrder}
                onClick={() => onOrderDirectionChange(orderDirection === "asc" ? "desc" : "asc")}
              >
                <ArrowDown
                  className={`h-5 w-5 transform-gpu ${ICON_SPRING} group-active:scale-90 ${
                    orderDirection === "asc" ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                />
              </ToolbarButton>

              
              <span className="mx-1 hidden h-6 w-px bg-zinc-200 sm:block dark:bg-zinc-700" aria-hidden="true" />

              <ToolbarButton label="Settings" onClick={onOpenSettings}>
                <Settings2 className={`h-5 w-5 ${ICON_SPRING} group-hover:rotate-90`} aria-hidden="true" />
              </ToolbarButton>

              
              <ToolbarButton
                label="Add song (metadata only)"
                tone="accent"
                onClick={onAddSong}
                className="lg:w-auto lg:gap-2 lg:px-4"
              >
                <Plus
                  className="h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <span className="hidden text-xs font-bold lg:inline">Add song</span>
              </ToolbarButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryToolbar;