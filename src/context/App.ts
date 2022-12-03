import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ExchangeRatesType } from "../types";

export type AppContextType = {
  data: ExchangeRatesType[];
  favorites: string[];
  addFavorite: (shortName: string) => void;
  removeFavorite: (shortName: string) => void;
};

export const AppContext = createContext<AppContextType>(undefined as any);

export const useAppContext: () => AppContextType = () => {
  const [data, setData] = useState<ExchangeRatesType[]>([]);
  const { value: favorites, save: setFavorites } = useLocalStorage<
    Array<string>
  >("favoriteData", []);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/data.json`);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }

      const json = await res.json();

      setData(json);
    };

    loadData();
  }, []);

  const addFavorite = (shortName: string) =>
    setFavorites([...favorites, shortName]);

  const removeFavorite = (shortName: string) =>
    setFavorites([...favorites.filter((i) => i !== shortName)]);

  return {
    data,
    favorites,
    addFavorite,
    removeFavorite,
  };
};
