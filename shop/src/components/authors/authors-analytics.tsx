import AuthorsAnalyticsCard from './authors-analytics-card';
import { FollowersChart, SalesChart, LikesChart } from '@/assets/images/authors/charts';

export default function AuthorsAnalytics() {
  return (
    <div className='overflow-hidden'>
      <div className='space-x-[15.92px] flex overflow-x-auto scrollbar-hide'>
        <AuthorsAnalyticsCard
          to='Followers'
          value='12K'
          chart={<FollowersChart className='text-[#28C98C] dark:text-brand' />}
        />
        <AuthorsAnalyticsCard
          to='Sales'
          value='129K'
          chart={<SalesChart className='text-[#042D6B] dark:text-[#ACCCFC]' />}
        />
        <AuthorsAnalyticsCard
          to='Likes'
          value='410K'
          chart={<LikesChart className='text-[#4FF536] dark:text-[#3BF31D]' />}
        />
      </div>
    </div>
  )
}