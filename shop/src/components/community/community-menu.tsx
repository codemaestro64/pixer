import { EllipsisVerticalFillIcon } from "../icons/ellipsis-vertical-fill-icon"

function MenuItem({ label, isActive }: { label: string, isActive?: boolean }) {
  return (
    <button className='inline-block min-w-[64px] px-[10px] py-[5.34px] text-[14px] text-dark-300 dark:text-white font-poppins font-medium whitespace-nowrap relative'>
      { isActive ? (
        <div className='absolute bottom-0 left-0 right-0 h-[2px] bg bg-[#00997B]'></div>
      ) : null }
      { label }
    </button>
  )
}

export default function CommunityMenu() {
  return (
    <div className='px-[8px] py-[10px] flex items-center bg-white dark:bg-[#292929] rounded-[5.34px]'>
      <div className='flex space-x-[7px]'>
        <MenuItem label='About' />
        <MenuItem label='Posts' isActive />
        <MenuItem label='Events' />
        <MenuItem label='Members' />
      </div>
      <div className='ml-auto mr-[6px]'>
        <button className='text-[#292929] dark:text-white p-[10px]'>
          <EllipsisVerticalFillIcon className='w-[18.15px] h-[7.47px]' />
        </button>
      </div>
    </div>
  )
}