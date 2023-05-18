import React from 'react';

export default function FeedButtonAlt({
  icon,
  label,
  onChooseFiles,
}: {
  icon: React.ReactElement;
  label: String;
  onChooseFiles: any;
}) {
  return (
    <button
      className="flex h-[46px] w-[53.23px] cursor-pointer items-center justify-center rounded-[88.46px] bg-[#f7f7f7] font-poppins text-[12px] font-medium text-brand hover:bg-light-800 dark:bg-[rgba(7,84,55,0.13)] hover:dark:bg-dark-600 md:w-auto md:px-[26px] 2xl:text-[14.15px]"
      onClick={onChooseFiles}
    >
      <span>
        {React.cloneElement(icon, { className: 'h-[21.23px] w-[21.23px]' })}
      </span>
      <span className="hidden dark:text-white md:ml-[12px] md:inline-block">
        {label}
      </span>
    </button>
  );
}
