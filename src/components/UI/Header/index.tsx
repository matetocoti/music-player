import { memo, type ReactNode, type HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { AudioLines } from "lucide-react";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  homeTo?: string;
  children?: ReactNode;
}

const Header = ({ title = "Agnostic Engine", homeTo = "/", className = "", children, ...props }: HeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/60 px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] saturate-[1.1] backdrop-blur-2xl transition-all duration-500 dark:border-slate-800/40 dark:bg-slate-800/15 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] sm:px-6 sm:py-4 lg:px-8 ${className}`.trim()}
      {...props}
    >
      
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent dark:via-emerald-600/20" />

      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 sm:gap-6">
        <Link
          to={homeTo}
          className="group relative flex min-w-0 items-center gap-4 rounded-3xl p-1.5 pr-6 outline-none transition-all duration-400 focus-visible:ring-2 focus-visible:ring-emerald-500/50 active:scale-[0.97] sm:gap-5 sm:active:scale-[0.99]"
        >
          
          <div className="absolute inset-0 z-0 rounded-full bg-slate-500/7 transition-colors duration-400 group-hover:bg-slate-100/80 dark:group-hover:bg-slate-800/50" />

          
          <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.25rem] border border-white/80 bg-gradient-to-b from-white to-slate-100 shadow-[0_4px_12px_-2px_rgba(16,185,129,0.15),inset_0_2px_6px_rgba(255,255,255,0.9)] ring-1 ring-slate-900/5 transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-[0_8px_20px_-4px_rgba(16,185,129,0.3),inset_0_2px_4px_rgba(255,255,255,1)] dark:border-slate-700/60 dark:from-slate-800 dark:to-slate-900 dark:shadow-[0_4px_12px_-2px_rgba(16,185,129,0.2),inset_0_2px_4px_rgba(255,255,255,0.05)] dark:ring-white/10 dark:group-hover:shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4),inset_0_2px_4px_rgba(255,255,255,0.1)] sm:h-14 sm:w-14 sm:rounded-[1.4rem] sm:group-hover:rotate-[-4deg]">
            
            
            <div
              className="absolute inset-0 rounded-[1.25rem] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.4)_0%,transparent_70%)] opacity-0 blur-md transition-all duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.3)_0%,transparent_70%)] sm:rounded-[1.4rem]"
              aria-hidden="true"
            />

            <AudioLines
              className="relative z-10 h-5 w-5 text-slate-700 drop-shadow-sm transition-all duration-500 ease-out group-hover:text-emerald-600 dark:text-slate-300 dark:group-hover:text-emerald-400 sm:h-7 sm:w-7 sm:group-hover:-rotate-6 sm:group-hover:scale-110"
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          {/* Área de Tipografia */}
          <div className="relative z-10 flex min-w-0 flex-col justify-center">
            <p className="font-label text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600/80 transition-colors duration-400 group-hover:text-emerald-600 dark:text-emerald-500/80 dark:group-hover:text-emerald-400 sm:text-xs">
              Library
            </p>
            <h1 className="font-display truncate bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-lg tracking-tight text-transparent transition-all duration-400 group-hover:from-emerald-700 group-hover:to-slate-800 dark:from-white dark:to-slate-400 dark:group-hover:from-emerald-300 dark:group-hover:to-white sm:text-2xl">
              {title}
            </h1>
          </div>
        </Link>

        {children && <div className="relative z-10 flex shrink-0 items-center justify-end">{children}</div>}
      </div>
    </header>
  );
};

export default memo(Header);