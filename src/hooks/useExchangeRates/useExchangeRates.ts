import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import SDK from '@uphold/uphold-sdk-javascript';

import { pairsToRates } from '../../utils';
import { supportedCurrencies } from '../../assets/currencies';

const sdk = new SDK.default({
  baseUrl: 'http://api-sandbox.uphold.com',

  // API keys don't matter since no protected endpoints will be used
  clientId: 'foo',
  clientSecret: 'bar',
});

const defaultRatesMap: RatesMap = {};
for (const currency of supportedCurrencies) {
  defaultRatesMap[currency] = [];
}

export function useExchangeRates(baseCurrency: string) {
  // Cache the values to local storage
  const [ratesMap, setRatesMap] = useLocalStorage<RatesMap>(
    'RatesMap',
    defaultRatesMap,
  );

  // Update the cached value of a single currency
  const setRate = useCallback(
    (newRate: Rates) => {
      setRatesMap((ratesMap) => ({ ...ratesMap, [baseCurrency]: newRate }));
    },
    [baseCurrency, setRatesMap],
  );

  // Fetch the rates on load and on input change
  useEffect(() => {
    async function updateRates() {
      try {
        const pairs = await sdk.getTicker(baseCurrency);
        const rates = pairsToRates(pairs, baseCurrency);
        setRate(rates);
      } catch (err) {
        setRate(null);
      }
    }

    updateRates();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCurrency]);

  return ratesMap;
}
