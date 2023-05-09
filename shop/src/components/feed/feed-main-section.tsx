import feedCardImage from '@/assets/images/feed/feed-card-image.png';
import teamImage from '@/assets/images/omnico-team.png';
import FeedMenu from '@/components/feed/feed-menu';
import FeedInput from '@/components/feed/feed-input';
import FeedActions from '@/components/feed/feed-actions';
import FeedTrendLatest from '@/components/feed/feed-trend-latest';
import FeedCard from '@/components/feed/feed-card';

export default function FeedMainSection({ is2xl = false }: { is2xl: boolean }) {
  return (
    <div className='2xl:mr-[482px]'>
      <div className='pt-[10px] md:pt-[20px] 2xl:pt-[0px] px-[10px] md:px-[29px]'>
        { !is2xl ? (
          <div className='px-[5px] md:px-[12px]'>
            <FeedMenu />
          </div>
        ) : null }
        <div className='mt-[13px] md:mt-[19px] 2xl:mt-[12px]'>
          <FeedInput />
        </div>
        <div className='mt-[6px] md:mt-[7px]'>
          <FeedActions />
        </div>
        <div className='mt-[14px] md:mt-[24px] 2xl:mt-[29px]'>
          <FeedTrendLatest />
        </div>
      </div>
      <div className='mt-[21px] 2xl:mt-[32px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-2 3xl:grid-cols-3 gap-[14px] md:gap-[16px] 2xl:gap-[18px] px-[29px] md:px-[16px] 2xl:px-[29px] pb-[28px]'>
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
        </div>
      </div>
    </div>
  )
}