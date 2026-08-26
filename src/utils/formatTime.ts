export const formatDuration = (seconds?: number | null): string => {
  if (seconds == null || seconds < 0 || Number.isNaN(seconds)) return '0:00';
  const validSeconds = Math.floor(seconds);

  const hours = Math.floor(validSeconds / 3600);
  const minutes = Math.floor((validSeconds % 3600) / 60);
  const remainingSecs = validSeconds % 60;

  const paddedSecs = String(remainingSecs).padStart(2, '0');

  if (hours > 0) {
    const paddedMinutes = String(minutes).padStart(2, '0');
    return `${hours}:${paddedMinutes}:${paddedSecs}`;
  }

  return `${minutes}:${paddedSecs}`;
};


