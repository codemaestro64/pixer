import type {
  NextPageWithLayout,
  Post,
  Product,
  ProductQueryOptions,
  SettingsQueryOptions,
  Shop,
  User,
} from '@/types';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import cn from 'classnames';
import { dehydrate, QueryClient, useMutation } from 'react-query';
import { motion } from 'framer-motion';
import client from '@/data/client';
import Layout from '@/layouts/_layout';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import invariant from 'tiny-invariant';
import ProfileBackground from '@/components/profile/profile-background';
import ProfileLogo from '@/components/profile/profile-logo';
import ProfileInfo from '@/components/profile/profile-info';
import AtuhorsInteractions from '@/components/authors/authors-interactions';
import ProfileSkills from '@/components/profile/profile-skills';
import ProfileContactInfo from '@/components/profile/profile-contactinfo';
import AuthorsAnalytics from '@/components/authors/authors-analytics';
import AuthorsProducts from '@/components/authors/authors-products';
import { Tab } from '@/components/ui/tab';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthorLoader from './author-loader';
import { getProfileAvatar, getProfileCoverImage } from '@/lib/constants';
import placeholder from '@/assets/images/placeholders/product.svg';
import { formatAddress } from '@/lib/format-address';

type ParsedQueryParams = {
  shopSlug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async ({
  locales,
}) => {
  invariant(locales, 'locales is not defined');
  const { data } = await client.shops.all({ limit: 100, is_active: 1 });

  const paths = data?.flatMap((shop) =>
    locales?.map((locale) => ({ params: { shopSlug: shop.slug }, locale }))
  );
  return {
    paths,
    fallback: 'blocking',
  };
};
type PageProps = {
  shop: Shop;
};

export const getStaticProps: GetStaticProps<
  PageProps,
  ParsedQueryParams
> = async ({ params, locale }) => {
  const queryClient = new QueryClient();
  const { shopSlug } = params!;
  try {
    const shop = await client.shops.get(shopSlug);
    await Promise.all([
      queryClient.prefetchQuery(
        [API_ENDPOINTS.SETTINGS, { language: locale }],
        ({ queryKey }) =>
          client.settings.all(queryKey[1] as SettingsQueryOptions)
      ),
      queryClient.prefetchInfiniteQuery(
        [API_ENDPOINTS.PRODUCTS, { shop_id: shop.id, language: locale }],
        ({ queryKey }) =>
          client.products.all(queryKey[1] as ProductQueryOptions)
      ),
    ]);
    return {
      props: {
        shop,
        ...(await serverSideTranslations(locale!, ['common'])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const ShopPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ shop }) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  console.log('@@@@@@@@@@@@@@@@@@@@ - ', shop);
  return (
    <motion.div variants={fadeInBottom()} className="justify-between">
      <div className="xl:p-[25px]">
        {/* first section */}
        <div>
          <ProfileBackground
            background={shop.cover_image?.original ?? placeholder}
          />
          <div className="lg:pl-[69px] lg:pr-[42px] flex flex-col lg:flex-row items-center">
            <ProfileLogo
              name={shop.name}
              logo={shop.logo?.original ?? undefined}
            />
            <div className="pt-[32px] lg:pt-[11px] lg:pl-[21px] flex-1 flex flex-col lg:flex-row justify-between items-center space-y-[31px] lg:space-y-0">
              <ProfileInfo name={shop.name} slug={shop.slug} rating={4.6} />
              <AtuhorsInteractions shop={shop} />
            </div>
          </div>
        </div>
        {/* second section */}
        <div className="mt-[31.44px] xl:mt-[24px] grid grid-cols-1 xl:grid-cols-[328.81px_1fr] xl:gap-[16.19px]">
          {/* left */}
          <div className={`space-y-[0px] hidden xl:block`}>
            <ProfileContactInfo
              email={shop.owner.email}
              phone={'none'}
              address={formatAddress(shop.address)}
            />
          </div>
          {/* right */}
          <div className="space-y-[19px] overflow-hidden mt-[11px] xl:mt-0">
            <AuthorsAnalytics shop={shop} />
            <AuthorsProducts shop={shop} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ShopPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ShopPage;
