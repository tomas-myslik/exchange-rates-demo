import { useContext, useMemo } from "react";
import { AppContext } from "../../context/App";
import ExchangeRatesTable from "../ExchangeRatesTable/ExchangeRatesTable";

const ExchangeRates = () => {
  const { data, favorites } = useContext(AppContext);

  const favoriteData = useMemo(
    () => data.filter((item) => favorites.indexOf(item.shortName) > -1),
    [data, favorites]
  );

  return (
    <div className="container">
      <h1 className="pageHeader">Kurzovní lístek</h1>
      <div className="tableContainer">
        <h4 className="sectionHeader">Vaše oblíbené</h4>
        {favoriteData.length ? (
          <ExchangeRatesTable data={favoriteData} />
        ) : (
          <p>Nemáte oblíbené kurzy měn.</p>
        )}
      </div>
      {(data?.length && (
        <div className="tableContainer ratesContainer">
          <h4 className="sectionHeader">Seznam všech kurzů</h4>
          <ExchangeRatesTable data={data} showPredicate />
        </div>
      )) ||
        null}
    </div>
  );
};

export default ExchangeRates;
