import React from 'react';
import { GitCommitFillIcon } from '../icons/git-commit-fill-icon';
import { GitCommitLineIcon } from '../icons/git-commit-line-icon';

export default function ServicesSubmenu() {
  const submenuItems = [
    { name: 'Overview', active: true },
    { name: 'Description' },
    { name: 'About the seller' },
    { name: 'Compare Package' },
    { name: 'Recommended' },
    { name: 'FAQ' },
    { name: 'Review' },
  ];
  const lastIndex = submenuItems.length - 1;

  function getIcon(active: boolean) {
    return active ? <GitCommitFillIcon /> : <GitCommitLineIcon />
  }
  
  return (
    <div className='px-[11px] xl:px-[42px] flex overflow-x-auto scrollbar-hide'>
      { submenuItems.map(({ name, active = false}, index) => (
        <button key={index} className={`text-[12.13px] xl:text-[16px] py-[14px] xl:py-[19px] px-[7.58px] xl:px-[10px] font-poppins flex items-center ${
          active ?
            'text-brand italic font-semibold space-x-[9.1px] xl:space-x-[12px]' :
            'text-[#656565] font-medium space-x-[7.58px] xl:space-x-[10px]'
        }`}>
          <div className='whitespace-nowrap'>{ name }</div>
          { index !== lastIndex ? React.cloneElement(getIcon(active), {
            className: `h-[18.19px] xl:h-[24px] w-[18.19px] xl:w-[24px] ${
              active ? 'text-brand' : 'text-[#434343]'
            }`
          }) : null }
        </button>
      )) }
    </div>
  )
}