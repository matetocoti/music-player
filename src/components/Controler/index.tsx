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
  onRestart
}: ControlerProps) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
      <div className="flex shrink-0 items-center justify-center sm:justify-start">
        <TimeCounter currentTime={currentTime} duration={duration} />
      </div>
      <div className="flex flex-1 items-center justify-center gap-3 sm:gap-4">
        <PlayToggle playing={playing} onToggle={onTogglePlay} disabled={disabled} />
        <RestartButton onRestart={onRestart} disabled={disabled} />
      </div>
      <div 
        className="hidden h-9 w-px shrink-0 bg-white/10 sm:block" 
        aria-hidden="true" 
      />
      <div className="flex w-full shrink-0 items-center justify-center sm:w-auto sm:justify-end">
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