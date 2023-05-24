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
        'text-[12.24px] text-[#545454] dark:text-[#EEEEEE]' :
        'text-[7.88px] text-[#656565] dark:text-[#FEFEFE]'
    }`}>
      <div className={to === 'banner' ? 'text-[#878787]' : ''}>
        { isPublic ? 'Public' : 'Private' }
      </div>
      <StarAltIcon className={`${
        to === 'banner' ? 
          'w-[10px] h-[10px] mx-[9px] first-letter:dark:text-[#DEDEDE]' :
          'w-[8px] h-[8px] mx-[8px]'
      }`} />
      <div className='whitespace-nowrap'>
        { members } Members
      </div>
    </div>
  )
}