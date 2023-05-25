import React from 'react';
import { BookmarkIcon } from '../icons/bookmark-icon';
import { LinkIcon } from '../icons/link-icon';
import { NotificationIcon } from '../icons/notification-icon';
import { useMe } from '@/data/user';
import { Follow, Post } from '@/types';
import { SpinnerIcon } from '../icons/spinner-icon';
import { useMutation } from 'react-query';
import client from '@/data/client';
import { useEffect, useState, useContext } from 'react';
import FeedContext from '@/lib/feed-context';

function InteractionButton({ icon }: { icon: React.ReactElement }) {
  return (
    <button className="flex h-[34.27px] w-[34.27px] items-center justify-center rounded-full border border-[#ECECEC] text-[#2A2A2A] dark:border-[#4B4B4B] dark:text-[#d5d5d5] md:h-[44px] md:w-[44px] 3xl:h-[52px] 3xl:w-[52px]">
      {React.cloneElement(icon, {
        className:
          'w-[13.26px] md:w-[20.62px] 3xl:w-[24px] h-[13.26px] md:h-[20.62px] 3xl:h-[24px]',
      })}
    </button>
  );
}

function FollowButton({
  isLoading,
  isFollow,
  onAction,
}: {
  isLoading: boolean;
  isFollow: boolean;
  onAction: any;
}) {
  return (
    <button
      onClick={onAction}
      className={
        isFollow
          ? '3xl:pd-[30px] h-[34.27px] rounded-[55px] bg-brand px-[16.58px] font-poppins text-[9.95px] font-medium text-white dark:bg-[#28C98C] md:h-[44px] md:px-[25.78px] md:text-[15.47px] 3xl:h-[52px] 3xl:text-[18px]'
          : '3xl:pd-[30px] h-[34.27px] rounded-[55px] border border-brand bg-transparent px-[16.58px] font-poppins text-[9.95px] font-medium text-brand md:h-[44px] md:px-[25.78px] md:text-[15.47px] 3xl:h-[52px] 3xl:text-[18px]'
      }
    >
      {isLoading && <SpinnerIcon className="h-auto w-5 animate-spin" />}
      {!isLoading && (isFollow ? 'UnFollow' : 'Follow')}
    </button>
  );
}

export default function ContentInteractions({
  post,
  followCallback,
}: {
  post: Post;
  followCallback: any;
}) {
  const { me } = useMe();
  const [followStatus, setFollowStatus] = useState<Follow | null>(null);
  const { triggerPost, setTriggerPost } = useContext(FeedContext);

  const { mutate: mutateFollowStatus, isLoading } = useMutation(
    client.user_follows.get,
    {
      onSuccess: (res) => {
        setFollowStatus(res);
        followCallback(res.followers_count);
      },
      onError: (err: any) => {
        console.log(err.response.data, 'error');
      },
    }
  );

  const { mutate: mutateFollow, isLoading: isLoadingFollow } = useMutation(
    client.user_follows.create,
    {
      onSuccess: (res) => {
        setFollowStatus(res);
        followCallback(res.followers_count);
      },
      onError: (err: any) => {
        console.log(err.response.data, 'error');
      },
    }
  );

  useEffect(() => {
    if (!me) return;

    mutateFollowStatus({
      sender_user_id: me.id,
      receiver_user_id: post.customer.id,
    });
  }, [triggerPost]);

  const onFollow = () => {
    if (!me) return;

    mutateFollow({
      sender_user_id: me.id,
      receiver_user_id: post.customer.id,
    });
  };

  return (
    <>
      <div className="flex gap-[13.26px] md:gap-[20.62px] 3xl:gap-[24px]">
        <InteractionButton icon={<BookmarkIcon />} />
        <InteractionButton icon={<LinkIcon />} />
        <InteractionButton icon={<NotificationIcon />} />
      </div>
      {me && me.id != post.customer.id && (
        <div className="ml-[14px] md:ml-[28.79px] 3xl:ml-[33.5px]">
          <FollowButton
            onAction={onFollow}
            isLoading={isLoadingFollow || isLoading}
            isFollow={followStatus ? followStatus.status : false}
          />
        </div>
      )}
    </>
  );
}
