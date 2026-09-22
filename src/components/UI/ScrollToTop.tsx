import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  isCollapsed: boolean;
  className?: string;
}

export function ScrollToTop({ isCollapsed, className = "" }: Readonly<ScrollToTopProps>) {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const show = scrolled && footerVisible;

  useEffect(() => {
    const root = document.getElementById("root");

    const handleScroll = () => {
      const scrollTop = root?.scrollTop ?? window.scrollY;
      setScrolled(scrollTop > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    root?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      root?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const footer =
      document.querySelector("[data-scroll-footer]") ?? document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = useCallback(() => {
    const root = document.getElementById("root");
    const target = root && root.scrollHeight > root.clientHeight ? root : window;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    target.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`pointer-events-auto group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300/80 bg-gradient-to-br from-white via-white to-slate-100 text-slate-600 shadow-[0_6px_18px_rgba(15,23,42,0.16)] backdrop-blur-md transition-[opacity,transform,box-shadow,border-color,color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-emerald-400 hover:from-white hover:to-emerald-50 hover:text-emerald-700 hover:shadow-[0_8px_22px_rgba(16,185,129,0.22)] active:scale-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/25 motion-reduce:transition-none sm:hover:-translate-y-0.5 sm:active:scale-100 sm:active:opacity-70 dark:border-zinc-600/90 dark:bg-gradient-to-br dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-200 dark:shadow-[0_8px_24px_rgba(0,0,0,0.42)] dark:hover:border-emerald-400/80 dark:hover:from-zinc-800 dark:hover:to-emerald-950/60 dark:hover:text-emerald-300 dark:hover:shadow-[0_8px_24px_rgba(16,185,129,0.2)] dark:focus-visible:ring-emerald-400/30 ${
        show && !isCollapsed
          ? "translate-x-0 scale-100 opacity-100"
          : "pointer-events-none translate-x-2 scale-75 opacity-0"
      } ${className}`}
    >
      <ArrowUp className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none" aria-hidden="true" />
    </button>
  );
}