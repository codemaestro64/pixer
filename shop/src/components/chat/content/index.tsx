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

const ChatContent = () => {
  const { t } = useTranslation('common');

  const scrollRef = useRef<HTMLDivElement>(null);
  const authUserInfo = getAuthUserInfo();

  const [curMembers, setCurrentMembers] = useState<ChannelMemberResponse[]>([]);
  const [curMessages, setCurrentMessages] = useState<MessageResponse[]>([]);

  const { selected_channel, setSelectedChannel } = useContext(ChatContext);

  selected_channel!.on('message.new', (event) => {
    setCurrentMessages([...curMessages, event.message!]);

    setTimeout(() => {
      scrollToBottom(true);
    }, 100);
  });

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
    const { members, messages } = await selected_channel!.watch();
    console.log('message setting ~~~~~~~~~~~~~~~~~', messages);
    setCurrentMembers(members);
    setCurrentMessages(messages);

    await selected_channel?.markRead({ user_id: authUserInfo! });

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  useEffect(() => {
    if (!selected_channel) return;

    loadInfo();
  }, [selected_channel]);

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
          <div className="flex w-full flex-col pb-4">
            {curMessages.map((item, key) => (
              <ChatMessageItem key={key} info={item} />
            ))}
          </div>
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
