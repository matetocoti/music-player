import { Moon, Sun } from "lucide-react";

const TRACK_BASE =
  "theme-toggle group relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border p-[3px] outline-none transition-[background-color,filter,transform] duration-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.55),0_1px_0_rgba(255,235,205,0.22)] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#ffd9a8] active:scale-95 sm:active:scale-100";

const TRACK_DAY = "border-[#2a160a]/70 bg-linear-to-b from-[#eab97a] to-[#fbe3b8]";
const TRACK_NIGHT = "border-black/80 bg-linear-to-b from-[#080a18] to-[#1b2040]";

const KNOB =
  "relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#ffe6b0,#d9a24f_48%,#8a5a1f)] text-[#4a2a0c] shadow-[0_2px_4px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-2px_3px_rgba(80,40,0,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active:scale-90 motion-reduce:transition-none";

const ICON = "absolute h-4 w-4 transition-all duration-500 motion-reduce:transition-none";

const STARS = [
  "right-2 top-2 h-0.5 w-0.5",
  "right-4 top-[18px] h-px w-px animate-pulse motion-reduce:animate-none",
  "right-3 bottom-1.5 h-[3px] w-[3px]",
];

interface ThemeToggleProps {
  isLightMode: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isLightMode, onToggle }: ThemeToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={isLightMode}
    aria-label="Light mode"
    title={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
    onClick={onToggle}
    className={`${TRACK_BASE} ${isLightMode ? TRACK_DAY : TRACK_NIGHT}`}
  >
    {STARS.map((position) => (
      <span
        key={position}
        aria-hidden="true"
        className={`absolute rounded-full bg-[#fff6d8] transition-opacity duration-500 ${position} ${isLightMode ? "opacity-0" : "opacity-90"}`}
      />
    ))}
    <span
      aria-hidden="true"
      className={`absolute left-2 top-2 h-1.5 w-3.5 rounded-full bg-white/80 transition-opacity duration-500 ${isLightMode ? "opacity-100" : "opacity-0"}`}
    />
    <span
      aria-hidden="true"
      className={`absolute bottom-2 left-3.5 h-1 w-2.5 rounded-full bg-white/60 transition-opacity duration-500 ${isLightMode ? "opacity-100" : "opacity-0"}`}
    />

    <span className={`${KNOB} ${isLightMode ? "translate-x-7" : "translate-x-0"}`}>
      <Sun
        className={`${ICON} ${isLightMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`}
        aria-hidden="true"
      />
      <Moon
        className={`${ICON} ${isLightMode ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        aria-hidden="true"
      />
    </span>
  </button>
);

export default ThemeToggle;
