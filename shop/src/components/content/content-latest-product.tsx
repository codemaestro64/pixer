import Image from '@/components/ui/image';
import Publisher from './publisher';
import TrendingProductImage from '@/assets/images/trending-product.png';
import publisherLogo from '@/assets/images/publisher-logo.png';

function ProductDateView() {
  return (
    <div className="flex items-center font-poppins text-[12px] font-medium text-[#989898]">
      <div>3 Day&#180;s Ago</div>
      <div className="mx-[14px] h-[3px] w-[3px] rounded-full bg-[#D9D9D9]"></div>
      <div>View Product</div>
    </div>
  );
}

export default function ContentLatestProduct() {
  return (
    <div className="flex items-center">
      <div className="mr-[18px]">
        <div className="relative min-h-[180px] min-w-[200px] overflow-hidden rounded-[10px]">
          <Image
            src={TrendingProductImage}
            alt="Product"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div>
        <div>
          <div className="truncate-text-line-two font-poppins text-[22px] font-medium text-dark dark:text-white">
            RNB Modern Laravel React Rental System
          </div>
        </div>
        <div className="mt-[14px]">
          <Publisher
            name="Imagineco"
            logo={publisherLogo}
            followers={'20'}
            small
          />
          <div className="mt-[20.17px]">
            <ProductDateView />
          </div>
        </div>
      </div>
    </div>
  );
}
