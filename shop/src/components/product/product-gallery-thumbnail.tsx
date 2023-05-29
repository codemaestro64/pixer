import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import type { Attachment, NextPageWithLayout, Product } from '@/types';
import { motion } from 'framer-motion';
import Layout from '@/layouts/_layout';
import client from '@/data/client';
import Image from '@/components/ui/image';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import placeholder from '@/assets/images/placeholders/product.svg';
import isEmpty from 'lodash/isEmpty';
import invariant from 'tiny-invariant';

import ProductRecommended from '@/components/product/product-recommended';
import ProductRecommendedItem from '@/components/product/product-recommended-item';
import ProductOwnerOverview from '@/components/product/product-owner-overview';

import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@/components/ui/slider';
import { useRef, useState } from 'react';
import { LabelIcon } from '@/components/icons/label-icon';
import AnchorLink from '@/components/ui/links/anchor-link';
import classNames from 'classnames';
import { Tag } from '@/types';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import { ThreeDotsIcon } from '@/components/icons/three-dots-icon';
import ProductTags from '@/components/product/product-tags';
import { getPreviewOriginalImage, isVideoItem } from '@/lib/constants';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';
import { useSwiper } from 'swiper/react';

type ProductGalleryThumbnailProps = {
  gallery: Attachment[];
  thumbsSwiper: any;
  swiperParams: SwiperOptions;
  navigationHidden: boolean;
  settleSwiperRef?: any;
  onActiveIndexChange?: any;
};

const ProductGalleryThumbnail: React.FC<ProductGalleryThumbnailProps> = ({
  gallery,
  thumbsSwiper,
  swiperParams,
  navigationHidden = true,
  settleSwiperRef,
  onActiveIndexChange,
}) => {
  const { t } = useTranslation('common');
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative mb-3 w-full h-full overflow-hidden xl:mb-5">
      <Swiper
        id="productGallery"
        onBeforeInit={(swiper) =>
          settleSwiperRef ? settleSwiperRef(swiper) : {}
        }
        onActiveIndexChange={(swiper) =>
          onActiveIndexChange ? onActiveIndexChange(swiper.activeIndex) : {}
        }
        speed={400}
        allowTouchMove={false}
        thumbs={{ swiper: thumbsSwiper }}
        className="h-full w-full rounded-[10px]"
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
            className="flex aspect-[1629/583] items-center justify-center rounded-[10px] bg-light-200 dark:bg-dark-200"
          >
            {isVideoItem(item) ? (
              <video
                className="m-0 block h-full w-full"
                controls
                src={item.original.replace('localhost', 'localhost:8000')}
              />
            ) : (
              <Image
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
                src={getPreviewOriginalImage(item)}
                alt={`Product gallery ${item.id}`}
              />
            )}
            {!isVideoItem(item) && (
              <div className="absolute inset-0 z-10 flex h-full w-full items-end justify-center ">
                <div className="h-2/3 w-full rounded-[10px] bg-gradient-to-t from-black to-transparent" />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`${
          navigationHidden ? 'hidden' : 'block'
        } absolute top-2/4 z-10 flex w-full items-center justify-between px-2.5 xl:px-4`}
      >
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
  );
};

export default ProductGalleryThumbnail;
