import "./App.css";
import { AppContext, useAppContext } from "./context/App";
import ExchangeRates from "./components/ExchangeRates/ExchangeRates";

const App = () => {
  const appCtx = useAppContext();

  return (
    <AppContext.Provider value={appCtx}>
      <ExchangeRates />
    </AppContext.Provider>
  );
};

export default App;
