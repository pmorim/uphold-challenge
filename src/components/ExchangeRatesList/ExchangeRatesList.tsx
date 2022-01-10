import { useBoolean } from 'usehooks-ts';

import { ExchangeRate, ShowAll, Skeleton } from '..';

interface ExchangeRatesListProps {
  rates: Rates;
  amount: string;
}

export function ExchangeRatesList({ rates, amount }: ExchangeRatesListProps) {
  const showAll = useBoolean(false);

  if (!rates)
    return (
      <span className='text-red-400 my-2'>
        Unfortunately, no exchange rates were found for this currency.
      </span>
    );

  if (!amount)
    return (
      <span className='text-uphold-muted my-2'>
        Enter an amount to check the rates.
      </span>
    );

  if (!rates.length)
    return (
      <>
        {[...Array(5)].map((_, idx) => (
          <Skeleton key={idx} />
        ))}
      </>
    );

  return (
    <>
      {rates
        .slice(0, showAll.value ? undefined : 10)
        .map(({ rate, currency }) => (
          <ExchangeRate
            key={currency}
            rate={rate}
            amount={amount}
            name={currency}
          />
        ))}

      <ShowAll show={showAll.value} toggle={showAll.toggle} />
    </>
  );
}
