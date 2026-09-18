import { memo } from "react";

import PlayToggle from "./PlayToggle";
import VolumeBar from "./VolumeBar";
import TimeCounter from "./TimeCounter";
import RestartButton from "./RestartButton";

interface ControlerProps {
  playing: boolean;
  disabled?: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onRestart: () => void;
}

const Controler = ({
  playing,
  disabled = false,
  volume,
  currentTime,
  duration,
  onTogglePlay,
  onVolumeChange,
  onMuteToggle,
  onRestart,
}: ControlerProps) => {
  return (
    <div className={`controller-surface relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-zinc-100 to-zinc-200 p-4 text-zinc-900 shadow-[0_20px_60px_rgba(24,24,27,0.12)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-white dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-[1.75rem] sm:px-6 sm:py-5 ${playing ? "controller-surface-playing" : ""}`}>
      <div className="relative z-10 flex shrink-0 items-center justify-center sm:justify-start">
        <TimeCounter currentTime={currentTime} duration={duration} />
      </div>

      <div className="block h-px w-full shrink-0 bg-zinc-300 sm:hidden dark:bg-white/10" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 items-center justify-center gap-3 sm:gap-4">
        <PlayToggle playing={playing} onToggle={onTogglePlay} disabled={disabled} />
        <RestartButton onRestart={onRestart} disabled={disabled} />
      </div>

      <div className="block h-px w-full shrink-0 bg-zinc-300 sm:hidden dark:bg-white/10" aria-hidden="true" />
      <div className="hidden h-9 w-px shrink-0 bg-zinc-300 sm:block dark:bg-white/10" aria-hidden="true" />

      <div className="relative z-10 flex w-full shrink-0 items-center justify-center sm:w-auto sm:justify-end">
        <VolumeBar
          volume={volume}
          onVolumeChange={onVolumeChange}
          onMuteToggle={onMuteToggle}
        />
      </div>
    </div>
  );
};

export default memo(Controler);