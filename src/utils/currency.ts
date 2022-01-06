export function getCurrencyFromPair(pair: string, otherCurrency: string) {
  return pair
    .replace('-', '') // Example: "EUR-USD" -> "EURUSD"
    .replace(otherCurrency, ''); // Example: "EURUSD" -> "EUR"
}
