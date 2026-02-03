import { memo } from "react";
import "./PlayToggle.css";

interface PlayToggleProps {
  playing: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const PlayToggle = ({ playing, onToggle, disabled }: PlayToggleProps) => {
  return (
    <button
      className="play-toggle"
      onClick={onToggle}
      disabled={disabled}
      aria-label={playing ? "Pause" : "Play"}
    >
      {playing ? "Pause" : "Play"}
    </button>
  );
};

export default memo(PlayToggle);
