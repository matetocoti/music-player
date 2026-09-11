import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

const getStoredValue = <T,>(key: string, initialValue: T): T => {
  if (typeof window === "undefined") return initialValue;

  const storedValue = window.localStorage.getItem(key);
  if (!storedValue) return initialValue;

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return initialValue;
  }
};

const usePersistedState = <T,>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => getStoredValue(key, initialValue));

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default usePersistedState;
