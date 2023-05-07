import { StarIcon } from '@/components/icons/chat/star-icon';
import { DoubleTickIcon } from '@/components/icons/chat/double-tick-icon';

type ChatStarMessageProps = {
  type: string;
  message: string;
  name: string;
  date: string;
};

const ChatStarMessage: React.FC<ChatStarMessageProps> = ({
  type,
  message,
  name,
  date,
}) => {
  return type === 'mine' ? (
    <div className="mt-4 flex w-full flex-col">
      <div className="bg-white-100 relative flex w-full shrink flex-row items-center justify-between rounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px] bg-online bg-opacity-30 px-4 py-2 pr-6">
        <div className="text-left text-[16px] text-gray-500 dark:text-gray-400">
          {message}
        </div>
        <StarIcon className="absolute top-3.5 right-3 h-[12px] w-[12px] text-white" />
      </div>
      <div className="flex items-center justify-end">
        <DoubleTickIcon className="h-[16px] w-[16px] text-blue-600" />
        <div className="ml-2 mt-1 text-[10px] text-gray-500 dark:text-gray-400">
          {`${name} - ${date}`}
        </div>
      </div>
    </div>
  ) : (
    <div className="mt-4 flex w-full flex-col">
      <div className="bg-white-100 relative flex w-full shrink flex-row items-center justify-between rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] bg-light-400 px-4 py-2 pr-6  dark:bg-dark-400">
        <div className="text-left text-[16px] text-gray-500 dark:text-gray-400">
          {message}
        </div>
        <StarIcon className="absolute top-3.5 right-3 h-[12px] w-[12px] text-white" />
      </div>
      <div className="flex items-center">
        <DoubleTickIcon className="h-[16px] w-[16px] text-blue-600" />
        <div className="ml-2 mt-1 text-[10px] text-gray-500 dark:text-gray-400">
          {`${name} - ${date}`}
        </div>
      </div>
    </div>
  );
};

export default ChatStarMessage;
