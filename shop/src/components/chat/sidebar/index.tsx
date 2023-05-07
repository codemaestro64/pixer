import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { SearchIcon } from '@/components/icons/chat/search-icon';
import { SpeechIcon } from '@/components/icons/chat/speech-icon';
import Scrollbar from '@/components/ui/scrollbar';
import ChatAvatar from '@/components/chat/sidebar/avatar';
import ChatItem from '@/components/chat/sidebar/item';

import sampleAvatar1 from '@/assets/images/avatars/1.png';
import sampleAvatar2 from '@/assets/images/avatars/2.png';
import sampleAvatar3 from '@/assets/images/avatars/3.png';
import sampleAvatar4 from '@/assets/images/avatars/4.png';
import sampleAvatar5 from '@/assets/images/avatars/5.png';

const avatarData = [
  { addNew: true, avatar: null },
  { addNew: false, avatar: sampleAvatar1 },
  { addNew: false, avatar: sampleAvatar2 },
  { addNew: false, avatar: sampleAvatar3 },
  { addNew: false, avatar: sampleAvatar4 },
  { addNew: false, avatar: sampleAvatar5 },
];

const recentChats = [
  {
    avatar: sampleAvatar1,
    online: false,
    name: 'Neil Sims',
    message: 'Hi, How are you?',
    newMsgCnt: 3,
    time: '12 mar',
  },
  {
    avatar: sampleAvatar2,
    online: true,
    name: 'Neil Sims',
    message: 'Hi, How are you?',
    newMsgCnt: 0,
    time: '12 mar',
  },
  {
    avatar: sampleAvatar3,
    online: true,
    name: 'Neil Sims',
    message: 'Hi, How are you?',
    newMsgCnt: 0,
    time: '12 mar',
  },
  {
    avatar: sampleAvatar4,
    online: true,
    name: 'Neil Sims',
    message: 'Hi, How are you?',
    newMsgCnt: 0,
    time: '12 mar',
  },
  {
    avatar: sampleAvatar5,
    online: true,
    name: 'Neil Sims',
    message: 'Hi, How are you?',
    newMsgCnt: 0,
    time: '12 mar',
  },
];

const ChatSidebar = () => {
  const { t } = useTranslation('common');
  let [searchText, setSearchText] = useState('');

  const onArchiveChat = () => {};
  // xl:w-[400px]
  return (
    <div className="h-full w-full border-r-[1px] border-light-400 dark:border-dark-300 sm:w-[50%] md:w-[40%] lg:w-[30%]">
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
          <div className="flex w-full flex-col px-4">
            <div className="w-full">
              <div className="flex flex-row flex-nowrap items-center justify-start gap-2 overflow-x-auto overflow-y-hidden ">
                {avatarData.map((item, key) => (
                  <ChatAvatar
                    key={key}
                    addNew={item.addNew}
                    avatar={item.avatar}
                  />
                ))}
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

            <ul role="list" className="mt-4">
              {recentChats.map((item, key) => (
                <ChatItem key={key} {...item} />
              ))}
            </ul>

            <div className="mt-4 h-[2px] bg-light-400 px-4 dark:bg-dark-300 " />
            <div className="sticky top-0 z-20 mt-10 bg-white text-xs text-black dark:bg-dark-100 dark:text-white">
              GROUP CHAT
            </div>

            <ul role="list" className="mt-4">
              {recentChats.map((item, key) => (
                <ChatItem key={key} {...item} />
              ))}
            </ul>
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default ChatSidebar;
