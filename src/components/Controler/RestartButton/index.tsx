import { memo } from "react";
import "../PlayToggle/PlayToggle.css";

interface RestartButtonProps {
  onRestart: () => void;
  disabled?: boolean;
}

const RestartButton = ({ onRestart, disabled }: RestartButtonProps) => {
  return (
    <button
        className="play-toggle restart-button"
        onClick={onRestart}
        disabled={disabled}
        aria-label='restart'
    > 
        &#x21BB;
    </button> 
    );
};

export default memo(RestartButton);