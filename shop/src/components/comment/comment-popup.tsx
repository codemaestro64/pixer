import { useModalState } from '@/components/modal-views/context';
import ProductThumbnailGallery from '@/components/product/product-thumbnail-gallery';
import CommentPopupLoader from '@/components/comment/comment-popup-loader';
import Scrollbar from '../ui/scrollbar';
import client from '@/data/client';
import { useEffect, useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { useMe } from '@/data/user';
import { Feed } from '@/types';
import CommentOwnerInfo from './comment-owner-info';
import CommentCard from './comment-card';
import FeedContext from '@/lib/feed-context';
import { update } from 'lodash';
import { SpinnerIcon } from '../icons/spinner-icon';

export default function CommentPopupDetails() {
  const { data } = useModalState();
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [reply, setReply] = useState<string>('');
  const { triggerFeeds, setTriggerFeeds } = useContext(FeedContext);

  const { me } = useMe();

  const { mutate: mutateFeed } = useMutation(client.feeds.get, {
    onSuccess: (res) => {
      setSelectedFeed(res);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  const { mutate: mutateComment, isLoading } = useMutation(
    client.feedcomments.create,
    {
      onSuccess: (res) => {
        setReply('');

        const updatedFeed = {
          ...selectedFeed!,
          comments: [res, ...selectedFeed!.comments!],
          comments_count: selectedFeed!.comments_count + 1,
        };
        setSelectedFeed(updatedFeed as Feed);
        setTriggerFeeds(!triggerFeeds);
      },
      onError: (err: any) => {
        setReply('');

        console.log(err.response.data, 'error');
      },
    }
  );

  useEffect(() => {
    mutateFeed({ id: data.slug });
  }, [data.slug]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isLoading) return;

    if (!selectedFeed) return;

    if (e.key === 'Enter') {
      if (reply.length === 0) {
        return;
      }

      mutateComment({
        user_id: me!.id,
        feed_id: selectedFeed!.id,
        reply,
      });
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
          <div className="relative w-full">
            <input
              type="text"
              value={reply}
              onKeyDown={handleKeyDown}
              onChange={(e) => !isLoading && setReply(e.target.value)}
              placeholder="Write something... ?"
              className="h-[49px] w-full rounded-[100px] border-[1px] border-light-400 bg-[#f8f8f8] px-[24px] py-[14px] text-[16px] font-medium italic placeholder-dark-850 dark:border-dark-400 dark:bg-[#2B2A2A] dark:text-white dark:placeholder-[#545454]"
            />
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:left-auto lg:right-[20px]">
              {isLoading && <SpinnerIcon className="h-auto w-5 animate-spin" />}
            </div>
          </div>

          <div className="-mb-8 h-[1px] w-full border-t-[1px] border-light-400 dark:border-dark-400" />
          <Scrollbar className="relative h-full w-full">
            <div className="flex flex-col items-center justify-center">
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
