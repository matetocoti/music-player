export type VolumeLevel = "muted" | "low" | "high";

export type VolumeState = {
  value: number;
  label: string;
  level: VolumeLevel;
  toggleLabel: string;
};

export const clampVolume = (volume: number): number =>
  Math.min(100, Math.max(0, volume));

export const getVolumeLabel = (volume: number): string =>
  volume > 0 ? `${volume}%` : "Muted";

export const getVolumeState = (volume: number): VolumeState => {
  const value = clampVolume(volume);
  const level: VolumeLevel = value === 0 ? "muted" : value < 50 ? "low" : "high";

  return {
    value,
    label: getVolumeLabel(value),
    level,
    toggleLabel: level === "muted" ? "Ativar som" : "Silenciar",
  };
};
