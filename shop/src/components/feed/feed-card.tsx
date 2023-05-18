import React from 'react';
import Image from '@/components/ui/image';
import FeedCardImage from '@/components/feed/feed-card-image';
import { HeartIcon } from '../icons/heart-icon';
import { HeartFillIcon } from '../icons/heart-fill';
import { ChatIcon } from '../icons/chat-icon';
import { ShareIcon } from '../icons/share-icon';
import { EllipsisVerticalIcon } from '../icons/ellipsis-vertical-icon';
import teamImage from '@/assets/images/omnico-team.png';
import { Feed } from '@/types';
import client from '@/data/client';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useMe } from '@/data/user';
interface FeedCardProps {
  feed: Feed;
}

interface FeedCardButtonProps {
  type: String;
  icon: React.ReactElement;
  activePossible?: Boolean;
  label?: String;
  fillIcon?: React.ReactElement;
  menu?: Boolean;
  toogleClicked?: any;
}

function FeedCardButton({
  type,
  label,
  icon,
  activePossible,
  fillIcon,
  menu,
  toogleClicked,
}: FeedCardButtonProps) {
  const iconStyle =
    'w-[25.69px] h-[25.69px] md:w-[24.02px] md:h-[24.02px] 2xl:w-[27.62px] 2xl:h-[27.62px] transform transition-transform first-line:relative active:scale-75';

  return (
    <button
      onClick={() => toogleClicked(type)}
      className={`flex cursor-pointer items-center ${
        !menu
          ? 'font-poppins text-[14.99px] font-medium text-dark-300 dark:text-white md:text-[14.01px] 2xl:text-[16.11px]'
          : 'text-dark-700'
      }`}
    >
      <span className="relative mr-[6.42px] inline-block">
        {React.cloneElement(icon, {
          className: !menu
            ? iconStyle
            : 'w-[22.32px] h-[22.32px] md:w-[20.86px] md:h-[20.86px] 2xl:w-[24px] 2xl:h-[24px] transform transition-transform first-line:relative active:scale-75',
        })}
        {fillIcon && activePossible && Number(label) > 0
          ? React.cloneElement(fillIcon, {
              className: `${iconStyle} absolute bottom-[4px] text-brand-dark`,
            })
          : null}
      </span>
      <span>{label}</span>
    </button>
  );
}

export default function FeedCard({ feed }: FeedCardProps) {
  const [selectedFeed, setSelectedFeed] = useState<Feed>(feed);
  const { me } = useMe();

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
    } else if (actionType === 'comment') {
    } else if (actionType === 'share') {
    } else {
      //more menu
    }
  };

  return (
    <div className="group rounded-[9.6px] bg-[#f3f3f3] pb-[14px] transition-shadow duration-300 hover:shadow-feed-card dark:bg-[#292929]">
      <div className="flex px-[20.5px] pt-[30.69px] pb-[21.56px]">
        <div className="mr-[5.58px] flex w-[46.8px] items-center overflow-hidden rounded-full">
          <Image src={teamImage} alt="Team Project" height={48} width={48} />
        </div>
        <div className="max-w-[224.13px] font-poppins">
          <p className="mb-[4px] truncate text-[14.88px] font-semibold text-dark-300 dark:text-white md:text-[13.91px] 2xl:text-[16px]">
            {selectedFeed.descr}
          </p>
          <span className="text-[13.02px] font-medium italic text-dark-700 md:text-[12.17px] 2xl:text-[14px]">
            {'Omnico Team'}
          </span>
        </div>
      </div>

      <div className="px-[20px]">
        <FeedCardImage
          cardImage={selectedFeed.content[0].thumbnail.replace(
            'localhost',
            'localhost:8000'
          )}
        />
      </div>

      <div className="mt-[22.32px]">
        <div className="flex items-center p-[12.85px]">
          <div className="ml-[12px] flex gap-[21.41px]">
            <FeedCardButton
              type="heart"
              toogleClicked={onClickedAction}
              label={`${selectedFeed.likes_count}`}
              activePossible={selectedFeed.likes?.find(
                (eachLike) => eachLike.user_id === me?.id
              )}
              icon={<HeartIcon />}
              fillIcon={<HeartFillIcon />}
            />
            <FeedCardButton
              type="comment"
              toogleClicked={onClickedAction}
              label={`${selectedFeed.comments_count}`}
              icon={<ChatIcon />}
            />
            <FeedCardButton
              icon={<ShareIcon />}
              type="share"
              toogleClicked={onClickedAction}
            />
          </div>
          <div className="ml-auto mr-1">
            <FeedCardButton
              icon={<EllipsisVerticalIcon />}
              menu
              type="menu"
              toogleClicked={onClickedAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
