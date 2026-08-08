import { memo } from "react";
import { RotateCcw } from "lucide-react";

interface RestartButtonProps {
  onRestart: () => void;
  disabled?: boolean;
}

const RestartButton = ({ onRestart, disabled }: RestartButtonProps) => {
  return (
    <button
      type="button"
      className="inline-flex h-12 min-w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-zinc-100 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      onClick={onRestart}
      disabled={disabled}
      aria-label="Reiniciar música"
      title="Reiniciar (Ctrl+R)"
    >
      <RotateCcw className="h-5 w-5" />
    </button>
  );
};

export default memo(RestartButton);