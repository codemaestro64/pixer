import { useTranslation } from 'next-i18next';
import { useEffect, useState, useContext, useRef } from 'react';
import { SearchIcon } from '@/components/icons/chat/search-icon';
import { SpeechIcon } from '@/components/icons/chat/speech-icon';
import Scrollbar from '@/components/ui/scrollbar';
import ChatAvatar from '@/components/chat/sidebar/avatar';
import ChatItem from '@/components/chat/sidebar/item';
import { Spin } from 'react-cssfx-loading';
import {
  createChannel,
  getChannel,
  getChannels,
  searchUsers,
} from '@/data/chat';
import { ChatUser } from '@/types';
import { getAuthUserInfo } from '@/data/client/token.utils';
import { Channel, UserResponse } from 'stream-chat';
import ChatContext from '@/lib/chat-context';
import { useTheme } from 'next-themes';

type ChatSidebarProps = {
  onSelectChannel: any;
  clickedAvatar: any;
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  clickedAvatar,
  onSelectChannel,
}) => {
  const { t } = useTranslation('common');
  let [searchText, setSearchText] = useState('');
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    selected_channel,
    setSelectedChannel,
    got_new_channel,
    setGotNewChannel,
    new_created_channel_id,
    setNewCreatedChannelID,
  } = useContext(ChatContext);

  const [users, setUsers] = useState<{
    loading: boolean;
    data: UserResponse[];
  }>({ loading: true, data: [] });

  const [recentChannels, setRecentChannels] = useState<{
    loading: boolean;
    data: Channel[];
  }>({ loading: true, data: [] });
  const [recentGroupChannels, setRecentGroupChannels] = useState<{
    loading: boolean;
    data: Channel[];
  }>({ loading: true, data: [] });

  const authUserInfo = getAuthUserInfo();

  useEffect(() => {
    searchUsers(searchText, authUserInfo ? authUserInfo : '').then((result) => {
      setUsers({ loading: false, data: result });
    });

    getChannels(authUserInfo ? authUserInfo : '')
      .then((result) => {
        setGotNewChannel(false);

        if (result.length > 0) {
          const channels = result.filter(
            (eachChannel) => eachChannel.type == 'messaging'
          );
          const groupChannels = result.filter(
            (eachChannel) => eachChannel.type == 'team'
          );

          console.log('channel amount - ', channels);
          setRecentChannels({ loading: false, data: channels });
          setRecentGroupChannels({ loading: false, data: groupChannels });

          let foundChannelIdx = channels.findIndex(
            (item) => item.id === new_created_channel_id
          );

          if (foundChannelIdx >= 0) {
            onSelectChannel(channels[foundChannelIdx]);
          }
        } else {
          setRecentChannels({ loading: false, data: [] });
          setRecentGroupChannels({ loading: false, data: [] });
        }

        clickedAvatar(false);
        setNewCreatedChannelID('');
      })
      .catch((e) => {
        setGotNewChannel(false);

        setRecentChannels({ loading: false, data: [] });
        setRecentGroupChannels({ loading: false, data: [] });

        clickedAvatar(false);
        setNewCreatedChannelID('');
      });
  }, [got_new_channel]);

  useEffect(() => {}, [users]);

  const onClickedAvatar = (info: ChatUser) => {
    if (!authUserInfo) return;

    clickedAvatar(true);

    getChannel(authUserInfo, info.id).then((result) => {
      if (result.length > 0) {
        clickedAvatar(false);
        onSelectChannel(result[0]);
      } else {
        setNewCreatedChannelID(`${authUserInfo}-${info.id}`);

        createChannel(authUserInfo, info.id).then(() => {
          //setGotNewChannel(true);
        });
      }
    });
  };

  const onArchiveChat = () => {};

  const makeChatsUI = (channels: Channel[], bRecent: boolean) => {
    if (channels.length == 0) {
      return (
        <div className="mt-4 flex w-full items-center justify-center bg-white text-xs text-black dark:bg-dark-100 dark:text-white">
          No {bRecent ? 'recent chat' : 'recent group chat'} found
        </div>
      );
    } else {
      return (
        <ul role="list" className="mt-4">
          {channels.map((item, key) => (
            <ChatItem
              key={key}
              channel={item}
              onSelectChannel={onSelectChannel}
            />
          ))}
        </ul>
      );
    }
  };

  return (
    <div
      className={`${
        selected_channel ? 'hidden' : 'w-full'
      } h-full border-r-[1px] border-light-400 dark:border-dark-300 sm:block sm:w-[50%] md:w-[40%] lg:w-[30%]`}
    >
      <div className="flex h-full flex-col  justify-between bg-white text-dark-900 dark:bg-dark-100">
        <div className="items-centerleading-6 mt-10 flex-col px-4">
          <div className="text-xl text-black dark:text-white">Chat</div>
          <div className="mt-2 flex h-[42px] flex-row items-center justify-between gap-1 rounded-full border-0 bg-light-100 px-4 dark:bg-dark-500">
            <SearchIcon className="h-[18px] w-[18px] text-online" />
            <input
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus={true}
              placeholder={t('text-placeholder-search')}
              className="border-dark-30 h-full w-full border-0 bg-transparent bg-light-100  pl-2 text-13px outline-none focus:ring-0 dark:bg-dark-500"
            />
            <SpeechIcon className="h-[18px] w-[18px] text-current" />
          </div>
        </div>

        <Scrollbar className="relative mt-10 h-full w-full">
          <div ref={bottomRef} className="flex w-full flex-col px-4">
            <div className="w-full">
              <div className="flex flex-row flex-nowrap items-center justify-start gap-2 overflow-x-auto overflow-y-hidden ">
                {users.loading ? (
                  <div className="flex w-full items-center justify-center">
                    <Spin color={isDarkMode ? '#ffffff' : '#181818'} />
                  </div>
                ) : (
                  <>
                    <ChatAvatar addNew={true} />
                    {users.data.map((item, key) => (
                      <ChatAvatar
                        key={key}
                        addNew={false}
                        info={item}
                        onClickedAvatar={onClickedAvatar}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="mt-10 flex w-full flex-row items-center justify-between">
              <div className="text-xl text-black dark:text-white">Message</div>
              <button
                className="text-black-20 min-h-[30px] rounded-full border-2 border-online bg-online bg-opacity-30 px-2 text-xs hover:bg-opacity-0 dark:text-white"
                onClick={onArchiveChat}
              >
                Archive Chat
              </button>
            </div>

            <div className="sticky top-0 z-20 mt-10 bg-white text-xs text-black dark:bg-dark-100 dark:text-white">
              RECENT CHAT
            </div>

            {recentChannels.loading ? (
              <div className="mt-4 flex w-full items-center justify-center">
                <Spin color={isDarkMode ? '#ffffff' : '#181818'} />
              </div>
            ) : (
              makeChatsUI(recentChannels.data, true)
            )}

            <div className="mt-4 h-[2px] bg-light-400 px-4 dark:bg-dark-300 " />
            <div className="sticky top-0 z-20 mt-10 bg-white text-xs text-black dark:bg-dark-100 dark:text-white">
              GROUP CHAT
            </div>
            {recentGroupChannels.loading ? (
              <div className="mt-4 flex w-full items-center justify-center">
                <Spin color={isDarkMode ? '#ffffff' : '#181818'} />
              </div>
            ) : (
              makeChatsUI(recentGroupChannels.data, false)
            )}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default ChatSidebar;
