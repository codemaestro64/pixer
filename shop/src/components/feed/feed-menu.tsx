import { useState, useEffect } from 'react';
import FeedButton from './feed-button';
import { CompassIcon } from '../icons/compass-icon';
import { PictureIcon } from '../icons/picture-icon';
import { SearchIcon } from '../icons/search-icon';

export default function FeedMenu() {
  const [placeholder, setPlaceholder] = useState('Search')

  function updateInputPlaceholder() {
    setPlaceholder(window.innerWidth < 768 ? 'Search' : 'Search by item, people, hashtag...')
  }

  useEffect(() => {
    updateInputPlaceholder()
    window.addEventListener('resize', updateInputPlaceholder)
    return () => window.removeEventListener('resize', updateInputPlaceholder)
  }, [])

  return (
    <ul className='grid grid-cols-3 md:grid-cols-[1fr_1fr_2fr] gap-3'>
      <li>
        <FeedButton label='Explore' icon={<CompassIcon />} isActive />
      </li>
      <li>
        <FeedButton label='Photos' icon={<PictureIcon />} />
      </li>
      <li className='md:border-l md:border-light-900 md:dark:border-[#393939] md:pl-[10px]'> 
        <div className='relative'>
          <input type='text' placeholder={placeholder} className='peer w-full font-poppins font-semibold md:font-medium text-[12.06px] md:text-[14px] py-[11.64px] pl-[54.84px] pr-[22.84px] rounded-[86.12px] bg-[#f8f8f8] dark:bg-dark-100 dark:focus:bg-[rgba(3,101,82,0.16)] border border-[#D5D5D5] dark:border-[#434343] h-[41.34px] placeholder:text-dark-850 dark:placeholder:text-[#434343]' />
          <span className='absolute top-1/2 left-[28.84px] md:left-[30.84px] -translate-x-1/2 -translate-y-1/2 text-dark-850 dark:text-[#434343] peer-focus:text-[rgb(74,74,74)] dark:peer-focus:text-white'>
            <SearchIcon className='h-[18px] md:h-[22px] w-[18px] md:w-[22px]' />
          </span>
        </div>
      </li>
    </ul>
  )
}