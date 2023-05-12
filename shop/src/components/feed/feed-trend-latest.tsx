import FeedButton from './feed-button';
import { ArrowTrendUpIcon } from '../icons/arrow-trend-up-icon';
import { CompassIcon } from '../icons/compass-icon';
import { GridIcon } from '../icons/grid-icon';
import { SearchIcon } from '../icons/search-icon';

export default function FeedTrendLatest() {
  return (
    <div className='flex items-center'>
      <div className='flex gap-[16.3px] flex-wrap'>
        <div>
          <FeedButton label='Trending' icon={<ArrowTrendUpIcon />} isLarge isActive />
        </div>
        <div>
          <FeedButton label='Latest' icon={<CompassIcon />} isLarge />
        </div>
        <div className='hidden 2xl:block'>
          <FeedButton label='Search' icon={<SearchIcon />} isLarge />
        </div>
      </div>
      <div className='ml-auto'>
        <div>
          <button className='flex items-center justify-center h-[48px] w-[48px] md:h-[62px] md:w-[62px] bg-[#f8f8f8] dark:bg-[#171717] rounded-full text-dark-700 border border-[#ececec] dark:border-dark-200'>
            <GridIcon className='h-[18px] w-[18px] md:h-[24px] md:w-[24px]' />
          </button>
        </div>
      </div>
    </div>
  )
}