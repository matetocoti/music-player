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
    <div className={`relative flex w-full max-w-xl items-center ${className}`.trim()}>
      <Search
        className="pointer-events-none absolute left-3 h-4 w-4 text-zinc-400 sm:left-3.5 sm:h-5 sm:w-5 dark:text-zinc-500"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label={placeholder}
        className="h-10 w-full rounded-2xl border border-zinc-200/80 bg-white/90 pl-9 pr-10 text-xs text-zinc-700 outline-none transition-all placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 sm:h-12 sm:pl-11 sm:pr-11 sm:text-sm dark:border-zinc-800/80 dark:bg-zinc-600/80 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:border-emerald-500/50 dark:focus:ring-emerald-500/20"
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