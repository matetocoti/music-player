import { memo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNextPage, getPreviousPage } from "../../../utils/library";

interface PaginationBarProps {
  page: number;
  totalPages: number;
  setPage: (page: number | ((p: number) => number)) => void;
}

const PaginationBar = ({ page, totalPages, setPage }: PaginationBarProps) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-8">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => setPage(getPreviousPage(page))}
        disabled={page === 1}
        className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 shadow-sm transition-all duration-300 ease-out hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-200/80 disabled:hover:bg-white/70 disabled:hover:text-slate-500 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 dark:disabled:hover:border-slate-700/80 dark:disabled:hover:bg-slate-900/70 dark:disabled:hover:text-slate-300 sm:h-10 sm:w-10 sm:border-transparent sm:bg-transparent sm:text-slate-400 sm:shadow-none sm:opacity-100 sm:transition-colors sm:duration-500 sm:hover:text-emerald-500 sm:active:scale-100 sm:active:opacity-60 sm:disabled:hover:border-transparent sm:disabled:hover:bg-transparent sm:disabled:hover:text-slate-400"
      >
        <ArrowLeft className="h-4 w-4 transition-all duration-300 ease-out group-hover:-translate-x-0.5 sm:h-[18px] sm:w-[18px] sm:transition-all sm:duration-500 sm:group-hover:-translate-x-1 sm:group-hover:opacity-80" />
      </button>
      <span className="flex min-w-[4.5rem] items-center justify-center gap-1.5 rounded-full border border-slate-200/80 bg-white/75 px-3 py-1.5 text-xs font-semibold tabular-nums shadow-sm transition-all duration-300 dark:border-slate-700/80 dark:bg-slate-900/75 sm:min-w-24 sm:gap-2 sm:border-transparent sm:bg-transparent sm:px-4 sm:py-2 sm:text-sm sm:font-medium sm:tracking-wide sm:shadow-none">
        <span className="text-slate-900 dark:text-slate-100">{page}</span>
        <span className="text-slate-400 dark:text-slate-600">/</span>
        <span className="text-slate-500 dark:text-slate-400">{totalPages || 1}</span>
      </span>
      <button
        type="button"
        aria-label="Next page"
        onClick={() => setPage(getNextPage(page, totalPages))}
        disabled={page === totalPages || totalPages === 0}
        className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 shadow-sm transition-all duration-300 ease-out hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-200/80 disabled:hover:bg-white/70 disabled:hover:text-slate-500 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 dark:disabled:hover:border-slate-700/80 dark:disabled:hover:bg-slate-900/70 dark:disabled:hover:text-slate-300 sm:h-10 sm:w-10 sm:border-transparent sm:bg-transparent sm:text-slate-400 sm:shadow-none sm:opacity-100 sm:transition-colors sm:duration-500 sm:hover:text-emerald-500 sm:active:scale-100 sm:active:opacity-60 sm:disabled:hover:border-transparent sm:disabled:hover:bg-transparent sm:disabled:hover:text-slate-400"
      >
        <ArrowRight className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-0.5 sm:h-[18px] sm:w-[18px] sm:transition-all sm:duration-500 sm:group-hover:translate-x-1 sm:group-hover:opacity-80" />
      </button>
    </div>
  );
};

export default memo(PaginationBar);