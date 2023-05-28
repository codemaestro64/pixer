import React from 'react';
import { PhoneFillIcon } from '../icons/phone-fill-icon';
import { MailOpenFillicon } from '../icons/mail-open-fill-icon';
import { MapPinFillIcon } from '../icons/map-pin-fill-icon';
import { BookmarkIcon } from '../icons/bookmark-icon';
import { getIcon } from '@/lib/get-icon';
import * as socialIcons from '@/components/icons/social';

function Contact({
  text,
  icon,
  phone,
}: {
  text?: string;
  icon?: React.ReactElement;
  phone?: any;
}) {
  return (
    <div className="px-[10.55px] py-[9.49px] flex items-center">
      <div className="mr-[14.76px]">
        {icon
          ? React.cloneElement(icon, {
              className: 'h-[25.31px] w-[25.31px] text-[#6FF0C0]',
            })
          : null}
      </div>
      <div className="text-[14.76px] font-poppins font-normal text-[#545454] dark:text-white flex items-center">
        {!phone ? (
          <div>{text}</div>
        ) : (
          <>
            <div className="mr-[12.65px]">{phone.code}</div>
            <div>{phone.number}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProfileContactInfo({
  email,
  phone,
  address,
  socials,
}: {
  email: string;
  phone: string;
  address: string;
  socials: {
    icon: string;
    url: string;
  }[];
}) {
  console.log('@@@@@@@@@@@@ - ', socials);
  const makeSocialInfo = () => {
    return socials.map(({ icon, url }, idx) => {
      if (url) {
        const socialIcon = getIcon({
          iconList: socialIcons,
          iconName: icon,
          className: 'w-3.5 h-3.5 text-dark-800 dark:text-light-900 shrink-0',
        });

        const socialURL = url.slice(12, -1).split('/').slice(0, 1);
        return (
          <Contact
            text={socialURL[0]}
            icon={socialIcon as React.ReactElement}
          />
        );
      }
    });
  };

  return (
    <div className="py-[20px] px-[23px] bg-white dark:bg-[#292929] rounded-[20px]">
      <div className="text-[14.76px] text-dark-300 dark:text-white font-poppins font-semibold">
        Contact Info
      </div>
      <div className="mt-[13.71px] space-y-[13.71px]">
        <Contact text={email} icon={<MailOpenFillicon />} />
        {!(phone === 'none' || phone === '') && (
          <Contact text={`+${phone}`} icon={<PhoneFillIcon />} />
        )}
        {!(address === 'none' || address === '') && (
          <Contact text={address} icon={<MapPinFillIcon />} />
        )}

        {socials.length > 0 && makeSocialInfo()}
      </div>
    </div>
  );
}
