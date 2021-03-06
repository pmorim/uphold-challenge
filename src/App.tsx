import { useState } from 'react';

import { ExchangeRatesList, Input, Select } from './components';
import { useExchangeRates } from './hooks';

import { ReactComponent as UpholdLogo } from './assets/logo/logo.svg';
import { supportedCurrencies } from './assets/currencies';

export function App() {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setCurrency] = useState('USD');
  const ratesMap = useExchangeRates(baseCurrency);

  return (
    <div className='max-w-container px-4 mx-auto my-14 text-center'>
      <header className='flex flex-col items-center mb-16'>
        <UpholdLogo className='mb-24' />

        <h1 className='text-uphold-title text-5xl font-bold my-8'>
          Currency Converter
        </h1>
        <h2 className='text-uphold-muted text-2xl'>
          Receive competitive and transparent pricing with no hidden spreads.
          See how we compare.
        </h2>
      </header>

      <main className='flex flex-col w-98'>
        <div className='sticky top-0 pt-2 mb-3 bg-white'>
          <Input value={amount} setValue={setAmount} />
          <Select
            value={baseCurrency}
            options={[...supportedCurrencies]}
            onChange={setCurrency}
          />
        </div>

        <ExchangeRatesList rates={ratesMap[baseCurrency]} amount={amount} />
      </main>
    </div>
  );
}
