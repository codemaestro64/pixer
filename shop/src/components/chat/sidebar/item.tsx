import { useTranslation } from 'next-i18next';
import Input from '@/components/ui/forms/input';
import { useState } from 'react';
import Image from '@/components/ui/image';

type ChatItemProps = {
  avatar: any;
  name: string;
  message: string;
  time: string;
  online: boolean;
  newMsgCnt: number;
};

const ChatItem: React.FC<ChatItemProps> = ({
  avatar,
  name,
  message,
  time,
  online,
  newMsgCnt,
}) => {
  const { t } = useTranslation('common');
  let [searchText, setSearchText] = useState('');

  return (
    <li className="py-3 sm:py-4" onClick={() => console.log('sdsdsd')}>
      <div className="flex items-center space-x-2 ">
        <div className="flex-shrink-0">
          <div
            className={`${
              online ? 'border-2 border-online' : 'border-0'
            } flex h-[58px] w-[58px] items-center justify-center rounded-full`}
          >
            <div className="h-[48px] w-[48px]">
              <Image
                alt="avatar"
                quality={100}
                objectFit="cover"
                src={avatar}
                className="rounded-full bg-light-500 dark:bg-dark-300"
              />
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-row items-center">
            <p className="mb-2 items-center truncate text-sm font-medium text-gray-900 dark:text-white">
              {name}
            </p>
            {newMsgCnt > 0 && (
              <p className="-mt-2 ml-1 inline-flex min-h-[16px] min-w-[16px] shrink-0 items-center justify-center rounded-full border-2 border-light-100 bg-brand px-0.5 text-10px font-bold leading-none text-light dark:border-dark-250">
                {newMsgCnt}
              </p>
            )}
          </div>

          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {message}
          </p>
        </div>
        <div className="mb-8 inline-flex text-xs  text-gray-500 dark:text-gray-400">
          {time}
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
