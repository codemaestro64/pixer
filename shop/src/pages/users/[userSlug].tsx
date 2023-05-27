import type {
  NextPageWithLayout,
  Post,
  Product,
  ProductQueryOptions,
  SettingsQueryOptions,
  Shop,
  User,
} from '@/types';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import cn from 'classnames';
import { dehydrate, QueryClient, useMutation } from 'react-query';
import { motion } from 'framer-motion';
import client from '@/data/client';
import Layout from '@/layouts/_layout';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import invariant from 'tiny-invariant';
import ProfileBackground from '@/components/profile/profile-background';
import ProfileLogo from '@/components/profile/profile-logo';
import ProfileInfo from '@/components/profile/profile-info';
import UserInteractions from '@/components/users/users-interactions';
import ProfileSkills from '@/components/profile/profile-skills';
import ProfileContactInfo from '@/components/profile/profile-contactinfo';
import UserAnalytics from '@/components/users/users-analytics';
import UserProducts from '@/components/users/users-products';
import { Tab } from '@/components/ui/tab';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserLoader from './user-loader';
import { getProfileAvatar, getProfileCoverImage } from '@/lib/constants';
import ItemNotFound from '@/components/ui/item-not-found';

const UserProfilePage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const [user, setUser] = useState<User | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const router = useRouter();
  const { userSlug } = router.query;

  const { mutate: mutateUser, isLoading } = useMutation(client.users.get, {
    onSuccess: (res) => {
      console.log('@@@@@@@@@@@@@@@@@@@@', res);
      setNotFound(false);
      setUser(res);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
      setNotFound(true);
    },
  });

  useEffect(() => {
    if (typeof userSlug != 'string') return;
    console.log(userSlug);

    setUser(null);

    setTimeout(() => {
      mutateUser({ id: userSlug });
    }, 300);
  }, [userSlug]);

  return user ? (
    <motion.div variants={fadeInBottom()} className="justify-between">
      <div className="xl:p-[25px]">
        {/* first section */}
        <div>
          <ProfileBackground background={getProfileCoverImage(user.profile)} />
          <div className="lg:pl-[69px] lg:pr-[42px] flex flex-col lg:flex-row items-center">
            <ProfileLogo
              name={user.name}
              logo={getProfileAvatar(user.profile)}
            />
            <div className="pt-[32px] lg:pt-[11px] lg:pl-[21px] flex-1 flex flex-col lg:flex-row justify-between items-center space-y-[31px] lg:space-y-0">
              <ProfileInfo
                name={user.name}
                slug={user.name.toLowerCase().replace(' ', '_')}
                rating={4.6}
              />
              <UserInteractions user={user} />
            </div>
          </div>
        </div>
        {/* second section */}
        <div className="mt-[31.44px] xl:mt-[24px] grid grid-cols-1 xl:grid-cols-[328.81px_1fr] xl:gap-[16.19px]">
          {/* left */}
          <div
            className={`${
              (user.profile?.skills ?? 'none') === 'none' ||
              (user.profile?.skills ?? 'none') === ''
                ? 'space-y-[0px]'
                : 'space-y-[11px]'
            } hidden xl:block`}
          >
            <ProfileSkills skills={user.profile?.skills ?? 'none'} />
            <ProfileContactInfo
              email={user.email}
              phone={user.profile?.contact ?? 'none'}
              address={user.profile?.location ?? 'none'}
            />
          </div>
          {/* right */}
          <div className="space-y-[19px] overflow-hidden mt-[11px] xl:mt-0">
            <UserAnalytics user={user} />
            <UserProducts user={user} />
          </div>
        </div>
      </div>
    </motion.div>
  ) : notFound ? (
    <ItemNotFound
      title={'No profile found!'}
      message={"Sorry, we don't found any profile"}
      className="px-4 pt-5 pb-10 md:px-6 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8"
    />
  ) : (
    <UserLoader />
  );
};

UserProfilePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  return {
    paths: [
      // Object variant:
      { params: { userSlug: '/test' } },
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

export default UserProfilePage;
