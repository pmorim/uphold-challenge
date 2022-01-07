export function getCurrencyFromPair(pair: string, base: string) {
  return pair.replace(base, ''); // Example: "EURUSD" -> "EUR"
}

export function formatCurrency(amount: number) {
  amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
