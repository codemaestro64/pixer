import { SearchIcon } from '../icons/search-icon';

export default function ServicesInput() {
  return (
    <div className='relative'>
      <input type='text' placeholder='Search For Gigs' className='peer h-[39px] xl:h-[62px] w-[52.84px] xl:w-[389px] xl:pl-[64px] bg-transparent rounded-[6.29px] xl:rounded-[10px] border border-[#454545] xl:border-[#D4D4D4] xl:dark:border-[#454545] placeholder-transparent text-[16px] text-dark-300 dark:text-white font-poppins font-medium xl:placeholder-dark-800' />
      <SearchIcon className='w-[15.1px] xl:w-[24px] h-[15.1px] xl:h-[24px] absolute left-1/2 xl:left-[24px] top-1/2 -translate-x-1/2 xl:translate-x-0 -translate-y-1/2 text-dark-800 peer-focus:text-dark-300 dark:peer-focus:text-white' />
    </div>
  )
}