import { useTranslation } from 'next-i18next';
import Image from '@/components/ui/image';
import placeholder from '@/assets/images/placeholders/product.svg';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import verifiedPublisherIcon from '@/assets/images/verified-publisher.png';
import ProductRecommendedItem from './product-recommended-item';
import Button from '@/components/ui/button';
import { ThreeDotsIcon } from '@/components/icons/three-dots-icon';
import { Attachment, Shop } from '@/types';

type ProductRecommendedProps = {
  gallery: Attachment[];
  shop: Shop;
  name: string;
};

const ProductRecommended: React.FC<ProductRecommendedProps> = ({
  gallery,
  shop,
  name,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="mt-7 w-full rounded-md p-2 md:ml-7 md:mt-0">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-row items-center justify-between p-2">
          <div className="text-[20px] font-semibold text-dark-600 dark:text-light-600">
            Recommended
          </div>
          <Button variant="icon" className="inline-flex hover:opacity-40">
            <ThreeDotsIcon className="h-[32px] w-[32px] text-dark-600 dark:text-light-600" />
          </Button>
        </div>

        <div className="mt-4 flex w-full flex-col items-start justify-center gap-4">
          {gallery?.map((item, index) => (
            <ProductRecommendedItem
              key={index}
              product={{ ...item, shop, name }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommended;
