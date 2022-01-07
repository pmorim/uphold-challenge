export function getCurrencyKeyFromPair(pair: string, base: string) {
  return pair.replace(base, ''); // Example: "EURUSD" -> "EUR"
}

export function limitDecimalPlaces(number: number | string, decimalPlaces = 6) {
  if (typeof number === 'string')
    number = Number.parseFloat(number.replace(',', ''));
  return parseFloat(number.toFixed(decimalPlaces)).toString();
}

export function formatCurrency(amount: number | string) {
  if (typeof amount === 'number') amount = amount.toString();
  return amount.replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
