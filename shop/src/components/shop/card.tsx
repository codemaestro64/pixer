import type { Shop } from '@/types';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from '@/components/ui/image';
import routes from '@/config/routes';
import placeholder from '@/assets/images/placeholders/product.svg';
import { fadeInBottomWithScaleX } from '@/lib/framer-motion/fade-in-bottom';
// import { useTranslation } from 'next-i18next';
import { UserHeadShouldersIcon } from '../icons/user-head-shoulders-icon';
import { HeartFillIcon } from '@/components/icons/heart-fill';
import { DownloadCloudIcon } from '../icons/download-cloud-icon';
// import FollowButton from '@/components/follow/follow-button';
import FollowButton from './follow-button';

interface AnalyticsProps {
  metric: number;
  icon: React.ReactNode;
}

function AnalyticsItem({metric, icon}: AnalyticsProps) {
  return (
    <div className="text-white flex items-center flex-row justify-center px-[31px] py-[3.5px]">
      <span className='inline-block mr-[10.33px]'>
        { icon }
      </span>
      <span className="text-[12.05px] lg:text-[13.18px] font-semibold font-poppins">
        { metric || 0 }
      </span>
    </div>
  )
}

export default function Card({ shop }: { shop: Shop }) {
  const { name, slug, logo, products_count, orders_count, users_count, wishlists_count } = shop ?? {};
  const router = useRouter();
  // const { t } = useTranslation('common');
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.05 }}
      variants={fadeInBottomWithScaleX()}
      onClick={() => router.push(routes.shopUrl(slug))}
      className="relative group cursor-pointer bg-light px-4 py-7 pb-[90.17%] overflow-hidden author-tile"
    >
      {/* large logo on background */}
      <div className='absolute inset-[-200%] opacity-80 -translate-x-[40%] z-[1]'>
        <Image src={logo?.original ?? placeholder} layout='fill' alt={name} />
      </div>
      {/* gradient layer */}
      <div className='absolute inset-0 z-[2] bg-gradient-to-tr from-[#00000088] to-[#00000044]'></div>
      {/* card content */}
      <div className='absolute inset-0 z-[3] h-full w-full flex flex-col p-[23.78px] pt-[94.7px]'>
        <div className="flex">
          <div className="mr-[13.78px]">
            <div className='relative h-[78.35px] w-[78.35px]'>
              <Image 
                alt={name}
                layout='fill'
                objectFit="cover"
                src={logo?.original ?? placeholder} />
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <h3 className="text-[24.11px] lg:text-[26.35px] text-[#fefefe] font-semibold font-poppins transition-colors group-hover:text-brand duration-200">
                {name}
              </h3>
              <p className="text-[13.78px] lg:text-[15.06px] text-[#bbb] font-medium font-poppins italic">
                @{slug}
              </p>
            </div>
          </div>
        </div>   
        <div className="mt-[20.66px] flex justify-center divide-x divide-[#D9D9D9]">
          <AnalyticsItem metric={users_count} icon={<UserHeadShouldersIcon className="w-[13.78px] lg:w-[15.06px] h-[18.08px] lg:h-[19.76px]" />} />
          <AnalyticsItem metric={wishlists_count} icon={<HeartFillIcon className="w-[17.22px] lg:w-[18.82px] h-[15.91px] lg:h-[18.82px]" />} />
          <AnalyticsItem metric={orders_count} icon={<DownloadCloudIcon className="w-[18.94px] lg:w-[20.71px] h-[17.58px] lg:h-[19.21px]" />} />
        </div>
        <div className="mt-[56.66px]">
          {/* <FollowButton shop_id={shop.id} /> */}
          <FollowButton />
        </div>
      </div>
    </motion.div>
  );
}