import { iconMap } from '../../assets/currencies';

interface CurrencyProps {
  currency: string;
  className?: string;
}

export function Currency({ currency, className }: CurrencyProps) {
  return (
    <div
      className={`flex flex-row justify-start items-center space-x-2 w-16
      ${className ?? ''}`}
    >
      <img className='w-6' src={iconMap[currency]} alt={currency} />
      <span className='block text-uphold-text font-semibold mr-10'>
        {currency}
      </span>
    </div>
  );
}
