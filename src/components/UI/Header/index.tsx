import { memo, type CSSProperties, type ReactNode, type HTMLAttributes } from "react";
import { Link } from "react-router-dom";


const woodTable = (base: number, amplitude: number) =>
  Array.from({ length: 16 }, (_, index) => {
    const ring = Math.sin(index * 1.9) * 0.6 + Math.sin(index * 0.8 + 1) * 0.4;
    return Math.min(1, Math.max(0, base + amplitude * ring)).toFixed(3);
  }).join(" ");

const GRAY = "1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1";


const woodUrl = (base: number, amplitude: number) => {
  const channel = (scale: number) => woodTable(base * scale, amplitude * scale);
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='900' height='240'>" +
    "<filter id='w' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>" +
    "<feTurbulence type='fractalNoise' baseFrequency='.0035 .085' numOctaves='3' seed='4' stitchTiles='stitch' result='grain'/>" +
    "<feTurbulence type='fractalNoise' baseFrequency='.02 .75' numOctaves='2' seed='9' stitchTiles='stitch' result='pores'/>" +
    `<feColorMatrix in='grain' values='${GRAY}' result='g'/>` +
    `<feColorMatrix in='pores' values='${GRAY}' result='p'/>` +
    "<feComposite in='g' in2='p' operator='arithmetic' k1='0' k2='.84' k3='.16' k4='0' result='m'/>" +
    "<feComponentTransfer in='m'>" +
    `<feFuncR type='table' tableValues='${channel(1)}'/>` +
    `<feFuncG type='table' tableValues='${channel(0.58)}'/>` +
    `<feFuncB type='table' tableValues='${channel(0.3)}'/>` +
    "</feComponentTransfer></filter>" +
    "<rect width='100%' height='100%' filter='url(#w)'/></svg>";
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const WOOD_LIGHT: CSSProperties = { backgroundImage: woodUrl(0.4, 0.14), backgroundSize: "900px 240px" };
const WOOD_DARK: CSSProperties = { backgroundImage: woodUrl(0.19, 0.075), backgroundSize: "900px 240px" };


const VARNISH_STYLE: CSSProperties = {
  background:
    "linear-gradient(105deg, transparent 28%, rgba(255,235,205,0.10) 44%, transparent 58%), linear-gradient(180deg, rgba(255,235,205,0.16) 0%, transparent 38%, rgba(20,8,0,0.30) 100%)",
};



export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  homeTo?: string;
  children?: ReactNode;
}

const Header = ({ title = "Agnostic Engine", homeTo = "/", className = "", children, ...props }: HeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#24130a] bg-[#3a2314] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,235,205,0.28),inset_0_-1px_0_rgba(0,0,0,0.5),0_8px_22px_-6px_rgba(30,14,4,0.55)] transition-all duration-500 dark:bg-[#1c1009] dark:shadow-[inset_0_1px_0_rgba(255,235,205,0.14),inset_0_-1px_0_rgba(0,0,0,0.6),0_8px_22px_-6px_rgba(0,0,0,0.7)] sm:px-6 sm:py-4 lg:px-8 ${className}`.trim()}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 dark:hidden" style={WOOD_LIGHT} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block" style={WOOD_DARK} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10" style={VARNISH_STYLE} aria-hidden="true" />

      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8b27c]/80 to-transparent" />
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
          className="group relative flex min-w-0 items-center gap-4 rounded-3xl p-1.5 pr-6 outline-none transition-all duration-400 focus-visible:ring-2 focus-visible:ring-[#ffd9a8] active:scale-[0.97] sm:gap-5 sm:active:scale-[0.99]"
        >
          
          <div className="absolute inset-0 z-0 rounded-xl animate-pulse shadow-sm bg-black/15 shadow-[inset_0_2px_5px_rgba(0,0,0,0.45),0_1px_0_rgba(255,235,205,0.12)] transition-colors duration-400 group-hover:bg-black/25 dark:bg-black/30 dark:group-hover:bg-black/40" />

          <div className="relative z-10 flex min-w-0 flex-col justify-center">
            <p className="font-label text-[10px] font-black uppercase tracking-[0.25em] text-[#e8b88a] transition-colors duration-400 [text-shadow:0_1px_1px_rgba(0,0,0,0.55)] group-hover:text-[#f6cfa8] sm:text-xs">
              Library
            </p>
            <h1 className="font-display truncate text-lg tracking-tight text-[#f6e8d3] transition-colors duration-400 [text-shadow:0_1px_1px_rgba(0,0,0,0.65),0_-1px_0_rgba(255,235,205,0.12)] group-hover:text-white sm:text-2xl">
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