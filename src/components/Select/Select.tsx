import { Listbox } from '@headlessui/react';

import { Currency } from '..';

import { ReactComponent as DropdownIcon } from '../../assets/icons/dropdown-icon.svg';

interface SelectProps {
  value: string;
  options: string[];
  onChange(newValue: unknown): unknown;
}

export function Select({ value, options, onChange }: SelectProps) {
  return (
    <div className='absolute top-6 right-6 bg-white rounded-full px-5 py-3 flex justify-center items-center'>
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button className='relative w-full flex flex-row justify-center items-center space-x-2'>
          <Currency currency={value} />
          <DropdownIcon className='text-gray-400' aria-hidden='true' />
        </Listbox.Button>

        <Listbox.Options className='absolute top-12 w-full max-h-36 py-1 mt-1 overflow-y-scroll overflow-x-hidden bg-white rounded-lg drop-shadow-xl scrollbar-none'>
          {options.map((option) => (
            <Listbox.Option
              className={({ active }) =>
                `${active && 'bg-uphold-muted'}
                cursor-default select-none relative py-2 pl-5`
              }
              key={option}
              value={option}
            >
              <Currency currency={option} />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
