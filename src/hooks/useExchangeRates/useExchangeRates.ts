import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { useSDK } from '..';
import { convertToExchangeRate } from '../../utils';
import { supportedCurrencies } from '../../assets/currencies';

const defaultRatesMap: RatesMap = {};
for (const currency of supportedCurrencies) {
  defaultRatesMap[currency] = [];
}

export function useExchangeRates(baseCurrency: string) {
  const sdk = useSDK();

  // Cache the values to local storage
  const [ratesMap, setRatesMap] = useLocalStorage<RatesMap>(
    'RatesMap',
    defaultRatesMap,
  );

  // Update the cached value of a single currency
  const setRate = useCallback(
    (newRate: ExchangeRate[]) => {
      setRatesMap((ratesMap) => ({ ...ratesMap, [baseCurrency]: newRate }));
    },
    [baseCurrency, setRatesMap],
  );

  // Fetch the rates on load and on input change
  useEffect(() => {
    async function updateRates() {
      const pairs = await sdk.getTicker(baseCurrency);
      setRate(convertToExchangeRate(pairs, baseCurrency));
    }

    updateRates();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCurrency]);

  return ratesMap;
}
