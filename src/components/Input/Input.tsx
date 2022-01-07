type InputValue = React.FormEvent<HTMLInputElement>;

interface InputProps {
  value?: string;
  setValue(newValue: unknown): unknown;
}

export function Input({ value, setValue }: InputProps) {
  function parseInput({ currentTarget: { value: input } }: InputValue) {
    // Skip tests if the input is empty
    if (!input) setValue('');

    // Ignore inputs aren't digits or decimal separators
    if (!/^[\d.]*$/.test(input)) return;

    // Ignore inputs that have more than 1 decimal separator
    if (!/^[^.]*.[^.]*$/.test(input)) return;

    // If all tests passed, accept the input
    setValue(input);
  }

  return (
    <input
      className='bg-uphold-paper text-uphold-text text-5xl rounded-lg h-20 w-full mb-5 px-5 pr-40'
      value={value}
      onChange={parseInput}
      placeholder='0.00'
      aria-labelledby='currency amount'
    />
  );
}
