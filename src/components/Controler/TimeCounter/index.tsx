import { memo } from "react";

interface TimeCounterProps {
  currentTime: number;
  duration: number;
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};



const TimeCounter = ({ currentTime, duration }: TimeCounterProps) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium tracking-wide text-zinc-200">
      <span>{formatTime(currentTime)}</span>
      <span className="text-zinc-500">/</span>
      <span className="text-zinc-400">{formatTime(duration)}</span>
    </div>
  );
};

export default memo(TimeCounter);
