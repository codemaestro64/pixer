import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { DropdownIcon } from '@/components/icons/post/dropdown-icon';
import cn from 'classnames';

interface DropdownProps {
  egValue: string;
  values: string[];
  selectedValue: string;
  setSelectedValue: any;
}

export default function Dropdown({
  egValue,
  values,
  selectedValue,
  setSelectedValue,
}: DropdownProps) {
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  return (
    <>
      <select
        id="small"
        className="h-11 w-full appearance-none rounded-[10px] border border-light-500 bg-transparent px-4 py-2 font-poppins text-13px text-dark ring-[0.5px] ring-light-500 focus:border-brand focus:ring-[0.5px] focus:ring-brand dark:border-dark-600  dark:text-light dark:ring-dark-600 dark:focus:border-brand dark:focus:ring-brand md:h-12 lg:px-5 xl:h-[50px]"
        value={selectedValue}
        onChange={selectChange}
      >
        <option
          className="bg-light text-gray-800 dark:bg-dark-300 dark:text-light"
          value=""
          disabled
          selected
        >
          {egValue}
        </option>
        {values.map((item) => (
          <option
            className="bg-light text-gray-800 dark:bg-dark-300 dark:text-light"
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
