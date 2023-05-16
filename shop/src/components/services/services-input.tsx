import { SearchIcon } from '../icons/search-icon';

export default function ServicesInput() {
  return (
    <div className='relative'>
      <input type='text' className='h-[39px] w-[52.84px] bg-transparent rounded-[6.29px] border border-[#454545]' />
      <SearchIcon className='w-[15.1px] h-[15.1px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark-800' />
    </div>
  )
}