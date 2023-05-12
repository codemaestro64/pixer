import { PhoneCallIcon } from '@/components/icons/chat/phone-call-icon';
import { VideoCallIcon } from '@/components/icons/chat/video-call-icon';
import { SettingsIcon } from '@/components/icons/chat/settings-icon';
import { BackIcon } from '@/components/icons/chat/back-icon';

import Image from '@/components/ui/image';
import Button from '@/components/ui/button';

import sampleAvatar1 from '@/assets/images/avatars/1.png';
import { useEffect, useState, useContext } from 'react';
import ChatContext from '@/lib/chat-context';
import { getAuthUserInfo } from '@/data/client/token.utils';
import Avatar from 'react-avatar';

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
  const { selected_channel, setSelectedChannel } = useContext(ChatContext);

  const authUserInfo = getAuthUserInfo();
  let users = selected_channel!.id!.split('-');
  const oppositeUserID = users[0] == authUserInfo ? users[1] : users[0];

  return (
    <div className="flex flex-col px-4">
      <div className="mt-10 py-3 sm:py-4">
        <div className="flex flex-row items-center justify-center space-x-2">
          {selected_channel && (
            <Button
              variant="icon"
              className="block h-[40px] w-[40px] sm:hidden"
              onClick={() => setSelectedChannel(null)}
            >
              <div className="inline-flex text-xs font-semibold text-gray-500 hover:opacity-40 dark:text-gray-400">
                <BackIcon className="h-[20px] w-[20px] text-dark-800" />
              </div>
            </Button>
          )}
          <div className="flex-shrink-0">
            <Avatar
              size="50"
              round={true}
              name={selected_channel?.state.members[oppositeUserID].user?.name}
              textSizeRatio={2}
              src={
                selected_channel?.state.members[oppositeUserID].user
                  ?.avatar as string
              }
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-2 min-w-0 items-center truncate text-xl font-medium text-gray-900 dark:text-white">
              {selected_channel?.state.members[oppositeUserID].user?.name}
            </p>

            <div className="flex min-w-0 flex-row items-center">
              <p className="mb-2 items-center truncate text-sm text-gray-500 dark:text-gray-400">
                {selected_channel?.state.members[oppositeUserID].user?.online
                  ? 'Active Now'
                  : 'Offline'}
              </p>
              {selected_channel?.state.members[oppositeUserID].user?.online && (
                <p className="-mt-2 ml-1 inline-flex min-h-[16px] min-w-[16px] shrink-0 items-center justify-center rounded-full border-2 border-light-100 bg-brand px-0.5 text-10px font-bold leading-none text-light dark:border-dark-250" />
              )}
            </div>
          </div>
          {forCall ? (
            <div className="inline-flex gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <Button
                variant="icon"
                className="h-[40px] w-[40px] hover:opacity-40"
              >
                <PhoneCallIcon className="h-[20px] w-[20px] text-dark-800" />
              </Button>

              <Button
                variant="icon"
                className="h-[40px] w-[40px] hover:opacity-40"
              >
                <VideoCallIcon className="h-[20px] w-[20px] text-dark-800" />
              </Button>
            </div>
          ) : (
            <Button
              variant="icon"
              className="h-[40px] w-[40px] hover:opacity-40"
            >
              <div className="inline-flex text-xs font-semibold text-gray-500 dark:text-gray-400">
                <SettingsIcon className="h-[20px] w-[20px] text-dark-800" />
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
