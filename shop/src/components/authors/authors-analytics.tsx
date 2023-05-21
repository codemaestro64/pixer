import AuthorsAnalyticsCard from './authors-analytics-card';
import { FollowersChart, SalesChart, LikesChart } from '@/assets/images/authors/charts';

export default function AuthorsAnalytics() {
  return (
    <div className='overflow-hidden'>
      <div className='xl:space-x-[15.92px] flex justify-center xl:justify-start xl:overflow-x-auto scrollbar-hide'>
        <AuthorsAnalyticsCard
          to='Followers'
          value='12K'
          chart={<FollowersChart className='text-[#28C98C] dark:text-brand' />}
        />
        <div className='hidden xl:block'>
          <AuthorsAnalyticsCard
            to='Sales'
            value='129K'
            chart={<SalesChart className='text-[#042D6B] dark:text-[#ACCCFC]' />}
          />
        </div>
        <div className='hidden xl:block'>
          <AuthorsAnalyticsCard
            to='Likes'
            value='410K'
            chart={<LikesChart className='text-[#4FF536] dark:text-[#3BF31D]' />}
          />
        </div>
      </div>
      <div className='xl:hidden'>
        <div className='space-x-[3px] flex mt-[9.27px] max-w-[342.72px] mx-auto px-[11px]'>
          <button className='block w-[20px] h-[4px] bg-brand rounded-full'></button>
          <button className='block w-[11px] h-[4px] bg-[#6B6B6B] rounded-full'></button>
          <button className='block w-[11px] h-[4px] bg-[#6B6B6B] rounded-full'></button>
        </div>
      </div>
    </div>
  )
}