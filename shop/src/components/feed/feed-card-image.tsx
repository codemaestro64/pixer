import React from 'react';
import Image from '@/components/ui/image';
import { SearchIcon } from '../icons/search-icon';
import { DetailsIcon } from '../icons/details-icon';
import { PlayFillIcon } from '../icons/play-fill-icon';
import { useModalAction } from '../modal-views/context';
import placeholder from '@/assets/images/placeholders/product.svg';

function BackdropButton({
  icon,
  onClicked,
}: {
  icon: React.ReactElement;
  onClicked?: any;
}) {
  return (
    <button
      onClick={onClicked}
      className="mb-[6.6px] flex h-[45.03px] w-[45.03px] items-center justify-center rounded-full border border-current text-[#f5f5f5] transition-transform duration-200 hover:translate-y-[-4px] hover:text-brand"
    >
      {React.cloneElement(icon, { className: 'w-[17px] h-[17px]' })}
    </button>
  );
}

export default function FeedCardImage({
  feedID,
  cardImage,
  feedType,
}: {
  feedID: string;
  cardImage?: string;
  feedType: string;
}) {
  const { openModal } = useModalAction();

  const onClickedPreview = () => {
    openModal('COMMENT_DETAILS', {
      slug: feedID,
    });
  };

  const onClickedDetails = () => {};

  return (
    <div className="group-hover:shadow-feed-image relative h-full w-full pb-[80%]">
      {/* layer 1 */}
      <div className="absolute inset-0 z-[3] h-full w-full overflow-hidden rounded-[8.65px] bg-[#f3f3f3] transition-transform duration-300 group-hover:translate-x-[-9px] group-hover:translate-y-[-9px] dark:bg-[#292929]">
        {/* backdrop */}
        <div className="invisible absolute inset-[-5px] z-[2] rounded-[8.65px] bg-[rgba(30,30,30,0.8)] opacity-0 backdrop-blur transition-all duration-300 group-hover:visible group-hover:opacity-100">
          {/* backdrop buttons */}
          <div className="flex h-full items-center justify-center gap-[19.5px] text-white">
            <div className="flex flex-col items-center">
              <BackdropButton
                icon={<SearchIcon />}
                onClicked={onClickedPreview}
              />
              <div className="text-[8.66px] font-medium italic">PREVIEW</div>
            </div>
            <div className="flex flex-col items-center">
              <BackdropButton
                icon={<DetailsIcon />}
                onClicked={onClickedDetails}
              />
              <div className="text-[8.66px] font-medium italic">DETAILS</div>
            </div>
          </div>
        </div>
        {/* image */}
        <Image
          src={cardImage ?? placeholder}
          alt="Card Project"
          width="100%"
          height="100%"
          layout="fill"
          className="object-cover"
        />

        {/* play icon */}
        {feedType === 'video' && (
          <div className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
            <PlayFillIcon className="h-[51px] w-[51px]" />
          </div>
        )}
      </div>
      {/* layer 2 */}
      <div className="absolute inset-0 z-[2] rounded-[8.65px] bg-brand-dark transition-transform duration-300 group-hover:-translate-x-[4.5px] group-hover:-translate-y-[4.5px]"></div>
      {/* layer 3 */}
      <div className="absolute inset-0 z-[1] rounded-[8.65px] bg-[#05604E]"></div>
    </div>
  );
}
