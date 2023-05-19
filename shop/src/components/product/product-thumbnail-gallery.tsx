import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@/components/ui/slider';
import Image from '@/components/ui/image';
import { useRef, useState } from 'react';
import { ChevronLeft } from '@/components/icons/chevron-left';
import { ChevronRight } from '@/components/icons/chevron-right';
import placeholder from '@/assets/images/placeholders/product.svg';
import { Attachment } from '@/types';

interface Props {
  gallery: any[];
}

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

export default function ProductThumbnailGallery({ gallery }: Props) {
  let [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const isVideoItem = (item: Attachment) => {
    if (item.original.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return false;
    } else {
      if (item.thumbnail) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getPreviewImage = (item: Attachment) => {
    if (item.original.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return item.original.replace('localhost', 'localhost:8000');
    } else {
      return placeholder;
    }
  };

  return (
    <div className="w-full">
      <div className="relative mb-3 w-full overflow-hidden xl:mb-5">
        <Swiper
          id="productGallery"
          speed={400}
          allowTouchMove={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          {...swiperParams}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-gallery-${item.id}`}
              className="flex aspect-[3/2] items-center justify-center bg-light-200 dark:bg-dark-200"
            >
              {isVideoItem(item) ? (
                <video
                  width="100%"
                  height="100%"
                  className="m-0 block"
                  controls
                  src={item.original.replace('localhost', 'localhost:8000')}
                />
              ) : (
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={item ? getPreviewImage(item) : placeholder}
                  alt={`Product gallery ${item.id}`}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-2/4 z-10 flex w-full items-center justify-between px-2.5 xl:px-4">
          <div
            ref={prevRef}
            className="flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark/90 shadow-xl transition duration-300 hover:bg-light-200 hover:text-brand-dark focus:outline-none rtl:rotate-180 xl:h-9 xl:w-9"
          >
            <ChevronLeft className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
          </div>
          <div
            ref={nextRef}
            className="flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark/90 shadow-xl transition duration-300 hover:bg-light-200 hover:text-brand-dark focus:outline-none rtl:rotate-180 xl:h-9 xl:w-9"
          >
            <ChevronRight className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Swiper
          id="productGalleryThumbs"
          freeMode={true}
          observer={true}
          slidesPerView={4}
          onSwiper={setThumbsSwiper}
          observeParents={true}
          watchSlidesProgress={true}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.id}`}
              className="flex aspect-[3/2] cursor-pointer items-center justify-center border border-light-500 transition hover:opacity-75 dark:border-dark-500"
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={
                  item?.thumbnail?.replace('localhost', 'localhost:8000') ??
                  placeholder
                }
                alt={`Product thumb gallery ${item.id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
