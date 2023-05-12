import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '@/types';
import { useState } from 'react';
import Layout from '@/layouts/_layout';
import Grid from '@/components/shop/grid';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { useTopShops } from '@/data/shop';
import ButtonGroup from '@/components/ui/button-group';
import { SearchIcon } from '@/components/icons/search-icon';
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
  let [selected, setRange] = useState(MAP_RANGE_FILTER[2]);
  let [searchText, setSearchText] = useState('');
  const { shops, loadMore, hasNextPage, isLoadingMore, isLoading } =
    useTopShops({
      range: selected.range,
      name: searchText,
    });
  return (
    <>
      <div className="flex flex-col px-[16px] pb-[35px] xs:flex-row">
        <div className='mt-[32px] px-[24px]'>
          <div className='relative'>
            <input
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus={true}
              placeholder="Search"
              className="peer text-dark-300 dark:text-white h-[48px] w-full pl-[70px] pr-[16px] text-[14px] bg-white dark:bg-dark-100 border border-[#bababa] dark:border-[#434343] font-poppins font-semibold rounded-[100px] placeholder-dark-850 dark:placeholder-[#434343] bg-transparent"
            />
            <SearchIcon className="absolute left-[30px] top-1/2 -translate-y-1/2 h-[24px] w-[24px] text-dark-850 dark:text-[#434343] peer-focus:text-dark-300 dark:peer-focus:text-white" />
          </div>
        </div>
        <div className='mt-[20px] px-[24px]'>
          <ButtonGroup items={MAP_RANGE_FILTER} selectedValue={selected} onChange={setRange} />
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

const AuthorsPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="Shops"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.authors}
      />
      <Shops />
    </>
  );
};

AuthorsPage.getLayout = function getLayout(page) {
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

export default AuthorsPage;
