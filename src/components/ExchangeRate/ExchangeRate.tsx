import { Currency } from '..';

interface ExchangeRateProps {
  value: string;
  name: string;
}

export function ExchangeRate({ value, name }: ExchangeRateProps) {
  return (
    <div key={name} className='flex flex-row w-full my-4 px-5'>
      <span className='block text-uphold-text font-semibold text-2xl truncate'>
        {value}
      </span>
      <span className='flex-grow' />
      <Currency className='mr-9' currency={name} />
    </div>
  );
}
