import { memo } from "react";
import "./PaginationBar.css";

interface PaginationBarProps {
    page: number;
    totalPages: number;
    setPage: (page: number | ((p: number) => number)) => void;
}

const PaginationBar = ({ page, totalPages, setPage }: PaginationBarProps) => {
    return (
        <div className="pagination-bar">
            <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
            >
                {"\u2190"}
            </button>

            <span className="pagination-info">
                {page} - {totalPages}
            </span>

            <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
            >
                {"\u2192"}
            </button>
        </div>
    );
};

export default memo(PaginationBar);

