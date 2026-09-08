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
      className="inline-flex h-12 min-w-12 items-center justify-center rounded-full border border-zinc-300 bg-zinc-200/70 px-4 text-zinc-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-300 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10 dark:hover:text-white"
      onClick={onRestart}
      disabled={disabled}
      aria-label="Restart song "
      title="Restart song (Ctrl+R)"
    >
      <RotateCcw className="h-5 w-5" />
    </button>
  );
};

export default memo(RestartButton);