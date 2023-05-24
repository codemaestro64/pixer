import React, { useEffect, useState } from 'react';
import { NextPageWithLayout, Post } from '@/types';
// import Seo from '@/layouts/_seo';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import invariant from 'tiny-invariant';
import Layout from '@/layouts/_layout';
import Image from '@/components/ui/image';
import TrendingProductImage from '@/assets/images/trending-product.png';
import ContentInput from '@/components/content/content-input';
import ContentTags from '@/components/content/content-tags';
import ContentSocial from '@/components/content/content-social';
import ContentInteractions from '@/components/content/content-interactions';
import ContentTopProduct from '@/components/content/content-top-product';
import Publisher from '@/components/content/publisher';
import PublisherLogo from '@/assets/images/publisher-logo.png';
import { EllipsisVerticalIcon } from '@/components/icons/ellipsis-vertical-icon';
import ContentLatestProduct from '@/components/content/content-latest-product';
import client from '@/data/client';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import ContentLoader from '@/components/content/content-loader';
import placeholder from '@/assets/images/placeholders/product.svg';
import ProductGalleryThumbnail from '@/components/product/product-gallery-thumbnail';
import ProductGalleryThumbs from '@/components/product/product-gallery-thumbs';

import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@/components/ui/slider';
import { useMe } from '@/data/user';
import { getProfileAvatar, getProfileAvatarImage } from '@/lib/constants';

function TopAndLatestProductsButton({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`px-[4px] font-poppins text-[16px] font-medium md:text-[23.64px] ${
        active
          ? 'pointer-events-none text-dark-300 dark:text-[#d5d5d5] 2xl:dark:text-white'
          : 'text-[#989898] 2xl:hidden'
      }`}
    >
      {label}
    </button>
  );
}

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const PostPage: NextPageWithLayout = () => {
  const [post, setPost] = useState<Post | null>(null);

  const router = useRouter();
  const { postSlug } = router.query;
  const { me } = useMe();
  const { mutate: mutatePost, isLoading } = useMutation(client.posts.get, {
    onSuccess: (res) => {
      setPost(res);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  useEffect(() => {
    if (typeof postSlug != 'string') return;
    mutatePost({ id: postSlug });
  }, [postSlug]);

  let [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return post && me ? (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-9">
        <div className="grid-cols-1 2xl:col-span-6">
          <div className="overflow-hidden px-[13px] pt-[13px] md:px-[30px] md:pt-[18px] 2xl:hidden">
            <div>
              <ContentInput />
            </div>
            <div className="overflow-hidden pt-[14px]">
              <ContentTags tags={post.keywords.split(',')} />
            </div>
          </div>
          <div className="mt-[34px] px-[14px] md:mt-[24px] md:px-[32px] 2xl:px-[34px]">
            <div className="relative h-[183.13px] overflow-hidden rounded-[5.56px] md:h-[309px] 2xl:h-[440px] 2xl:rounded-[10px]">
              <ProductGalleryThumbnail
                gallery={post.attachments}
                thumbsSwiper={thumbsSwiper}
                swiperParams={swiperParams}
              />
            </div>
            <div className="md:grid md:grid-cols-2">
              <div>
                <div className="mt-[10.94px] md:mt-[13px] 2xl:mt-[15px]">
                  <h1 className="truncate-text-line-two font-poppins text-[18px] font-semibold text-[#3a3a3a] dark:text-[#dedede] md:w-[334px] md:text-[22px] 2xl:w-[400px] 2xl:text-[32px] 3xl:w-[544px]">
                    {post.title}
                  </h1>
                  <h1 className="md:text-[14px]2xl:text-[16px] break-words font-poppins text-[12px] text-[#3a3a3a] dark:text-[#dedede]">
                    {post.descr}
                  </h1>
                  <div className="mt-4">
                    <ProductGalleryThumbs
                      gallery={post.attachments}
                      setThumbsSwiper={setThumbsSwiper}
                    />
                  </div>
                </div>
                <div className="mt-[10.56px] md:mt-[18.75px] 2xl:mt-[28px]">
                  <Publisher
                    name={post.customer.name}
                    followers={20}
                    logo={post.profile}
                  />
                </div>
              </div>
              <div className="mt-[20px] flex items-center px-[4px] md:mt-[32.8px] md:flex-col md:px-0 2xl:mt-[46px]">
                <ContentSocial post={post} me={me} />
                <div className="relative ml-auto flex md:mt-[35.2px] 2xl:mt-[61.79px]">
                  <div className="flex 2xl:absolute 2xl:right-0">
                    <ContentInteractions post={post} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[27.73px] 2xl:mt-[60.5px]">
            <div className="space-x-[22px] px-[14px] md:px-[36px] 2xl:flex 2xl:justify-between">
              <TopAndLatestProductsButton label="Top Products" active />
              <TopAndLatestProductsButton label="Latest Products" />
              <div className="hidden 2xl:block">
                <button className="mr-[32px] inline-block">
                  <EllipsisVerticalIcon className="h-[42px] w-[42px] rotate-90 text-dark-300 dark:text-white" />
                </button>
              </div>
            </div>
            <div className="mt-[15px] space-y-[8px] px-[10px] pb-[16px] md:mt-[28px] md:space-y-[18px] md:px-[24px] md:pb-[24px] 2xl:mt-[25.5px] 2xl:px-[29px]">
              <ContentTopProduct
                position="01"
                name="Reactify Ecommerce Theme with Dashboard"
                publisher="Qubitron Solutions"
              />
              <ContentTopProduct
                position="02"
                name="RNB Modern Laravel React Rental System"
                publisher="Imagineco"
              />
              <ContentTopProduct
                position="03"
                name="Reactify Ecommerce Theme with Dashboard"
                publisher="Qubitron Solutions"
              />
            </div>
          </div>
        </div>
        <div className="mt-[24px] hidden pr-[25.85px] 2xl:col-span-3 2xl:block">
          <div className="flex min-w-0 overflow-auto">
            <ContentTags tags={post.keywords.split(',')} />
          </div>
          <div className="mt-[25.65px]">
            <div className="hidden items-center justify-between px-[20px] py-[14px] 2xl:flex">
              <TopAndLatestProductsButton label="Latest Products" active />
              <div className="hidden 2xl:block">
                <button className="inline-block">
                  <EllipsisVerticalIcon className="h-[42px] w-[42px] rotate-90 text-dark-300 dark:text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-[16px] space-y-[26px] pl-[8px] pb-[32px]">
            <ContentLatestProduct />
            <ContentLatestProduct />
            <ContentLatestProduct />
            <ContentLatestProduct />
            <ContentLatestProduct />
          </div>
        </div>
      </div>
    </>
  ) : (
    <ContentLoader />
  );
};

PostPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  return {
    paths: [
      // Object variant:
      { params: { postSlug: '/test' } },
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

export default PostPage;
