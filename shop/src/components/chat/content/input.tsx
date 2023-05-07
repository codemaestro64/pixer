import { useState } from 'react';
import { AttachmentIcon } from '@/components/icons/chat/attachment-icon';
import { SendIcon } from '@/components/icons/chat/send-icon';
import { SpeechIcon } from '@/components/icons/chat/speech-icon';

import Button from '@/components/ui/button';

type ChatInputProps = {
  onClickedAttachment: any;
  onClickedSend: any;
  onClickedSpeech: any;
};

const ChatInput: React.FC<ChatInputProps> = ({
  onClickedAttachment,
  onClickedSend,
  onClickedSpeech,
}) => {
  const [message, setMessageText] = useState('');

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2 border-t-[1px] border-light-400 py-2 px-4 dark:border-dark-300">
      <div className="items-center justify-center">
        <Button
          variant="icon"
          aria-label="Search"
          className="h-[40px] w-[40px] rounded-full bg-dark-400"
        >
          <AttachmentIcon className="h-[16px] w-[16px]" />
        </Button>
      </div>

      <div className="flex-1 items-center justify-center">
        <input
          onChange={(e) => setMessageText(e.target.value)}
          autoFocus={true}
          placeholder="Send message"
          className="border-dark-30 h-full w-full border-0 bg-transparent bg-light  pl-2 text-13px outline-none focus:ring-0 dark:bg-dark-100"
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        <Button
          variant="icon"
          aria-label="Search"
          className="h-[40px] w-[40px]"
        >
          <SendIcon className="h-[16px] w-[16px]" />
        </Button>
        <Button
          variant="icon"
          aria-label="Search"
          className="h-[40px] w-[40px] rounded-full bg-gradient-to-b from-online to-gradient"
        >
          <SpeechIcon className="h-[16px] w-[16px] text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
