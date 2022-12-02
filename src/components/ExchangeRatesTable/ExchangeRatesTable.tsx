import { FC, ReactNode } from 'react';
import './ExchangeRatesTable.css';
import PredicateButtons from '../PredicateButtons/PredicateButtons';
import { ExchangeRatesType, FavoriteAction } from '../../hooks/useExchangeRates';
import useQueryPredicate from '../../hooks/useQueryPredicate';
import { calculatePrediction, calculateRemainder, isPositive } from '../../utils';

const columns = [
  { label: 'Měna' },
  { label: 'Země' },
  { label: 'Nákup' },
  { label: 'Prodej' },
  { label: 'ČNB' },
  { label: 'Předpoklad' },
  { label: 'Změna / 1 den' },
  { label: 'Možnosti' },
];

type Props = {
  data: Array<ExchangeRatesType>;
  handleFavorite: FavoriteAction;
  showPredicate?: boolean;
};

const TableRow: FC<{ key?: string | number; children: ReactNode }> = ({ key, children }) => (
  <tr key={key ? `row-${key}` : undefined}>{children}</tr>
);

const Cell: FC<{ children: ReactNode }> = ({ children }) => (
  <td>
    <span>{children}</span>
  </td>
);

const NameCell: FC<{ shortName: string; name: string }> = ({ shortName, name }) => (
  <Cell>
    {shortName} {name}
  </Cell>
);

const formatDecimal = (n: number) => n.toFixed(3);

const PredicateCells: FC<{ cnb: number; predicate: number; move: number }> = ({ cnb, predicate, move }) => {
  const positive = isPositive(move);
  const totalRemainder = calculateRemainder(cnb, move, predicate);
  const prediction = calculatePrediction(cnb, move, totalRemainder);

  return (
    <>
      <Cell>{formatDecimal(prediction)}</Cell>
      <td>
        <span className={positive ? 'positive' : 'negative'}>
          {positive ? '+' : '-'}
          {formatDecimal(totalRemainder)}
        </span>
      </td>
    </>
  );
};

const OptionsCell: FC<{ item: ExchangeRatesType; onFavoriteChange: (item: ExchangeRatesType) => void }> = ({ item, onFavoriteChange }) => (
  <td>
    <span className="favoriteAction" onClick={() => onFavoriteChange(item)}>
      {item.favorite ? 'Zrušit' : 'Oblíbená'}
    </span>
  </td>
);

const ExchangeRatesTable = ({ data, handleFavorite, showPredicate = false }: Props) => {
  const { predicate, updatePredicate } = useQueryPredicate();

  return (
    <>
      {showPredicate && <PredicateButtons onChange={updatePredicate} />}
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={`col-${index}`}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <NameCell shortName={item.shortName} name={item.name} />
              <Cell>{item.country}</Cell>
              <Cell>{item.buy}</Cell>
              <Cell>{item.sell}</Cell>
              <Cell>{item.cnb}</Cell>
              <PredicateCells cnb={item.cnb} predicate={predicate} move={item.move} />
              <OptionsCell item={item} onFavoriteChange={handleFavorite} />
            </TableRow>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExchangeRatesTable;
