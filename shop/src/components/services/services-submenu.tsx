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
    <div className='px-[11px] flex overflow-x-auto scrollbar-hide'>
      { submenuItems.map(({ name, active = false}, index) => (
        <button key={index} className={`text-[12.13px] py-[14px] px-[7.58px] font-poppins flex items-center ${
            active ?
              'text-[#58F9BC] italic font-semibold space-x-[9.1px]' :
              'text-[#656565] font-medium space-x-[7.58px]'
          }`}>
          <div className='whitespace-nowrap'>{ name }</div>
          { index !== lastIndex ? React.cloneElement(getIcon(active), {
            className: `h-[18.19px] w-[18.19px] ${
              active ? 'text-brand' : 'text-[#434343]'
            }`
          }) : null }
        </button>
      )) }
    </div>
  )
}