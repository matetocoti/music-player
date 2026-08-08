import { memo } from "react";
import {ArrowBigLeft, ArrowBigRight ,Music} from "lucide-react";

interface PaginationBarProps {
  page: number;
  totalPages: number;
  setPage: (page: number | ((p: number) => number)) => void;
}

const PaginationBar = ({ page, totalPages, setPage }: PaginationBarProps) => {
  return (
    <div className="flex items-center justify-center gap-3 ">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-emerald-400 hover:text-emerald-600  disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 cursor-pointer"
      >
        <ArrowBigLeft size={20} />
      </button>

      <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 flex items-center gap-1">
        {page} <Music size={16} /> {totalPages || 1}
      </span>

      <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages || totalPages === 0}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-emerald-400 hover:text-emerald-600  disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 cursor-pointer"
      >
        <ArrowBigRight size={20} />
      </button>
    </div>
  );
};

export default memo(PaginationBar);
