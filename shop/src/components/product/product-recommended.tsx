import { useTranslation } from 'next-i18next';
import Image from '@/components/ui/image';
import placeholder from '@/assets/images/placeholders/product.svg';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import verifiedPublisherIcon from '@/assets/images/verified-publisher.png';

type ProductRecommendedProps = {
  product: any;
};

const ProductRecommended: React.FC<ProductRecommendedProps> = ({ product }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex w-full flex-row items-center justify-start gap-2">
      <div className="relative aspect-[200/180] min-w-[120px] max-w-[200px] flex-shrink-0 md:w-2/5">
        <Image
          layout="fill"
          objectFit="cover"
          className="rounded-[10px]"
          src={product.thumbnail ?? placeholder}
          alt="Recommended"
        />
      </div>

      <div className="flex flex-shrink flex-col items-start justify-between gap-2 md:gap-1 lg:gap-4 xl:gap-4">
        <h3
          title={product.name}
          className="font text-[16px] font-medium leading-[1.5rem] text-dark-500 dark:text-light-100 sm:text-[18px] md:text-[22px]"
        >
          <AnchorLink
            href={routes.productUrl(product.slug)}
            className="w-full transition-colors hover:text-brand"
          >
            {product.name}
          </AnchorLink>
        </h3>
        <div className="flex flex-row items-center justify-start gap-2">
          <div className="relative flex h-[24px] w-[24px] flex-shrink-0">
            <Image
              alt={product.shop.name}
              layout="fill"
              quality={100}
              objectFit="cover"
              src={product.shop.logo.thumbnail ?? placeholder}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="flex flex-row items-center justify-start">
              <h3
                title={product.name}
                className="text-[12px] font-semibold text-dark-600 dark:text-light-600 sm:text-[14px]"
              >
                <AnchorLink
                  href={routes.shopUrl(product.shop?.slug)}
                  className="hover:text-accent transition-colors"
                >
                  {product.shop?.name}
                </AnchorLink>
              </h3>
              <div className="relative flex h-[16px] w-[16px]">
                <Image
                  alt={product.shop.name}
                  layout="fill"
                  quality={100}
                  objectFit="cover"
                  src={verifiedPublisherIcon}
                  className="rounded-full"
                />
              </div>
            </div>
            <p className="flex items-center truncate text-[8px] text-gray-800 dark:text-gray-300">
              20 Followers
            </p>
          </div>
        </div>
        <p className="flex items-center truncate text-[10px] text-gray-500 dark:text-gray-400">
          {`3 Day's Ago`}
          <svg
            width="2"
            height="2"
            fill="currentColor"
            className="mx-2 text-slate-300"
            aria-hidden="true"
          >
            <circle cx="1" cy="1" r="1" />
          </svg>
          View Product
        </p>
      </div>
    </div>
  );
};

export default ProductRecommended;
