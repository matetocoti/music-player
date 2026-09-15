import { memo } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { getVolumeState } from "../../../utils/volume";

interface VolumeBarProps {
  volume: number;
  onVolumeChange: (newVolume: number) => void;
  onMuteToggle?: () => void;
}

const VolumeBar = ({ volume, onVolumeChange, onMuteToggle }: VolumeBarProps) => {
  const volumeState = getVolumeState(volume);
  const VolumeIcon = {
    muted: VolumeX,
    low: Volume1,
    high: Volume2,
  }[volumeState.level];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(event.target.value));
  };

  const trackStyle = {
    background: `linear-gradient(to right, var(--brand-500) 0%, var(--brand-500) ${volumeState.value}%, rgba(255,255,255,0.12) ${volumeState.value}%, rgba(255,255,255,0.12) 100%)`,
  } as CSSProperties;

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-300 bg-zinc-200/70 px-4 py-3 shadow-inner shadow-zinc-500/10 sm:items-end dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-700 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10 dark:hover:text-white"
          onClick={onMuteToggle}
          aria-label={volumeState.toggleLabel}
          title={volumeState.toggleLabel}
        >
          <VolumeIcon className="h-5 w-5" />
        </button>
        <div className="hidden text-right text-xs text-zinc-500 dark:text-zinc-400 sm:block">
          <p className="uppercase tracking-[0.24em]">Volume</p>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{volumeState.label}</p>
        </div>
      </div>
      <input
        type="range"
        className="h-2 w-36 cursor-pointer appearance-none rounded-full bg-transparent outline-none accent-emerald-400 sm:w-40"
        min="0"
        max="100"
        step="1"
        value={volumeState.value}
        onChange={handleChange}
        aria-label="Volume Control"
        style={trackStyle}
      />
      <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:hidden">{volumeState.label}</p>
      <style>{`
        input[type='range']::-webkit-slider-runnable-track {
          height: 0.5rem;
          border-radius: 9999px;
          background: ${trackStyle.background};
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -0.35rem;
          height: 1rem;
          width: 1rem;
          border-radius: 9999px;
          border: 2px solid rgba(255, 255, 255, 0.9);
          background: var(--brand-500);
          box-shadow: 0 0 0 6px var(--brand-glow);
        }

        input[type='range']::-moz-range-track {
          height: 0.5rem;
          border-radius: 9999px;
          background: ${trackStyle.background};
        }

        input[type='range']::-moz-range-thumb {
          height: 1rem;
          width: 1rem;
          border-radius: 9999px;
          border: 2px solid rgba(255, 255, 255, 0.9);
          background: var(--brand-500);
          box-shadow: 0 0 0 6px var(--brand-glow);
        }
      `}</style>
    </div>
  );
};

export default memo(VolumeBar);
