import { StarAltIcon } from "../icons/star-alt-icon"

export default function PrivacyAndMembersIndicator({ isPublic, members }: { isPublic?: boolean, members: string }) {
  return (
    <div className='flex items-center font-[12.24px] font-poppins font-medium'>
      <div className='text-[#878787]'>
        { isPublic ? 'Public' : 'Private' }
      </div>
      <StarAltIcon className='w-[9.95px] h-[9.95px] mx-[9px] text-[#656565] dark:text-[#DEDEDE]' />
      <div className='text-[#656565] dark:text-[#EEEEEE]'>
        { members } Members
      </div>
    </div>
  )
}