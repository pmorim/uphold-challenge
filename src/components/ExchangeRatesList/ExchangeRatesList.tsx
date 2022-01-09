import { ExchangeRate } from '..';

interface ExchangeRatesListProps {
  rates: Rates;
  amount: string;
}

export function ExchangeRatesList({ rates, amount }: ExchangeRatesListProps) {
  if (!rates)
    return (
      <span className='text-red-400 my-2 text-md'>
        Unfortunately, no exchange rates were found for this currency.
      </span>
    );

  if (!amount)
    return (
      <span className='text-uphold-muted my-2 text-md'>
        Enter an amount to check the rates.
      </span>
    );

  return (
    <>
      {rates?.map(({ rate, currency }) => (
        <ExchangeRate
          key={currency}
          rate={rate}
          amount={amount}
          name={currency}
        />
      ))}
    </>
  );
}
