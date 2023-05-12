import type {
  CategoryQueryOptions,
  NextPageWithLayout,
  ProductQueryOptions,
  TypeQueryOptions,
} from '@/types';
import type { GetStaticProps } from 'next';
import Layout from '@/layouts/_layout';
import ChatSidebar from '@/components/chat/sidebar';
import ChatContent from '@/components/chat/content';
import ChatDetails from '@/components/chat/details';
import { useRouter } from 'next/router';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import client from '@/data/client';
import { dehydrate, QueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import PromoCarousel from '@/components/product/promo-carousel';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTypes } from '@/data/type';
import isEmpty from 'lodash/isEmpty';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { motion } from 'framer-motion';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { SetStateAction, useState, useContext, useEffect } from 'react';
import ChatContext from '@/lib/chat-context';
import { chatClient } from '@/data/chat';
import { Channel } from 'stream-chat';
import { Spin } from 'react-cssfx-loading';
import { useTheme } from 'next-themes';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  try {
    await Promise.all([
      queryClient.prefetchInfiniteQuery(
        [API_ENDPOINTS.PRODUCTS, { language: locale }],
        ({ queryKey }) =>
          client.products.all(queryKey[1] as ProductQueryOptions)
      ),
      queryClient.prefetchInfiniteQuery(
        [API_ENDPOINTS.CATEGORIES, { limit: 100, language: locale }],
        ({ queryKey }) =>
          client.categories.all(queryKey[1] as CategoryQueryOptions)
      ),
      queryClient.prefetchInfiniteQuery(
        [API_ENDPOINTS.TYPES, { limit: 100, language: locale }],
        ({ queryKey }) => client.types.all(queryKey[1] as TypeQueryOptions)
      ),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale!, ['common'])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60, // In seconds
    };
  } catch (error) {
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
};

function ChatMain() {
  const { query } = useRouter();
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const {
    selected_channel,
    setSelectedChannel,
    new_message_info,
    setNewMessageInfo,
    got_new_channel,
  } = useContext(ChatContext);

  const [loading, setLoading] = useState<boolean>(false);

  const onSelectChannel = (channel: Channel) => {
    if (selected_channel) {
      selected_channel!.off('message.new', messageNewHandler);
    }

    setSelectedChannel(channel);
  };

  const clickedAvatar = (bFlag: boolean) => {
    setLoading(bFlag);
  };

  const messageNewHandler = async (event: any) => {
    setNewMessageInfo({ gotNew: true, message: event.message });

    if (selected_channel) {
      try {
        selected_channel?.markRead(); //user_id: authUserInfo!
      } catch (e) {
        console.log('mark read - ', e);
      }
    }
  };

  useEffect(() => {
    if (selected_channel) {
      selected_channel?.off('message.new', messageNewHandler);
    }

    setSelectedChannel(null);

    return () => {
      if (selected_channel) {
        selected_channel?.off('message.new', messageNewHandler);
      }
    };
  }, []);

  useEffect(() => {
    if (selected_channel) {
      selected_channel!.off('message.new', messageNewHandler);
    } else {
      return;
    }

    selected_channel!.off('message.new', messageNewHandler);
    selected_channel!.on('message.new', messageNewHandler);
  }, [selected_channel]);

  useEffect(() => {
    if (got_new_channel && selected_channel) {
      selected_channel!.off('message.new', messageNewHandler);
    }
  }, [got_new_channel]);

  return (
    <div
      className={`${
        isMounted && ['xs'].indexOf(breakpoint) !== -1
          ? 'h-[calc(100vh-120px)]'
          : 'h-[calc(100vh-70px)]'
      } flex flex-row bg-white dark:bg-dark-100`}
    >
      <ChatSidebar
        clickedAvatar={clickedAvatar}
        onSelectChannel={onSelectChannel}
      />
      {selected_channel ? (
        <>
          <ChatContent />
          <ChatDetails />
        </>
      ) : (
        <div className="hidden h-full w-full grow border-r-[1px] border-light-400 dark:border-dark-300 sm:block">
          <div className="flex h-full w-full items-center justify-center bg-white text-[16px] text-black dark:bg-dark-100 dark:text-white">
            Select a conversation to start chatting
          </div>
        </div>
      )}

      {loading && (
        <div className="z-90 fixed top-0 bottom-0 flex w-full items-center justify-center bg-dark-200 opacity-80 duration-700">
          <Spin color={isDarkMode ? '#ffffff' : '#181818'} />
        </div>
      )}
    </div>
  );
}

const Chat: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="UI Design Resources, UI Kits, Wireframes, Icons and More"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.home}
      />
      <ChatMain />
    </>
  );
};

Chat.authorization = true;
Chat.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Chat;
