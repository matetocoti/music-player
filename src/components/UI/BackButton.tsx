import { ArrowLeft } from "lucide-react";
import { memo, useCallback, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type BackButtonVariant = "paper" | "plate";

interface BackButtonProps {
  children?: ReactNode;
  fallbackTo?: string;
  className?: string;
  ariaLabel?: string;
  variant?: BackButtonVariant;
}


const BASE =
  "group inline-flex shrink-0 cursor-pointer items-center justify-center border font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 active:translate-y-px";

const TONES: Record<BackButtonVariant, string> = {
  paper:
    "border-stone-300 bg-[#fbf5ea] text-stone-700 shadow-[0_2px_0_rgba(110,80,55,0.22),inset_0_1px_0_rgba(255,255,255,0.8)] hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:ring-emerald-600 active:shadow-[inset_0_1px_2px_rgba(110,80,55,0.25)] dark:border-stone-600 dark:bg-stone-900 dark:text-stone-300 dark:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:border-emerald-400 dark:hover:bg-stone-800 dark:hover:text-emerald-300 dark:focus-visible:ring-emerald-400",
  plate:
    "border-[#e8b27c]/45 bg-[#2a170d]/70 text-[#f3d9b8] shadow-[inset_0_1px_0_rgba(255,225,190,0.2)] hover:bg-[#e8b27c] hover:text-[#2a170d] focus-visible:ring-[#ffd9a8] active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]",
};

const SHAPES: Record<BackButtonVariant, { icon: string; label: string }> = {
  paper: { icon: "h-9 w-9 rounded-full sm:h-10 sm:w-10", label: "gap-2 rounded-full px-4 py-2 text-xs sm:text-sm" },
  plate: { icon: "h-11 w-11 rounded-full", label: "gap-2 rounded-full px-4 py-2.5 text-sm" },
};

const BackButton = ({ children, fallbackTo = "/", className = "", ariaLabel, variant = "paper" }: BackButtonProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = useCallback(() => {
    const historyIndex = window.history.state?.idx;

    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
    } else if (pathname !== fallbackTo) {
      navigate(fallbackTo);
    }
  }, [navigate, pathname, fallbackTo]);

  const hasLabel = Boolean(children);
  const shape = hasLabel ? SHAPES[variant].label : SHAPES[variant].icon;
  const iconOnlyLabel = ariaLabel || "Back";

  return (
    <button
      type="button"
      
      aria-label={hasLabel ? undefined : iconOnlyLabel}
      title={hasLabel ? undefined : iconOnlyLabel}
      onClick={handleClick}
      className={`${BASE} ${TONES[variant]} ${shape} ${className}`.trim()}
    >
      <ArrowLeft
        className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5 sm:h-5 sm:w-5"
        aria-hidden="true"
      />
      {hasLabel && <span className="truncate font-label tracking-wider">{children}</span>}
    </button>
  );
};

BackButton.displayName = "BackButton";

export default memo(BackButton);