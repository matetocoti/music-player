import { forwardRef, type DetailsHTMLAttributes, type ReactNode } from "react";
import { ChevronDown ,Info } from "lucide-react";
import { memo } from "react";


interface DetailsProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "children"> {
  summary: ReactNode;
  children: ReactNode;
  summaryClassName?: string;
  contentClassName?: string;
}

const Details = forwardRef<HTMLDetailsElement, DetailsProps>(
  ({ summary, children, className = "", summaryClassName = "", contentClassName = "", ...props }, ref) => {
    return (
      <details
        ref={ref}
        className={`group rounded-t-lg border border-slate-200/30 bg-gray-30/3 ring-2 ring-emerald-400/20 focus:ring-2 focus:ring-emerald-700/10 ${className}`}
        {...props}
      >
        <summary
          
          className={`flex cursor-pointer select-none items-center justify-between rounded-2xl px-4 py-3 font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100/50 focus-visible:ring-2 focus-visible:ring-emerald-400 dark:text-slate-200 dark:hover:bg-slate-800/50 [&::-webkit-details-marker]:hidden ${summaryClassName}`}
        >
          <span className="flex items-center gap-2">
            <Info className="h-4 w-4 text-slate-400 yellow-700" />{summary}
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 ease-out group-open:rotate-180 group-open:text-emerald-500 dark:text-slate-500" />
        </summary>
        <div
          className={`border-t border-slate-200/70 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600 dark:border-slate-800/70 dark:text-slate-300 ${contentClassName}`}
        >
          {children}
        </div>
      </details>
    );
  }
);

Details.displayName = "Details";
export default memo(Details);