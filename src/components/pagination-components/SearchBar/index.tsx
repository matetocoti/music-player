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
    <div className={`relative flex w-full max-w-md items-center ${className}`}>
      <Search 
        className="absolute left-3.5 h-5 w-5 text-neutral-400 dark:text-neutral-500" 
        aria-hidden="true" 
      />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label={placeholder}
        className="h-12 w-full color-neutral-500 rounded-full border border-neutral-200 bg-neutral-50 pl-11 pr-11 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-blue-500  focus:ring-4 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20 text-neutral-500"
      />
      {search.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default memo(SearchBar);