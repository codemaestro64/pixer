import classNames from 'classnames';
import ProfileAnalyticsCard from '../profile/profile-analytics-card';
import {
  FollowersChart,
  SalesChart,
  LikesChart,
} from '@/assets/images/authors/charts';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';
import { Shop } from '@/types';
import { formatNumber } from '@/lib/constants';

export default function AuthorsAnalytics({ shop }: { shop: Shop }) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const onCarouselIndentifier = (nIdx: number) => {
    console.log('selected id index - ', nIdx);
    setSelectedIdx(nIdx);
  };

  useEffect(() => {
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  function updateWindowSize() {
    setIsMobile(window.innerWidth < 640 ? true : false);
  }

  const goPrev = () => {
    if (selectedIdx > 0) {
      setSelectedIdx(selectedIdx - 1);
    }
  };

  const goNext = () => {
    if (selectedIdx < 2) {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="scrollbar-hide xl:space-x-[15.92px] flex justify-center xl:justify-start xl:overflow-x-auto">
        <div className={`${selectedIdx === 0 ? 'block' : 'hidden'} xl:block`}>
          <ProfileAnalyticsCard
            to="Followers"
            value="12K"
            chart={
              <FollowersChart className="text-[#28C98C] dark:text-brand" />
            }
          />
        </div>
        <div className={`${selectedIdx === 1 ? 'block' : 'hidden'} xl:block`}>
          <ProfileAnalyticsCard
            to="Sales"
            value={formatNumber(shop.orders_count)}
            chart={
              <SalesChart className="text-[#042D6B] dark:text-[#ACCCFC]" />
            }
          />
        </div>
        <div className={`${selectedIdx === 2 ? 'block' : 'hidden'} xl:block`}>
          <ProfileAnalyticsCard
            to="Likes"
            value="410K"
            chart={
              <LikesChart className="text-[#4FF536] dark:text-[#3BF31D]" />
            }
          />
        </div>
      </div>
      <div
        className={`${
          isMobile ? '-bottom-4 gap-2' : 'top-[calc(50%-8px)]'
        } absolute justify-end  pr-[calc(50%-160px)]  z-10 flex w-full items-center sm:justify-between sm:px-[calc(50%-240px)] xl:hidden`}
      >
        <div
          onClick={goPrev}
          className={`${
            selectedIdx === 0
              ? isMobile
                ? 'block bg-light-900 hover:bg-light-900 hover:text-dark/90 cursor-default'
                : 'invisible'
              : 'block'
          } flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark/90 shadow-xl transition duration-300 hover:bg-light-200 hover:text-brand-dark focus:outline-none rtl:rotate-180 xl:h-9 xl:w-9`}
        >
          <ChevronLeft className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
        </div>
        <div
          onClick={goNext}
          className={`${
            selectedIdx === 2
              ? isMobile
                ? 'block bg-light-900 hover:bg-light-900 hover:text-dark/90 cursor-default'
                : 'invisible'
              : 'block'
          } flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark/90 shadow-xl transition duration-300 hover:bg-light-200 hover:text-brand-dark focus:outline-none rtl:rotate-180 xl:h-9 xl:w-9`}
        >
          <ChevronRight className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
        </div>
      </div>
      <div className="sm:h-4 h-8 xl:hidden ">
        <div className="space-x-[3px] flex mt-[9.27px] max-w-[342.72px] mx-auto px-[11px]">
          <button
            className={`${
              selectedIdx === 0 ? 'w-[20px] bg-brand' : 'w-[11px] bg-[#6B6B6B]'
            } block h-[4px] rounded-full`}
            onClick={() => onCarouselIndentifier(0)}
          ></button>
          <button
            className={`${
              selectedIdx === 1 ? 'w-[20px] bg-brand' : 'w-[11px] bg-[#6B6B6B]'
            } block h-[4px] rounded-full`}
            onClick={() => onCarouselIndentifier(1)}
          ></button>
          <button
            className={`${
              selectedIdx === 2 ? 'w-[20px] bg-brand' : 'w-[11px] bg-[#6B6B6B]'
            } block h-[4px] rounded-full`}
            onClick={() => onCarouselIndentifier(2)}
          ></button>
        </div>
      </div>
    </div>
  );
}
