import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import lodash from 'lodash';

import { useSDK } from '..';

import { getCurrencyCodeFromPair } from '../../utils';
import { supportedCurrencies } from '../../assets/currencies';

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
}

export function useExchangeRates(baseCurrency: string, wait = 5000) {
  const sdk = useSDK();

  // Make sure that the rates are cached to the local storage
  const [rates, setRates] = useLocalStorage<ExchangeRate[]>(baseCurrency, []);

  const updateRates = useCallback(
    lodash.debounce(async () => {
      // Fetch all pairs
      const allPairs: CurrencyPair[] = await sdk.getTicker(baseCurrency);

      // Remove the pairs without an asset
      const supportedPairs = allPairs.filter(({ pair }) =>
        supportedCurrencies.has(getCurrencyCodeFromPair(pair, baseCurrency)),
      );

      // Remove repeated pairs
      const seenPairs = new Set<string>([]);
      const uniquePairs = supportedPairs.filter(({ pair }) => {
        // Remove repeated pair
        const key = getCurrencyCodeFromPair(pair, baseCurrency);
        if (seenPairs.has(key)) return false;

        // Keep unique pair
        seenPairs.add(key);
        return true;
      });

      // Convert them to a simpler structure
      setRates(
        uniquePairs.map((uniquePair): ExchangeRate => {
          // Should it use 'bid' or 'ask'?
          const rate = uniquePair.ask;

          return {
            // Invert the rate if the pair is reversed
            rate:
              uniquePair.currency === baseCurrency
                ? (1 / Number.parseFloat(rate)).toString()
                : rate,

            // Grab the identifying code of the currency
            currency: getCurrencyCodeFromPair(uniquePair.pair, baseCurrency),
          };
        }),
      );
    }, wait),
    [baseCurrency, wait],
  );

  // Fetch the new rates on load and when baseCurrency is updated
  useEffect(() => {
    updateRates();
  }, [updateRates]);

  // Cancel queued debounce updates on unmount
  // This prevents a memory leak
  useEffect(() => {
    return () => updateRates.cancel();
  }, []);

  return rates;
}
