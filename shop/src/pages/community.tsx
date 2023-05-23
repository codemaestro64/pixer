import type { NextPageWithLayout } from '@/types';
import Layout from '@/layouts/_layout';
import CommunityHeader from '@/components/community/community-header';

const CommunityPage: NextPageWithLayout = () => {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div>
        <div className='pt-[46px] px-[14px]'>
          <CommunityHeader />
        </div>
      </div>
    </>
  );
};

CommunityPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CommunityPage;
