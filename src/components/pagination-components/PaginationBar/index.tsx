import { memo } from "react";
import { ArrowLeft, ArrowRight, Music } from "lucide-react";
import { getNextPage, getPreviousPage } from "../../../utils/library";

interface PaginationBarProps {
  page: number;
  totalPages: number;
  setPage: (page: number | ((p: number) => number)) => void;
}

const PaginationBar = ({ page, totalPages, setPage }: PaginationBarProps) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => setPage(getPreviousPage(page))}
        disabled={page === 1}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 shadow-sm transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-200/80 disabled:hover:bg-white/70 disabled:hover:text-slate-500 sm:h-10 sm:w-10 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 dark:disabled:hover:border-slate-700/80 dark:disabled:hover:bg-slate-900/70 dark:disabled:hover:text-slate-300"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      <span className="flex min-w-[4.5rem] items-center justify-center gap-1 rounded-full border border-slate-200/80 bg-white/75 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-200 sm:min-w-24 sm:px-4 sm:py-2 sm:text-sm">
        {page} <Music className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {totalPages || 1}
      </span>

      <button
        type="button"
        aria-label="Next page"
        onClick={() => setPage(getNextPage(page, totalPages))}
        disabled={page === totalPages || totalPages === 0}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 shadow-sm transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-200/80 disabled:hover:bg-white/70 disabled:hover:text-slate-500 sm:h-10 sm:w-10 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 dark:disabled:hover:border-slate-700/80 dark:disabled:hover:bg-slate-900/70 dark:disabled:hover:text-slate-300"
      >
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

export default memo(PaginationBar);
