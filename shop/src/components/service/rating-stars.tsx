import React from 'react';
import { StarIcon } from '../icons/star-icon';

export default function RatingStars({
  rating,
  stars = 5,
}: {
  rating: number;
  stars?: number;
}) {
  const stars_array = new Array(stars).fill(<StarIcon />);
  return (
    <div className="p-[5.52px] xl:p-[10px] flex items-center">
      <div className="space-x-[5.52px] xl:space-x-[10px] mr-[5.52px] xl:mr-[10px] flex">
        {stars_array.map((icon, index) => (
          <>
            {React.cloneElement(icon, {
              key: index,
              className:
                'h-[12.14px] xl:h-[22px] w-[12.14px] xl:w-[22px] text-[#FF8A00]',
            })}
          </>
        ))}
      </div>
      <div className="text-[7.73px] xl:text-[14px] font-poppins font-medium text-dark-300 dark:text-[#eee]">
        {rating}
      </div>
    </div>
  );
}
