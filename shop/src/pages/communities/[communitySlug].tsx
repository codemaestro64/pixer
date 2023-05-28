import type { 
  NextPageWithLayout,
  Community
} from '@/types';
import type { 
  GetStaticPaths,
  GetStaticProps, 
  InferGetStaticPropsType
} from 'next';
import Layout from '@/layouts/_layout';
import { dehydrate, QueryClient } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import client from '@/data/client';
import invariant from 'tiny-invariant';
import CommunityHeader from '@/components/community/community-header';
import CommunityRecommendation from '@/components/community/community-recommendation';
import CommunityMenu from '@/components/community/community-menu';
import CommunityInput from '@/components/community/community-input';
import CommunityPostActions from '@/components/community/community-post-actions';
import CommunityPosts from '@/components/community/community-posts';

// This function gets called at build time
type ParsedQueryParams = {
  communitySlug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async ({
  locales,
}) => {
  invariant(locales, 'locales is not defined');
  const { data } = await client.communities.all();
  console.log("ddd")

  const paths = data?.flatMap((community) =>
    locales?.map((locale) => ({
      params: { communitySlug: community.slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: 'blocking',
  };
};

type PageProps = {
  community: Community;
};

export const getStaticProps: GetStaticProps<
  PageProps,
  ParsedQueryParams
> = async ({ params, locale }) => {
  const { communitySlug } = params!;
  console.log(communitySlug);

  try {
    const community = await client.communities.get(communitySlug);
    
    return {
      props: {
        community,
        ...(await serverSideTranslations(locale!, ['common'])),
      },
      revalidate: 60, // In seconds
    };
  } catch (error) {
     //* if we get here, the community doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
}

const CommunityPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
 > = ({ community }) => {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div className='pb-[16px] xl:pr-[20px] xl:grid xl:grid-cols-[1fr_276px] 2xl:grid-cols-[1fr_421px]'>
        <div className='pt-[14px] sm:pt-[30px] 2xl:pt-[10px] px-[12px] sm:px-[26px] xl:pr-[14px] 2xl:px-[10px] xl:col-start-1 xl:row-end-2'>
          <CommunityHeader community={community} />
        </div>
        <div className='mt-[10px] sm:mt-[14px] xl:mt-[30px] 2xl:mt-[10px] xl:col-start-2 xl:row-span-2'>
          <CommunityRecommendation />
        </div>
        <div className='mt-[10px] sm:mt-[16px] xl:mt-[14px] 2xl:mt-[10px] px-[12px] sm:px-[26px] xl:pr-[14px] 2xl:px-[10px] space-y-[10px] xl:space-y-[14px] 2xl:space-y-[10px] xl:col-start-1 xl:row-start-2'>
          <CommunityMenu />
          <div className='space-y-[6px]'>
            <CommunityInput />
            <CommunityPostActions />
          </div>
          <div className='sm:pt-[16px] xl:pt-0'>
            <CommunityPosts />
          </div>
        </div>
      </div>
    </>
  );
};

CommunityPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CommunityPage;
