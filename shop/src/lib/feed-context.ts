import { createContext } from 'react';

interface IFeedContext {
  triggerFeeds: boolean;
  selectedFeedID: string;
  setTriggerFeeds: (flag: boolean) => void;
  setSelectedFeedID: (nID: string) => void;
}

const defaultState = {
  triggerFeeds: false,
  setTriggerFeeds: (flag: boolean) => {},
  selectedFeedID: '-1',
  setSelectedFeedID: (nID: string) => {},
};

const FeedContext = createContext<IFeedContext>(defaultState);
export default FeedContext;
