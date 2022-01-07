interface CurrencyProps {
  currency: string;
  className?: string;
  selected?: boolean;
}

export function Currency({ currency, className, selected }: CurrencyProps) {
  return (
    <div
      className={`flex flex-row justify-start items-center space-x-2 w-16 ${
        className ?? ''
      }`}
    >
      <img
        className='w-6'
        src={`src/assets/currencies/${currency}.png`}
        alt={currency}
      />
      <span
        className={`block text-uphold-text font-semibold mr-10
        ${selected && 'font-extrabold'}`}
      >
        {currency}
      </span>
    </div>
  );
}
