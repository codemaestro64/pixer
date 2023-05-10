import { useTranslation } from 'next-i18next';

import Scrollbar from '@/components/ui/scrollbar';
import ChatMessageItem from '@/components/chat/content/item';
import ChatInput from '@/components/chat/content/input';
import ChatHeader from '@/components/chat/content/header';

import sampleAvatar1 from '@/assets/images/avatars/1.png';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useEffect, useState, useContext, useRef } from 'react';
import ChatContext from '@/lib/chat-context';
import { ChannelMemberResponse, MessageResponse } from 'stream-chat';
import { getAuthUserInfo } from '@/data/client/token.utils';
import { Spin } from 'react-cssfx-loading';
import { useTheme } from 'next-themes';

const ChatContent = () => {
  const { t } = useTranslation('common');

  const scrollRef = useRef<HTMLDivElement>(null);
  const authUserInfo = getAuthUserInfo();

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const [curMembers, setCurrentMembers] = useState<ChannelMemberResponse[]>([]);
  const [curMessages, setCurrentMessages] = useState<MessageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    selected_channel,
    setSelectedChannel,
    setSelectedChannelUpdate,
    new_message_info,
    setNewMessageInfo,
  } = useContext(ChatContext);

  const onClickedAttachment = () => {};

  const onClickedSend = async (message: string) => {
    await selected_channel!.sendMessage({
      text: message,
    });
  };

  const onClickedSpeech = () => {};

  const scrollToBottom = (animation: boolean = false) => {
    scrollRef.current?.scrollIntoView({
      behavior: animation ? 'smooth' : 'auto',
    });
  };

  const loadInfo = async () => {
    setLoading(true);

    const { members, messages } = await selected_channel!.watch();
    setCurrentMembers(members);
    setCurrentMessages(messages);
    setLoading(false);

    try {
      selected_channel?.markRead(); //user_id: authUserInfo!
    } catch (e) {
      console.log('mark read - ', e);
    }

    setSelectedChannelUpdate(true);

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  useEffect(() => {
    if (!selected_channel) return;

    console.log(
      '---------------getting messages from selected channel----------------------'
    );
    loadInfo();
  }, [selected_channel]);

  useEffect(() => {
    if (new_message_info.gotNew) {
      //add new message
      const bExist = curMessages.some(
        (eachItem) => eachItem.id == new_message_info.message!.id
      );
      if (!bExist) {
        setCurrentMessages([...curMessages, new_message_info.message!]);
      } else {
        console.log('same here ------------------');
      }

      setNewMessageInfo({ gotNew: false, message: null });

      setTimeout(() => {
        scrollToBottom(true);
      }, 300);
    }
  }, [new_message_info.gotNew]);

  const makeMessageUI = () => {
    if (curMessages.length == 0) {
      return (
        <div className="mt-4 mb-4 flex w-full items-center justify-center bg-white text-xs text-black dark:bg-dark-100 dark:text-white">
          No message recently. start chatting now.
        </div>
      );
    } else {
      return (
        <div className="flex w-full flex-col pb-4">
          {curMessages.map((item, key) => (
            <ChatMessageItem key={key} info={item} />
          ))}
        </div>
      );
    }
  };

  return (
    <div
      className={`${
        selected_channel ? 'block w-full' : 'hidden'
      }  h-full w-full grow border-r-[1px] border-light-400 dark:border-dark-300 sm:block`}
    >
      <div className="flex h-full flex-col">
        <ChatHeader
          name="Neil Sims"
          online={true}
          avatar={sampleAvatar1}
          forCall={true}
        />

        <div className="mt-10 h-[2px] bg-light-400 px-4 dark:bg-dark-300 " />

        <Scrollbar className="relative h-full w-full px-4">
          {loading ? (
            <div className="mt-4 mb-4 flex w-full items-center justify-center bg-white text-xs text-black dark:bg-dark-100 dark:text-white">
              <Spin color={isDarkMode ? '#ffffff' : '#181818'} />
            </div>
          ) : (
            makeMessageUI()
          )}

          <div ref={scrollRef} />
        </Scrollbar>

        <ChatInput
          onClickedAttachment={onClickedAttachment}
          onClickedSend={onClickedSend}
          onClickedSpeech={onClickedSpeech}
        />
      </div>
    </div>
  );
};

export default ChatContent;
