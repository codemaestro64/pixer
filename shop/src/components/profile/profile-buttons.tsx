import React from 'react';

export function ProfileMenuButton({ icon }: { icon: React.ReactElement }) {
  const additionalClasses = icon.props?.className || '';
  return (
    <button className="text-[#C1C1C1] dark:text-white">
      {React.cloneElement(icon, {
        className: 'w-[28px] h-[28px] ' + additionalClasses,
      })}
    </button>
  );
}

export function ProfilePostProductButton({
  label,
  active,
  toggleAction,
}: {
  label: string;
  active: boolean;
  toggleAction?: any;
}) {
  return (
    <button
      onClick={toggleAction}
      className={`min-w-[120px] max-w-[180px] px-[35px] font-poppins rounded-[100px] text-[16px] xl:text-[18px] h-[41px] font-semibold ${
        active
          ? 'text-white bg-brand'
          : 'text-[#9D9D9D] dark:text-[#434343] rounded-[100px]'
      }`}
    >
      {label}
    </button>
  );
}
