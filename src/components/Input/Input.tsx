import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

interface InputProps {
  value: string;
  setValue(newValue: unknown): unknown;
}

export function Input({ value, setValue }: InputProps) {
  const [fakeValue, setFakeValue] = useState(value);

  // Update the real value once the user stops typing
  const updateValue = useMemo(() => debounce(setValue, 250), [setValue]);
  useEffect(() => {
    updateValue(fakeValue);
  }, [updateValue, fakeValue]);

  // Parse the user's input
  function parseInput(event: React.FormEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;

    // Skip tests if the input is empty
    if (!input) setFakeValue('');

    // Ignore inputs aren't digits or decimal separators
    if (!/^[\d.]*$/.test(input)) return;

    // Ignore inputs that have more than 1 decimal separator
    if (!/^[^.]*.[^.]*$/.test(input)) return;

    // If all tests passed, accept the input
    setFakeValue(input);
  }

  return (
    <input
      className='bg-uphold-paper text-uphold-text text-5xl rounded-lg h-20 w-full pl-5 pr-40 form-input focus:bg-white border-0 focus:border-2 focus:border-uphold-text focus:drop-shadow-none placeholder-uphold-muted'
      type='text'
      placeholder='0.00'
      aria-labelledby='currency amount'
      value={fakeValue}
      onChange={parseInput}
    />
  );
}
