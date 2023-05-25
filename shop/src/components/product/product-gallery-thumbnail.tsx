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

type ProductGalleryThumbnailProps = {
  gallery: Attachment[];
  thumbsSwiper: any;
  swiperParams: SwiperOptions;
};

const ProductGalleryThumbnail: React.FC<ProductGalleryThumbnailProps> = ({
  gallery,
  thumbsSwiper,
  swiperParams,
}) => {
  const { t } = useTranslation('common');

  return (
    <Swiper
      id="productGallery"
      speed={400}
      allowTouchMove={false}
      thumbs={{ swiper: thumbsSwiper }}
      className="h-full w-full rounded-[10px]"
      modules={[Navigation, Thumbs]}
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
  );
};

export default ProductGalleryThumbnail;
