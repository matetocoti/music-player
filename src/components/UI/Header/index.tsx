import { memo, type ReactNode, type HTMLAttributes } from "react";
import { Link } from "react-router-dom";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  homeTo?: string;
  children?: ReactNode;
}

const Header = ({ title = "Agnostic Engine", homeTo = "/", className = "", children, ...props }: HeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-stone-300/70 bg-stone-50 px-4 py-3 shadow-[0_6px_20px_rgba(30,25,20,0.08)] backdrop-blur-xl transition-all duration-500 dark:border-stone-700/50 dark:bg-[#141414] dark:shadow-[0_6px_20px_rgba(0,0,0,0.28)] sm:px-6 sm:py-4 lg:px-8 ${className}`.trim()}
      {...props}
    >
      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c7835a]/55 to-transparent dark:via-[#d59672]/45" />
      <div className="header-rhythm" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 sm:gap-6">
        <Link
          to={homeTo}
          className="group relative flex min-w-0 items-center gap-4 rounded-3xl p-1.5 pr-6 outline-none transition-all duration-400 focus-visible:ring-2 focus-visible:ring-emerald-500/50 active:scale-[0.97] sm:gap-5 sm:active:scale-[0.99]"
        >
          
          <div className="absolute inset-0 z-0 rounded-full bg-stone-500/5 transition-colors duration-400 group-hover:bg-stone-200/70 dark:group-hover:bg-stone-800/45" />

          
          
          
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