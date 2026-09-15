import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getStoredValue } from "../utils/storage";

const usePersistedState = <T,>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => getStoredValue(key, initialValue));

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default usePersistedState;
