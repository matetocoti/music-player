import { memo, type ReactNode, type HTMLAttributes } from "react";
import { AudioLines } from "lucide-react";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  children?: ReactNode;
}

const Header = ({ title = "Agnostic Engine", className = "", children, ...props }: HeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/40 px-4 py-3 backdrop-blur-2xl transition-all duration-500 dark:border-zinc-800/50 dark:bg-zinc-950/40 sm:px-6 sm:py-4 lg:px-8 ${className}`.trim()}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 sm:gap-6">
        <div className="group flex min-w-0 cursor-default items-center gap-3 sm:gap-5">

          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-white/80 to-zinc-100/50 shadow-sm backdrop-blur-md transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-md dark:border-zinc-700/80 dark:from-zinc-800/80 dark:to-zinc-900/50 sm:h-12 sm:w-12 sm:transition-all sm:duration-700 sm:group-hover:scale-[1.03]">

            <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100 dark:bg-emerald-400/10 sm:duration-700" aria-hidden="true" />

            <AudioLines
              className="relative z-10 h-5 w-5 text-zinc-600 transition-all duration-500 ease-out group-hover:-rotate-12 group-hover:text-emerald-500 dark:text-zinc-400 dark:group-hover:text-emerald-400 sm:h-6 sm:w-6 sm:duration-700 sm:group-hover:-rotate-6"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-300 group-hover:text-emerald-600 dark:text-zinc-400 dark:group-hover:text-emerald-500 sm:text-xs">
              Library
            </p>
            <h1 className="truncate text-base font-extrabold tracking-tight text-zinc-900 transition-colors duration-300 dark:text-zinc-50 sm:text-xl sm:font-bold">
              {title}
            </h1>
          </div>
        </div>

        {children && (
          <div className="flex shrink-0 items-center justify-end">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};

export default memo(Header);