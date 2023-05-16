import React from 'react'
import { NextPageWithLayout } from '@/types';
// import Seo from '@/layouts/_seo';
import Layout from '@/layouts/_layout';

import Categories from '@/components/services/categories';
import SocialmediaAdbanner from '@/components/services/socialmedia-adbanner';
import ServicesInput from '@/components/services/services-input';
import ServicesSubmenu from '@/components/services/services-submenu';
import PostTitle from '@/components/services/post-title';
import PostImages from '@/components/services/post-images';
import ProfileInfo from '@/components/services/profile-info';

const ServicesPage: NextPageWithLayout = () => {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div>
        <div className='py-[16px] border-b border-b-[#393939]'>
          <Categories />
        </div>
        <div className='py-[8px] pl-[15px] pr-[10px] flex justify-between'>
          <SocialmediaAdbanner />
          <ServicesInput />
        </div>
        <div className='mt-[16px] mb-[8px]'>
          <ServicesSubmenu />
        </div>
        <div>
          {/* left */}
          <div>
            <div className='mt-[8px] px-[18px]'>
              <PostTitle title='I will design professional Graphic Design for Social Media Post' />
            </div>
            <div className='mt-[14.49px]'>
              <PostImages />
            </div>
            <div className='mt-[15.49px] px-[7.5px]'>
              <ProfileInfo />
            </div>
          </div>
          {/* right */}
          <div className='mt-[27px]'></div>
        </div>
      </div>
    </>
  );
};

ServicesPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ServicesPage;