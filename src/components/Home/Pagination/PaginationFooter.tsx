import PaginationBar from "../../pagination-components/PaginationBar";

interface PaginationFooterProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number | ((currentPage: number) => number)) => void;
}

const PaginationFooter = ({ page, totalPages, onPageChange }: PaginationFooterProps) => (
  <div className="pointer-events-none fixed bottom-20 left-0 right-0 z-50 px-5 sm:bottom-20">
    <div className="relative flex w-full items-center justify-center">
      <div className="pointer-events-auto flex w-full max-w-sm items-center justify-center rounded-2xl border border-zinc-200/60 bg-white/50 px-3 py-3 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
        <PaginationBar page={page} totalPages={totalPages} setPage={onPageChange} />
      </div>
    </div>
  </div>
);

export default PaginationFooter;
