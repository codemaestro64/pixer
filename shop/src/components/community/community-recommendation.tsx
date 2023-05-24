import Image from '@/components/ui/image';
import profileImage from '@/assets/images/community/community-profile-image.png';
import memberImage from '@/assets/images/community/member-1.png';
import { StarAltIcon } from '../icons/star-alt-icon';
import PrivacyAndMembersIndicator from './privacy-and-members-indicator';

interface RecommendationCardProps {
  title: string; 
  children: React.ReactNode;
}

interface CardItemProps {
  data: {
    name: string;
    image: StaticImageData;
    isPublic?: boolean;
    isOnline?: boolean;
    members?: string;
  }
  index: number;
  button?: 'join' | 'watch';
  to?: 'community' | 'friends';
}

function RecommendationCard({ title, children }: RecommendationCardProps) {
  return (
    <div className='bg-white dark:bg-[#292929] rounded-[13.13px] sm:min-w-[276px]'>
      <div className='px-[13px] 2xl:px-[20px] py-[7px] 2xl:py-[10px] text-[18px] 2xl:text-[22px] text-[#878787] font-poppins font-medium whitespace-nowrap sticky top-0'>
        { title }
      </div>
      <div className='flex gap-[7px] 2xl:gap-[10px] sm:flex-col sm:pb-[4px] 2xl:pb-0 2xl:mt-[10px]'>
        { children }
      </div>
    </div>
  )
}

function CardItem({ data, to = 'community', button = 'join', index }: CardItemProps) {
  return (
    <div className={`px-[9px] 2xl:px-[14px] py-[7px] 2xl:py-[10px] items-center gap-[11.16px] 2xl:gap-[16px] ${
      index >= 2 ? 'hidden xl:flex' : 'flex'
    }`}>
      {/* image */}
      <div>
        <div className={`relative w-[52.53px] 2xl:w-[80px] h-[52.53px] 2xl:h-[80px] overflow-hidden ${
          to === 'community' ?
            'rounded-[4.6px] 2xl:rounded-[7px]' :
            'rounded-full'
        }`}>
          <Image src={data.image} alt={data.name} layout='fill' objectFit='cover' />
        </div>
      </div>
      {/* name and privacy & status */}
      <div>
        <div title={data.name} className='text-[14.45px] 2xl:text-[22px] max-w-[200px] text-dark-300 dark:text-[#FEFEFE] font-extrabold font-poppins whitespace-nowrap truncate text-ellipsis'>
          { data.name }
        </div>
        <div className='mt-[2px]'>
          { to === 'community' ? (
            data.members && <PrivacyAndMembersIndicator members={data.members} />
          ) : (
            <div className={`px-[10px] space-x-[12px] flex items-center ${
              data.isOnline ?
                'text-[#33AB7E] dark:text-[#9DF9B2]' :
                'text-[#656565] dark:text-[#878787]' 
              }`
            }>
              <StarAltIcon className='w-[12px] h-[12px]' />
              <div className='text-[7.88px] xl:text-[10px] 2xl:text-[12px] font-medium font-poppins tracking-wider mb-[-2px] xl:mb-0 2xl:mb-[-2px]'>
                { data.isOnline ? 'Online' : 'Offline' }
              </div>
            </div>
          ) }
        </div>
      </div>
      { to === 'community' ? (
        <div className='ml-auto'>
          <button className='w-[52.53px] 2xl:w-[80px] h-[40.71px] 2xl:h-[62px] ml-auto flex items-center justify-center text-[7.88px] xl:text-[10px] 2xl:text-[12px] text-[#1CBA7F] dark:text-[#5DECB6] font-poppins italic font-semibold tracking-wider'>
            { button === 'join' ? 'Join' : 'Watch' }
          </button>
        </div>
      ) : null }
    </div>
  )
}

export default function CommunityRecommendation() {
  const similar = [
    {
      name: 'UI Design Canen',
      isPublic: false,
      members: '18k',
      image: profileImage,
    },
    {
      name: 'Fashion School',
      isPublic: true,
      members: '18k',
      image: profileImage,
    },
    {
      name: 'CoffeeWakes',
      isPublic: true,
      members: '189k',
      image: profileImage,
    },
  ];

  const my_community = [
    {
      name: 'UX Career & Grow',
      isPublic: false,
      members: '18k',
      image: profileImage,
    },
    {
      name: 'Jobs2023',
      isPublic: true,
      members: '18k',
      image: profileImage,
    },
    {
      name: 'CoffeeSipsa',
      isPublic: true,
      members: '189k',
      image: profileImage,
    },
  ];

  const friends = [
    {
      name: 'Jessy Wills',
      image: memberImage,
      isOnline: true
    },
    {
      name: 'Jessy Wills',
      image: memberImage,
      isOnline: false
    },
    {
      name: 'Jessy Wills',
      image: memberImage,
      isOnline: true
    },
  ];
  
  return (
    <div className='px-[12px] sm:px-[26px] xl:px-0 flex xl:flex-col gap-[8px] 2xl:gap-[12px] overflow-x-scroll scrollbar-hide'>
      <RecommendationCard title='Similar Community'>
        { similar.map((data, index) => (
          <CardItem
            key={index}
            data={data}
            index={index}
          />
        ))}
      </RecommendationCard>
      <RecommendationCard title='My Community'>
        { my_community.map((data, index) => (
          <CardItem
            key={index}
            data={data}
            index={index}
            button='watch'
          />
        )) }
      </RecommendationCard>
      <RecommendationCard title='Friends'>
        { friends.map((data, index) => (
          <CardItem
            key={index}
            data={data}
            index={index}
            to='friends'
          />
        )) }
      </RecommendationCard>
    </div>
  )
}