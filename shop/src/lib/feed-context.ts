import { createContext } from 'react';

interface IFeedContext {
  triggerFeeds: boolean;
  triggerPost: boolean;
  selectedFeedID: string;
  setTriggerFeeds: (flag: boolean) => void;
  setTriggerPost: (flag: boolean) => void;
  setSelectedFeedID: (nID: string) => void;
}

const defaultState = {
  triggerFeeds: false,
  setTriggerFeeds: (flag: boolean) => {},
  selectedFeedID: '-1',
  setSelectedFeedID: (nID: string) => {},
  triggerPost: false,
  setTriggerPost: (flag: boolean) => {},
};

const FeedContext = createContext<IFeedContext>(defaultState);
export default FeedContext;
