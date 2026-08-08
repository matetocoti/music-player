import { memo, type ReactNode, type HTMLAttributes } from "react";
import { Music2 } from "lucide-react";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  children?: ReactNode;
}

const Header = ({ title = "Music-Player", className = "", children, ...props }: HeaderProps) => {
  return (
    <header
      className={`bg-black/5 dark:bg-black/10 dark:border-white/10 pointer-events-none ${className}`.trim()}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-semibold text-white shadow-lg shadow-emerald-600/20">
            <Music2 className="h-6 w-6 stroke-2 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 opacity-80 animate-pulse">
              Music Player
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white px-2 frame-1 rounded-lg bg-gradient-to-r from-emerald-600/10 to-emerald-600/20 dark:from-emerald-400/10 dark:to-emerald-400/20">
              {title}
            </h1>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
};

export default memo(Header);