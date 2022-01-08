import { useEffect, useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import lodash from 'lodash';

import { useSDK } from '..';
import { convertToExchangeRate } from '../../utils';
import { supportedCurrencies } from '../../assets/currencies';

const defaultRatesMap: RatesMap = {};
for (const currency of supportedCurrencies) {
  defaultRatesMap[currency] = [];
}

export function useExchangeRates(baseCurrency: string, wait = 500) {
  const sdk = useSDK();

  // Make sure that the rates are cached to the local storage
  const [ratesMap, setRatesMap] = useLocalStorage<RatesMap>(
    'RatesMap',
    defaultRatesMap,
  );
  const setRate = (newRate: ExchangeRate[]) =>
    setRatesMap((ratesMap) => ({ ...ratesMap, [baseCurrency]: newRate }));

  useEffect(() => console.log(ratesMap), [ratesMap]);

  // Debounce the fetching of rates
  const updateRates = useMemo(
    () =>
      lodash.debounce(async () => {
        const pairs = await sdk.getTicker(baseCurrency);
        setRate(convertToExchangeRate(pairs, baseCurrency));
      }, wait),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseCurrency, wait],
  );

  // Fetch the new rates on load and when 'baseCurrency' changes
  useEffect(() => {
    updateRates();
  }, [baseCurrency, updateRates]);

  // Cancel queued debounce updates on unmount
  // This prevents a memory leak
  useEffect(() => () => updateRates.cancel(), [updateRates]);

  // Return the simplified object
  return ratesMap;
}
