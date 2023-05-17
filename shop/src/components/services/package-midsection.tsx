import React from 'react';
import { CheckboxCircleIcon } from '../icons/checkbox-circle-icon';
import { TimeIcon } from '../icons/time-icon';
import { RestartIcon } from '../icons/restart-icon';

function FeatureItem({ feature, included = false }: { feature: string, included?: boolean }) {
  return (
    <div className='p-[7px] xl:p-[10px]'>
      <div className={`space-x-[7px] xl:space-x-[10px] flex items-center ${
        included ? 'text-dark-300 dark:text-white' : 'text-[#656565]'
      }`}>
        <CheckboxCircleIcon className='w-[16.59px] xl:w-[24px] h-[16.59px] xl:h-[24px]' />
        <span className='text-[11.06px] xl:text-[16px] font-medium font-poppins '>
          { feature }
        </span>
      </div>
    </div>
  )
}

function InfoMenuItem({ text, icon }: { text: string, icon: React.ReactElement }) {
  return (
    <div className='p-[7px] xl:p-[10px] space-x-[10px] xl:space-x-[16px] text-dark-300 dark:text-white flex items-center justify-center'>
      { React.cloneElement(icon, { 
        className: 'w-[16.59px] xl:w-[24px] h-[16.59px] xl:h-[24px]',
      }) }
      <div className='text-[11.06px] xl:text-[16px] font-poppins font-medium'>
        { text }
      </div>
    </div>
  )
}

function InfoMenu() {
  return (
    <div className='grid grid-cols-3 divide-x divide-[#434343]'>
      <InfoMenuItem text='1 Day Delivery' icon={<TimeIcon />} />
      <InfoMenuItem text='5 Revision' icon={<RestartIcon />} />
    </div>
  )
}

function PriceTag({ price }: { price: string }) {
  return (
    <div>
      <div className='text-[17.97px] xl:text-[26px] text-dark-300 dark:text-white font-poppins font-medium'>
        { price }
      </div>
      <div className='text-[11.06px] xl:text-[16px] text-[#989898] font-medium font-poppins italic'>
        Save up to 10% with Subscribe to save
      </div>
    </div>
  )
}

export default function PackageMidSection() {
  return (
    <div className='p-[7px] xl:p-[10px] space-y-[10px] xl:space-y-[14px]'>
      <div>
        <PriceTag price='USD $45' />
      </div>
      <div>
        <div className='text-[11.06px] xl:text-[16px] text-dark-300 dark:text-white font-poppins font-medium'>
          1 Professional Banner 1 professional banner design + Unlimited Revision
        </div>
      </div>
      <div>
        <InfoMenu />
      </div>
      <div className='space-y-[10px] xl:space-y-[14px] 3xl:mx-[-10px]'>
        <FeatureItem feature='1 Banner' included />
        <FeatureItem feature='Included Sources File' />
      </div>
    </div>
  )
}