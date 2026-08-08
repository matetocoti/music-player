import { memo } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import { Volume1, Volume2, VolumeX } from "lucide-react";

interface VolumeBarProps {
  volume: number;
  onVolumeChange: (newVolume: number) => void;
  onMuteToggle?: () => void;
}

const VolumeBar = ({ volume, onVolumeChange, onMuteToggle }: VolumeBarProps) => {
  const clampedVolume = Math.min(100, Math.max(0, volume));
  const volumeLabel = clampedVolume > 0 ? `${clampedVolume}%` : "Muted";
  const VolumeIcon = clampedVolume === 0 ? VolumeX : clampedVolume < 50 ? Volume1 : Volume2;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(event.target.value));
  };

  const trackStyle = {
    background: `linear-gradient(to right, #10b981 0%, #10b981 ${clampedVolume}%, rgba(255,255,255,0.12) ${clampedVolume}%, rgba(255,255,255,0.12) 100%)`,
  } as CSSProperties;

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-black/20 sm:items-end">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-100 transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          onClick={onMuteToggle}
          aria-label={clampedVolume === 0 ? "Ativar som" : "Silenciar"}
          title={clampedVolume === 0 ? "Ativar som" : "Silenciar"}
        >
          <VolumeIcon className="h-5 w-5" />
        </button>
        <div className="hidden text-right text-xs text-zinc-400 sm:block">
          <p className="uppercase tracking-[0.24em]">Volume</p>
          <p className="text-sm font-semibold text-zinc-100">{volumeLabel}</p>
        </div>
      </div>
      <input
        type="range"
        className="h-2 w-36 cursor-pointer appearance-none rounded-full bg-transparent outline-none accent-emerald-400 sm:w-40"
        min="0"
        max="100"
        step="1"
        value={clampedVolume}
        onChange={handleChange}
        aria-label="Volume Control"
        style={trackStyle}
      />
      <p className="text-xs text-zinc-400 sm:hidden">{volumeLabel}</p>
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
          background: #10b981;
          box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.16);
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
          background: #10b981;
          box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.16);
        }
      `}</style>
    </div>
  );
};

export default memo(VolumeBar);
