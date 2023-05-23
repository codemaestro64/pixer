import { StarIcon } from '../icons/star-icon';
import { DownloadAltIcon } from '../icons/download-alt-icon';

interface RatingDownloadsProps {
  rating: string;
  downloads: string;
  dark?: boolean;
}

export default function RatingDownloads({ rating, downloads, dark }: RatingDownloadsProps) {
  return (
    <div className={`p-[10px] flex items-center space-x-[20px] ${
      dark ? 'text-[#272727]' : 'text-[#FEFEFE]'
    }`}>
      <div className='flex items-center'>
        <StarIcon className='w-[22.17px] h-[22.17px] text-[#FFC42C] mr-[15px]' />
        <div className='text-[19.71px] font-poppins font-semibold'>
          { rating }
        </div>
      </div>
      <div className='flex items-center'>
        <DownloadAltIcon className='w-[20px] h-[20px] mr-[15px]' />
        <div className='text-[19.71px] font-poppins font-semibold'>
          { downloads }&nbsp;downloads
        </div>
      </div>
    </div>
  )
}