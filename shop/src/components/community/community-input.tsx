import Image from '@/components/ui/image';
import userProfileDefault from '@/assets/images/user-profile-default.svg';

export default function CommunityInput() {
  return (
    <div className='px-[23px] sm:px-[42px] xl:px-[52px] 2xl:px-[60px] py-[16px] sm:py-[28px] 2xl:py-[38px] bg-white dark:bg-[#292929] flex items-center rounded-[10px] 2xl:rounded-[20px]'>
      <div className='hidden sm:block'>
        <div className='relative w-[31.19px] xl:w-[36px] 2xl:w-[48px] h-[31.19px] xl:h-[36px] 2xl:h-[48px] rounded-full overflow-hidden'>
          <Image src={userProfileDefault} alt='User' layout='fill' objectFit='cover' />
        </div>
      </div>
      <div className='flex-1 sm:ml-[12px]'>
        <input
          type='text'
          placeholder='Write something... ?'
          className='h-[52px] sm:h-[39px] xl:h-[46px] 2xl:h-[52px] w-full max-w-[456px] sm:max-w-none 2xl:max-w-[636px] px-[24px] sm:px-[18px] xl:px-[24px] text-[16px] sm:text-[12px] xl:text-[14px] 2xl:text-[16px] text-dark-300 dark:text-[#FEFEFE] font-poppins font-normal border border-[#00997B] rounded-[100px] placeholder-[#545454] placeholder:italic placeholder:font-medium bg-[#E1E1E1] dark:bg-[#333333]'
        />
      </div>
    </div>
  )
}