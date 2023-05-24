import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout, Post, PostQueryOptions } from '@/types';
import { useEffect, useState } from 'react';
import Layout from '@/layouts/_layout';
import Grid from '@/components/post/grid';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { useRouter } from 'next/router';
import { useTopShops } from '@/data/shop';
import ButtonGroup from '@/components/ui/button-group';
import { SearchIcon } from '@/components/icons/search-icon';
import Button from '@/components/ui/button';
import client from '@/data/client';
import { useMutation } from 'react-query';
// import { useTranslation } from 'next-i18next';

// Every shop owner in an author here
function Posts() {
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [params, setParams] = useState<PostQueryOptions>({
    page: 1,
    limit: 30,
  });

  const { mutate: mutatePosts, isLoading } = useMutation(client.posts.all, {
    onSuccess: (res) => {
      if (res.current_page === res.last_page) {
        setHasNextPage(false);
      } else {
        setHasNextPage(true);
        setParams({ ...params, page: params.page! + 1 });
      }
      setPosts([...posts, ...res.data]);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  useEffect(() => {
    mutatePosts(params);
  }, []);

  const loadMore = () => {
    mutatePosts(params);
  };

  return (
    <>
      <div className="sticky top-0 z-20 flex min-h-[64px] flex-col justify-between border-b border-light-400 bg-light-100 px-4 py-4 dark:border-dark-300 dark:bg-dark-100 sm:top-[70px] sm:min-h-[70px]  sm:px-5 sm:py-5 md:flex-row md:items-center md:px-6 lg:px-7 3xl:px-8">
        <div className="w-full px-[24px]">
          <div className="relative">
            <input
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
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
        posts={posts}
        limit={30}
        onLoadMore={loadMore}
        hasNextPage={hasNextPage}
        isLoadingMore={isLoading}
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
      <Posts />
    </>
  );
};

PostsPage.authorization = true;
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
