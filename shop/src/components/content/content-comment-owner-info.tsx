import { useTranslation } from 'next-i18next';
import Button from '../ui/button';
import FeedCardButton from '../feed/feed-card-button';
import { HeartIcon } from '../icons/heart-icon';
import { HeartFillIcon } from '../icons/heart-fill';
import { CommentIcon } from '../icons/comment-icon';
import { ShareIcon } from '../icons/share-icon';
import { PostComment, Post, Follow } from '@/types';
import Avatar from 'react-avatar';
import client from '@/data/client';
import { useEffect, useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { useMe } from '@/data/user';
import FeedContext from '@/lib/feed-context';
import { SpinnerIcon } from '../icons/spinner-icon';

interface ContentCommentOwnerInfoProps {
  post: Post;
}

export default function ContentCommentOwnerInfo({
  post,
}: ContentCommentOwnerInfoProps) {
  const { t } = useTranslation('common');
  const [selectedPost, setSelectedPost] = useState<Post>(post);
  const { triggerPost, setTriggerPost } = useContext(FeedContext);
  const [followStatus, setFollowStatus] = useState<Follow | null>(null);
  const [isFollow, setIsFollow] = useState<boolean>(false);

  const { me } = useMe();

  useEffect(() => {
    if (!me) return;

    mutateFollowStatus({
      sender_user_id: me.id,
      receiver_user_id: post.customer.id,
    });
  }, [me]);

  useEffect(() => {
    if (!me) return;

    setSelectedPost(post);
  }, [post]);

  const { mutate: mutatePost } = useMutation(client.posts.get, {
    onSuccess: (res) => {
      setSelectedPost(res.post);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  const { mutate: mutateLike } = useMutation(client.posts.like, {
    onSuccess: (res) => {
      setTriggerPost(!triggerPost);
      mutatePost({ id: selectedPost.id });
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  const { mutate: mutateFollowStatus, isLoading } = useMutation(
    client.user_follows.get,
    {
      onSuccess: (res) => {
        setFollowStatus(res);
        setIsFollow(res.status);
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
        setIsFollow(res.status);
        setTriggerPost(!triggerPost);
      },
      onError: (err: any) => {
        console.log(err.response.data, 'error');
      },
    }
  );

  const onClickedAction = (actionType: string) => {
    if (!me) return;
    if (actionType === 'heart') {
      mutateLike({ user_id: me!.id, post_id: selectedPost.id });
    } else if (actionType === 'share') {
    } else {
      //more menu
    }
  };

  const checkLikedByCurrentUser = () => {
    if (selectedPost.likes) {
      return selectedPost.likes!.find((eachLike) => eachLike.user_id === me?.id)
        ? true
        : false;
    } else {
      return false;
    }
  };

  const onFollow = () => {
    if (!me) return;

    mutateFollow({
      sender_user_id: me.id,
      receiver_user_id: post.customer.id,
    });
  };

  return (
    <div className="flex flex-col justify-start gap-8">
      <div className="flex flex-row items-center justify-between gap-2 p-2">
        <div className="flex min-w-0 flex-row items-center justify-start">
          <div className="relative flex h-[42px] w-[42px] flex-shrink-0">
            <Avatar
              size="42"
              round={true}
              name={selectedPost.customer.name}
              textSizeRatio={2}
              src={selectedPost.profile?.avatar?.thumbnail}
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <p className="truncate px-2.5 text-[14px] font-medium text-dark dark:text-light">
              {selectedPost.customer.name}
            </p>
            <p className="-mt-4 px-2.5 text-[9px] font-medium text-dark-600 dark:text-light-800">
              {`@${selectedPost.customer.name.replace(' ', '_')}`}
            </p>
          </div>
        </div>
        <div className="flex h-[40px] flex-shrink-0 items-center justify-center">
          <button
            onClick={onFollow}
            className={
              isFollow
                ? '3xl:pd-[30px] max-h-[40px] min-h-[40px] rounded-[55px] bg-brand px-[16.58px] font-poppins text-sm italic text-white dark:bg-[#28C98C]'
                : '3xl:pd-[30px] font-poppinsitalic max-h-[40px] min-h-[40px] rounded-[55px] border border-brand bg-transparent px-[16.58px] text-sm text-brand '
            }
          >
            {(isLoading || isLoadingFollow) && (
              <SpinnerIcon className="h-auto w-5 animate-spin" />
            )}
            {!(isLoading || isLoadingFollow) &&
              (isFollow ? 'UnFollow' : 'Follow')}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-2 rounded-[10px] border-[1px] border-light-200 p-4 dark:border-dark-400">
        <p className="text-[18px] font-medium italic text-dark dark:text-light">
          {selectedPost.descr}
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
          label={`${selectedPost.likes_count}`}
          activePossible={checkLikedByCurrentUser()}
          icon={<HeartIcon />}
          fillIcon={<HeartFillIcon />}
        />
        <FeedCardButton
          type="comment"
          label={`${selectedPost.comments_count}`}
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
