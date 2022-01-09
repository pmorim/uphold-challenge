import { getCurrencyCodeFromPair } from '.';
import { supportedCurrencies } from '../assets/currencies';

// Apply the conversion rate to the desired amount
export function applyRate(rate: string, amount: string) {
  return (Number.parseFloat(rate) * Number.parseFloat(amount)).toString();
}

// Simplify the received rates from the SDK
export function pairsToRates(allPairs: CurrencyPair[], baseCurrency: string) {
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
  return uniquePairs.map((uniquePair): ExchangeRate => {
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
  });
}
