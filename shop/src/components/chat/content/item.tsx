import Image from '@/components/ui/image';
import { DoubleTickIcon } from '@/components/icons/chat/double-tick-icon';
import { MessageResponse } from 'stream-chat';
import { getAuthUserInfo } from '@/data/client/token.utils';
import { calculateDate } from '@/data/chat';
import Avatar from 'react-avatar';

type ChatMessageItemProps = {
  info: MessageResponse;
};

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ info }) => {
  const authUserInfo = getAuthUserInfo();

  const getTextMessage = () => {
    if (info.user!.id === authUserInfo) {
      return (
        <div className="mt-4 flex flex-col">
          <div className="flex flex-row items-center justify-end">
            <div className="max-w-[200px] md:max-w-sm lg:max-w-3xl">
              <div className="bg-white-100 relative flex shrink flex-row items-center justify-between rounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px] bg-online bg-opacity-30 px-4 py-2 pr-6">
                <div className="text-left text-[16px] text-gray-500 dark:text-gray-400">
                  {info.text}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <DoubleTickIcon className="h-[16px] w-[16px] text-blue-600" />
            <div className="ml-2 mt-1 text-[10px] text-gray-500 dark:text-gray-400">
              {calculateDate(info.created_at!)}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-4 flex flex-row gap-2">
          <div className="flex items-end justify-center">
            <div className="relative h-[50px] w-[50px]">
              <Avatar
                size="50"
                round={true}
                name={info.user?.name}
                textSizeRatio={2}
                src={info.user?.avatar as string}
              />
              {info.user?.online && (
                <span className="absolute top-0 right-0 flex min-h-[12px] min-w-[12px] shrink-0 items-center justify-center rounded-full border-2 border-light-100 bg-brand px-0.5 text-10px font-bold leading-none text-light" />
              )}
            </div>
          </div>

          <div className="flex max-w-[200px] items-end md:max-w-xs lg:max-w-xs xl:max-w-xs 2xl:max-w-md">
            <div className="bg-white-100 relative flex shrink flex-row items-center justify-between rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] bg-light-400 px-4 py-2 pr-6  dark:bg-dark-400">
              <div className="text-left text-[16px] text-gray-500 dark:text-gray-400">
                {info.text}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const getAudioMessage = () => {
    return <></>;
  };

  const getDateHeader = () => {
    /*
    return (
      <div className="mt-4 flex flex-col">
        <p className="mb-2 items-center truncate text-center text-sm text-gray-500 dark:text-gray-400">
          {date}
        </p>
      </div>
    );
    */
    return <></>;
  };

  if (info.attachments!.length > 0) {
    return getAudioMessage();
  } else {
    return getTextMessage();
  }
};

export default ChatMessageItem;
