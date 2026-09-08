import { memo, useState } from "react";
import { ChevronDown } from "lucide-react";

interface PaginationSelectProps {
  pageSize: number;
  onPageSizeChange: (newPageSize: number) => void;
}

const PaginationSelect = ({ pageSize, onPageSizeChange }: PaginationSelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="group relative inline-flex items-center rounded-full border border-zinc-300 bg-white/90 px-5 py-2.5 text-zinc-800 shadow-md shadow-zinc-400/20 backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-zinc-50 hover:shadow-lg focus-within:scale-[1.03] focus-within:border-emerald-400/70 focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.12)] dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-100 dark:shadow-none dark:hover:bg-zinc-800">
      <select
        value={pageSize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => onPageSizeChange(Number(event.target.value))}
        aria-label="Songs per page"
        title="Select the number of songs to display per page"
        className="appearance-none cursor-pointer bg-transparent pr-4 text-xs font-bold text-emerald-600 outline-none transition-colors duration-200 dark:text-emerald-400"
      >
        {[9, 12, 15, 18].map((size) => (
          <option 
            key={size} 
            value={size} 
            className="bg-white font-medium text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          >
            {size}
          </option>
        ))}
      </select>
      <ChevronDown
        className={`pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-emerald-400 transition-transform duration-300 ease-out ${
          isFocused ? "rotate-0" : "rotate-180"
        }`}
      />
    </div>
  );
};

export default memo(PaginationSelect);