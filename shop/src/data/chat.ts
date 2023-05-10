import { ChatTokenResponse, ChatUser } from '@/types';
import { createStoreForExport } from 'jotai/core/store';
import { Channel, StreamChat } from 'stream-chat';
import Moment from 'moment';

export const chatClient = new StreamChat('zg644f9wpd3r', { timeout: 10000 });

export const connectStream = async (
  info: ChatTokenResponse,
  avatar: string | undefined
) => {
  chatClient.on((event) => {
    console.log('Event - event', event);

    if (event.total_unread_count) {
      console.log(`unread messages count is now: ${event.total_unread_count}`);
    }

    if (event.unread_channels) {
      console.log(`unread channels count is now: ${event.unread_channels}`);
    }
  });

  const user = await chatClient.connectUser(
    {
      id: info.user_id,
      name: info.user_name,
      avatar: avatar
        ? avatar!.replace('localhost', '127.0.0.1:8000')
        : undefined,
    },
    info.token
  );

  console.log(
    `you have ${user?.me?.total_unread_count} unread messages on ${user?.me?.unread_channels} channels.`
  );
};

export const searchUsers = async (strKeyword: string, user_id: string) => {
  try {
    const users =
      strKeyword.length == 0
        ? await chatClient.queryUsers({ role: { $in: ['user', 'moderator'] } })
        : await chatClient.queryUsers({
            name: { $autocomplete: strKeyword },
            role: { $in: ['user', 'moderator'] },
          });

    return users.users.filter((user) => user.id != user_id);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const createChannel = async (
  current_user_id: string,
  opposite_user_id: string
) => {
  const channel = chatClient.channel(
    'messaging',
    `${current_user_id}-${opposite_user_id}`,
    {
      members: [current_user_id, opposite_user_id],
    }
  );
  await channel.create();
};

export const getChannels = async (current_user_id: string) => {
  const filter = { type: 'messaging', members: { $in: [current_user_id] } };

  const channels = await chatClient.queryChannels(
    filter,
    [{ last_message_at: -1 }],
    {
      watch: true, // this is the default
      state: true,
    }
  );

  return channels;
};

export const getChannelByID = async (channel_id: string) => {
  const filter = { id: { $in: [channel_id] } };

  const channels = await chatClient.queryChannels(filter, {});

  return channels;
};

export const getChannel = async (
  current_user_id: string,
  opposite_user_id: string
) => {
  const filter = { members: { $in: [current_user_id] } };

  const channels = await chatClient.queryChannels(filter, {});
  if (channels.length > 0) {
    let selectedChannel: Channel | undefined = channels.find(
      (eachChannel) =>
        eachChannel.id == `${current_user_id}-${opposite_user_id}` ||
        eachChannel.id == `${opposite_user_id}-${current_user_id}`
    );
    if (selectedChannel) {
      return [selectedChannel];
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const getUser = async (user_id: string) => {
  const response = await chatClient.queryUsers({
    id: { $autocomplete: user_id },
  });

  console.log('get-user - ', response);
  return response;
};

export const disconnectStream = async () => {
  await chatClient.disconnectUser();
};

export const calculateDate = (strDate: string) => {
  return Moment(strDate).format('H:mm a');
};
