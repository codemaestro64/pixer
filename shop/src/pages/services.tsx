import React from 'react'
import { NextPageWithLayout } from '@/types';
// import Seo from '@/layouts/_seo';
import Layout from '@/layouts/_layout';
import Image from '@/components/ui/image';
import TrendingProductImage from '@/assets/images/trending-product.png';
import ServiceInput from '@/components/service/service-input';
import ServiceTags from '@/components/service/service-tags';
import ServiceSocial from '@/components/service/service-social';
import ServiceInteractions from '@/components/service/service-interactions';
import ServiceTopProduct from '@/components/service/service-top-product';
import Publisher from '@/components/service/publisher';
import PublisherLogo from '@/assets/images/publisher-logo.png';

function TopAndLatestProductsButton({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <button className={`text-[16px] md:text-[23.64px] font-poppins font-medium px-[4px] ${ active ? 'text-dark-300 dark:text-[#d5d5d5] pointer-events-none' : 'text-[#989898] 3xl:hidden' }`}>{ label }</button>
  )
}

const Services: NextPageWithLayout = () => {
  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div className='grid grid-cols-1 3xl:grid-cols-[1fr_586.85px]'>
        <div>
          <div className='px-[13px] md:px-[30px] pt-[13px] md:pt-[18px] 3xl:hidden overflow-hidden'>
            <div>
              <ServiceInput />
            </div>
            <div className='pt-[14px]'>
              <ServiceTags />
            </div>
          </div>
          <div className='mt-[34px] md:mt-[24px] px-[14px] md:px-[32px] 3xl:px-[34px]'>
            <div className='h-[183.13px] md:h-[309px] 3xl:h-[440px] relative rounded-[5.56px] overflow-hidden'>
              <Image src={TrendingProductImage} alt='Product' layout='fill' objectFit='cover' />
            </div>
            <div className='md:grid md:grid-cols-2'>
              <div>
                <div className='mt-[10.94px] md:mt-[13px] 3xl:mt-[15px]'>
                  <h1 className='text-[18px] md:text-[22px] 3xl:text-[32px] md:w-[334px] 3xl:w-[544px] text-[#3a3a3a] dark:text-[#dedede] font-semibold font-poppins'>Reactify Ecommerce Theme with Dashboard</h1>
                </div>
                <div className='mt-[10.56px] md:mt-[18.75px] 3xl:mt-[28px]'>
                  <Publisher name='Qubitron Solutions' followers={20} logo={PublisherLogo} />
                </div>
              </div>
              <div className='mt-[20px] md:mt-[32.8px] 3xl:mt-[46px] px-[4px] md:px-0 flex items-center md:flex-col'>
                <ServiceSocial />
                <div className='ml-auto flex md:mt-[35.2px] 3xl:mt-[61.79px]'>
                  <ServiceInteractions />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-[27.73px] 3xl:mt-[60.5px]'>
            <div className='px-[14px] md:px-[36px] space-x-[22px] md:space-x-[33px]'>
              <TopAndLatestProductsButton label='Top Products' active />
              <TopAndLatestProductsButton label='Latest Products' />
            </div>
            <div className='px-[10px] md:px-[24px] 3xl:px-[29px] pb-[16px] md:pb-[24px] space-y-[8px] md:space-y-[18px] mt-[15px] md:mt-[28px] 3xl:mt-[25.5px]'>
              <ServiceTopProduct position='01' name='Reactify Ecommerce Theme with Dashboard' publisher='Qubitron Solutions' />
              <ServiceTopProduct position='02' name='RNB Modern Laravel React Rental System' publisher='Imagineco' />
              <ServiceTopProduct position='03' name='Reactify Ecommerce Theme with Dashboard' publisher='Qubitron Solutions' />
            </div>
          </div>
        </div>
        <div className='hidden 3xl:block'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In, id!
        </div>
      </div>
    </>
  );
};

Services.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Services;