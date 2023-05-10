import { useTranslation } from 'next-i18next';
import Input from '@/components/ui/forms/input';
import { useEffect, useState, useContext } from 'react';
import Image from '@/components/ui/image';
import { Channel } from 'stream-chat';
import { getAuthUserInfo } from '@/data/client/token.utils';
import Avatar from 'react-avatar';
import ChatContext from '@/lib/chat-context';
import { calculateDate, getChannelByID } from '@/data/chat';

type ChatItemProps = {
  channel: Channel;
  onSelectChannel: any;
};

const ChatItem: React.FC<ChatItemProps> = ({ channel, onSelectChannel }) => {
  const {
    selected_channel,
    setSelectedChannel,
    selected_channel_update,
    setSelectedChannelUpdate,
  } = useContext(ChatContext);

  const authUserInfo = getAuthUserInfo();

  const [curChannel, setCurChannel] = useState<Channel>(channel);
  let users = curChannel.id!.split('-');
  const oppositeUserID = users[0] == authUserInfo ? users[1] : users[0];

  useEffect(() => {
    if (!selected_channel) return;

    if (selected_channel_update && selected_channel!.id == curChannel.id) {
      //channel update
      getChannelByID(selected_channel!.id!).then((result) => {
        if (result.length > 0) {
          setCurChannel(result[0]);
        }
      });
    }

    setSelectedChannelUpdate(false);
  }, [selected_channel_update]);

  const onClickedItem = () => {
    onSelectChannel(curChannel);
  };

  return (
    <li
      className={`${
        selected_channel?.id == curChannel.id &&
        'rounded-[8px] bg-light-300 dark:bg-dark-400'
      } py-3 sm:py-4`}
      onClick={onClickedItem}
    >
      <div className="flex items-center space-x-2">
        <div className="flex-shrink-0">
          <div
            className={`${
              curChannel.state.members[oppositeUserID].user?.online
                ? 'border-2 border-online'
                : 'border-0'
            } flex h-[58px] w-[58px] items-center justify-center rounded-full`}
          >
            <Avatar
              size="48"
              round={true}
              name={curChannel.state.members[oppositeUserID].user?.name}
              textSizeRatio={2}
              src={
                curChannel.state.members[oppositeUserID].user?.avatar
                  ? (curChannel.state.members[oppositeUserID].user
                      ?.avatar as string)
                  : undefined
              }
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-row items-center">
            <p className="mb-2 items-center truncate text-[18px] font-medium text-gray-900 dark:text-white">
              {curChannel.state.members[oppositeUserID].user?.name}
            </p>
            {curChannel.state.unreadCount > 0 && (
              <p className="-mt-2 ml-1 inline-flex min-h-[16px] min-w-[16px] shrink-0 items-center justify-center rounded-full border-2 border-light-100 bg-brand px-0.5 text-10px font-bold leading-none text-light dark:border-dark-250">
                {curChannel.countUnread()}
              </p>
            )}
          </div>

          <p className="truncate text-[16px] text-gray-500 dark:text-gray-400">
            {curChannel.state.last_message_at
              ? curChannel.lastMessage().text
              : 'No message recently'}
          </p>
        </div>
        <div className="mb-8 inline-flex pr-2 text-[12px]  text-gray-500 dark:text-gray-400">
          {curChannel.state.last_message_at
            ? calculateDate(curChannel.lastMessage().created_at.toString())
            : ''}
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
