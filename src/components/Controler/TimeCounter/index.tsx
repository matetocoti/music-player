import { memo } from "react";
import "./TimeCounter.css";

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
    <div className="time-counter">
      <span>{formatTime(currentTime)}</span>
      <span className="separator">/</span>
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default memo(TimeCounter);
