import type { Post } from '@/types';
import Router from 'next/router';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useModalAction } from '@/components/modal-views/context';
import routes from '@/config/routes';
import usePrice from '@/lib/hooks/use-price';
import { PreviewIcon } from '@/components/icons/preview-icon';
import { DetailsIcon } from '@/components/icons/details-icon';
import placeholder from '@/assets/images/placeholders/product.svg';
import { useGridSwitcher } from '@/components/product/grid-switcher';
import { fadeInBottomWithScaleX } from '@/lib/framer-motion/fade-in-bottom';
import { isFree } from '@/lib/is-free';
import { useTranslation } from 'next-i18next';
import { getProfileAvatar, getProfileAvatarImage } from '@/lib/constants';
import Avatar from 'react-avatar';

export default function Card({ post }: { post: Post }) {
  const { id: slug, title, customer, profile, attachments } = post ?? {};
  const { openModal } = useModalAction();
  const { isGridCompact } = useGridSwitcher();

  const goToDetailsPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    Router.push(routes.postUrl(slug));
  };
  const { t } = useTranslation('common');

  return (
    <motion.div variants={fadeInBottomWithScaleX()} title={title}>
      <div className="group relative flex aspect-[3/2] w-full justify-center overflow-hidden">
        <Image
          alt={title}
          layout="fill"
          quality={100}
          objectFit="cover"
          src={
            attachments[0].thumbnail?.replace('localhost', 'localhost:8000') ??
            placeholder
          }
          className="bg-light-500 dark:bg-dark-400"
        />
        <div className="absolute top-0 left-0 z-10 flex h-full w-full cursor-pointer items-center justify-center gap-9 bg-dark/60 p-4 opacity-0 backdrop-blur-sm transition-all group-hover:gap-5 group-hover:opacity-100 dark:bg-dark/70">
          <button
            className={cn(
              'text-center font-medium text-light',
              isGridCompact ? 'text-xs' : 'text-13px'
            )}
          >
            <div
              className={cn(
                'mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand',
                isGridCompact ? 'h-11 w-11' : 'h-[50px] w-[50px]'
              )}
            >
              <PreviewIcon
                className={cn(isGridCompact ? 'h-4 w-4' : 'h-5 w-5')}
              />
            </div>
            {t('text-preview')}
          </button>
          <button
            onClick={goToDetailsPage}
            className={cn(
              'relative z-[11] text-center font-medium text-light',
              isGridCompact ? 'text-xs' : 'text-13px'
            )}
          >
            <div
              className={cn(
                'mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand',
                isGridCompact ? 'h-11 w-11' : 'h-[50px] w-[50px]'
              )}
            >
              <DetailsIcon
                className={cn(isGridCompact ? 'h-4 w-4' : 'h-5 w-5')}
              />
            </div>
            {t('text-details')}
          </button>
        </div>
      </div>
      <div className="flex items-start justify-between pt-3.5">
        <div className="relative my-auto flex h-8 w-8 flex-shrink-0 items-center justify-center 4xl:h-9 4xl:w-9">
          <Avatar
            size="100%"
            round={true}
            name={customer.name}
            textSizeRatio={2}
            src={getProfileAvatar(profile)}
          />
        </div>
        <div className="-mt-[1px] flex flex-col truncate ltr:mr-auto ltr:pl-2.5 rtl:ml-auto rtl:pr-2.5 rtl:text-right">
          <h3
            title={customer.name}
            className="mb-0.5 truncate font-medium text-dark-100 dark:text-light"
          >
            <AnchorLink href={routes.postUrl(slug)}>{customer.name}</AnchorLink>
          </h3>
          <AnchorLink
            href=""
            className="font-medium text-light-base hover:text-brand dark:text-dark-800 dark:hover:text-brand"
          >
            {`@${customer.name.replace(' ', '_')}`}
          </AnchorLink>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end pl-2.5"></div>
      </div>
    </motion.div>
  );
}
