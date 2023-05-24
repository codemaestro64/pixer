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
    <div className='bg-white dark:bg-[#292929] rounded-[13.13px]'>
      <div className='px-[13px] py-[7px] text-[18px] text-[#878787] font-poppins font-medium whitespace-nowrap sticky top-0'>
        { title }
      </div>
      <div className='flex gap-[7px]'>
        { children }
      </div>
    </div>
  )
}

function CardItem({ data, to = 'community', button = 'join', index }: CardItemProps) {
  return (
    <div className={`px-[9px] py-[7px] flex items-center space-x-[11.16px] ${
      index >= 2 ? 'hidden' : ''
    }`}>
      <div>
        <div className={`relative w-[52.53px] h-[52.53px] overflow-hidden ${
          to === 'community' ?
            'rounded-[4.6px]' :
            'rounded-full'
        }`}>
          <Image src={data.image} alt={data.name} layout='fill' objectFit='cover' />
        </div>
      </div>
      <div>
        <div className='text-[14.45px] max-w-[200px] text-dark-300 dark:text-[#FEFEFE] font-extrabold font-poppins whitespace-nowrap truncate text-ellipsis'>
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
              <div className='text-[7.88px] font-medium font-poppins tracking-tighter mb-[-2px]'>
                { data.isOnline ? 'Online' : 'Offline' }
              </div>
            </div>
          ) }
        </div>
      </div>
      { to === 'community' ? (
        <div>
          <button className='w-[52.53px] h-[40.71px] flex items-center justify-center text-[7.88px] text-[#1CBA7F] dark:text-[#5DECB6] font-poppins italic font-semibold'>
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
    <div className='px-[12px] flex gap-[8px] overflow-x-scroll scrollbar-hide'>
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