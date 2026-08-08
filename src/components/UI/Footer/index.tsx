import { memo, type ReactNode } from "react";

interface FooterProps {
  textContent?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const Footer = ({ textContent, children, className = "" }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const defaultText = `© ${currentYear} Music Player.`;
  const content = children ?? textContent ?? defaultText;
  if (!content) return null;

  return (
    <footer className={`border-t border-white/70 bg-white/70 px-4 py-5 backdrop-blur-sm sm:px-6 lg:px-8 ${className}`.trim()}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 text-center text-sm font-medium tracking-tight text-neutral-500 sm:flex-row sm:justify-between dark:text-neutral-400">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 sm:text-base lg:text-sm xl text-base">
          {content}
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
          Streaming • Curated • Elegant
        </span>
      </div>
    </footer>
  );
};

export default memo(Footer);