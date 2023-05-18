import React from 'react';
import { StarIcon } from '../icons/star-icon';

export default function AuthorsRating({ rating, stars = 5 }: { rating: number, stars?: number }) {
  const stars_array = new Array(stars).fill(<StarIcon />);
  return (
    <div className='py-[6.1px] px-[12.2px] flex items-center'>
      <div className='space-x-[7.32px] mr-[7.32px] flex'>
        { stars_array.map((icon, index) => 
          <>
            { React.cloneElement(icon, {
              key: index,
              className: 'h-[12.84px] w-[12.84px] text-[#FF8A00]',
            }) }
          </>
        )}
      </div>
      <div className='text-[9.91px] font-poppins font-semibold text-dark-300 dark:text-[#FFB03A]'>
        { rating }
      </div>
    </div>
  )
}