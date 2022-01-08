// Parse the user's "currency amount" input
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
