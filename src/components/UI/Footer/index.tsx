import { memo, type ReactNode } from "react";

interface FooterProps {
  textContent?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const STUD =
  "h-1.5 w-1.5 shrink-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffe6b0,#b8793f)] shadow-[0_1px_1px_rgba(0,0,0,0.6)]";

const Footer = ({ textContent, children, className = "" }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const defaultText = `© ${currentYear} Music Player`;
  const content = children ?? textContent ?? defaultText;

  if (!content) return null;

 
  return (
    <footer className={`footer-wood px-4 py-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-2 text-center text-sm text-[#f3e2c8] sm:flex-row sm:gap-6 sm:text-left">
        <span className="font-reading font-medium tracking-tight [text-shadow:0_1px_0_rgba(0,0,0,0.55)]">{content}</span>

        <div className="font-label flex items-center justify-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e8b27c] [text-shadow:0_1px_0_rgba(0,0,0,0.6)] sm:justify-end sm:tracking-[0.28em]">
          <span>Music</span>
          <span className={STUD} aria-hidden="true" />
          <span>Curated</span>
          <span className={STUD} aria-hidden="true" />
          <span>Flow</span>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);