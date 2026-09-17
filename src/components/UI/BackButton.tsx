import { ArrowLeft } from "lucide-react";
import { memo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BackButtonProps {
  children?: ReactNode;
  fallbackTo?: string;
  className?: string;
  ariaLabel?: string;
}

const BackButton = ({
  children,
  fallbackTo = "/",
  className = "",
  ariaLabel,
}: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    try {
      const historyIndex = window.history.state?.idx;

      if (typeof historyIndex === "number" && historyIndex > 0) {
        navigate(-1);
      } else if (location.pathname !== fallbackTo) {
        navigate(fallbackTo);
      }
    } catch (error) {
      console.error("Error navigating to fallback page:", error);
      navigate(fallbackTo);
    }
  };

  const shapeClasses = children
    ? "gap-2 rounded-full px-4 py-2 text-xs sm:text-sm"
    : "h-9 w-9 rounded-full sm:h-10 sm:w-10";

  return (
    <button
      type="button"
      aria-label={ariaLabel || "Back"}
      title={ariaLabel || "Back"}
      onClick={handleClick}
      className={`group inline-flex shrink-0 cursor-pointer items-center justify-center border border-slate-200/80 bg-white/70 font-medium text-slate-600 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 sm:active:scale-100 sm:active:opacity-70 ${shapeClasses} ${className}`.trim()}
    >
      <ArrowLeft
        className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-0.5 sm:h-5 sm:w-5"
        aria-hidden="true"
      />
      {children && <span className="truncate">{children}</span>}
    </button>
  );
};

BackButton.displayName = "BackButton";

export default memo(BackButton);