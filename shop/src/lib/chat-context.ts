import { createContext } from 'react';
import { Channel, Message, MessageResponse } from 'stream-chat';
import { number } from 'yup';

interface IChatContext {
  unread_messages_cnt: number;
  unread_channels_cnt: number;
  got_new_channel: boolean;
  selected_channel: Channel | null;
  new_created_channel_id: string;
  selected_channel_update: boolean;
  new_message_info: { gotNew: boolean; message: MessageResponse | null };
  setUnreadMessagesCnt: (cnt: number) => void;
  setUnreadChannelsCnt: (cnt: number) => void;
  setGotNewChannel: (flag: boolean) => void;
  setSelectedChannel: (channel: Channel | null) => void;
  setNewCreatedChannelID: (channel_id: string) => void;
  setSelectedChannelUpdate: (flag: boolean) => void;
  setNewMessageInfo: (info: {
    gotNew: boolean;
    message: MessageResponse | null;
  }) => void;
}

const defaultState = {
  unread_messages_cnt: 0,
  unread_channels_cnt: 0,
  got_new_channel: false,
  selected_channel: null,
  new_created_channel_id: '',
  selected_channel_update: false,
  new_message_info: { gotNew: false, message: null },

  setUnreadMessagesCnt: (cnt: number) => {},
  setUnreadChannelsCnt: (cnt: number) => {},
  setGotNewChannel: (flag: boolean) => {},
  setSelectedChannel: (channel: Channel | null) => {},
  setNewCreatedChannelID: (channel_id: string) => {},
  setSelectedChannelUpdate: (flag: boolean) => {},
  setNewMessageInfo: (info: {
    gotNew: boolean;
    message: MessageResponse | null;
  }) => {},
};

const ChatContext = createContext<IChatContext>(defaultState);
export default ChatContext;
