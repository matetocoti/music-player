import { memo } from "react";
import { formatDuration } from "../../../utils/formatTime";

interface TimeCounterProps {
  currentTime: number;
  duration: number;
}

const TimeCounter = ({ currentTime, duration }: TimeCounterProps) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium tracking-wide text-zinc-200">
      <span>{formatDuration(currentTime)}</span>
      <span className="text-zinc-500">/</span>
      <span className="text-zinc-400">{formatDuration(duration)}</span>
    </div>
  );
};

export default memo(TimeCounter);
