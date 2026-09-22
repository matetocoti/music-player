import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PaginationBar from "../../pagination-components/PaginationBar";
import { ScrollToTop } from "../../UI/ScrollToTop";

interface PaginationFooterProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number | ((currentPage: number) => number)) => void;
}

const PaginationFooter = ({ page, totalPages, onPageChange }: PaginationFooterProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 640px)");

    const resetOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsCollapsed(false);
      }
    };

    desktopQuery.addEventListener("change", resetOnDesktop);
    return () => desktopQuery.removeEventListener("change", resetOnDesktop);
  }, []);

  return (
  <div className="pointer-events-none fixed bottom-16 left-0 right-0 z-50 px-3 sm:bottom-20 sm:px-5">
    <div className="relative flex min-h-14 w-full items-center justify-center">
      <button
        type="button"
        onClick={() => setIsCollapsed(false)}
        aria-label="Show pagination"
        className={`pointer-events-auto absolute left-0 flex h-10 w-10 items-center justify-center rounded-r-full border border-l-0 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden ${
          isCollapsed
            ? "translate-x-0 border-emerald-500/80 bg-emerald-100/95 text-emerald-700 opacity-100 shadow-[0_4px_18px_rgba(var(--brand-rgb),0.28)] dark:border-emerald-500/60 dark:bg-emerald-500/15 dark:text-emerald-400"
            : "-translate-x-4 border-zinc-300/70 bg-white/25 text-zinc-700 opacity-0 shadow-md dark:border-zinc-600/80 dark:bg-zinc-950/45 dark:text-zinc-200"
        }`}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className={`pointer-events-auto relative flex w-fit max-w-full items-center justify-center rounded-2xl border border-zinc-300/65 bg-white/30 px-2 py-2 shadow-xl backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:w-full sm:max-w-sm sm:translate-x-0 sm:px-3 sm:py-3 dark:border-zinc-600/75 dark:bg-zinc-950/65 ${
        isCollapsed ? "-translate-x-[calc(50vw+100%)] opacity-0" : "translate-x-0 opacity-100"
      }`}>
        <PaginationBar page={page} totalPages={totalPages} setPage={onPageChange} />
      </div>
      <ScrollToTop
        isCollapsed={isCollapsed}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2"
      />
      <button
        type="button"
        onClick={() => setIsCollapsed(true)}
        aria-label="Hide pagination"
        className={`pointer-events-auto absolute right-0 flex h-10 w-10 items-center justify-center rounded-l-full border border-r-0 border-zinc-400/70 bg-white/80 text-zinc-700 shadow-md backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden dark:border-zinc-600/80 dark:bg-zinc-950/45 dark:text-zinc-200 ${
          isCollapsed ? "translate-x-4 opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <ChevronLeft className="h-4 w-4 transition-transform duration-300 hover:-translate-x-0.5" aria-hidden="true" />
      </button>
    </div>
  </div>
  );
};

export default PaginationFooter;
