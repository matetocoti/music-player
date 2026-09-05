import { memo, type ReactNode, type HTMLAttributes } from "react";
import { Music2 } from "lucide-react";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  children?: ReactNode;
}

const Header = ({ title = "My Music App", className = "", children, ...props }: HeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4 dark:border-zinc-800/80 dark:bg-zinc-950/80 ${className}`.trim()}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 animate-pulse items-center justify-center rounded-full border border-blue-200 bg-green-700 shadow-lg shadow-green-700/25 sm:h-12 sm:w-12">
            <Music2 className="h-4 w-4 stroke-4 text-white sm:h-6 sm:w-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 sm:text-xs dark:text-emerald-500">
              Music Player
            </p>
            <h1 className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl dark:text-zinc-50">
              {title}
            </h1>
          </div>
        </div>
        {children && (
          <div className="flex w-full items-center justify-center sm:w-auto sm:justify-end">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};
export default memo(Header);