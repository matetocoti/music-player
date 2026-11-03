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


const SURFACE =
  "border-stone-300/80 bg-stone-50/80 text-stone-600 shadow-[0_1px_2px_rgba(70,55,45,0.06)] dark:border-stone-700/70 dark:bg-stone-900/80 dark:text-stone-300";

const BUTTON_TONES = {
  neutral: `${SURFACE} focus-visible:ring-[#c7835a]/20 enabled:hover:border-[#c7835a]/60 enabled:hover:bg-[#c7835a]/10 enabled:hover:text-[#8e4f35] dark:enabled:hover:border-[#d59672]/60 dark:enabled:hover:text-[#e2a783]`,
  brandActive:
    "border-[#c7835a]/40 bg-[#c7835a]/10 text-[#8e4f35] shadow-[0_1px_2px_rgba(70,55,45,0.06)] focus-visible:ring-[#c7835a]/20 hover:border-[#c7835a]/60 hover:bg-[#c7835a]/20 dark:border-[#d59672]/40 dark:bg-[#d59672]/10 dark:text-[#e2a783]",
  accent:
    "border-[#a56345]/40 bg-[#a56345] text-white shadow-[0_4px_12px_-6px_rgba(70,55,45,0.45)] focus-visible:ring-[#c7835a]/30 hover:bg-[#8e4f35] hover:shadow-[0_6px_16px_-8px_rgba(70,55,45,0.55)] dark:border-[#d59672]/30 dark:bg-[#b87352] dark:text-stone-950 dark:hover:bg-[#d59672]",
  favorite: `${SURFACE} focus-visible:ring-[#c7835a]/20 hover:border-[#c7835a]/60 hover:bg-[#c7835a]/10 hover:text-[#8e4f35] dark:hover:border-[#d59672]/60 dark:hover:bg-[#d59672]/10 dark:hover:text-[#e2a783]`,
  favoriteActive:
    "border-[#c7835a]/50 bg-[#c7835a]/12 text-[#8e4f35] shadow-[0_1px_3px_rgba(70,55,45,0.12)] focus-visible:ring-[#c7835a]/20 hover:border-[#c7835a]/70 hover:bg-[#c7835a]/20 dark:border-[#d59672]/50 dark:bg-[#d59672]/10 dark:text-[#e2a783]",
} as const;

type ButtonTone = keyof typeof BUTTON_TONES;

const FIELD_BASE =
  "group flex h-12 min-w-0 items-center gap-2 rounded-2xl border px-3 text-xs font-bold transition-colors duration-200 focus-within:ring-4 focus-within:ring-[#c7835a]/15 sm:h-10 sm:rounded-xl";

const FIELD_IDLE = `${SURFACE} hover:border-[#c7835a]/60 focus-within:border-[#c7835a]/50 dark:hover:border-[#d59672]/60 dark:focus-within:border-[#d59672]/50`;

const FIELD_ACTIVE =
  "border-[#c7835a]/40 bg-[#c7835a]/10 text-[#8e4f35] shadow-[0_1px_2px_rgba(70,55,45,0.06)] hover:border-[#c7835a]/60 focus-within:border-[#c7835a]/60 dark:border-[#d59672]/40 dark:bg-[#d59672]/10 dark:text-[#e2a783]";

const TOGGLE_BASE =
  "group flex h-10 w-full items-center justify-center gap-2 rounded-xl border px-3 text-xs font-bold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c7835a]/20 sm:hidden";

const TOGGLE_IDLE = `${SURFACE} hover:border-[#c7835a]/50 hover:bg-[#c7835a]/10 hover:text-[#8e4f35] dark:hover:border-[#d59672]/50 dark:hover:text-[#e2a783]`;

const TOGGLE_ACTIVE =
  "border-[#c7835a]/40 bg-[#c7835a]/10 text-[#8e4f35] shadow-[0_1px_2px_rgba(70,55,45,0.06)] hover:bg-[#c7835a]/20 dark:border-[#d59672]/40 dark:bg-[#d59672]/10 dark:text-[#e2a783]";

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

interface FilterFieldProps {
  icon: ReactNode;
  active?: boolean;
  children: ReactNode;
}

