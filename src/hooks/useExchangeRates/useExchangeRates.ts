import { useEffect, useMemo } from 'react';
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
  baseCurrency: string;
}

export function useExchangeRates(baseCurrency: string, wait = 500) {
  const sdk = useSDK();

  // Make sure that the rates are cached to the local storage
  const [rates, setRates] = useLocalStorage<ExchangeRate[]>(baseCurrency, []);
  useEffect(() => console.log(rates), [rates]);

  // TODO: Fix debouncing system
  const updateRates = useMemo(
    () =>
      // Cancel the function call if it's called again in less than "wait" seconds
      lodash.debounce(async (baseCurrency: string) => {
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
            // Should it be 'bid' or 'ask'?
            const rate = uniquePair.ask;

            return {
              // Invert the rate if the pair is reversed
              rate:
                uniquePair.currency === baseCurrency
                  ? (1 / Number.parseFloat(rate)).toString()
                  : rate,

              currency: getCurrencyCodeFromPair(uniquePair.pair, baseCurrency),
              baseCurrency: baseCurrency,
            };
          }),
        );
      }, wait),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wait],
  );

  // Fetch the new rates on load and when 'baseCurrency' changes
  useEffect(() => {
    updateRates(baseCurrency);
  }, [baseCurrency, updateRates]);

  // Cancel queued debounce updates on unmount
  // This prevents a memory leak
  useEffect(() => {
    return () => updateRates.cancel();
  }, [updateRates]);

  return rates;
}
