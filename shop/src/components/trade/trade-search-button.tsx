import { SearchIcon } from "../icons/search-icon"

export default function TradeSearchButton() {
  return (
    <button className='w-[52px] lg:w-[58px] 2xl:w-[62px] h-[52px] lg:h-[58px] 2xl:h-[62px] flex items-center justify-center border border-[#D6D6D6] dark:border-[#8D8D8D] bg-transparent rounded-full'>
      <SearchIcon className='w-[20px] lg:w-[22px] 2xl:w-[24px] h-[20px] lg:h-[22px] 2xl:h-[24px] text-dark-800' />
    </button>
  )
}