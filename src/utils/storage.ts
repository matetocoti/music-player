export const RESET_DEFAULTS_EVENT = "music-player-reset-defaults";

export const getStoredValue = <T,>(key: string, initialValue: T): T => {
  if (typeof window === "undefined") {
    return initialValue;
  }

  const storedValue = window.localStorage.getItem(key);
  if (!storedValue) {
    return initialValue;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return initialValue;
  }
};
