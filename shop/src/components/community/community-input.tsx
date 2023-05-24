// import Image from '@/components/ui/image';

export default function CommunityInput() {
  return (
    <div className='px-[23px] py-[16px] bg-white dark:bg-[#292929] flex items-center rounded-[10px]'>
      <div className='hidden'>
        <div>
          {/* <Image /> */}
        </div>
      </div>
      <div className='flex-1'>
        <input
          type='text'
          placeholder='Write something... ?'
          className='h-[52px] w-full max-w-[456px] px-[24px] text-[16px] text-dark-300 dark:text-[#FEFEFE] font-poppins font-normal border border-[#00997B] rounded-[100px] placeholder-[#545454] placeholder:italic placeholder:font-medium bg-[#E1E1E1] dark:bg-[#333333]'
        />
      </div>
    </div>
  )
}