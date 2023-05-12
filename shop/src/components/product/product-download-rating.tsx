import pluralize from "pluralize";
import { useTranslation } from "next-i18next";
import { DownloadAltIcon } from "@/components/icons/download-alt-icon";
import { StarIcon } from "@/components/icons/star-icon";

interface ProductDownloadRatingProps {
  totalDownloads: number;
  ratings: number;
}

export default function ProductDownloadRating({ totalDownloads, ratings }: ProductDownloadRatingProps) {
  const { t } = useTranslation('common');
  
  return (
    <div className='self-end xl:row-span-2 ml-auto mr-[7.07px] xl:mr-[100px] mb-[24px] xl:mb-[42px]  text-dark-300 dark:text-[#eee] xl:text-[#eee] font-poppins flex'>
      {/* downloads */}
      <div className='px-[10px] py-[4.63px] xl:px-[20px] xl:py-[10px] mr-[10px] border-r-[1px] border-r-[#868686]'>
        <div className='mb-[4.63px] xl:mb-[14px] flex items-center justify-end xl:justify-center'>
          <DownloadAltIcon className='h-[14.81px] w-[14.81px] xl:w-[32px] xl:h-[32px] mr-[6px] xl:mr-[10px]' />
          <span className='text-[12.96px] xl:text-[28px] text-right font-bold xl:translate-y-[2.5px]'>{totalDownloads}</span>
        </div>
        <div className='text-[7.41px] xl:text-[16px] font-semibold text-center'>
          <span>{pluralize(t('text-download', 'Downloads'))}</span>
        </div>
      </div>
      {/* rating */}
      <div className='px-[10px] py-[4.63px] xl:px-[20px] xl:py-[10px]'>
        <div className='mb-[4.63px] xl:mb-[14px] flex items-center justify-end'>
          <StarIcon className='h-[14.81px] w-[14.81px] xl:w-[32px] xl:h-[32px] text-[#FFCF23] mr-[6px] xl:mr-[10px]' />
          <span className='text-[12.96px] xl:text-[28px] text-right font-bold xl:translate-y-[2.5px]'>{ratings}</span>
        </div>
        <div className='text-[7.41px] xl:text-[16px] font-semibold text-center'>
          <span>{pluralize.singular(t('table-item-ratings', 'Rating'))}</span>
        </div>
      </div>
    </div>
  )
}