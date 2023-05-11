import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import type { NextPageWithLayout, Product } from '@/types';
import { motion } from 'framer-motion';
import Layout from '@/layouts/_layout';
import client from '@/data/client';
import Image from '@/components/ui/image';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import placeholder from '@/assets/images/placeholders/product.svg';
import isEmpty from 'lodash/isEmpty';
import invariant from 'tiny-invariant';

import ProductRecommended from '@/components/product/product-recommended';
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

function getPreviews(gallery: any[], image: any) {
  if (!isEmpty(gallery) && Array.isArray(gallery)) return gallery;
  if (!isEmpty(image)) return [image, {}];
  return [{}, {}];
}

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ProductPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ product }) => {
  const { t } = useTranslation('common');
  const {
    id,
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
                <Swiper
                  id="productGallery"
                  speed={400}
                  allowTouchMove={false}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Navigation, Thumbs]}
                  {...swiperParams}
                >
                  {gallery?.map((item: any) => (
                    <SwiperSlide
                      key={`product-gallery-${item.id}`}
                      className="flex aspect-[1629/583] items-center justify-center rounded-[10px] bg-light-200 dark:bg-dark-200"
                    >
                      <Image
                        layout="fill"
                        objectFit="cover"
                        className="rounded-[10px]"
                        src={item?.original ?? placeholder}
                        alt={`Product gallery ${item.id}`}
                      />
                    </SwiperSlide>
                  ))}
                  <div className="absolute inset-0 z-10 flex h-full w-full items-end justify-center ">
                    <div className="h-2/3 w-full rounded-[10px] bg-gradient-to-t from-black to-transparent" />
                  </div>
                </Swiper>
                <ProductOwnerOverview owner={{ ...shop, product_name: name }} />
              </div>

              <motion.div
                variants={fadeInBottom()}
                className="justify-betwee flex w-full flex-col md:flex-row"
              >
                <div className="flex-shrink-0 md:w-6/12 lg:w-7/12 2xl:w-8/12">
                  <div className="lg:mx-auto 3xl:max-w-[1200px]">
                    {!!tags?.length && (
                      <div className="flex items-start text-dark dark:text-light">
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag: Tag) => (
                            <AnchorLink
                              key={tag.id}
                              href={routes.tagUrl(tag.slug)}
                              className="inline-flex items-center justify-center rounded-full border border-light-600 px-4 py-2 font-medium text-light-base transition-all hover:bg-light-200 hover:text-dark-300 dark:border-dark-500 dark:text-light-600 dark:hover:bg-dark-400 hover:dark:text-light"
                            >
                              {tag.name}
                            </AnchorLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="pt-6 pb-5 leading-[1.9em] rtl:text-right dark:text-light-600 xl:pb-6 3xl:pb-8">
                    {description}
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
                            src={item?.thumbnail ?? placeholder}
                            alt={`Product thumb gallery ${item.id}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>

                <div className="mt-7 w-full rounded-md p-2 md:ml-7 md:mt-0">
                  <div className="flex w-full flex-col items-center justify-center">
                    <div className="flex w-full flex-row items-center justify-between p-2">
                      <div className="text-[20px] font-semibold text-dark-600 dark:text-light-600">
                        Recommended
                      </div>
                      <Button
                        variant="icon"
                        className="inline-flex hover:opacity-40"
                      >
                        <ThreeDotsIcon className="h-[32px] w-[32px] text-dark-600 dark:text-light-600" />
                      </Button>
                    </div>

                    <div className="mt-4 flex w-full flex-col items-start justify-center gap-4">
                      {gallery?.map((item, index) => (
                        <ProductRecommended
                          key={index}
                          product={{ ...item, shop, name }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
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
