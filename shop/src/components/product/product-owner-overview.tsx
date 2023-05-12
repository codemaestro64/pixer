import { useTranslation } from 'next-i18next';
import Image from '@/components/ui/image';
import placeholder from '@/assets/images/placeholders/product.svg';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import { BookmarkIcon } from '@/components/icons/bookmark-icon';
import { AttachmentIcon } from '@/components/icons/attachment-icon';
import { NotificationIcon } from '@/components/icons/notification-icon';
import { ProductDownloadIcon } from '@/components/icons/download-product-icon';
import { YellowStarIcon } from '@/components/icons/yellow-star-icon';

import publisherLogo from '@/assets/images/publisher-logo.png';
import verifiedPublisherIcon from '@/assets/images/verified-publisher.png';

type ProductOwnerOverviewProps = {
  owner: any;
};

const ProductOwnerOverview: React.FC<ProductOwnerOverviewProps> = ({
  owner,
}) => {
  const { t } = useTranslation('common');
  console.log(owner);
  return (
    <div className="relative -top-[74px] z-20 -mb-[70px] flex h-full w-full flex-col items-center justify-end gap-2 px-2 py-4 sm:px-4 md:absolute md:inset-0 md:px-8">
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="mb-4 h-full grow">
          <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-center">
            <div className="flex">
              <div className="relative flex h-[65px] w-[65px] flex-shrink-0 md:h-[80px] md:w-[80px] lg:h-[124px] lg:w-[124px]">
                <Image
                  alt={owner.name}
                  layout="fill"
                  quality={100}
                  objectFit="cover"
                  src={owner.logo.thumbnail ?? placeholder}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="h-full grow">
              <div className="flex flex-col items-start justify-center">
                <h3
                  title={owner.name}
                  className="font text-[17px] font-medium leading-[1.8rem] text-dark-100 dark:text-light sm:text-[20px] md:w-5/6 md:text-[24px] md:text-light md:dark:text-light lg:w-2/3 lg:text-[32px] lg:leading-[2.3rem]"
                >
                  <AnchorLink
                    href={routes.productUrl(owner.slug)}
                    className="transition-colors hover:text-brand"
                  >
                    {owner.product_name}
                  </AnchorLink>
                </h3>
                <div className="flex flex-row items-center justify-start">
                  <div className="relative flex h-[20px] w-[20px] lg:h-[24px] lg:w-[24px]">
                    <Image
                      alt={owner.name}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      src={owner.logo.thumbnail ?? placeholder}
                      className="rounded-full"
                    />
                  </div>
                  <h3
                    title={owner.name}
                    className="text-[17px] font-semibold text-brand ltr:pl-2 rtl:pr-2 md:text-[20px] ltr:md:pl-2.5 rtl:md:pr-2.5"
                  >
                    <AnchorLink
                      href={routes.shopUrl(owner?.slug)}
                      className="hover:text-accent transition-colors"
                    >
                      {owner?.name}
                    </AnchorLink>
                  </h3>
                  <div className="relative flex h-[12px] w-[12px] lg:h-[24px] lg:w-[24px]">
                    <Image
                      alt={owner.name}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      src={verifiedPublisherIcon}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="-mb-16 flex h-full flex-row items-end justify-center gap-4 sm:-mb-10">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-2">
              <ProductDownloadIcon className="h-[13px] w-[13px] text-dark-100 dark:text-white sm:h-[20px] sm:w-[20px] md:h-[26px] md:w-[26px] md:text-light md:dark:text-light" />
              <div className="text-[13px] font-semibold text-dark-100 dark:text-light sm:text-[20px] md:text-[28px] md:text-light md:dark:text-light">
                12K
              </div>
            </div>
            <div className="text-[8px] text-dark-300 dark:text-light sm:text-[12px] md:text-[16px] md:text-light md:dark:text-light">
              Downloads
            </div>
          </div>
          <div className="relative h-[32px] w-[1px] bg-light/[.17] sm:h-[46px] md:h-[64px]" />

          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-2">
              <YellowStarIcon className="h-[14px] w-[14px] text-rating sm:h-[22px] sm:w-[22px] md:h-[28px] md:w-[28px]" />
              <div className="text-[13px] font-semibold text-dark-100 dark:text-light sm:text-[20px] md:text-[28px] md:text-light md:dark:text-light">
                4.8
              </div>
            </div>
            <div className="text-[8px] text-dark-300 dark:text-light sm:text-[12px] md:text-[16px] md:text-light md:dark:text-light">
              Rating
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-row items-center justify-between gap-4 md:items-center md:justify-start">
        <Button className="aspect-[180/60] min-h-[47px] flex-shrink rounded-full text-brand sm:aspect-[240/60] md:min-h-[54px] lg:min-h-[60px] ">
          <div className="text-[16px] font-semibold text-white">
            {`$${owner.price} Buy`}
          </div>
        </Button>
        <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
          <Button
            variant="icon"
            className="inline-flex min-h-[47px] min-w-[47px] rounded-full border-[1px] border-dark/[.17] text-xs  font-medium transition-all hover:bg-light-100 hover:text-light hover:opacity-40 dark:border-light/[.17] hover:dark:bg-dark-100 md:border-light/[.17] md:hover:bg-dark-400 lg:min-h-[60px] lg:min-w-[60px]"
          >
            <div className="">
              <BookmarkIcon className="h-[20px] w-[20px] text-dark-300 dark:text-light md:text-white" />
            </div>
          </Button>
          <Button
            variant="icon"
            className="inline-flex min-h-[47px] min-w-[47px] rounded-full border-[1px] border-dark/[.17] text-xs  font-medium transition-all hover:bg-light-100 hover:text-light hover:opacity-40 dark:border-light/[.17] hover:dark:bg-dark-100 md:border-light/[.17] md:hover:bg-dark-400 lg:min-h-[60px] lg:min-w-[60px]"
          >
            <div className="">
              <AttachmentIcon className="h-[20px] w-[20px] text-dark-300 dark:text-light md:text-white" />
            </div>
          </Button>
          <Button
            variant="icon"
            className="inline-flex min-h-[47px] min-w-[47px] rounded-full border-[1px] border-dark/[.17] text-xs  font-medium transition-all hover:bg-light-100 hover:text-light hover:opacity-40 dark:border-light/[.17] hover:dark:bg-dark-100 md:border-light/[.17] md:hover:bg-dark-400 lg:min-h-[60px] lg:min-w-[60px]"
          >
            <div className="">
              <NotificationIcon className="h-[20px] w-[20px] text-dark-300 dark:text-light md:text-white" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductOwnerOverview;
