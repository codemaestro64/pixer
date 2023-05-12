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
    <div className="text-white flex items-center flex-row justify-center px-[31px] 2xl:px-[35.62px] py-[3.5px]">
      <span className='inline-block mr-[10.33px]'>
        { icon }
      </span>
      <span className="text-[12.05px] xl:text-[13.18px] font-semibold font-poppins">
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
      whileHover={{ scale: 1.03 }}
      variants={fadeInBottomWithScaleX()}
      onClick={() => router.push(routes.shopUrl(slug))}
      className="relative group cursor-pointer bg-light pb-[90.17%] overflow-hidden author-tile"
    >
      {/* large logo on background */}
      <div className='absolute inset-[-200%] opacity-80 -translate-x-[40%] z-[1]'>
        <Image src={logo?.original ?? placeholder} layout='fill' alt={name} />
      </div>
      {/* gradient layer */}
      <div className='absolute inset-0 z-[2] bg-gradient-to-tr from-[#00000088] to-[#00000044]'></div>
      {/* card content */}
      <div className='absolute inset-0 z-[3] h-full w-full flex flex-col justify-center px-[23.78px] 2xl:px-[26px] xs:translate-y-[20px] md:translate-y-0 2xl:translate-y-[20px]'>
        <div className="flex">
          <div className="mr-[13.78px] 2xl:mr-[15.06px]">
            <div className='relative h-[78.35px] 2xl:h-[91px] w-[78.35px] 2xl:w-[91px]'>
              <Image 
                alt={name}
                layout='fill'
                objectFit="cover"
                src={logo?.original ?? placeholder} />
            </div>
          </div>
          <div className="flex items-center">
            <div className='overflow-hidden truncate-text-line-two'>
              <h3 className="text-[24.11px] 2xl:text-[26.35px] text-[#fefefe] font-semibold font-poppins transition-colors group-hover:text-brand duration-200 ">
                { name }
              </h3>
              <p className="text-[13.78px] 2xl:text-[15.06px] text-[#bbb] font-medium font-poppins italic">
                @{ slug }
              </p>
            </div>
          </div>
        </div>   
        <div className="mt-[20.66px] 2xl:mt-[22.59px] flex justify-center divide-x divide-[#D9D9D9]">
          <AnalyticsItem metric={users_count} icon={<UserHeadShouldersIcon className="w-[13.78px] 2xl:w-[15.06px] h-[18.08px] 2xl:h-[19.76px]" />} />
          <AnalyticsItem metric={wishlists_count} icon={<HeartFillIcon className="w-[17.22px] 2xl:w-[18.82px] h-[15.91px] 2xl:h-[18.82px]" />} />
          <AnalyticsItem metric={orders_count} icon={<DownloadCloudIcon className="w-[18.94px] 2xl:w-[20.71px] h-[17.58px] 2xl:h-[19.21px]" />} />
        </div>
        <div className="mt-[28px] xs:mt-[60px] md:mt-[28px] 2xl:mt-[60px]">
          {/* <FollowButton shop_id={shop.id} /> */}
          <FollowButton />
        </div>
      </div>
    </motion.div>
  );
}