import { StarAltIcon } from '../icons/star-alt-icon';

interface PrivacyAndMembersIndicatorProps {
  isPublic?: boolean;
  members: string;
  to?: 'default' | 'banner'
}

export default function PrivacyAndMembersIndicator({ isPublic, members, to = 'default' }: PrivacyAndMembersIndicatorProps) {
  return (
    <div className={`flex items-center font-poppins font-medium ${
      to === 'banner' ?
        'text-[12.24px] xl:text-[14px] 2xl:text-[16px] text-[#545454] dark:text-[#EEEEEE]' :
        'text-[7.88px] xl:text-[10px] 2xl:text-[12px] text-[#656565] dark:text-[#FEFEFE]'
    }`}>
      <div className={to === 'banner' ? 'text-[#878787]' : ''}>
        { isPublic ? 'Public' : 'Private' }
      </div>
      <StarAltIcon className={
        to === 'banner' ? 
          'w-[10px] xl:w-[12px] 2xl:w-[13px] h-[10px] xl:h-[12px] 2xl:h-[13px] mx-[9px] first-letter:dark:text-[#DEDEDE]' :
          'w-[8px] xl:w-[10px] 2xl:w-[12px] h-[8px] xl:h-[10px] 2xl:h-[12px] mx-[8px]'
      } />
      <div className='whitespace-nowrap'>
        { members } Members
      </div>
    </div>
  )
}