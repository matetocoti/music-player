import { memo } from "react";
import { Pause, Play } from "lucide-react";

interface PlayToggleProps {
  playing: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const PlayToggle = ({ playing, onToggle, disabled }: PlayToggleProps) => {
  return (
    <button
      type="button"
      className="inline-flex h-12 min-w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/15 px-4 text-emerald-300 shadow-[0_0_0_1px_rgba(16,185,129,0.08)] transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-400/20 hover:text-emerald-200 disabled:cursor-not-allowed disabled:opacity-40"
      onClick={onToggle}
      disabled={disabled}
      aria-label={playing ? "Pause" : "Play"}
    >
      {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
    </button>
  );
};

export default memo(PlayToggle);
