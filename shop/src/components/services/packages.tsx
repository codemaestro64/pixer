import React from 'react';
import PackageMidSection from './package-midsection';
import { HeartIcon } from '../icons/heart-icon';
import { DetailsIcon } from '../icons/details-icon';

function ActionButton({ icon }: { icon: React.ReactElement }) {
  return (
    <button className='w-[42.85px] xl:w-[62px] h-[42.85px] xl:h-[62px] text-dark-800 dark:text-[#787878] flex items-center justify-center rounded-full border border-dark-800 dark:border-[#393939]'>
      { React.cloneElement(icon, {
        className: 'w-[16.59px] xl:w-[24px] h-[16.59px] xl:h-[24px]',
      }) }
    </button>
  )
}

function PackageButton({ label, primary = false }: { label: string, primary?: boolean }) {
  return (
    <button className={`py-[12.62px] xl:py-[18.5px] tracking-wider font-poppins font-medium uppercase block w-full ${
      primary ? 'text-[12.44px] xl:text-[18px] text-white bg-brand' : 'text-[11.06px] xl:text-[16px] text-dark-450 dark:text-white border border-dark-450 bg-transparent'
    }`}>
      { label }
    </button>
  )
}

function PackageTitle({ title, active = false }: { title: string, active?: boolean }) {
  return (
    <div className={`px-[13.82px] py-[9.43px] ${
      !active ? 'hidden 3xl:block 3xl:text-[#BFBFBF] 3xl:dark:text-[#767676]' : 'text-brand'
    }`}>
      <div className='text-[16px] xl:text-[18px] font-bold 3xl:font-medium xl:font-medium font-poppins tracking-wider uppercase 3xl:flex 3xl:justify-center'>
        { title }
      </div>
    </div>
  )
}

export default function Package() {
  return (
    <div className='space-y-[17px] xl:space-y-[24px]'>
      <div className='grid grid-cols-3 py-[10px] border-b 3xl:border-0 border-b-[#EBEBEB] dark:border-b-[#353535] 3xl:divide-x 3xl:divide-[#DDDDDD] 3xl:dark:divide-[#2E2E2E]'>
        <PackageTitle title='Basic' active />
        <PackageTitle title='Standard' />
        <PackageTitle title='Premium' />
      </div>
      <div>
        <PackageMidSection />
      </div>
      <div className='space-y-[10px] xl:space-y-0 3xl:space-y-[14px] xl:flex 3xl:block xl:space-x-[14px] 3xl:space-x-0'>
        <PackageButton label='Continue' primary />
        <PackageButton label='Compare Package' />
      </div>
      <div className='flex items-center space-x-[11.06px] xl:space-x-[16px]'>
        <ActionButton icon={<HeartIcon />} />
        <ActionButton icon={<DetailsIcon />} />
      </div>
    </div>
  )
}