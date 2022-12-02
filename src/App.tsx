import './App.css';

import ExchangeRatesTable from './components/ExchangeRatesTable/ExchangeRatesTable';

import useExchangeRates from './hooks/useExchangeRates';

const App = () => {
  const { data, favoriteData, handleFavorite } = useExchangeRates();

  return (
    <div className="container">
      <h1 className="pageHeader">Kurzovní lístek</h1>
      {favoriteData && (
        <div className="tableContainer">
          <h4 className="sectionHeader">Vaše oblíbené</h4>
          {favoriteData.length ? (
            <ExchangeRatesTable data={favoriteData} handleFavorite={handleFavorite} />
          ) : (
            <p>Nemáte oblíbené kurzy měn.</p>
          )}
        </div>
      )}
      {(data?.length && (
        <div className="tableContainer ratesContainer">
          <h4 className="sectionHeader">Seznam všech kurzů</h4>
          <ExchangeRatesTable data={data} handleFavorite={handleFavorite} showPredicate />
        </div>
      )) ||
        null}
    </div>
  );
};

export default App;
