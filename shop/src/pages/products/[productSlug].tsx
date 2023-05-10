import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
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
import invariant from 'tiny-invariant';
import pluralize from 'pluralize';

import coverImageMobile from '@/assets/images/product/product-cover-mobile.png';
import coverImageDesktopLight from '@/assets/images/product/product-cover-desktop-light.png';
import { VerifiedIcon } from '@/components/icons/verified-icon';
import { BookmarkIcon } from '@/components/icons/bookmark-icon';
import { LinkIcon } from '@/components/icons/link-icon';
import { NotificationIcon } from '@/components/icons/notification-icon';
import { StarIcon } from '@/components/icons/star-icon';
import { DownloadAltIcon } from '@/components/icons/download-alt-icon';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';

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
  const { t } = useTranslation('common');
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
  const { isDarkMode } = useIsDarkMode()

  console.log(isDarkMode)

  return (
    <div className="relative xl:ml-[22px] xl:mr-[31.8px] xl:mt-[22px]">
      <div className='absolute top-0 left-0 right-0 h-[151px] xl:h-[583px] w-full rounded-[3.25px] xl:rounded-[10px] overflow-hidden'>
        <Image src={image.original} alt={name} layout='fill' objectFit='cover' className='z-[1]' />
        <div className='absolute top-0 left-0 right-0 bottom-[-4px]'>
          <Image src={coverImageMobile} alt='Cover' layout='fill' objectFit='cover' className={`z-[2] absolute inset-[-2px] ${ !isDarkMode ? 'xl:hidden' : ''}`} />
          { !isDarkMode ? (
            <Image src={coverImageDesktopLight} alt='Cover' layout='fill' objectFit='cover' className='z-[2] absolute inset-[-2px] hidden xl:block' />
          ) : null } 
        </div>
      </div>
      <div className='relative z-[3] pt-[89px] xl:pt-[330px] grid grid-cols-[65%_35%]'>
        {/* product */}
        <div className='xl:flex xl:pl-[74px]'>
          <div className='pl-[26px] xl:pl-[0]'>
            <div className='w-[65px] xl:w-[124px] h-[65px] xl:h-[124px] relative rounded-full overflow-hidden'>
              <Image src={shop.logo.original} alt={shop.name} layout='fill' />
            </div>
          </div>
          <div>
            <div className='pl-[19px] mt-[8px] xl:mt-0'>
              <p className='text-[16.93px] xl:text-[32px] max-w-[260px] xl:max-w-[516px] text-dark-300 dark:text-[#eee] xl:text-white font-poppins font-semibold'>{name}</p>
            </div>
            <div className='mt-[14px] xl:mt-[8px] pl-[19px]'>
              <div className='flex items-center'>
                <Image src={shop.logo.original} width={20.67} height={20.67} alt={shop.name} className='rounded-full overflow-hidden' />
                <span className='text-[17.88px] xl:text-[20.77px] ml-[7px] xl:ml-[8px] text-[#4eeeb2] font-poppins font-semibold'>{shop.name}</span>
                <VerifiedIcon className='w-[20.49px] h-[20.49px] xl:w-[23.79px] xl:h-[23.79px] ml-[2px]' />
              </div>
            </div>
          </div>
        </div>
        {/* product rate*/}
        <div className='self-end xl:row-span-2 ml-auto mr-[7.07px] xl:mr-[83px] mb-[24px]  text-dark-300 dark:text-[#eee] xl:text-[#eee] font-poppins flex'>
          {/* downloads */}
          <div className='px-[10px] py-[4.63px] xl:px-[20px] xl:py-[10px] mr-[10px] border-r-[1px] border-r-[#868686]'>
            <div className='mb-[4.63px] xl:mb-[14px] flex items-center justify-end xl:justify-center'>
              <DownloadAltIcon className='h-[14.81px] w-[14.81px] xl:w-[32px] xl:h-[32px] mr-[6px] xl:mr-[10px]' />
              <span className='text-[12.96px] xl:text-[28px] text-right font-bold xl:translate-y-[2.5px]'>{total_downloads}</span>
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
        {/* product buy / interactions */}
        <div className='col-span-2 xl:col-span-1 ml-[19.67px] xl:ml-[74px] mr-[18.91px] mt-[28px] flex'>
          <div>
            <button className='text-[13.65px] xl:text-[18px] w-[182.69px] xl:w-[241px] h-[47px] xl:h-[62px] font-poppins text-white flex items-center justify-center bg-brand rounded-[75.8px]'>
              <span>${sale_price} Buy</span>
            </button>
          </div>
          <div className='flex gap-[18.19px] xl:gap-[24px] items-center ml-auto xl:ml-[25px]'>
            <div>
              <button className='text-[#343434] dark:text-white xl:text-white w-[47px] h-[47px] xl:w-[62px] xl:h-[62px] rounded-full border border-[#d4d4d444] flex items-center justify-center'>
                <BookmarkIcon className='h-[18.19px] xl:h-[24px] w-[18.19px] xl:w-[25px]' />
              </button>
            </div>
            <div>
              <button className='text-[#343434] dark:text-white xl:text-white w-[47px] h-[47px] xl:w-[62px] xl:h-[62px] rounded-full border border-[#d4d4d444] flex items-center justify-center'>
                <LinkIcon className='h-[18.19px] xl:h-[24px] w-[18.19px] xl:w-[25px]' />
              </button>
            </div>
            <div>
              <button className='text-[#343434] dark:text-white xl:text-white w-[47px] h-[47px] xl:w-[62px] xl:h-[62px] rounded-full border border-[#d4d4d444] flex items-center justify-center'>
                <NotificationIcon className='h-[18.19px] xl:h-[24px] w-[18.19px] xl:w-[25px]' />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[42px] xl:mt-[57px]'>
        {/* tags */}
        <div className='overflow-hidden'>
          <div className='flex xl:flex-wrap gap-[8.68px] xl:gap-[14px] px-[13px] xl:px-0 overflow-x-auto scrollbar-hide'>
            {tags.map(({ id, name }) => (
              <div key={id} className='px-[20px] py-[11px] xl:px-[32.2px] xl:py-[17.17px] border border-[#ececec] dark:border-dark-850 rounded-[66px] whitespace-nowrap'>
                <span className='text-[11.98px] xl:text-[19.32px] text-dark-850 font-semibold'>{name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* description */}
        <div className='px-[15.5px] xl:px-[5px] mt-[26px]'>
          <p className='text-[14px] xl:text-[18px] text-dark-300 dark:text-white font-medium'>{description}</p>
        </div>
        {/* gallery */}
        <div className='overflow-hidden mt-[26px] mb-[42px]'>
          <div className='flex gap-[16px] px-[16px] xl:px-[9px] overflow-x-auto scrollbar-hide xl:grid xl:grid-cols-4'>
            {gallery.map(({ id, original }, index) => (
              <div key={id} className='relative min-h-[169px] xl:min-h-0 min-w-[144px] xl:min-w-0 xl:w-full xl:h-full xl:pb-[70.41%] rounded-[4.32px] overflow-hidden'>
                <Image src={original} alt={(index+1).toString()} layout='fill' objectFit='cover' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
