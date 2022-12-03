import { FC, ReactNode, useContext } from "react";
import "./ExchangeRatesTable.css";
import PredicateButtons from "../PredicateButtons/PredicateButtons";
import useQueryPredicate from "../../hooks/useQueryPredicate";
import {
  calculatePrediction,
  calculateRemainder,
  isPositive,
} from "../../utils";
import { ExchangeRatesType } from "../../types";
import { AppContext } from "../../context/App";

const columns = [
  { label: "Měna" },
  { label: "Země" },
  { label: "Nákup" },
  { label: "Prodej" },
  { label: "ČNB" },
  { label: "Předpoklad" },
  { label: "Změna / 1 den" },
  { label: "Možnosti" },
];

type Props = {
  data: ExchangeRatesType[];
  showPredicate?: boolean;
};

const TableRow: FC<{ children: ReactNode }> = ({ children }) => (
  <tr>{children}</tr>
);

const Cell: FC<{ children: ReactNode }> = ({ children }) => (
  <td>
    <span>{children}</span>
  </td>
);

const NameCell: FC<{ shortName: string; name: string }> = ({
  shortName,
  name,
}) => (
  <Cell>
    {shortName} {name}
  </Cell>
);

const formatDecimal = (n: number) => n.toFixed(3);

const PredicateCells: FC<{ cnb: number; predicate: number; move: number }> = ({
  cnb,
  predicate,
  move,
}) => {
  const positive = isPositive(move);
  const totalRemainder = calculateRemainder(cnb, move, predicate);
  const prediction = calculatePrediction(cnb, move, totalRemainder);

  return (
    <>
      <Cell>{formatDecimal(prediction)}</Cell>
      <td>
        <span className={positive ? "positive" : "negative"}>
          {positive ? "+" : "-"}
          {formatDecimal(totalRemainder)}
        </span>
      </td>
    </>
  );
};

const OptionsCell: FC<{ item: ExchangeRatesType }> = ({ item }) => {
  const { addFavorite, removeFavorite, favorites } = useContext(AppContext);
  const isFavorite = favorites.indexOf(item.shortName) > -1;
  return (
    <td>
      <span
        className="favoriteAction"
        onClick={() =>
          isFavorite
            ? removeFavorite(item.shortName)
            : addFavorite(item.shortName)
        }
      >
        {isFavorite ? "Zrušit" : "Oblíbené"}
      </span>
    </td>
  );
};

const ExchangeRatesTable = ({ data, showPredicate = false }: Props) => {
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
              <PredicateCells
                cnb={item.cnb}
                move={item.move}
                predicate={predicate}
              />
              <OptionsCell item={item} />
            </TableRow>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExchangeRatesTable;
