import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import lodash from 'lodash';

import { useSDK } from '..';
import { getCurrencyFromPair } from '../../utils';
import { supportedCurrencies } from '../../assets/currencies';

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
  baseCurrency: string;
}

export function useExchangeRates(baseCurrency: string, n = 10, wait = 100) {
  const sdk = useSDK();

  // Make sure that the rates are cached to the local storage
  const [rates, setRates] = useLocalStorage<ExchangeRate[]>(baseCurrency, []);

  const updateRates = useCallback(
    lodash.debounce(async () => {
      // Fetch all pairs
      const allPairs: CurrencyPair[] = await sdk.getTicker(baseCurrency);

      // Remove the pairs without an asset
      const supportedPairs = allPairs.filter(({ pair }) =>
        supportedCurrencies.has(getCurrencyFromPair(pair, baseCurrency)),
      );

      // Convert them to a simpler structure
      setRates(
        supportedPairs.map(({ bid, pair }): ExchangeRate => {
          return {
            rate: bid, // Should it use 'bid' or 'ask'?
            baseCurrency: getCurrencyFromPair(pair, baseCurrency),
          };
        }),
      );
    }, wait),
    [baseCurrency, n, wait],
  );

  // Fetch the new rates on load and when baseCurrency is updated
  useEffect(() => {
    updateRates();
  }, [updateRates]);

  // Cancel queued updates on unmount
  // This prevents a memory leak
  useEffect(() => {
    return () => updateRates.cancel();
  }, []);

  return rates;
}
