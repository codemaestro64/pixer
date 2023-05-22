import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPageWithLayout } from '@/types';
import Seo from '@/layouts/_seo';
import Layout from '@/layouts/_layout';
import routes from '@/config/routes';
import CreatePostContainer from '@/components/post/create-container';

const CreatePostPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="Create a Post"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.createPost}
      />
      <CreatePostContainer />
    </>
  );
};

CreatePostPage.getLayout = function getLayout(page) {
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

export default CreatePostPage;
