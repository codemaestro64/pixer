import { useModalState } from '@/components/modal-views/context';
import ProductThumbnailGallery from '@/components/product/product-thumbnail-gallery';
import CommentPopupLoader from '@/components/comment/comment-popup-loader';
import Scrollbar from '../ui/scrollbar';
import client from '@/data/client';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useMe } from '@/data/user';
import { Feed } from '@/types';
import CommentOwnerInfo from './comment-owner-info';
import CommentCard from './comment-card';

export default function CommentPopupDetails() {
  const { data } = useModalState();
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const { me } = useMe();

  const { mutate: mutateFeed } = useMutation(client.feeds.get, {
    onSuccess: (res) => {
      setSelectedFeed(res);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  const { mutate: mutateLike } = useMutation(client.feeds.like, {
    onSuccess: (res) => {
      mutateFeed({ id: selectedFeed!.id });
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  useEffect(() => {
    mutateFeed({ id: data.slug });
  }, [data.slug]);

  const onClickedAction = (actionType: string) => {
    if (!me || !selectedFeed) return;

    if (actionType === 'heart') {
      mutateLike({ user_id: me!.id, feed_id: selectedFeed!.id });
    } else if (actionType === 'comment') {
    } else if (actionType === 'share') {
    } else {
      //more menu
    }
  };
  return selectedFeed ? (
    <div className="flex max-w-full flex-col bg-light text-left dark:bg-dark-250 xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="flex flex-col p-4 rtl:space-x-reverse md:p-6 lg:flex-row lg:space-x-7 xl:space-x-8 xl:p-8 3xl:space-x-10">
        <div className="mb-4 w-full shrink-0 items-center justify-center overflow-hidden lg:max-w-[480px] xl:flex xl:max-w-[570px] 2xl:max-w-[650px] 3xl:max-w-[795px]">
          <ProductThumbnailGallery gallery={selectedFeed!.content} />
        </div>
        <div className="flex flex-col justify-start gap-8 lg:w-[400px] xl:w-[520px] 3xl:w-[555px]">
          <CommentOwnerInfo feed={selectedFeed!} />
          <Scrollbar className="relative h-full w-full">
            <div className="flex flex-col items-center justify-center border-t-[1px] border-dark-100 dark:border-dark-400">
              {selectedFeed!.comments?.map((comment, index) => (
                <CommentCard key={index} comment_id={comment.id} />
              ))}
            </div>
          </Scrollbar>
        </div>
      </div>
    </div>
  ) : (
    <CommentPopupLoader />
  );
}
