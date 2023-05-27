import React from 'react';
import { PhoneFillIcon } from '../icons/phone-fill-icon';
import { MailOpenFillicon } from '../icons/mail-open-fill-icon';
import { MapPinFillIcon } from '../icons/map-pin-fill-icon';

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

export default function ProfileContactInfo({ email, phone, address }: any) {
  return (
    <div className="py-[20px] px-[23px] bg-white dark:bg-[#292929] rounded-[20px]">
      <div className="text-[14.76px] text-dark-300 dark:text-white font-poppins font-semibold">
        Contact Info
      </div>
      <div className="mt-[13.71px] space-y-[13.71px]">
        {/*
        <Contact
          phone={{ code: '+12', number: '222-323-9898' }}
          icon={<PhoneFillIcon />}
        />
        */}
        <Contact text={email} icon={<MailOpenFillicon />} />
        {!(phone === 'none' || phone === '') && (
          <Contact text={`+${phone}`} icon={<PhoneFillIcon />} />
        )}
        {!(address === 'none' || address === '') && (
          <Contact text={address} icon={<MapPinFillIcon />} />
        )}
      </div>
    </div>
  );
}
