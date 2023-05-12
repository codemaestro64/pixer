import Image from '@/components/ui/image'
import userProfileDefault from '@/assets/images/user-profile-default.svg'

export default function FeedInput() {
  return (
    <div className='px-[23px] md:px-[50px] 2xl:px-[60px] py-[17.5px] 2xl:py-[38px] bg-[#fdfdfd] dark:bg-[#262626] rounded-[18px] md:flex md:gap-[15px] md:items-center'>
      <div className='hidden md:block'>
        <div className='w-[42px] h-[42px] border border-brand rounded-full overflow-hidden relative'>
          <Image src={userProfileDefault} width='100%' height='100%' layout='fill' alt='User' />
        </div>
      </div>
      <div className='w-full'>
        <input type='text' placeholder='Write something... ?' className='bg-[#f8f8f8] dark:bg-[#2B2A2A] px-[24px] py-[14px] border border-brand italic text-[16px] dark:text-white font-medium rounded-[100px] w-full h-[49px] placeholder-dark-850 dark:placeholder-[#545454]' />
      </div>
    </div>
  )
}