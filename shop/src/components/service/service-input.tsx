import { SearchIcon } from '../icons/search-icon';

export default function ServiceInput() {
  return (
    <div className='relative'>
      <input type='text' placeholder='Search by item, people, hashtag...' className='peer h-[48px] w-full pl-[68px] pr-[22px] placeholder-[#969696] text-dark-300 dark:text-white text-[14px] font-medium font-poppins border border-[#d3d3d3] dark:border-[#383838] bg-[#f8f8f8] dark:bg-[#141414] rounded-[100px]' />
      <SearchIcon className='h-[22px] w-[22px] absolute left-[30px] top-1/2 -translate-y-1/2 text-[#969696] peer-focus:text-dark-300 dark:peer-focus:text-white' />
    </div>
  )
}