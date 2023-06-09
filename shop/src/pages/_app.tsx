import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { validateEnvironmentVariables } from '@/config/validate-environment-variables';
import { CartProvider } from '@/components/cart/lib/cart.context';
import { ModalProvider } from '@/components/modal-views/context';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SearchView from '@/components/search/search-view';
import DefaultSeo from '@/layouts/_default-seo';
import { SearchProvider } from '@/components/search/search.context';
//@ts-ignore
import { Portal } from 'react-portal';

// base css file
import '@/assets/css/inputfile.css';
import '@/assets/css/swiper-carousel.css';
import '@/assets/css/pagination.css';
import '@/assets/css/globals.css';
import '@/assets/css/tagify.css';
import '@/assets/css/scrollbar.css';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getDirection } from '@/lib/constants';
import { useMe } from '@/data/user';
import ChatContext from '@/lib/chat-context';
import FeedContext from '@/lib/feed-context';
import { Channel, MessageResponse } from 'stream-chat';

const PrivateRoute = dynamic(() => import('@/layouts/_private-route'), {
  ssr: false,
});

validateEnvironmentVariables();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const { locale } = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);
  const dir = getDirection(locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const authenticationRequired = Component.authorization ?? false;

  const [triggerFeeds, setTriggerFeeds] = useState<boolean>(false);
  const [triggerPost, setTriggerPost] = useState<boolean>(false);
  const [selectedFeedID, setSelectedFeedID] = useState<string>('-1');

  const [unread_messages_cnt, setUnreadMessagesCnt] = useState<number>(0);
  const [unread_channels_cnt, setUnreadChannelsCnt] = useState<number>(0);
  const [got_new_channel, setGotNewChannel] = useState<boolean>(false);
  const [selected_channel, setSelectedChannel] = useState<Channel | null>(null);
  const [new_created_channel_id, setNewCreatedChannelID] = useState<string>('');
  const [selected_channel_update, setSelectedChannelUpdate] =
    useState<boolean>(false);
  const [new_message_info, setNewMessageInfo] = useState<{
    gotNew: boolean;
    message: MessageResponse | null;
  }>({ gotNew: false, message: null });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <ChatContext.Provider
            value={{
              unread_channels_cnt,
              setUnreadChannelsCnt,
              unread_messages_cnt,
              setUnreadMessagesCnt,
              got_new_channel,
              setGotNewChannel,
              selected_channel,
              setSelectedChannel,
              new_created_channel_id,
              setNewCreatedChannelID,
              selected_channel_update,
              setSelectedChannelUpdate,
              new_message_info,
              setNewMessageInfo,
            }}
          >
            <FeedContext.Provider
              value={{
                triggerFeeds,
                setTriggerFeeds,
                triggerPost,
                setTriggerPost,
                selectedFeedID,
                setSelectedFeedID,
              }}
            >
              <SearchProvider>
                <CartProvider>
                  <ModalProvider>
                    <AnimatePresence
                      exitBeforeEnter
                      initial={false}
                      onExitComplete={() => window.scrollTo(0, 0)}
                    >
                      <>
                        <DefaultSeo />
                        {authenticationRequired ? (
                          <PrivateRoute>
                            {getLayout(<Component {...pageProps} />)}
                          </PrivateRoute>
                        ) : (
                          getLayout(<Component {...pageProps} />)
                        )}
                        <SearchView />
                        <ModalsContainer />
                        <DrawersContainer />
                        <Portal>
                          <Toaster containerClassName="!top-16 sm:!top-3.5 !bottom-16 sm:!bottom-3.5" />
                        </Portal>
                      </>
                    </AnimatePresence>
                  </ModalProvider>
                </CartProvider>
              </SearchProvider>
            </FeedContext.Provider>
          </ChatContext.Provider>
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default appWithTranslation(CustomApp);
