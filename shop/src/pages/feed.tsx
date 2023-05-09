import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import type {
  FollowedShopsQueryOptions,
  NextPageWithLayout,
  SettingsQueryOptions,
} from '@/types';
import Layout from '@/layouts/_layout';
// import { useFollowedShopsProducts } from '@/data/shop';
// import Grid from '@/components/product/grid';
// import { useTranslation } from 'next-i18next';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { dehydrate, QueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import client from '@/data/client';
import feedCardImage from '@/assets/images/feed-card-image.png';
import teamImage from '@/assets/images/omnico-team.png';
import FeedMenu from '@/components/feed/feed-menu';
import FeedInput from '@/components/feed/feed-input';
import FeedActions from '@/components/feed/feed-actions';
import FeedTrendLatest from '@/components/feed/feed-trend-latest';
import FeedCard from '@/components/feed/feed-card';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [API_ENDPOINTS.SETTINGS, { language: locale }],
        ({ queryKey }) =>
          client.settings.all(queryKey[1] as SettingsQueryOptions)
      ),
      queryClient.prefetchInfiniteQuery(
        [API_ENDPOINTS.FOLLOWED_SHOPS_PRODUCTS, { language: locale }],
        ({ queryKey }) =>
          client.products.all(queryKey[1] as FollowedShopsQueryOptions)
      ),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale!, ['common'])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
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

// function Products() {
//   const { products, isLoading } = useFollowedShopsProducts({ limit: 15 });
//   const { t } = useTranslation('common');
//   return (
//     <>
//       <div className="flex flex-col-reverse flex-wrap items-center justify-between px-4 pt-5 pb-4 xs:flex-row xs:space-x-4 md:px-6 md:pt-6 lg:px-7 3xl:px-8">
//         <div className="pt-3 xs:pt-0">
//           {t('text-total')} {products.length} {t('text-product-found')}
//         </div>
//       </div>
//       <Grid
//         products={products}
//         hasNextPage={false}
//         isLoadingMore={false}
//         isLoading={isLoading}
//       />
//     </>
//   );
// }

function FeedContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-4 sm:pb-5 md:pb-6 lg:pb-7 3xl:pb-8 pt-[10px] md:pt-6 px-4 sm:px-5 md:px-6 lg:px-7 3xl:px-8">
      {children}
    </div>
  )
}

const Feed: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="Top Products"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.feed}
      />
      <FeedContainer>
        <div>
          <FeedMenu />
        </div>
        <div className='mt-[18px]'>
          <FeedInput />
        </div>
        <div className='mt-[6px]'>
          <FeedActions />
        </div>
        <div className='my-[14px]'>
          <FeedTrendLatest />
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[14px] px-[12px] mt-[21px]'>
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
          <FeedCard appName='ChawkBazar Laravel Flutter Mobile App' teamName='Omnico Team' cardImage={feedCardImage} teamImage={teamImage} />
        </div>
      </FeedContainer>
      {/* <Products /> */}
    </>
  );
};

Feed.authorization = true;
Feed.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Feed;