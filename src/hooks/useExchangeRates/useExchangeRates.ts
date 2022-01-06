import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { useSDK } from '..';
import { getCurrencyFromPair } from '../../utils';

// The Object that is received from the API
interface CurrencyPair {
  ask: string;
  bid: string;
  currency: string;
  pair: string;
}

// A simpler Object that is created from the CurrencyPair
export interface ExchangeRate {
  rate: string;
  currency: string;
}

export function useExchangeRates(currency = 'USD') {
  const sdk = useSDK();

  // Make sure that the rates are cached to the local storage
  const [rates, setRates] = useLocalStorage<ExchangeRate[]>('rates', []);

  const updateRates = useCallback(async (currency: string) => {
    // Grab the 10 first currency pairs
    let pairs: CurrencyPair[] = (await sdk.getTicker(currency)).slice(0, 10);

    // Convert them to a simpler structure
    setRates(
      pairs.map(
        ({ bid, currency, pair }): ExchangeRate => ({
          rate: bid, // Should it use 'bid' or 'ask'?
          currency: getCurrencyFromPair(pair, currency),
        }),
      ),
    );
  }, []);

  // Fetch the new rates on load and when currency is updated
  useEffect(() => {
    updateRates(currency);
  }, [currency]);

  return [rates, updateRates];
}