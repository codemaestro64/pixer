import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Header from '@/layouts/_header';
import { Sidebar } from '@/layouts/_layout-sidebar';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useMutation } from 'react-query';
import { useMe } from '@/data/user';
import client from '@/data/client';
import { chatClient } from '@/data/chat';
import { setAuthUserInfo } from '@/data/client/token.utils';
import ChatContent from '@/components/chat/content';
import ChatContext from '@/lib/chat-context';

const BottomNavigation = dynamic(() => import('@/layouts/_bottom-navigation'), {
  ssr: false,
});

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  let [collapse, setCollapse] = useState(false);
  const {
    setUnreadChannelsCnt,
    setUnreadMessagesCnt,
    setGotNewChannel,
    setSelectedChannel,
    new_created_channel_id,
  } = useContext(ChatContext);

  const { me, isAuthorized, isLoading } = useMe();
  const { mutate: generateChatToken } = useMutation(
    client.users.generateChatToken,
    {
      onSuccess: async (data) => {
        if (!data.token) {
          return;
        }

        setAuthUserInfo(data.user_id);

        chatClient.on((event) => {
          console.log('Event - event', event, new_created_channel_id);
          if (event.type === 'message.new') {
            setGotNewChannel(true);
          }

          if (event.total_unread_count) {
            console.log(
              `unread messages count is now: ${event.total_unread_count}`
            );
            setUnreadMessagesCnt(event.total_unread_count);
          }

          if (event.unread_channels) {
            console.log(
              `unread channels count is now: ${event.unread_channels}`
            );
            setUnreadChannelsCnt(event.unread_channels);
          }
        });

        const avatarLink = me?.profile?.avatar.thumbnail;
        const user = await chatClient.connectUser(
          {
            id: data.user_id,
            name: data.user_name,
            avatar: avatarLink
              ? avatarLink!.replace('localhost', '127.0.0.1:8000')
              : undefined,
          },
          data.token
        );

        if (user?.me?.total_unread_count) {
          setUnreadMessagesCnt(user.me.total_unread_count);
        }

        if (user?.me?.unread_channels) {
          setUnreadChannelsCnt(user.me.unread_channels);
        }

        console.log(
          `you have ${user?.me?.total_unread_count} unread messages on ${user?.me?.unread_channels} channels.`
        );
      },
    }
  );

  function toggleSidebar() {
    setCollapse((prev) => !prev);
  }

  useEffect(() => {
    if (isAuthorized && me && !isLoading) {
      generateChatToken({ email: me.email, name: me.name });
    }
  }, [isLoading]);

  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      className="flex min-h-screen w-full flex-col bg-light-300 dark:bg-dark-100"
    >
      <Header
        isCollapse={collapse}
        showHamburger={true}
        onClickHamburger={toggleSidebar}
      />
      <div className="flex flex-1">
        <Sidebar isCollapse={collapse} />
        <main
          className={cn(
            'flex w-full flex-col',
            collapse
              ? 'ltr:sm:pl-60 rtl:sm:pr-60 ltr:xl:pl-[75px] rtl:xl:pr-[75px]'
              : 'ltr:sm:pl-[75px] rtl:sm:pr-[75px] ltr:xl:pl-60 rtl:xl:pr-60'
          )}
        >
          {children}
        </main>
      </div>
      {isMounted && breakpoint === 'xs' && <BottomNavigation />}
    </motion.div>
  );
}
