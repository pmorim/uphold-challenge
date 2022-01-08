import { useMemo, useState } from 'react';
import lodash from 'lodash';

import { parseInput } from '../../utils';

interface InputProps {
  value: string;
  setValue(newValue: unknown): unknown;
}

export function Input({ value, setValue }: InputProps) {
  const [input, setInput] = useState(value);

  const debouncedParse = useMemo(
    () => lodash.debounce((input) => parseInput(input, setValue), 500),
    // Make sure to only create the debounced function once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function onChange({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>): void {
    setInput(newValue);
    debouncedParse(newValue);
  }

  return (
    <input
      className='bg-uphold-paper text-uphold-text text-5xl rounded-lg h-20 w-full pl-5 pr-40 form-input focus:bg-white border-0 focus:border-2 focus:border-uphold-text focus:drop-shadow-none placeholder-uphold-muted'
      type='text'
      value={input}
      onChange={onChange}
      placeholder='0.00'
      aria-labelledby='currency amount'
    />
  );
}
