import React from 'react';
import { LikeOutlineIcon } from '../icons/like-outline-icon';
import { CommentOutlineIcon } from '../icons/comment-outline-icon';
import { Post, User } from '@/types';
import { formatNumber } from '@/lib/constants';
import { LikeIcon } from '../icons/like-icon';
import { useMutation } from 'react-query';
import client from '@/data/client';
import FeedContext from '@/lib/feed-context';
import { useEffect, useState, useContext } from 'react';
import { useModalAction } from '@/components/modal-views/context';

function SocialButton({
  label,
  icon,
  onAction,
}: {
  label: string;
  icon: React.ReactElement;
  onAction: any;
}) {
  return (
    <button
      onClick={onAction}
      className="flex transform gap-[10.11px] font-poppins text-[14.7px] font-semibold text-[#3a3a3a] transition-transform active:scale-75 dark:text-[#dedede] md:text-[17.84px] 3xl:gap-[14px] 3xl:text-[20.27px]"
    >
      <span>
        {React.cloneElement(icon, {
          className:
            'w-[22.05px] md:w-[26.75px] 3xl:w-[30.41px] h-[22.05px] md:h-[26.75px] 3xl:h-[30.41px]',
        })}
      </span>
      <span>{label}</span>
    </button>
  );
}

export default function ContentSocial({ post, me }: { post: Post; me: User }) {
  const { triggerPost, setTriggerPost } = useContext(FeedContext);
  const [selectedPost, setSelectedPost] = useState<Post>(post);
  const { openModal } = useModalAction();

  const checkLikedByCurrentUser = () => {
    if (selectedPost.likes) {
      return selectedPost.likes!.find((eachLike) => eachLike.user_id === me.id)
        ? true
        : false;
    } else {
      return false;
    }
  };

  const { mutate: mutatePost, isLoading } = useMutation(client.posts.get, {
    onSuccess: (res) => {
      setSelectedPost(res);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  const { mutate: mutateLike } = useMutation(client.posts.like, {
    onSuccess: (res) => {
      mutatePost({ id: selectedPost.id });
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  const onLike = () => {
    mutateLike({ user_id: me.id, post_id: selectedPost.id });
  };

  const onComment = () => {
    //go to comment popup
    openModal('POST_COMMENT_DETAILS', {
      slug: selectedPost.id,
    });
  };

  useEffect(() => {
    mutatePost({ id: selectedPost.id });
  }, [triggerPost]);

  return (
    <div className="ml-[4.25px] flex gap-[18.85px] md:mr-[8px] md:gap-[22.87px] md:self-end 3xl:gap-[26px]">
      <SocialButton
        onAction={onLike}
        label={formatNumber(selectedPost.likes_count)}
        icon={checkLikedByCurrentUser() ? <LikeIcon /> : <LikeOutlineIcon />}
      />
      <SocialButton
        onAction={onComment}
        label={formatNumber(selectedPost.comments_count)}
        icon={<CommentOutlineIcon />}
      />
    </div>
  );
}
