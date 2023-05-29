import { StarIcon } from '../icons/star-icon';
import { DownloadAltIcon } from '../icons/download-alt-icon';

interface RatingDownloadsProps {
  rating: string;
  downloads: string;
  dark?: boolean;
  large?: boolean;
}

export default function RatingDownloads({ rating, downloads, dark, large }: RatingDownloadsProps) {
  const fontSize = large ? 'text-[25.49px]' : 'text-[19.71px]';
  
  return (
    <div className={`p-[10px] flex items-center space-x-[20px] ${
      dark ? 'text-[#272727]' : 'text-[#FEFEFE]'
    }`}>
      <div className='flex items-center'>
        <StarIcon className={`text-[#FFC42C] ${
          large ?
            'w-[28.67px] h-[28.67px] mr-[22px]' :
            'w-[22.17px] h-[22.17px] mr-[15px]'
        }`} />
        <div className={`${ fontSize } font-poppins font-semibold`}>
          { rating }
        </div>
      </div>
      <div className='flex items-center'>
        <DownloadAltIcon className={` ${
          large ?
            'w-[28px] h-[28px] mr-[22px]' :
            'w-[20px] h-[20px] mr-[15px]'
        }`} />
        <div className={`${ fontSize } font-poppins font-semibold`}>
          { downloads }&nbsp;downloads
        </div>
      </div>
    </div>
  )
}