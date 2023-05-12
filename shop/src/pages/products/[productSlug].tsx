import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
// import { useRouter } from 'next/router';
import type { NextPageWithLayout, Product } from '@/types';
// import { motion } from 'framer-motion';
import Layout from '@/layouts/_layout';
import client from '@/data/client';
import Image from '@/components/ui/image';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import placeholder from '@/assets/images/placeholders/product.svg';
import isEmpty from 'lodash/isEmpty';
import invariant from 'tiny-invariant';
import { VerifiedIcon } from '@/components/icons/verified-icon';
import { EllipsisVerticalIcon } from '@/components/icons/ellipsis-vertical-icon';
// import ProductSocialShare from '@/components/product/product-social-share';
// import ProductInformation from '@/components/product/product-information';
// import ProductDetailsPaper from '@/components/product/product-details-paper';
// import { LongArrowIcon } from '@/components/icons/long-arrow-icon';
// import { staggerTransition } from '@/lib/framer-motion/stagger-transition';
// import {
//   fadeInBottom,
//   fadeInBottomWithScaleX,
//   fadeInBottomWithScaleY,
// } from '@/lib/framer-motion/fade-in-bottom';
// import placeholder from '@/assets/images/placeholders/product.svg';
// import ProductReviews from '@/components/review/product-reviews';
// import AverageRatings from '@/components/review/average-ratings';
// import ProductQuestions from '@/components/questions/product-questions';
// import isEmpty from 'lodash/isEmpty';

import ProductBannerImage from '@/components/product/product-banner-image';
import ProductBanner from '@/components/product/product-banner';
import ProductDownloadRating from '@/components/product/product-download-rating';
import ProductInteractions from '@/components/product/product-interactions';
import ProductTags from '@/components/product/product-tags';
import ProductGallery from '@/components/product/product-gallery';
import ProductRecommended from '@/components/product/product-recommended';

import ProductRecommended from '@/components/product/product-recommended';
import ProductOwnerOverview from '@/components/product/product-owner-overview';
import ProductGalleryThumbnail from '@/components/product/product-gallery-thumbnail';
import ProductGalleryThumbs from '@/components/product/product-gallery-thumbs';

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

// This function gets called at build time
type ParsedQueryParams = {
  productSlug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async ({
  locales,
}) => {
  invariant(locales, 'locales is not defined');
  const { data } = await client.products.all({ limit: 100 });
  const paths = data?.flatMap((product) =>
    locales?.map((locale) => ({
      params: { productSlug: product.slug },
      locale,
    }))
  );
  return {
    paths,
    fallback: 'blocking',
  };
};

type PageProps = {
  product: Product;
};

export const getStaticProps: GetStaticProps<
  PageProps,
  ParsedQueryParams
> = async ({ params, locale }) => {
  const { productSlug } = params!; //* we know it's required because of getStaticPaths
  try {
    const product = await client.products.get({
      slug: productSlug,
      language: locale,
    });
    return {
      props: {
        product,
        ...(await serverSideTranslations(locale!, ['common'])),
      },
      revalidate: 60, // In seconds
    };
  } catch (error) {
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
};

// function getPreviews(gallery: any[], image: any) {
//   if (!isEmpty(gallery) && Array.isArray(gallery)) return gallery;
//   if (!isEmpty(image)) return [image, {}];
//   return [{}, {}];
// }

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ProductPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ product }) => {
  const {
    // id,
    name,
    description,
    slug,
    image,
    shop,
    updated_at,
    created_at,
    gallery,
    orders_count,
    total_downloads,
    tags,
    preview_url,
    type,
    price,
    sale_price,
  } = product;

  let [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="relative">
      <div className="h-full">
        <motion.div variants={fadeInBottom()} className="justify-center">
          <div className="flex flex-col p-2 rtl:space-x-reverse">
            <div className="mb-4 w-full items-center justify-center overflow-hidden md:mb-6 lg:mb-auto">
              <div className="relative z-0 mb-3 w-full xl:mb-5">
                <ProductGalleryThumbnail
                  gallery={gallery}
                  thumbsSwiper={thumbsSwiper}
                  swiperParams={swiperParams}
                />
                <ProductOwnerOverview
                  owner={{ ...shop, product_name: name, price }}
                />
              </div>

              <motion.div
                variants={fadeInBottom()}
                className="flex w-full flex-col justify-between md:flex-row"
              >
                <div className="z-30 flex-shrink-0 md:w-6/12 lg:w-7/12 2xl:w-8/12">
                  <ProductTags tags={tags} />

                  <div className="pt-6 pb-5 leading-[1.9em] rtl:text-right dark:text-light-600 xl:pb-6 3xl:pb-8">
                    {description}
                  </div>

                  <ProductGalleryThumbs
                    gallery={gallery}
                    setThumbsSwiper={setThumbsSwiper}
                  />
                </div>

                <ProductRecommended gallery={gallery} shop={shop} name={name} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

ProductPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;