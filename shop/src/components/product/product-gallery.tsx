import Image from '@/components/ui/image';
import { Attachment } from '@/types';

export default function ProductGallery({ gallery }: { gallery: Attachment[] }) {
  return (
    <div className='flex gap-[16px] px-[16px] xl:px-[9px] 2xl:pr-[0] overflow-x-auto scrollbar-hide xl:grid xl:grid-cols-4'>
      { gallery.map(({ id, original }, index) => (
        <div key={id} className='relative min-h-[169px] xl:min-h-0 min-w-[144px] xl:min-w-0 xl:w-full xl:h-full xl:pb-[70.41%] rounded-[4.32px] overflow-hidden'>
          <Image src={original} alt={(index+1).toString()} layout='fill' objectFit='cover' />
        </div>
      )) }
    </div>
  )
}