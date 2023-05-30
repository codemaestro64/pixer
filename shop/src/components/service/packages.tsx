import React, { useState } from 'react';
import PackageMidSection from './package-midsection';
import { HeartIcon } from '../icons/heart-icon';
import { DetailsIcon } from '../icons/details-icon';
import { Gig, Package as PackageType } from '@/types';
import { HeartFillIcon } from '../icons/heart-fill';
import client from '@/data/client';
import { useMutation } from 'react-query';
import AddToCart from '../cart/add-to-cart';

function ActionButton({
  icon,
  clickAction,
}: {
  icon: React.ReactElement;
  clickAction: any;
}) {
  return (
    <button
      onClick={clickAction}
      className="w-[42.85px] xl:w-[62px] h-[42.85px] xl:h-[62px] text-dark-800 dark:text-[#787878] flex items-center justify-center rounded-full border border-dark-800 dark:border-[#393939] transform transition-transform first-line:relative active:scale-75"
    >
      {React.cloneElement(icon, {
        className: 'w-[16.59px] xl:w-[24px] h-[16.59px] xl:h-[24px]',
      })}
    </button>
  );
}

function PackageButton({
  label,
  primary = false,
}: {
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      className={`py-[12.62px] xl:py-[18.5px] tracking-wider font-poppins font-medium uppercase block w-full min-h-[53px] ${
        primary
          ? 'text-[12.44px] xl:text-[18px] text-white bg-brand'
          : 'text-[11.06px] xl:text-[16px] text-dark-450 dark:text-white border border-dark-450 bg-transparent'
      }`}
    >
      {label}
    </button>
  );
}

function PackageTitle({
  index,
  title,
  active = false,
  toggleAction,
}: {
  index: number;
  title: string;
  active?: boolean;
  toggleAction: any;
}) {
  return (
    <div
      onClick={() => toggleAction(index)}
      className={`px-[13.82px] py-[9.43px] hover:dark:bg-dark-200 hover:bg-light-400 hover:text-brand ${
        !active ? '2xl:text-[#BFBFBF] 2xl:dark:text-[#767676]' : 'text-brand'
      }`}
    >
      <div className="text-[16px] xl:text-[18px] font-bold 2xl:font-medium xl:font-medium font-poppins tracking-wider uppercase 2xl:flex 2xl:justify-center">
        {title}
      </div>
    </div>
  );
}

export default function Package({ me, gig }: { me: any; gig: Gig }) {
  const { id: gig_id, likes, packages } = gig;

  const [selectedPackIdx, setSelectedPackIdx] = useState<number>(0);
  const [currentLikes, setCurrentLikes] = useState<any[]>(likes);

  const checkLikedByCurrentUser = () => {
    return currentLikes.find((eachLike) => eachLike.user_id === me.id)
      ? true
      : false;
  };

  const togglePackageType = (index: number) => {
    setSelectedPackIdx(index);
  };

  const { mutate: mutateLike } = useMutation(client.gigs.like, {
    onSuccess: (res) => {
      let newLikes = [...currentLikes].filter(
        (item) => item.user_id != res.user_id
      );

      if (res.status) {
        newLikes = [...newLikes, { user_id: res.user_id }];
      }

      setCurrentLikes(newLikes);
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');
    },
  });

  return (
    <div className="space-y-[17px] xl:space-y-[24px]">
      <div className="grid grid-cols-3 py-[10px] border-b 2xl:border-0 border-b-[#EBEBEB] dark:border-b-[#353535] 2xl:divide-x 2xl:divide-[#DDDDDD] 2xl:dark:divide-[#2E2E2E]">
        {packages?.map((item: PackageType, key) => (
          <PackageTitle
            key={key}
            index={key}
            title={item.title}
            active={key === selectedPackIdx}
            toggleAction={togglePackageType}
          />
        ))}
      </div>
      <div>
        <PackageMidSection info={packages![selectedPackIdx]} />
      </div>
      <div className="gap-[10px] flex-col sm:flex-row xl:space-y-0 2xl:space-y-[14px] flex 2xl:block xl:space-x-[14px] 2xl:space-x-0">
        <div className="w-full">
          <AddToCart
            itemType="package"
            item={{ ...packages![selectedPackIdx], gig: gig }}
            toastClassName="-mt-10 xs:mt-0"
            className="tracking-wider mt-2.5 w-full flex-1 xs:mt-0 min-h-[53px] sm:min-h-[63px] text-[16px] xl:text-[18px]"
          />
        </div>
        <PackageButton label="Compare Package" />
      </div>
      <div className="flex items-center space-x-[11.06px] xl:space-x-[16px]">
        <ActionButton
          clickAction={() => mutateLike({ user_id: me.id, gig_id })}
          icon={checkLikedByCurrentUser() ? <HeartFillIcon /> : <HeartIcon />}
        />
        <ActionButton icon={<DetailsIcon />} clickAction={() => {}} />
      </div>
    </div>
  );
}
