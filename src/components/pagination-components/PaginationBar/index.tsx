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
        <div className="pagination-bar flex items-center justify-center gap-2 sm:gap-8">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => setPage(getPreviousPage(page))}
        disabled={page === 1}
            className="pagination-bar__button group flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-stone-500 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#8e4f35] active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:text-stone-500 dark:text-stone-300 dark:hover:text-[#e2a783] sm:h-10 sm:w-10 sm:active:scale-100"
      >
        <ArrowLeft className="h-4 w-4 transition-all duration-300 ease-out group-hover:-translate-x-0.5 sm:h-[18px] sm:w-[18px] sm:transition-all sm:duration-500 sm:group-hover:-translate-x-1 sm:group-hover:opacity-80" />
        <span className="pagination-action-label">Previous</span>
      </button>
      <span className="pagination-bar__status font-reading flex min-w-[5.5rem] items-center justify-center gap-1.5 rounded-xl px-3 py-1.5 text-xs tabular-nums sm:min-w-24 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
        <span className="pagination-page-label">Page</span>
        <span className="font-semibold text-stone-900 dark:text-stone-100">{page}</span>
        <span className="text-stone-400 dark:text-stone-600">/</span>
        <span className="text-stone-500 dark:text-stone-400">{totalPages || 1}</span>
      </span>
      <button
        type="button"
        aria-label="Next page"
        onClick={() => setPage(getNextPage(page, totalPages))}
        disabled={page === totalPages || totalPages === 0}
            className="pagination-bar__button group flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-stone-500 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#8e4f35] active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:text-stone-500 dark:text-stone-300 dark:hover:text-[#e2a783] sm:h-10 sm:w-10 sm:active:scale-100"
      >
        <span className="pagination-action-label">Next</span>
        <ArrowRight className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-0.5 sm:h-[18px] sm:w-[18px] sm:transition-all sm:duration-500 sm:group-hover:translate-x-1 sm:group-hover:opacity-80" />
      </button>
    </div>
  );
};

export default memo(PaginationBar);