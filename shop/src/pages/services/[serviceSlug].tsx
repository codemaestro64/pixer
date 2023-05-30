import React, { useEffect, useState } from 'react';
import { NextPageWithLayout, Gig } from '@/types';
// import Seo from '@/layouts/_seo';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
// import Seo from '@/layouts/_seo';
import Layout from '@/layouts/_layout';

import ServiceLoader from '@/components/service/service-loader';
import Categories from '@/components/service/categories';
import SocialmediaAdbanner from '@/components/service/socialmedia-adbanner';
import ServicesInput from '@/components/service/services-input';
import ServicesSubmenu from '@/components/service/services-submenu';
import PostTitle from '@/components/service/post-title';
import PostImages from '@/components/service/post-images';
import ProfileInfo from '@/components/service/profile-info';
import Packages from '@/components/service/packages';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useMe } from '@/data/user';
import { useMutation } from 'react-query';
import client from '@/data/client';
import ItemNotFound from '@/components/ui/item-not-found';
import ServiceTags from '@/components/service/service-tags';
import ShowMore from 'react-show-more';

const ServicePage: NextPageWithLayout = () => {
  const [gig, setGig] = useState<Gig | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const router = useRouter();
  const { serviceSlug } = router.query;
  const { me } = useMe();
  const { mutate: mutateGig, isLoading } = useMutation(client.gigs.get, {
    onSuccess: (res) => {
      console.log(res);
      setGig(res);
      setNotFound(false);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
      setNotFound(true);
    },
  });

  useEffect(() => {
    if (typeof serviceSlug != 'string') return;

    setGig(null);

    setTimeout(() => {
      mutateGig({ id: serviceSlug });
    }, 300);
  }, [serviceSlug]);

  return gig && me ? (
    <>
      <div>
        <div className="py-[16px] xl:py-[26px] border-b border-b-[#393939] xl:border-b-[#DEDEDE] xl:dark:border-[#393939]">
          <Categories />
        </div>
        <div className="py-[8px] xl:pt-[26px] xl:pb-0 pl-[15px] xl:pl-[32px] pr-[10px] xl:pr-[38px] flex items-center justify-between">
          <SocialmediaAdbanner
            categories={gig.categories}
            sub_categories={gig.sub_categories}
            title={gig.title}
          />
          <ServicesInput />
        </div>
        <div className="mt-[16px] xl:mt-[19px] px-[11px] xl:px-[42px]">
          <ServiceTags tags={gig.keywords.split(',')} />
        </div>
        <div className="mt-[16px] xl:mt-[19px]">
          <ServicesSubmenu />
        </div>
        <div className="mt-[8px] xl:mt-[27px] 2xl:mb-[42px] 2xl:mr-[14px] 2xl:grid 2xl:grid-cols-2">
          {/* left */}
          <div className="xl:px-[24px]">
            <div className="mt-[8px] px-[18px]">
              <PostTitle title={gig.title} />
            </div>
            <div className="mt-[14.49px] xl:mt-[20px]">
              <PostImages attachments={gig.attachments} />
            </div>
            <div className="show-more-description mt-[14.49px] xl:mt-[20px]">
              {
                <ShowMore
                  lines={5}
                  more="Show more"
                  less="Show less"
                  anchorClass="underline text-brand font-poppins"
                >
                  {gig.descr}
                </ShowMore>
              }
            </div>
            <div className="mt-[15.49px] xl:mt-[35px] px-[7.5px]">
              <ProfileInfo
                name={gig.customer.name}
                info={gig.profile}
                orders_amount={gig.orders_amount ?? 0}
              />
            </div>
          </div>
          {/* right */}
          <div className="mt-[27px] mb-[16px] xl:px-[24px]">
            <div className="p-[7px] xl:p-[10px]">
              <Packages me={me} gig={gig} />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : notFound ? (
    <ItemNotFound
      title={'No gig found!'}
      message={"Sorry, we don't found any gig"}
      className="px-4 pt-5 pb-10 md:px-6 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8"
    />
  ) : (
    <ServiceLoader />
  );
};

ServicePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  return {
    paths: [
      // Object variant:
      { params: { serviceSlug: '/test' } },
    ],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default ServicePage;
