import feedCardImage from '@/assets/images/feed/feed-card-image.png';
import teamImage from '@/assets/images/omnico-team.png';
import FeedMenu from '@/components/feed/feed-menu';
import FeedInput from '@/components/feed/feed-input';
import FeedActions from '@/components/feed/feed-actions';
import FeedTrendLatest from '@/components/feed/feed-trend-latest';
import FeedGrid from '@/components/feed/feed-grid';
import FeedCard from '@/components/feed/feed-card';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import client from '@/data/client';
import { useMe } from '@/data/user';
import { Feed } from '@/types';
import FeedContext from '@/lib/feed-context';

export default function FeedMainSection({ is2xl = false }: { is2xl: boolean }) {
  const [feedDescr, setFeedDescr] = useState<string>('');
  const { triggerFeeds } = useContext(FeedContext);
  const [feeds, setFeeds] = useState<Feed[] | []>([]);

  useEffect(() => {
    if (!me) return;

    mutateFeeds();
  }, [triggerFeeds]);

  const { me } = useMe();

  const { mutate: mutateFeeds, isLoading } = useMutation(client.feeds.all, {
    onSuccess: (res) => {
      setFeeds(res);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  return (
    <div className="2xl:mr-[482px]">
      <div className="px-[10px] pt-[10px] md:px-[29px] md:pt-[20px] 2xl:pt-[0px]">
        {!is2xl ? (
          <div className="px-[5px] md:px-[12px]">
            <FeedMenu />
          </div>
        ) : null}
        <div className="mt-[13px] md:mt-[19px] 2xl:mt-[12px]">
          <FeedInput feedDescr={feedDescr} setFeedDescr={setFeedDescr} />
        </div>
        <div className="mt-[6px] md:mt-[7px]">
          <FeedActions feedDescr={feedDescr} setFeedDescr={setFeedDescr} />
        </div>
        <div className="mt-[14px] md:mt-[24px] 2xl:mt-[29px]">
          <FeedTrendLatest />
        </div>
      </div>
      <div className="mt-[21px] 2xl:mt-[32px]">
        <FeedGrid
          feeds={feeds}
          onLoadMore={() => {}}
          hasNextPage={false}
          isLoadingMore={false}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
