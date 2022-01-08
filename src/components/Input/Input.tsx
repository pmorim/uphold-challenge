import { parseInput } from '../../utils';

interface InputProps {
  value: string;
  setValue(newValue: unknown): unknown;
}

export function Input({ value, setValue }: InputProps) {
  return (
    <input
      className='bg-uphold-paper text-uphold-text text-5xl rounded-lg h-20 w-full pl-5 pr-40 form-input focus:bg-white border-0 focus:border-2 focus:border-uphold-text focus:drop-shadow-none placeholder-uphold-muted'
      type='text'
      value={value}
      onChange={(e) => parseInput(e.currentTarget.value, setValue)}
      placeholder='0.00'
      aria-labelledby='currency amount'
    />
  );
}
