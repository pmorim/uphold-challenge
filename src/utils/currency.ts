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

export function applyRate(rate: string, amount: string) {
  return (Number.parseFloat(rate) * Number.parseFloat(amount)).toString();
}

export function parseInput(
  input: string,
  setValue: (newValue: string) => void,
): void {
  // Skip tests if the input is empty
  if (!input) setValue('');

  // Ignore inputs aren't digits or decimal separators
  if (!/^[\d.]*$/.test(input)) return;

  // Ignore inputs that have more than 1 decimal separator
  if (!/^[^.]*.[^.]*$/.test(input)) return;

  // If all tests passed, accept the input
  setValue(input);
}
