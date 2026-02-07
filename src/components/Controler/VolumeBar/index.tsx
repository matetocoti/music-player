import { memo } from "react";
import "./VolumeBar.css";

interface VolumeBarProps {
  volume: number;
  onVolumeChange: (newVolume: number) => void;
}

const VolumeBar = ({ volume, onVolumeChange }: VolumeBarProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(event.target.value));
  };

  return (
    <div>
      <input
        type="range"
        className="volume-bar"
        min="0"
        max="100"
        step="1"
        value={Math.min(100, Math.max(0, volume))}
        onChange={handleChange}
        aria-label="Volume Control"
      />
      <p className="volume-display">Volume: {volume}%</p>
    </div>
  );
};

export default memo(VolumeBar);
