import { EllipsisVerticalFillIcon } from "../icons/ellipsis-vertical-fill-icon"

function MenuItem({ label, isActive }: { label: string, isActive?: boolean }) {
  return (
    <button className='inline-block min-w-[64px] sm:min-w-[88px] 2xl:min-w-[120px] px-[10px] 2xl:px-[20px] py-[5.34px] 2xl:py-[10px] text-[14px] sm:text-[13.37px] 2xl:text-[18px] text-dark-300 dark:text-white font-poppins font-medium whitespace-nowrap relative'>
      { isActive ? (
        <div className='absolute bottom-0 left-0 right-0 h-[2px] 2xl:h-[4px] bg bg-[#00997B]'></div>
      ) : null }
      { label }
    </button>
  )
}

export default function CommunityMenu() {
  return (
    <div className='px-[8px] sm:px-[28px] 2xl:px-[38px] py-[10px] sm:py-[6px] 2xl:py-[8px] flex items-center bg-white dark:bg-[#292929] rounded-[5.34px] sm:rounded-[7.18px] 2xl:rounded-[10px]'>
      <div className='flex flex-wrap gap-x-[7px] gap-y-[10px] 2xl:gap-[14px]'>
        <MenuItem label='About' />
        <MenuItem label='Posts' isActive />
        <MenuItem label='Events' />
        <MenuItem label='Members' />
      </div>
      <div className='ml-auto mr-[6px]'>
        <button className='text-[#292929] dark:text-white p-[10px]'>
          <EllipsisVerticalFillIcon className='w-[18.15px] sm:w-[24px] 2xl:w-[34px] h-[7.47px] sm:h-[10px] 2xl:h-[14px]' />
        </button>
      </div>
    </div>
  )
}