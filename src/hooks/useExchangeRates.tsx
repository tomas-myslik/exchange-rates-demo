import { useCallback, useEffect, useMemo, useState } from 'react';
import useLocalStorage from './useLocalStorage';

export type ExchangeRatesType = {
  shortName: string;
  name: string;
  country: string;
  move: number;
  buy: number;
  sell: number;
  cnb: number;
  favorite?: boolean;
};

export type FavoriteAction = (props: Pick<ExchangeRatesType, 'shortName'>) => void;

const useExchangeRates = () => {
  const [data, setData] = useState<Array<ExchangeRatesType>>([]);
  const { value: favoriteData, save: setFavoriteData } = useLocalStorage<Array<ExchangeRatesType>>('favoriteData', []);

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

  useEffect(() => {
    const nextFavoriteData = favoriteData.filter(
      (favoriteItem) => data.find((item) => item.shortName === favoriteItem.shortName)?.favorite === favoriteItem.favorite
    );

    const next = [...nextFavoriteData, ...(data?.length ? data.filter((item) => item.favorite) : [])];

    setFavoriteData(next.filter((i, p) => next.indexOf(i) === p));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFavorite: FavoriteAction = useCallback(
    ({ shortName }) => {
      setData(
        data
          ? data.map((item) => {
              return item.shortName === shortName ? { ...item, favorite: !item.favorite } : item;
            })
          : []
      );
    },
    [data]
  );

  return useMemo(
    () => ({
      data,
      favoriteData,
      handleFavorite,
    }),
    [data, favoriteData, handleFavorite]
  );
};

export default useExchangeRates;
