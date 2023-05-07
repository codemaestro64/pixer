import { useTranslation } from 'next-i18next';

import Scrollbar from '@/components/ui/scrollbar';
import ChatMessageItem from '@/components/chat/content/item';
import ChatInput from '@/components/chat/content/input';
import ChatHeader from '@/components/chat/content/header';

import sampleAvatar1 from '@/assets/images/avatars/1.png';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useEffect, useState } from 'react';

const messagesData = [
  {
    type: 'text',
    sender: 'opposite',
    avatar: sampleAvatar1,
    message: 'Are you still travelling?',
    date: '2:50PM',
  },
  {
    type: 'text',
    sender: 'mine',
    avatar: null,
    message: "Yes, i'm at Istanbul.",
    date: '3:00PM',
  },
  {
    type: 'text',
    sender: 'opposite',
    avatar: sampleAvatar1,
    message: "OoOo. That's so cool!",
    date: '4:00PM',
  },
  {
    type: 'text',
    sender: 'opposite',
    avatar: sampleAvatar1,
    message: 'Raining???',
    date: '4:00PM',
  },
  {
    type: 'date',
    sender: '',
    avatar: '',
    message: '',
    date: 'Thursday 24, 2022',
  },
  {
    type: 'text',
    sender: 'mine',
    avatar: null,
    message: 'No. Weather is good here.',
    date: '5:00PM',
  },
  {
    type: 'text',
    sender: 'opposite',
    avatar: sampleAvatar1,
    message: 'Amazing, I am really wating for you.',
    date: '5:30PM',
  },
];

type ChatContentProps = {
  onSelectChannel: any;
  selectedChannelID: number;
};

const ChatContent: React.FC<ChatContentProps> = ({
  onSelectChannel,
  selectedChannelID,
}) => {
  const { t } = useTranslation('common');
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();

  const onClickedAttachment = () => {};

  const onClickedSend = () => {};

  const onClickedSpeech = () => {};

  const [width, setWidth] = useState<number>(0);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 640;

  return (
    <div
      className={`${
        isMobile && selectedChannelID >= 0 ? 'block w-full' : 'hidden'
      }  h-full w-full grow border-r-[1px] border-light-400 dark:border-dark-300 sm:block`}
    >
      <div className="flex h-full flex-col">
        <ChatHeader
          name="Neil Sims"
          online={true}
          avatar={sampleAvatar1}
          forCall={true}
          onSelectChannel={onSelectChannel}
        />

        <div className="mt-10 h-[2px] bg-light-400 px-4 dark:bg-dark-300 " />

        <Scrollbar className="relative h-full w-full px-4">
          <div className="flex w-full flex-col pb-4">
            {messagesData.map((item, key) => (
              <ChatMessageItem key={key} {...item} />
            ))}
          </div>
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
