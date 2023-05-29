import Image from '@/components/ui/image';
import servicesPost from '@/assets/images/services/services-post.png';
import { ArrowLeftIcon } from '../icons/arrow-left-icon';
import { Attachment } from '@/types';
import ProductGalleryThumbnail from '../product/product-gallery-thumbnail';
import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@/components/ui/slider';
import { useRef, useState } from 'react';

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

function PostImageBar({
  imageIdx,
  active = false,
  toggleAction,
}: {
  imageIdx: number;
  active: boolean;
  toggleAction: any;
}) {
  return (
    <div
      onClick={() => toggleAction(imageIdx)}
      className={`h-[5.62px] xl:h-[9px] bg-white rounded-[62.45px] ${
        active
          ? 'w-[43.71px] xl:w-[70px]'
          : 'w-[26.23px] xl:w-[42px] opacity-30 cursor-pointer hover:opacity-50'
      }`}
    ></div>
  );
}

export default function PostImages({
  attachments,
}: {
  attachments: Attachment[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const swiperRef = useRef<HTMLDivElement>(null);

  const getSwiperRef = (swiper: any) => {
    swiperRef.current = swiper;
    console.log(swiper);
  };

  const changedActiveSlideIndex = (newIdx: number) => {
    setCurrentSlideIdx(newIdx);
  };

  return (
    <div className="max-w-[687px] 2xl:max-w-none mx-auto">
      <div className="relative pb-[59.67%]">
        {/* image */}
        <div className="absolute inset-0 z-[1]">
          <ProductGalleryThumbnail
            settleSwiperRef={getSwiperRef}
            onActiveIndexChange={changedActiveSlideIndex}
            gallery={attachments}
            thumbsSwiper={thumbsSwiper}
            swiperParams={swiperParams}
            navigationHidden={false}
          />
        </div>
        <div
          className={`${
            attachments.length === 1 ? 'hidden' : 'block'
          } swiper-pagination absolute left-1/2 bottom-[13.74px] xl:bottom-[22px] z-[2] -translate-x-1/2 flex space-x-[8.74px]`}
        >
          {attachments.map((item, key) => (
            <PostImageBar
              imageIdx={key}
              active={key === currentSlideIdx}
              toggleAction={(newIdx: number) =>
                swiperRef.current?.slideTo(newIdx)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
