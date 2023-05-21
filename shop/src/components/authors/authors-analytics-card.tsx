import React from 'react';
import { ArrowRightUpIcon } from '../icons/arrow-right-up-icon';

export default function AuthorsAnalyticsCard({ to, value, chart }: { to: string, value: string, chart?: React.ReactElement }) {
  const additionalChartClasses = chart?.props?.className || '';

  return (
    <div className='p-[15.13px] xl:p-[17.68px] bg-white xl:bg-white dark:bg-[#292929] rounded-[17.68px] border border-dashed border-[#DFDFDF] dark:border-[#464646]'>
      <div className='flex'>
        <div className='mr-[24.2px] xl:mr-[28.29px]'>
          <div className='text-[46.9px] xl:text-[54.82px] text-[#0D0D0D] dark:text-white font-poppins font-semibold uppercase'>
            { value }
          </div>
          <div className='text-[13.62px] xl:text-[15.92px] text-[#0D0D0D] dark:text-white font-poppins font-medium opacity-50'>
            { to }
          </div>
        </div>
        <div className='p-[7.56px] xl:p-[8.84px]'>
          { chart ? (
            React.cloneElement(chart, {
              className: 'w-[197.13px] xl:w-[230.44px] h-[75.89px] xl:h-[88.71px] ' + additionalChartClasses
            })
          ) : (
            <div className='w-[197.13px] xl:w-[230.44px] h-[75.89px] xl:h-[88.71px]'></div>
          ) }
        </div>
      </div>
      <div className='mt-[12.86px] xl:mt-[15.03px]'>
        <div className='space-x-[4.54px] xl:space-x-[5.31px] flex items-center'>
          <ArrowRightUpIcon className='w-[18.15px] h-[18.15px] xl:w-[21.22px] xl:h-[21.22px] text-[#28C98C] dark:text-brand' />
          <div className='text-[10.59px] xl:text-[12.38px] text-[#0D0D0D80] dark:text-white font-poppins font-medium flex'>
            <span className='font-bold'>
              +16%&nbsp;
            </span>
            <span className='opacity-100 dark:opacity-40'>
              from previous week
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}