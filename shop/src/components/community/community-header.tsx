import Image from '@/components/ui/image';
import coverImage from '@/assets/images/community/cover-image.png';
import profileImage from '@/assets/images/community/community-profile-image.png';
import memberImage from '@/assets/images/community/member-1.png';
import { NotificationIcon } from '../icons/notification-icon';
import PrivacyAndMembersIndicator from './privacy-and-members-indicator';

function HeaderImage() {
  return (
    <div className='relative h-[141px] overflow-hidden rounded-[4.82px] z-[1]'>
      <Image src={coverImage} alt='Community Cover' layout='fill' objectFit='cover' />
    </div>
  )
}

function ProfileImage() {
  return (
    <div className='relative w-[77.1px] h-[77.1px] mt-[-65px] rounded-[15.42px] overflow-hidden z-[2]'>
      <Image src={profileImage} alt='Community Profile' layout='fill' objectFit='cover' />
    </div>
  )
}

function MemberSince() {
  return (
    <div className='text-[12px] text-[#656565] font-medium font-poppins'>
      Member since July 2023
    </div>
  )
}

function CommunityName() {
  return (
    <div className='max-w-[213px] text-[17.48px] text-dark-300 dark:text-white font-poppins truncate-text-line-two'>
      Motion Graphic &#38; Design Community
    </div>
  )
}

function NotificationButton() {
  return (
    <button className='flex items-center justify-center w-[40.88px] h-[40.88px] border border-[#CCCCCC] dark:border-[#404040] bg-transparent rounded-full'>
      <NotificationIcon className='w-[15.82px] h-[15.82px]' />
    </button>
  )
}

function MembersGallery() {
  const gallery = new Array(5).fill(memberImage);
  
  return (
    <div className='flex items-center'>
      <div className='flex items-center space-x-[-11px]'>
        { gallery.map((image, index) => (
          <div key={index} className='h-[24px] w-[24px] border-2 border-[#292929] rounded-full relative bg-red-500'>
            <Image src={image} layout='fill' objectFit='cover' />
          </div>
        )) }
      </div>
      <button className='text-[7.65px] text-[#767676] font-poppins font-medium block p-[5px]'>
        View All
      </button>
    </div>
  )
}

export default function CommunityHeader() {
  return (
    <div className='py-[18px] px-[6px] bg-white dark:bg-[#292929] rounded-[4.82px]'>
      <HeaderImage />
      <div className='pl-[27px] flex justify-between'>
        <ProfileImage />
        <div className='pt-[5px] pr-[5px]'>
          <MemberSince />
        </div>
      </div>
      <div className='mt-[18px] grid grid-cols-[70%_30%]'>
        <div className='pl-[27px]'>
          <CommunityName />
        </div>
        <div className='pr-[21px] self-center justify-self-end'>
          <NotificationButton />
        </div>
        <div className='mt-[14px] px-[22px] space-x-[9px] col-span-2 flex items-center'>
          <PrivacyAndMembersIndicator members='120.6k' to='banner' />
          <MembersGallery />
        </div>
      </div>
    </div>
  )
}