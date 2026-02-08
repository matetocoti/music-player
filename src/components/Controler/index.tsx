import { memo } from "react";

import PlayToggle from "./PlayToggle";
import VolumeBar from "./VolumeBar";
import TimeCounter from "./TimeCounter";

import "./Controler.css";

interface ControlerProps {
  playing: boolean;
  disabled?: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
}

const Controler = ( { playing, disabled, volume, currentTime, duration, onTogglePlay, onVolumeChange, onMuteToggle}: ControlerProps) => {
  return (
    <div className="controler">
      <TimeCounter currentTime={currentTime} duration={duration} />
      <PlayToggle
        playing={playing}
        onToggle={onTogglePlay}
        disabled={disabled}
      />
      <hr />
      <VolumeBar
        volume={volume}
        onVolumeChange={onVolumeChange}
        onMuteToggle={onMuteToggle}
      />
    </div>
  );
};

export default memo(Controler);
