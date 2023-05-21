import { useTranslation } from 'next-i18next';
import Button from '../ui/button';
import FeedCardButton from '../feed/feed-card-button';
import { HeartIcon } from '../icons/heart-icon';
import { HeartFillIcon } from '../icons/heart-fill';
import { CommentIcon } from '../icons/comment-icon';
import { ShareIcon } from '../icons/share-icon';
import { Comment, Feed } from '@/types';
import Avatar from 'react-avatar';
import client from '@/data/client';
import { useEffect, useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { useMe } from '@/data/user';
import FeedContext from '@/lib/feed-context';

interface CommentOwnerInfoProps {
  feed: Feed;
}

export default function CommentOwnerInfo({ feed }: CommentOwnerInfoProps) {
  const { t } = useTranslation('common');
  const [selectedFeed, setSelectedFeed] = useState<Feed>(feed);
  const { triggerFeeds, setTriggerFeeds } = useContext(FeedContext);

  const { me } = useMe();

  useEffect(() => {
    setSelectedFeed(feed);
  }, [feed]);

  const { mutate: mutateFeed, isLoading } = useMutation(client.feeds.get, {
    onSuccess: (res) => {
      setSelectedFeed(res);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  const { mutate: mutateLike } = useMutation(client.feeds.like, {
    onSuccess: (res) => {
      setTriggerFeeds(!triggerFeeds);
      mutateFeed({ id: selectedFeed.id });
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  const onClickedAction = (actionType: string) => {
    if (!me) return;
    if (actionType === 'heart') {
      mutateLike({ user_id: me!.id, feed_id: selectedFeed.id });
    } else if (actionType === 'share') {
    } else {
      //more menu
    }
  };

  const checkLikedByCurrentUser = () => {
    if (selectedFeed.likes) {
      return selectedFeed.likes!.find((eachLike) => eachLike.user_id === me?.id)
        ? true
        : false;
    } else {
      return false;
    }
  };

  return (
    <div className="flex flex-col justify-start gap-8">
      <div className="flex flex-row items-center justify-between gap-2 p-2">
        <div className="flex min-w-0 flex-row items-center justify-start">
          <div className="relative flex h-[42px] w-[42px] flex-shrink-0">
            <Avatar
              size="42"
              round={true}
              name={selectedFeed.customer.name}
              textSizeRatio={2}
              src={selectedFeed.profile?.avatar?.thumbnail}
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <p className="truncate px-2.5 text-[14px] font-medium text-dark dark:text-light">
              {selectedFeed.customer.name}
            </p>
            <p className="-mt-4 px-2.5 text-[9px] font-medium text-dark-600 dark:text-light-800">
              {`@${selectedFeed.customer.name.replace(' ', '_')}`}
            </p>
          </div>
        </div>
        <div className="flex h-[40px] flex-shrink-0 items-center justify-center">
          <Button className="max-h-[40px] min-h-[40px] w-full rounded-[10px] text-sm  italic">
            Follow
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-2 rounded-[10px] border-[1px] border-light-200 p-4 dark:border-dark-400">
        <p className="text-[18px] font-medium italic text-dark dark:text-light">
          {selectedFeed.descr}
        </p>
        {/*
            <div className="items-dst flex flex-wrap justify-start gap-2">
            <div className="items-center text-[14px]  font-light text-dark dark:text-light">
                #newproduct
            </div>
            <div className="items-center text-[14px]  font-light text-dark dark:text-light">
                #newproduct
            </div>
            <div className="items-center text-[14px]  font-light text-dark dark:text-light">
                #newproduct
            </div>
            </div>
  */}
      </div>
      <div className="ml-[12px] flex gap-6">
        <FeedCardButton
          type="heart"
          toogleClicked={onClickedAction}
          label={`${selectedFeed.likes_count}`}
          activePossible={checkLikedByCurrentUser()}
          icon={<HeartIcon />}
          fillIcon={<HeartFillIcon />}
        />
        <FeedCardButton
          type="comment"
          label={`${selectedFeed.comments_count}`}
          icon={<CommentIcon />}
        />
        <FeedCardButton
          icon={<ShareIcon />}
          type="share"
          toogleClicked={onClickedAction}
        />
      </div>
    </div>
  );
}
