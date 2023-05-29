import React from 'react';
import { CheckboxCircleIcon } from '../icons/checkbox-circle-icon';
import { TimeIcon } from '../icons/time-icon';
import { RestartIcon } from '../icons/restart-icon';
import { Package } from '@/types';

function FeatureItem({
  feature,
  included = false,
}: {
  feature: string;
  included: boolean;
}) {
  return (
    <div className="p-[7px] xl:p-[10px]">
      <div
        className={`space-x-[7px] xl:space-x-[10px] flex items-center ${
          included ? 'text-dark-300 dark:text-white' : 'text-[#656565]'
        }`}
      >
        <CheckboxCircleIcon className="w-[16.59px] xl:w-[24px] h-[16.59px] xl:h-[24px]" />
        <span className="text-[11.06px] xl:text-[16px] font-medium font-poppins ">
          {feature}
        </span>
      </div>
    </div>
  );
}

function InfoMenuItem({
  text,
  icon,
}: {
  text: string;
  icon: React.ReactElement;
}) {
  return (
    <div className="p-[7px] xl:p-[10px] space-x-[10px] xl:space-x-[16px] text-dark-300 dark:text-white flex items-center justify-center">
      {React.cloneElement(icon, {
        className: 'w-[16.59px] xl:w-[24px] h-[16.59px] xl:h-[24px]',
      })}
      <div className="text-[11.06px] xl:text-[16px] font-poppins font-medium">
        {text}
      </div>
    </div>
  );
}

function InfoMenu({
  delivery,
  revision,
}: {
  delivery: string;
  revision: string;
}) {
  return (
    <div className="grid grid-cols-3 divide-x divide-[#434343]">
      <InfoMenuItem text={`${delivery} Delivery`} icon={<TimeIcon />} />
      <InfoMenuItem text={`${revision} Revision`} icon={<RestartIcon />} />
    </div>
  );
}

function PriceTag({ price, descr }: { price: string; descr: string }) {
  return (
    <div>
      <div className="text-[17.97px] xl:text-[26px] text-dark-300 dark:text-white font-poppins font-medium">
        USD ${price}
      </div>
      <div className="text-[11.06px] xl:text-[16px] text-[#989898] font-medium font-poppins italic">
        {descr}
      </div>
    </div>
  );
}

export default function PackageMidSection({ info }: { info: Package }) {
  return (
    <div className="p-[7px] xl:p-[10px] space-y-[10px] xl:space-y-[14px]">
      <div>
        <PriceTag price={info.price} descr={info.descr} />
      </div>
      <div>
        <div className="text-[11.06px] xl:text-[16px] text-dark-300 dark:text-white font-poppins font-medium">
          {info.name}
        </div>
      </div>
      <div>
        <InfoMenu delivery={info.delivery} revision={info.revision} />
      </div>
      <div className="space-y-[10px] xl:space-y-[14px] 2xl:mx-[-10px]">
        <FeatureItem feature="1 Banner" included={info.additional_banner} />
        <FeatureItem
          feature="Included Sources File"
          included={info.additional_source}
        />
      </div>
    </div>
  );
}
