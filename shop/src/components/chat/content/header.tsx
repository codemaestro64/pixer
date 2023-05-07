import { PhoneCallIcon } from '@/components/icons/chat/phone-call-icon';
import { VideoCallIcon } from '@/components/icons/chat/video-call-icon';
import { SettingsIcon } from '@/components/icons/chat/settings-icon';

import Image from '@/components/ui/image';
import Button from '@/components/ui/button';

import sampleAvatar1 from '@/assets/images/avatars/1.png';

type ChatHeaderProps = {
  name: string;
  avatar: any;
  online: boolean;
  forCall: boolean;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  avatar,
  online,
  forCall,
}) => {
  return (
    <div className="flex flex-col px-4">
      <div className="mt-10 py-3 sm:py-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex-shrink-0">
            <div className="h-[50px] w-[50px]">
              <Image
                alt="avatar"
                quality={100}
                objectFit="cover"
                src={avatar}
                className="rounded-full bg-light-500 dark:bg-dark-300"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-2 min-w-0 items-center truncate text-xl font-medium text-gray-900 dark:text-white">
              {name}
            </p>

            <div className="flex min-w-0 flex-row items-center">
              <p className="mb-2 items-center truncate text-sm text-gray-500 dark:text-gray-400">
                {online ? 'Active Now' : 'Offline'}
              </p>
              {online && (
                <p className="-mt-2 ml-1 inline-flex min-h-[16px] min-w-[16px] shrink-0 items-center justify-center rounded-full border-2 border-light-100 bg-brand px-0.5 text-10px font-bold leading-none text-light dark:border-dark-250" />
              )}
            </div>
          </div>
          {forCall ? (
            <div className="inline-flex gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <PhoneCallIcon className="h-[20px] w-[20px] text-dark-800" />
              <VideoCallIcon className="h-[20px] w-[20px] text-dark-800" />
            </div>
          ) : (
            <div className="inline-flex text-xs font-semibold text-gray-500 dark:text-gray-400">
              <SettingsIcon className="h-[20px] w-[20px] text-dark-800" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
