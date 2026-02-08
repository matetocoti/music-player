import { memo } from "react";
import "./VolumeBar.css";

interface VolumeBarProps {
  volume: number;
  onVolumeChange: (newVolume: number) => void;
  onMuteToggle?: () => void;
}

const VolumeBar = ({ volume, onVolumeChange, onMuteToggle }: VolumeBarProps) => {
  const muteUnicode = volume > 0 ? "\u{1F508}" : "\u{1F507}";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(event.target.value));
  };

  return (
    <div className="volume-bar-container">
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
      <div className="volume-info">
        <p className="volume-display">Volume: {volume}%</p>
        <button className="volume-mute-btn" onClick={onMuteToggle}>
          {muteUnicode}
        </button>
      </div>
    </div>
  );
};

export default memo(VolumeBar);
