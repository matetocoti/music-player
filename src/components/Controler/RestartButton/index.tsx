import { memo } from "react";
import "./RestartButton.css";

interface RestartButtonProps {
  onRestart: () => void;
  disabled?: boolean;
}

const RestartButton = ({ onRestart, disabled }: RestartButtonProps) => {
  return (
    <button
      className="restart-button"
      onClick={onRestart}
      disabled={disabled}
      aria-label="Reiniciar música"
      title="Reiniciar (Ctrl+R)"
    >
      &#x21BB;
    </button>
  );
};

export default memo(RestartButton);