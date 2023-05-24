import type { NextPageWithLayout } from '@/types';
import Layout from '@/layouts/_layout';
import CommunityHeader from '@/components/community/community-header';
import CommunityRecommendation from '@/components/community/community-recommendation';
import CommunityMenu from '@/components/community/community-menu';
import CommunityInput from '@/components/community/community-input';
import CommunityPostActions from '@/components/community/community-post-actions';
import CommunityPosts from '@/components/community/community-posts';

const CommunityPage: NextPageWithLayout = () => {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div className='pb-[16px]'>
        <div className='pt-[14px] px-[12px]'>
          <CommunityHeader />
        </div>
        <div className='mt-[11px]'>
          <CommunityRecommendation />
        </div>
        <div className='mt-[10px] px-[12px] space-y-[10px]'>
          <CommunityMenu />
          <div className='space-y-[6px]'>
            <CommunityInput />
            <CommunityPostActions />
          </div>
          <CommunityPosts />
        </div>
      </div>
    </>
  );
};

CommunityPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CommunityPage;
