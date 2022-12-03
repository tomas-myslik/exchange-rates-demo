import { useState } from "react";

const useLocalStorage = <T extends unknown>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  const save = (next: T) => {
    try {
      setValue(next);
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  return { value, save };
};

export default useLocalStorage;
