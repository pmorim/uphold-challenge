type Rates = ExchangeRate[] | null;

// The Object that is received from the API
interface CurrencyPair {
  ask: string;
  bid: string;
  currency: string;
  pair: string;
}

// A simpler Object that is created from the CurrencyPair
interface ExchangeRate {
  rate: string;
  currency: string;
  baseCurrency: string;
}

interface RatesMap {
  [key: string]: Rates;
}
