import { memo, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  search: string;
  onSearchChange: (newSearch: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  search,
  onSearchChange,
  placeholder = "Search by title or artist...",
  className = ""
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onSearchChange("");
    inputRef.current?.focus();
  };

  return (
        <div className={`library-search relative flex w-full max-w-xl items-center ${className}`.trim()}>
      <Search
            className="absolute left-3 h-4 w-4 text-[#a56345]/75 sm:left-3.5 sm:h-5 sm:w-5 dark:text-[#d59672]/75"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label={placeholder}
            className="font-reading h-10 w-full rounded-xl border border-stone-300/80 bg-stone-50/85 pl-9 pr-10 text-xs text-zinc-700 outline-none shadow-[0_4px_14px_rgba(70,55,45,0.06)] transition-all placeholder:text-zinc-400 hover:border-stone-400 focus:border-[#a56345] focus:ring-4 focus:ring-[#c7835a]/15 sm:h-12 sm:rounded-2xl sm:pl-11 sm:pr-11 sm:text-sm dark:border-stone-700/80 dark:bg-stone-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-[#d59672] dark:focus:ring-[#d59672]/15"
      />
      {search.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:right-2 sm:h-8 sm:w-8 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default memo(SearchBar);