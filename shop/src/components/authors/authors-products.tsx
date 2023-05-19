import React from 'react';
import { AuthorsButton } from './authors-interactions';
import { FilterIcon } from '../icons/filter-icon';
import { EllipsisVerticalIcon } from '../icons/ellipsis-vertical-icon';
import AuthorProduct from './author-product';

function MenuButton({ icon }: { icon: React.ReactElement }) {
  const additionalClasses = icon.props?.className || '';
  return (
    <button className='text-[#C1C1C1] dark:text-white'>
      { React.cloneElement(icon, {
        className: 'w-[28px] h-[28px] ' + additionalClasses
      }) }
    </button>
  )
}

export default function AuthorsProducts() {
  return (
    <div className='px-[16.5px] py-[10px] bg-white dark:bg-[#292929] rounded-[15px]'>
      {/* buttons */}
      <div className='p-[14px] flex items-center'>
        <div className='flex gap-[23px]'>
          <AuthorsButton label='Products' primary bold />
          <button className='h-[48px] min-w-[180px] px-[35px] text-[18px] font-poppins text-[#9D9D9D] dark:text-[#434343] font-semibold rounded-[100px]'>
            Posts
          </button>
        </div>
        <div className='ml-auto flex gap-[42px]'>
          <MenuButton icon={<FilterIcon />} />
          <MenuButton icon={<EllipsisVerticalIcon className='rotate-90' />} />
        </div>
      </div>
      {/* products */}
      <div className='mt-[21px] pb-[10px] grid gap-x-[32px] 2xl:gap-x-[48px] gap-y-[21px] grid-cols-2 2xl:grid-cols-3'>
        { new Array(6).fill('').map((_, index) => (
          <AuthorProduct key={index} />
        ))}
      </div>
    </div>
  )
}