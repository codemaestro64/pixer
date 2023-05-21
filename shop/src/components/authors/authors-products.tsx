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
    <div className='px-[20px] xl:px-[16.5px] py-[10px] pt-[20px] xl:pt-[10px] bg-white dark:bg-[#292929] xl:rounded-[15px]'>
      {/* buttons */}
      <div className='xl:p-[14px] flex items-center'>
        <div className='flex items-center gap-[23px]'>
          <AuthorsButton label='Products' primary bold />
          <button className='h-[41px] xl:h-[48px] min-w-[120px] xl:min-w-[180px] px-[35px] text-[14px] xl:text-[18px] font-poppins text-[#9D9D9D] dark:text-[#434343] font-semibold rounded-[100px]'>
            Posts
          </button>
        </div>
        <div className='ml-auto flex gap-[10px] xl:gap-[42px]'>
          <MenuButton icon={<FilterIcon />} />
          <MenuButton icon={<EllipsisVerticalIcon className='rotate-90' />} />
        </div>
      </div>
      {/* products */}
      <div className='mt-[27px] xl:mt-[21px] pb-[10px] grid gap-x-[32px] 2xl:gap-x-[48px] gap-y-[32px] xl:gap-y-[21px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3'>
        { new Array(6).fill('').map((_, index) => (
          <AuthorProduct key={index} />
        ))}
      </div>
    </div>
  )
}