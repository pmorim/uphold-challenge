import { Currency } from '..';
import { formatCurrency, limitDecimalPlaces } from '../../utils';

interface ExchangeRateProps {
  value: string;
  name: string;
}

export function ExchangeRate({ value, name }: ExchangeRateProps) {
  return (
    <div className='flex flex-row w-full py-4 px-5'>
      <span className='text-uphold-text font-semibold text-2xl truncate pl-1'>
        {formatCurrency(limitDecimalPlaces(value))}
      </span>
      <span className='flex-grow' />
      <Currency className='mr-10' currency={name} />
    </div>
  );
}
