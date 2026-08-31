import { memo, type ReactNode } from "react";

interface FooterProps {
  textContent?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const Footer = ({ textContent, children, className = "" }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const defaultText = `© ${currentYear} Music Player`;
  const content = children ?? textContent ?? defaultText;

  if (!content) return null;

  return (
    <footer
      className={`border-t border-zinc-200/80 bg-white/60 px-4 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/60 ${className}`.trim()}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-center text-sm text-zinc-600 sm:flex-row sm:text-left dark:text-zinc-300">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
          <span className="font-medium tracking-tight">{content}</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400 sm:justify-end">
          <span>Music</span>
          <span className="h-1 w-1 rounded-full bg-zinc-400" />
          <span>Curated</span>
          <span className="h-1 w-1 rounded-full bg-zinc-400" />
          <span>Flow</span>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);