import PaginationBar from "./pagination-components/PaginationBar";
import PaginationSelect from "./pagination-components/PaginationSelect";

interface PaginationFooterProps {
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number | ((currentPage: number) => number)) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PaginationFooter = ({
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationFooterProps) => (
  <div className="fixed bottom-20 left-0 right-0 z-50 pointer-events-none px-5 sm:bottom-20">
    <div className="relative flex w-full items-center justify-center">
      <div className="pointer-events-auto flex w-full max-w-sm items-center justify-center rounded-2xl border border-zinc-200/60 bg-white/50 px-3 py-3 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
        <PaginationBar page={page} totalPages={totalPages} setPage={onPageChange} />
      </div>
      <div className="pointer-events-auto absolute right-2 top-1/2 hidden -translate-y-1/2 sm:right-4 sm:block">
        <PaginationSelect pageSize={pageSize} onPageSizeChange={onPageSizeChange} />
      </div>
    </div>
  </div>
);

export default PaginationFooter;