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
        className="pointer-events-none absolute left-3.5 h-5 w-5 text-slate-400 dark:text-slate-500"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label={placeholder}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white/90 pl-11 pr-11 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
      />
      {search.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default memo(SearchBar);