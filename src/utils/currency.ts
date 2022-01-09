// Remove the baseCurrency from the pair to retrieve the wanted currency
export function getCurrencyCodeFromPair(pair: string, base: string) {
  return pair.replace(base, '').replace('-', '');
}

// Force the number to have a maximum amount of decimal places
export function limitDecimalPlaces(number: string, decimalPlaces = 6) {
  return parseFloat(
    Number.parseFloat(number.replace(',', '')).toFixed(decimalPlaces),
  ).toString();
}

// Add commas every 3 digits before the decimal point
export function formatCurrency(amount: string) {
  return amount.replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
