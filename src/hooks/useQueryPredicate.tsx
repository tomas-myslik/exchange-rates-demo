import { useEffect, useMemo, useState } from 'react';

const useQueryPredicate = () => {
  const [predicate, setPredicate] = useState(1);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const queryPredicate = queryParams.get('predicate');

    if (queryPredicate && typeof queryPredicate === 'number') {
      setPredicate(queryPredicate);
    }
  }, []);

  const updatePredicate = (next: number) => {
    setPredicate(next);
    window.history.pushState({ predicate: next }, '', `?predicate=${next}`);
  };

  return useMemo(
    () => ({
      predicate,
      updatePredicate,
    }),
    [predicate]
  );
};

export default useQueryPredicate;
