export const clampVolume = (volume: number): number =>
  Math.min(100, Math.max(0, volume));

export const getVolumeLabel = (volume: number): string =>
  volume > 0 ? `${volume}%` : "Muted";
