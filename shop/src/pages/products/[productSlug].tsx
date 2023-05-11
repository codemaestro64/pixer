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

const ProductPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ product }) => {
  const {
    // id,
    name,
    // slug,
    image,
    gallery,
    description,
    // created_at,
    // updated_at,
    ratings,
    // rating_count,
    // total_reviews,
    total_downloads,
    tags,
    // type,
    shop,
    sale_price,
  } = product;
  // const router = useRouter();
  // const previews = getPreviews(gallery, image);

  return (
    <div className="relative xl:ml-[22px] xl:mr-[31.8px] xl:mt-[22px]">
      <ProductBannerImage bannerImage={image.original} alt={name} />
      <div className='relative z-[3] pt-[89px] xl:pt-[150px] 2xl:pt-[330px] grid grid-cols-[65%_35%]'>
        <ProductBanner name={name} shopName={shop.name} shopLogo={shop.logo.original} />
        <ProductDownloadRating totalDownloads={total_downloads} ratings={ratings} />
        <ProductInteractions salePrice={sale_price} />
      </div>
      <div className='mt-[42px] xl:mt-[57px] 2xl:grid 2xl:grid-cols-[auto_555px]'>
        <div className='2xl:pr-[39px]'>
          <ProductTags tags={tags} />
          {/* description */}
          <div className='px-[15.5px] xl:px-[5px] mt-[26px] 2xl:mt-[51px]'>
            <p className='text-[14px] xl:text-[18px] text-dark-300 dark:text-white font-medium'>{description}</p>
          </div>
          {/* gallery */}
          <div className='overflow-hidden mt-[26px] mb-[42px]'>
            <ProductGallery gallery={gallery} />
          </div>
        </div>
        <div className='hidden 2xl:block'>
          <ProductRecommended product={product} />
        </div>
      </div>
    </div>
  );
};

ProductPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;