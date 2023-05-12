import type { Shop } from '@/types';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import Card from '@/components/shop/card';
import ShopCardLoader from '@/components/shop/shop-loader';
import ItemNotFound from '@/components/ui/item-not-found';
import rangeMap from '@/lib/range-map';
import { staggerTransition } from '@/lib/framer-motion/stagger-transition';

type GridProps = {
  shops: Shop[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isLoadingMore?: boolean;
  isLoading?: boolean;
  limit?: number;
};

export default function Grid({
  shops,
  onLoadMore,
  hasNextPage,
  isLoadingMore,
  isLoading,
  limit = 15,
}: GridProps) {
  if (!isLoading && !shops.length) {
    return (
      <ItemNotFound
        title={'No Author found!'}
        message={'Sorry, we don’t found any author'}
        className="pt-5 pb-0 md:px-6 md:pt-6 lg:px-7 3xl:px-8"
      />
    );
  }
  return (
    <div className="px-4 pb-9 sm:px-6 md:pb-10 lg:px-7 lg:pb-12 3xl:px-8">
      <motion.div
        variants={staggerTransition(0.025)}
        className="grid grid-cols-1 gap-[14.33px] sm:gap-[16px] lg:gap-6 xl:gap-[16px] 2xl:gap-6 3xl:gap-7 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 4xl:grid-cols-4"
      >
        {isLoading && !shops.length
          ? rangeMap(limit, (i) => (
              <div className="rounded-md bg-light dark:bg-dark-250" key={i}>
                <ShopCardLoader uniqueKey={`author-${i}`} />
              </div>
            ))
          : shops.map((shop) => <Card key={shop.id} shop={shop} />)}
      </motion.div>
      {hasNextPage && (
        <div className="mt-10 grid place-content-center">
          <Button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            isLoading={isLoadingMore}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
