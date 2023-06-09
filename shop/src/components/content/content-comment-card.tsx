import CommentCardLoader from '@/components/comment/comment-card-loader';
import { useTranslation } from 'next-i18next';
import FeedCardButton from '../feed/feed-card-button';
import { HeartIcon } from '../icons/heart-icon';
import { HeartFillIcon } from '../icons/heart-fill';
import { CommentIcon } from '../icons/comment-icon';
import { ShareIcon } from '../icons/share-icon';
import { PostComment } from '@/types';
import Avatar from 'react-avatar';
import client from '@/data/client';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useMe } from '@/data/user';

interface ContentCommentCardProps {
  comment_id: string;
}

export default function ContentCommentCard({
  comment_id,
}: ContentCommentCardProps) {
  const { t } = useTranslation('common');
  const [selectedComment, setSelectedComment] = useState<PostComment | null>(
    null
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { me } = useMe();

  const { mutate: mutate } = useMutation(client.postcomments.get, {
    onSuccess: (res) => {
      setSelectedComment(res);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  const { mutate: mutateCommentLike } = useMutation(
    client.commentlikes.create,
    {
      onSuccess: (res) => {
        let new_likes = selectedComment!.likes.filter(
          (item) => item.user_id != me!.id
        );
        if (res.status) {
          new_likes = [...new_likes, res];
        }

        setSelectedComment({
          ...selectedComment,
          likes_count: `${new_likes.length}`,
          likes: new_likes,
        } as PostComment);
      },
      onError: (err: any) => {
        console.log(err.response.data, 'error');
      },
    }
  );

  useEffect(() => {
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    mutate({ id: comment_id });
  }, [comment_id]);

  function updateWindowSize() {
    setIsMobile(window.innerWidth < 768 ? true : false);
  }

  const checkLikedByCurrentUser = () => {
    if (selectedComment?.likes) {
      return selectedComment.likes!.find(
        (eachLike) => eachLike.user_id === me?.id
      )
        ? true
        : false;
    } else {
      return false;
    }
  };

  const onClickedAction = (actionType: string) => {
    if (!me) return;
    if (actionType === 'heart') {
      mutateCommentLike({
        comment_id: selectedComment!.id,
        user_id: me.id,
        type: 'post',
      });
    }
  };

  return selectedComment ? (
    <div className="mt-4 flex w-full flex-col rounded-[22px] bg-light-200 p-4 dark:bg-dark-300">
      <div className="flex min-w-0 flex-row items-center justify-start ">
        <div className="relative flex h-[48px] w-[44px] flex-shrink-0 items-center justify-center rounded-[8px] md:h-[62px] md:w-[56px]">
          <Avatar
            size={isMobile ? '44' : '46'}
            round="8px"
            name={selectedComment.customer?.name}
            textSizeRatio={2}
            src={selectedComment.profile?.avatar?.thumbnail}
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <p className="truncate px-2.5 text-[14px] font-medium text-dark dark:text-light">
            {selectedComment.customer?.name}
          </p>
          <p className="-mt-4 px-2.5 text-[9px] font-medium text-dark-600 dark:text-light-800">
            {`@${selectedComment.customer?.name.replace(' ', '_')}`}
          </p>
        </div>
      </div>
      <div className="p-[12.85px] text-[16px] font-medium text-dark dark:text-light">
        {selectedComment.reply}
      </div>
      <div className="flex flex-row items-center p-[12.85px]">
        <div className="flex gap-6">
          <FeedCardButton
            type="heart"
            toogleClicked={onClickedAction}
            activePossible={checkLikedByCurrentUser()}
            label={`${selectedComment.likes_count}`}
            icon={<HeartIcon />}
            fillIcon={<HeartFillIcon />}
          />
        </div>
      </div>
    </div>
  ) : (
    <CommentCardLoader />
  );
}
