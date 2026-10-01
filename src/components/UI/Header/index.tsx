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
      className={`sticky top-0 z-50 w-full border-b border-stone-300/70 bg-stone-50/75 px-4 py-3 shadow-[0_6px_20px_rgba(30,25,20,0.08)] backdrop-blur-xl transition-all duration-500 dark:border-stone-700/50 dark:bg-stone-950/45 dark:shadow-[0_6px_20px_rgba(0,0,0,0.28)] sm:px-6 sm:py-4 lg:px-8 ${className}`.trim()}
      {...props}
    >
      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c7835a]/55 to-transparent dark:via-[#d59672]/45" />

      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 sm:gap-6">
        <Link
          to={homeTo}
          className="group relative flex min-w-0 items-center gap-4 rounded-3xl p-1.5 pr-6 outline-none transition-all duration-400 focus-visible:ring-2 focus-visible:ring-emerald-500/50 active:scale-[0.97] sm:gap-5 sm:active:scale-[0.99]"
        >
          
          <div className="absolute inset-0 z-0 rounded-full bg-stone-500/5 transition-colors duration-400 group-hover:bg-stone-200/70 dark:group-hover:bg-stone-800/45" />

          
          <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.25rem] border border-white/80 bg-gradient-to-b from-stone-50 to-stone-200 shadow-[0_4px_12px_-3px_rgba(86,68,54,0.18),inset_0_2px_6px_rgba(255,255,255,0.9)] ring-1 ring-stone-900/5 transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-[0_7px_16px_-5px_rgba(157,91,61,0.25),inset_0_2px_4px_rgba(255,255,255,1)] dark:border-stone-700/60 dark:from-stone-800 dark:to-stone-900 dark:shadow-[0_4px_12px_-3px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.05)] dark:ring-white/10 dark:group-hover:shadow-[0_7px_16px_-5px_rgba(157,91,61,0.25),inset_0_2px_4px_rgba(255,255,255,0.1)] sm:h-14 sm:w-14 sm:rounded-[1.4rem] sm:group-hover:rotate-[-2deg]">
            
            
            <div
              className="absolute inset-0 rounded-[1.25rem] bg-[radial-gradient(circle_at_center,rgba(199,131,90,0.24)_0%,transparent_70%)] opacity-0 blur-md transition-all duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_center,rgba(213,150,114,0.2)_0%,transparent_70%)] sm:rounded-[1.4rem]"
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
            <p className="font-label text-[10px] font-black uppercase tracking-[0.25em] text-[#a56345]/90 transition-colors duration-400 group-hover:text-[#8e4f35] dark:text-[#d59672]/85 dark:group-hover:text-[#e7ad8b] sm:text-xs">
              Library
            </p>
            <h1 className="font-display truncate bg-gradient-to-br from-stone-950 to-slate-600 bg-clip-text text-lg tracking-tight text-transparent transition-all duration-400 group-hover:from-[#9b5f42] group-hover:to-slate-800 dark:from-stone-100 dark:to-stone-400 dark:group-hover:from-[#e2a783] dark:group-hover:to-white sm:text-2xl">
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