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

type ProductGalleryThumbsProps = {
  gallery: Attachment[];
  setThumbsSwiper: any;
};

const ProductGalleryThumbs: React.FC<ProductGalleryThumbsProps> = ({
  gallery,
  setThumbsSwiper,
}) => {
  const { t } = useTranslation('common');

  const getPreviewImage = (item: Attachment) => {
    if (item.thumbnail.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return item.thumbnail.replace('localhost', 'localhost:8000');
    } else {
      return placeholder;
    }
  };

  return (
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
              src={getPreviewImage(item)}
              alt={`Product thumb gallery ${item.id}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGalleryThumbs;
