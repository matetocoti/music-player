import { memo } from "react";
import { Cable } from "lucide-react";

interface PoweredProps {
  provider: string;
  url?: string;
}

const Powered = ({ provider, url }: PoweredProps) => {
  const providerStyle = "font-semibold text-slate-700 transition-all duration-300 dark:text-slate-200";
  const hoverStyle =
    "hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline decoration-emerald-500/40 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm hover:!rounded-sm active:scale-95 sm:active:scale-100 sm:active:opacity-70";

  return (
    <div className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200/70 bg-white/40 px-3 py-1.5 text-xs text-slate-500 shadow-sm backdrop-blur-md transition-all duration-300 sm:w-auto sm:justify-start sm:px-4 sm:py-2 dark:border-slate-800/70 dark:bg-slate-900/40 dark:text-slate-400">
      <Cable
        className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors duration-300 group-hover:text-emerald-500/70 dark:text-slate-500"
        aria-hidden="true"
      />
      <span>
        Powered by{" "}
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${providerStyle} ${hoverStyle}`}
          >
            {provider}
          </a>
        ) : (
          <span className={providerStyle}>{provider}</span>
        )}
      </span>
    </div>
  );
};

export default memo(Powered);