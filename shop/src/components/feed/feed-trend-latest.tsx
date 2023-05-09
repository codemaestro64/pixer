import FeedButton from "./feed-button"
import { ArrowTrendUpIcon } from "../icons/arrow-trend-up-icon"
import { CompassIcon } from "../icons/compass-icon"
import { SearchIcon } from "../icons/search-icon"

export default function FeedTrendLatest() {
  return (
    <div className='flex items-center'>
      <div className='flex gap-[16.3px] flex-wrap'>
        <div>
          <FeedButton label="Trending" icon={<ArrowTrendUpIcon className="h-[19.57px] w-[19.57px]" />} isActive isLarge />
        </div>
        <div>
          <FeedButton label="Latest" icon={<CompassIcon className="h-[19.57px] w-[19.57px]" />} isLarge />
        </div>
      </div>
      <div className='ml-auto'>
        <div>
          <button className='flex items-center justify-center h-[48px] w-[48px] bg-[#f8f8f8] dark:bg-[#171717] rounded-full text-dark-700 border border-[#ececec] dark:border-dark-200'>
            <SearchIcon className="h-[18px] w-[18px] fill-current" />
          </button>
        </div>
      </div>
    </div>
  )
}