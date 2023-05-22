import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '@/types';
import { useState } from 'react';
import Layout from '@/layouts/_layout';
import Grid from '@/components/shop/grid';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { useRouter } from 'next/router';
import { useTopShops } from '@/data/shop';
import ButtonGroup from '@/components/ui/button-group';
import { SearchIcon } from '@/components/icons/search-icon';
import Button from '@/components/ui/button';

// import { useTranslation } from 'next-i18next';

const MAP_RANGE_FILTER = [
  {
    label: 'text-weekly',
    range: 7,
  },
  {
    label: 'text-monthly',
    range: 30,
  },
  {
    label: 'text-yearly',
    range: 365,
  },
];

// Every shop owner in an author here
function Shops() {
  const router = useRouter();

  let [selected, setRange] = useState(MAP_RANGE_FILTER[2]);
  let [searchText, setSearchText] = useState('');
  const { shops, loadMore, hasNextPage, isLoadingMore, isLoading } =
    useTopShops({
      range: selected.range,
      name: searchText,
    });
  return (
    <>
      <div className="flex flex-col justify-between px-[16px] pb-[35px] md:flex-row md:items-center md:pt-[24px] 2xl:pb-[58px] 2xl:pt-[38px]">
        <div className="mt-[32px] w-full px-[24px] md:mt-0">
          <div className="relative">
            <input
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus={true}
              placeholder="Search"
              className="peer h-[48px] w-full rounded-[100px] border border-[#bababa] bg-white bg-transparent pl-[70px] pr-[16px] font-poppins text-[14px] font-semibold text-dark-300 placeholder-dark-850 dark:border-[#434343] dark:bg-dark-100 dark:text-white dark:placeholder-[#434343] xl:text-[16px]"
            />
            <SearchIcon className="absolute left-[30px] top-1/2 h-[24px] w-[24px] -translate-y-1/2 text-dark-850 peer-focus:text-dark-300 dark:text-[#434343] dark:peer-focus:text-white" />
          </div>
        </div>
        <div className="mt-[20px] flex flex-shrink-0 px-[24px] md:mt-0">
          <Button
            className="w-full rounded-full text-sm tracking-[0.2px]"
            onClick={() => router.push(routes.createPost)}
          >
            Create A Post
          </Button>
        </div>
      </div>

      <Grid
        shops={shops}
        onLoadMore={loadMore}
        hasNextPage={hasNextPage}
        isLoadingMore={isLoadingMore}
        isLoading={isLoading}
      />
    </>
  );
}

const PostsPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="Posts"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.post}
      />
      <Shops />
    </>
  );
};

PostsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default PostsPage;
