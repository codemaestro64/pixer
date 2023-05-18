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
import Packages from '@/components/services/packages';

const ServicesPage: NextPageWithLayout = () => {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div>
        <div className='py-[16px] xl:py-[26px] border-b border-b-[#393939] xl:border-b-[#DEDEDE] xl:dark:border-[#393939]'>
          <Categories />
        </div>
        <div className='py-[8px] xl:pt-[26px] xl:pb-0 pl-[15px] xl:pl-[32px] pr-[10px] xl:pr-[38px] flex items-center justify-between'>
          <SocialmediaAdbanner />
          <ServicesInput />
        </div>
        <div className='mt-[16px] xl:mt-[19px]'>
          <ServicesSubmenu />
        </div>
        <div className='mt-[8px] xl:mt-[27px] 2xl:mb-[42px] 2xl:mr-[14px] 2xl:grid 2xl:grid-cols-2'>
          {/* left */}
          <div className='xl:px-[24px]'>
            <div className='mt-[8px] px-[18px]'>
              <PostTitle title='I will design professional Graphic Design for Social Media Post' />
            </div>
            <div className='mt-[14.49px] xl:mt-[20px]'>
              <PostImages />
            </div>
            <div className='mt-[15.49px] xl:mt-[35px] px-[7.5px]'>
              <ProfileInfo />
            </div>
          </div>
          {/* right */}
          <div className='mt-[27px] mb-[16px] xl:px-[24px]'>
            <div className='p-[7px] xl:p-[10px]'>
              <Packages />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ServicesPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ServicesPage;