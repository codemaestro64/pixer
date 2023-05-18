import type { Feed } from '@/types';
import { motion } from 'framer-motion';
import cn from 'classnames';
import Button from '@/components/ui/button';
import FeedCard from '@/components/feed/feed-card';
import FeedCardLoader from '@/components/feed/feed-loader';
import { useGridSwitcher } from '@/components/product/grid-switcher';
import ItemNotFound from '@/components/ui/item-not-found';
import rangeMap from '@/lib/range-map';
import { staggerTransition } from '@/lib/framer-motion/stagger-transition';
import { useTranslation } from 'next-i18next';

interface FeedGridProps {
  feeds: Feed[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isLoadingMore?: boolean;
  isLoading?: boolean;
  limit?: number;
}

export default function FeedGrid({
  feeds,
  onLoadMore,
  hasNextPage,
  isLoadingMore,
  isLoading,
  limit = 15,
}: FeedGridProps) {
  const { isGridCompact } = useGridSwitcher();
  const { t } = useTranslation('common');
  if (!isLoading && !feeds.length) {
    return (
      <ItemNotFound
        title={t('text-no-products-found')}
        message={t('text-no-products-found-message')}
        className="px-4 pt-5 pb-10 md:px-6 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8"
      />
    );
  }
  return (
    <div className="pt-5 pb-9 md:px-6 md:pb-10 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8">
      <motion.div
        variants={staggerTransition(0.025)}
        className="grid grid-cols-1 gap-[14px] pb-[28px] md:grid-cols-2 md:gap-[16px] xl:grid-cols-3 2xl:grid-cols-2 2xl:gap-[18px] 3xl:grid-cols-3"
      >
        {isLoading && !feeds.length
          ? rangeMap(limit, (i) => (
              <FeedCardLoader key={i} uniqueKey={`product-${i}`} />
            ))
          : feeds.map((eachFeed) => (
              <FeedCard key={eachFeed.id} feed={eachFeed} />
            ))}
      </motion.div>

      {hasNextPage && (
        <div className="mt-8 grid place-content-center md:mt-10">
          <Button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            isLoading={isLoadingMore}
          >
            {t('text-loadmore')}
          </Button>
        </div>
      )}
    </div>
  );
}
