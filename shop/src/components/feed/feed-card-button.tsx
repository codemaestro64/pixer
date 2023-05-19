import React from 'react';

interface FeedCardButtonProps {
  type: string;
  icon: React.ReactElement;
  activePossible?: boolean;
  label?: string;
  fillIcon?: React.ReactElement;
  menu?: boolean;
  toogleClicked?: any;
}

const FeedCardButton = ({
  type,
  label,
  icon,
  activePossible,
  fillIcon,
  menu,
  toogleClicked,
}: FeedCardButtonProps) => {
  const iconStyle =
    'w-[25.69px] h-[25.69px] md:w-[24.02px] md:h-[24.02px] 2xl:w-[27.62px] 2xl:h-[27.62px] transform transition-transform first-line:relative active:scale-75';

  return (
    <button
      onClick={() => toogleClicked?.(type)}
      className={`flex cursor-pointer items-center ${
        !menu
          ? 'font-poppins text-[14.99px] font-medium text-dark-300 dark:text-white md:text-[14.01px] 2xl:text-[16.11px]'
          : 'text-dark-700'
      }`}
    >
      <span className="relative mr-[6.42px] inline-block">
        {React.cloneElement(icon, {
          className: !menu
            ? iconStyle
            : 'w-[22.32px] h-[22.32px] md:w-[20.86px] md:h-[20.86px] 2xl:w-[24px] 2xl:h-[24px] transform transition-transform first-line:relative active:scale-75',
        })}
        {fillIcon && activePossible && Number(label) > 0
          ? React.cloneElement(fillIcon, {
              className: `${iconStyle} absolute bottom-[4px] text-brand-dark`,
            })
          : null}
      </span>
      <span>{label}</span>
    </button>
  );
};

export default FeedCardButton;
