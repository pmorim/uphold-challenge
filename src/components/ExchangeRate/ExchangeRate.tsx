import { Currency } from '..';
import { applyRate, formatCurrency, limitDecimalPlaces } from '../../utils';

interface ExchangeRateProps {
  rate: string;
  amount: string;
  name: string;
}

export function ExchangeRate({ rate, amount, name }: ExchangeRateProps) {
  return (
    <div className='flex flex-row w-full py-4 px-5'>
      <span className='text-uphold-text font-semibold text-2xl truncate pl-1'>
        {formatCurrency(limitDecimalPlaces(applyRate(rate, amount)))}
      </span>
      <span className='flex-grow' />
      <Currency className='mr-10' currency={name} />
    </div>
  );
}