const FilterField = ({ icon, active = false, children }: FilterFieldProps) => (
  <div className={`${FIELD_BASE} ${active ? FIELD_ACTIVE : FIELD_IDLE}`}>
    <span className="shrink-0 text-[#a56345] dark:text-[#d59672]" aria-hidden="true">
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
  const hasCategory = category !== "";
  const orderDirectionLabel = getOrderDirectionLabel(orderBy, orderDirection);
  const activeFilters = Number(hasCategory) + Number(favoritesOnly) + Number(!isDefaultOrder);

  const categoryOptions = useMemo(
    () => [ALL_CATEGORIES, ...categories.map((name) => ({ value: name, label: name }))],
    [categories],
  );

  const handleSortChange = (value: string) => {
    const option = SORT_OPTIONS.find((item) => item.value === value);
    if (option) onOrderByChange(option.value);
  };

  return (
    <div className="library-toolbar-stone relative isolate z-30 flex flex-col gap-3 rounded-xl border p-3 transition-colors duration-300 sm:gap-4 sm:rounded-2xl sm:p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]" aria-hidden="true">
        <div className="absolute -left-12 -top-20 h-44 w-72 rounded-full bg-[#c7835a]/10 blur-3xl dark:bg-[#d59672]/10" />
      </div>

      <div className="lg:shrink-0">
        <p className="font-label flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8e4f35] dark:text-[#d59672]">
          <span className="h-px w-5 bg-[#c7835a]/60" aria-hidden="true" />
          {'Discover'}
        </p>
        <h2 className="font-reading mt-0.5 text-lg font-semibold leading-snug text-zinc-900 sm:text-xl dark:text-zinc-100">
          Find your next{" "}
          <span className="bg-gradient-to-r from-[#8e4f35] to-[#b87352] bg-clip-text text-transparent dark:from-[#d59672] dark:to-[#e2a783]">
            favorite song
          </span>
        </h2>
        <p
          className="font-reading mt-2 inline-flex items-center gap-2 rounded-sm border border-[#c7835a]/20 bg-[#c7835a]/8 px-2.5 py-1 text-xs font-medium text-stone-600 dark:border-[#d59672]/20 dark:text-stone-300"
          aria-live="polite"
        >
          <span>
            <span className="font-bold tabular-nums text-zinc-900 dark:text-zinc-100">{totalSongs}</span>{" "}
            {totalSongs === 1 ? "item" : "items"} in your library
          </span>
        </p>
      </div>

      <span className="pointer-events-none absolute inset-0 -z-10 hidden rounded-[inherit] ring-1 ring-inset ring-[#c7835a]/15 sm:block" aria-hidden="true" />

      <div className="flex min-w-0 flex-col gap-2 sm:gap-3 lg:max-w-[820px] lg:flex-1 lg:items-end">
        <div className="w-full sm:max-w-[480px] lg:max-w-[600px]">
          <SearchBar search={search} onSearchChange={onSearchChange} />
        </div>

        <button
          type="button"
          onClick={() => setAreControlsOpen((isOpen) => !isOpen)}
          aria-expanded={areControlsOpen}
          aria-controls={controlsId}
          className={`${TOGGLE_BASE} ${activeFilters > 0 ? TOGGLE_ACTIVE : TOGGLE_IDLE}`}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          <span>Library controls</span>
          {activeFilters > 0 && (
            <span className="rounded-full bg-[#a56345] px-1.5 py-0.5 text-[10px] font-bold leading-none tabular-nums text-white dark:bg-[#d59672] dark:text-stone-950">
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
          className={`mobile-leather-compartment grid w-full rounded-xl transition-[grid-template-rows,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none max-sm:border max-sm:border-stone-700/80 max-sm:p-2 max-sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_-8px_20px_rgba(0,0,0,0.12)] sm:block ${
            areControlsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] max-sm:invisible max-sm:overflow-hidden"
          }`}
        >
          <div
          className={`library-toolbar-actions flex min-h-0 flex-wrap items-center gap-2 sm:justify-start sm:gap-3 lg:justify-end ${
              areControlsOpen ? "" : "max-sm:overflow-hidden"
            }`}
          >
            <div className="flex w-full gap-2 sm:contents">
              <FilterField icon={<Filter className="h-4 w-4" />} active={hasCategory}>
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
                active={!isDefaultOrder}
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
                tone={isDefaultOrder ? "neutral" : "brandActive"}
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

              <span
                className="mx-1 hidden h-6 w-px bg-gradient-to-b from-transparent via-stone-300 to-transparent sm:block dark:via-stone-600"
                aria-hidden="true"
              />

              <ToolbarButton label="Settings" onClick={onOpenSettings}>
                <Settings2 className={`h-5 w-5 ${ICON_SPRING} group-hover:rotate-90`} aria-hidden="true" />
              </ToolbarButton>

              <ToolbarButton
                label="Add song (metadata only)"
                tone="accent"
                onClick={onAddSong}
                className="add-song-button lg:w-auto lg:gap-2 lg:px-4"
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