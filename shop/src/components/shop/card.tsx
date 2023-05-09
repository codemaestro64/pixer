import type { Shop } from '@/types';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from '@/components/ui/image';
import routes from '@/config/routes';
import placeholder from '@/assets/images/placeholders/product.svg';
import { fadeInBottomWithScaleX } from '@/lib/framer-motion/fade-in-bottom';
import { useTranslation } from 'next-i18next';
import Button from '@/components/ui/button';
import { UserIcon } from '@/components/icons/user-icon';
import { HeartFillIcon } from '@/components/icons/heart-fill';
import { PurchaseIcon } from '@/components/icons/purchase-icon';


interface AnalyticsProps {
  metric: number;
  icon: React.ReactNode;
}

function AnalyticsItem({metric, icon}: AnalyticsProps) {
  return (
    <div className="flex items-center flex-row flex justify-center">
      <span className="flex items-center basis-1/4">
        {icon}
      </span>
      <span className="basis-1/4 font-bold">
        {metric}
      </span>
    </div>
  )
}


export default function Card({ shop }: { shop: Shop }) {
  const { name, slug, logo, products_count, orders_count, users_count, wishlists_count } = shop ?? {};
  const router = useRouter();
  const { t } = useTranslation('common');
  
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.05 }}
      variants={fadeInBottomWithScaleX()}
      onClick={() => router.push(routes.shopUrl(slug))}
      className="relative group cursor-pointer bg-light px-4 py-7 author-tile"
    >
      <div className="flex pt-10">
        <div className="pr-2">
          <Image 
            alt={name}
            width="50"
            height="50"
            quality={100}
            objectFit="cover"
            src={logo?.original ?? placeholder} />
        </div>
        <div className="flex">
          <div>
            <h3 className="text-13px font-medium text-dark transition-colors goup-hover:text-brand dark:text-light">
              {name}
            </h3>
            <p className="text-8 font-small">
              @{slug}
            </p>
          </div>
        </div>
      </div>   
      <div className="flex place-content-center justify-center pt-2">
        <div className="flex-1 border-right">
          <AnalyticsItem 
            icon={<UserIcon className="h-[18px] w-[18px] text-current" />} 
            metric={ users_count } />
        </div>
        <div className="flex-1 border-right">
          <AnalyticsItem  
            icon={<HeartFillIcon className="h-[18px] w-[18px] text-current" />} 
            metric={ wishlists_count } />
        </div>
        <div className="flex-1 border-right">
          <AnalyticsItem  
            icon={<PurchaseIcon className="h-[18px] w-[18px] text-current" />} 
            metric={ orders_count } />
        </div>
      </div>
     <div className="mt-10">
       <Button className="min-h-[36px] sm:h-8 rounded-full">
          {t('Follow')}
        </Button>
     </div>
    </motion.div>
  );
}