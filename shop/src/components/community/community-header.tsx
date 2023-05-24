import Image from '@/components/ui/image';
import coverImage from '@/assets/images/community/cover-image.png';
import profileImage from '@/assets/images/community/community-profile-image.png';
import memberImage from '@/assets/images/community/member-1.png';
import { NotificationIcon } from '../icons/notification-icon';
import PrivacyAndMembersIndicator from './privacy-and-members-indicator';

function HeaderImage() {
  return (
    <div className='relative h-[141px] sm:h-[153px] 2xl:h-[213px] overflow-hidden rounded-[4.82px] 2xl:rounded-[10px] sm:rounded-[7.18px] z-[1]'>
      <Image src={coverImage} alt='Community Cover' layout='fill' objectFit='cover' />
    </div>
  )
}

function ProfileImage() {
  return (
    <div className='relative w-[77.1px] sm:w-[114.83px] 2xl:w-[160px] h-[77.1px] sm:h-[114.83px] 2xl:h-[160px] mt-[-65px] sm:mt-[-90px] 2xl:mt-[-126px] rounded-[15.42px] overflow-hidden z-[2]'>
      <Image src={profileImage} alt='Community Profile' layout='fill' objectFit='cover' />
    </div>
  )
}

function MemberSince() {
  return (
    <div className='text-[12px] 2xl:text-[14px] text-[#656565] font-medium font-poppins'>
      Member since July 2023
    </div>
  )
}

function CommunityName({ name }: { name: string }) {
  return (
    <div title={name} className='max-w-[213px] sm:max-w-none text-[17.48px] sm:text-[21.36px] 2xl:text-[28px] text-dark-300 dark:text-white font-poppins truncate text-ellipsis'>
      { name }
    </div>
  )
}

function NotificationButton() {
  return (
    <button className='w-[40.88px] sm:w-[47.29px] 2xl:w-[62px] h-[40.88px] sm:h-[47.29px] 2xl:h-[62px] flex items-center justify-center border border-[#CCCCCC] text-dark-300 dark:text-[#EEEEEE] dark:border-[#404040] bg-transparent rounded-full'>
      <NotificationIcon className='w-[15.82px] sm:w-[18.31px] 2xl:w-[24px] h-[15.82px] sm:h-[18.31px] 2xl:h-[24px]' />
    </button>
  )
}

function MembersGallery() {
  const gallery = new Array(5).fill(memberImage);
  
  return (
    <div className='flex items-center'>
      <div className='flex items-center space-x-[-11px]'>
        { gallery.map((image, index) => (
          <div key={index} className='h-[24px] xl:h-[26px] w-[24px] xl:w-[26px] border-2 border-[#292929] rounded-full relative bg-red-500'>
            <Image src={image} layout='fill' objectFit='cover' />
          </div>
        )) }
      </div>
      <button className='text-[7.65px] xl:text-[10px] text-[#767676] font-poppins font-medium block p-[5px]'>
        View All
      </button>
    </div>
  )
}

export default function CommunityHeader() {
  return (
    <div className='py-[18px] sm:py-[26px] 2xl:py-[34px] px-[6px] sm:px-[18px] 2xl:px-[24px] bg-white dark:bg-[#292929] rounded-[4.82px] sm:rounded-[7.18px]'>
      <HeaderImage />
      <div className='pl-[27px] sm:pl-[30px] 2xl:pl-[42px] flex justify-between'>
        <ProfileImage />
        <div className='pt-[5px] sm:pt-[10px] 2xl:pt-[14px] pr-[5px] sm:pr-[10px] 2xl:pr-[14px]'>
          <MemberSince />
        </div>
      </div>
      <div className='mt-[18px] 2xl:mt-[28px] grid grid-cols-[80%_20%]'>
        <div className='pl-[27px] sm:pl-[30px] 2xl:pl-[42px] 2xl:max-w-[600px]'>
          <CommunityName name='Motion Graphic &#38; Design Community' />
        </div>
        <div className='pr-[21px] sm:pr-[10px] self-center justify-self-end sm:row-span-2'>
          <NotificationButton />
        </div>
        <div className='mt-[14px] sm:mt-[8px] 2xl:mt-[10px] px-[22px] sm:px-[30px] 2xl:px-[42px] col-span-2 sm:col-span-1 flex flex-wrap gap-[9px] items-center'>
          <PrivacyAndMembersIndicator members='120.6k' to='banner' />
          <MembersGallery />
        </div>
      </div>
    </div>
  )
}