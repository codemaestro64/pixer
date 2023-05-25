import Image from '@/components/ui/image';
import Publisher from './publisher';
import { Post } from '@/types';
import { getPreviewThumbnailImage } from '@/lib/constants';
import AnchorLink from '../ui/links/anchor-link';
import routes from '@/config/routes';
import moment from 'moment';

export default function ContentLatestProduct({ product }: { product: Post }) {
  const {
    id: slug,
    title,
    attachments,
    customer,
    followers_count,
    profile,
    created_at,
    updated_at,
  } = product;

  return (
    <div className="flex items-center">
      <div className="mr-[18px]">
        <div className="relative min-h-[180px] min-w-[200px] overflow-hidden rounded-[10px]">
          <Image
            src={getPreviewThumbnailImage(attachments[0])}
            alt="Product"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div>
        <div>
          <div className="truncate-text-line-two font-poppins text-[22px] font-medium text-dark dark:text-white">
            {title}
          </div>
        </div>
        <div className="mt-[14px]">
          <Publisher
            name={customer.name}
            followers={followers_count}
            logo={profile}
            small
          />
          <div className="mt-[20.17px]">
            <div className="flex items-center font-poppins text-[12px] font-medium text-[#989898]">
              <div>{moment(updated_at).fromNow()}</div>
              <div className="mx-[14px] h-[3px] w-[3px] rounded-full bg-[#D9D9D9]"></div>
              <div>
                <AnchorLink
                  className="font-medium text-light-base hover:text-brand dark:text-dark-800 dark:hover:text-brand"
                  href={routes.postUrl(slug)}
                >
                  View Product
                </AnchorLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
