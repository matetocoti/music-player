import { memo } from "react";

import PlayToggle from "./PlayToggle";
import VolumeBar from "./VolumeBar";
import TimeCounter from "./TimeCounter";

import "./Controler.css";

interface ControlerProps {
  playing: boolean;
  disabled?: boolean;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
}

const Controler = ( { playing, disabled, volume, onTogglePlay, onVolumeChange}: ControlerProps) => {
  return (
    <div className="controler">
      {/* TODO(v1): implementar TimeCounter real*/}
      <TimeCounter currentTime={0} duration={999} />
      <PlayToggle
        playing={playing}
        onToggle={onTogglePlay}
        disabled={disabled}
      />
      <hr />
      <VolumeBar
        volume={volume}
        onVolumeChange={onVolumeChange}
      />
    </div>
  );
};

export default memo(Controler);
