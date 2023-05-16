import Image from '@/components/ui/image';
import servicesPicture from '@/assets/images/services/services-picture.png';

function TopRated() {
  return (
    <div className='text-[8.81px] px-[9.08px] py-[10.17px] font-poppins font-medium text-[#FF8A00] bg-[#F7F7F7] dark:bg-[#181818]'>
      Top Rated
    </div>
  )
}

function Profile() {
  return (
    <div className='flex items-center'>
      <div className='relative mr-[9.44px]'>
        <div className='h-[39px] w-[39px] relative rounded-full overflow-hidden'>
          <Image src={servicesPicture} alt='Jenny Wills' layout='fill' objectFit='cover' />
        </div>
        {/* status */}
        <div className='absolute right-[5.03px] bottom-0 h-[8.55px] w-[8.55px] rounded-full bg-[#34C75D]'></div>
      </div>
      <div>
        <div className='text-[13.84px] text-dark-300 dark:text-white font-poppins font-medium'>
          Jenny Wills
        </div>
        <div className='text-[7.55px] italic font-medium font-poppins'>
          @jenny_wills
        </div>
      </div>
    </div>
  )
}

export default function ProfileInfo() {
  return (
    <div className='px-[6.29px] flex items-center justify-between'>
      <div className='flex items-center space-x-[9.44px]'>
        <Profile />
        <TopRated />
      </div>
      <div className='w-[1px] self-stretch bg-[#EBEBEB] dark:bg-[#343434]'></div>
      <div>
        
      </div>
    </div>
  )
}