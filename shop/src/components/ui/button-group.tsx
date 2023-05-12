import cn from 'classnames';
import { motion } from 'framer-motion';
import { RadioGroup } from '@headlessui/react';
import { useTranslation } from 'next-i18next';

type TSelectedItem = {
  label: string;
  range: number;
};

interface ButtonGroupProps {
  items: TSelectedItem[];
  selectedValue: TSelectedItem;
  onChange: React.Dispatch<React.SetStateAction<TSelectedItem>>;
}

export default function ButtonGroup({
  items,
  selectedValue,
  onChange,
}: ButtonGroupProps) {
  const { t } = useTranslation('common');
  return (
    <RadioGroup value={selectedValue} onChange={onChange}>
      <RadioGroup.Label className="sr-only">Button Group</RadioGroup.Label>
      <div className="grid grid-cols-3 gap-[7.34px]">
        {items.map((item) => (
          <RadioGroup.Option
            key={t(item.label)}
            value={item}
            className="outline-none"
          >
            {({ checked }) => (
              <div className={`relative z-[1] cursor-pointer rounded-[56px] h-[35px] font-poppins text-[10.16px] font-medium capitalize flex items-center justify-center border ${ !checked ? 'text-[#6A6969] dark:text-[#6A6969] border-[#ddd] dark:border-[#404040]' : 'text-white bg-brand border-brand' }`}>
                {/* <RadioGroup.Label
                  className={cn(
                    'cursor-pointer',
                    checked
                      ? 'text-dark'
                      : 'text-dark-700 hover:text-dark dark:text-light-800 dark:hover:text-light'
                  )}
                > */}
                  {t(item.label)}
                {/* </RadioGroup.Label> */}
                {/* {checked && (
                  <motion.div
                    className="absolute left-0 right-0 bottom-0 -z-[1] h-full rounded-3xl bg-light-400 dark:bg-light-100"
                    layoutId="activeIndicator"
                  />
                )} */}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
