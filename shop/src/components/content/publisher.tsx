import Image from '@/components/ui/image';
import { VerifiedIcon } from '../icons/verified-icon';
import Avatar from 'react-avatar';
import { getProfileAvatar } from '@/lib/constants';

export default function Publisher({
  logo,
  name,
  followers,
  small,
}: {
  logo: any;
  name: string;
  followers: number;
  small?: boolean;
}) {
  return (
    <div className="flex items-center">
      <div className={small ? 'mr-[6.7px]' : 'mr-[8.45px] md:mr-[11px]'}>
        <div
          className={`relative overflow-hidden rounded-full ${
            small
              ? 'h-[25.57px] w-[25.57px]'
              : 'h-[32.26px] w-[32.26px] md:h-[42px] md:w-[42px]'
          }`}
        >
          <Avatar
            size="100%"
            round={true}
            name={name}
            textSizeRatio={2}
            src={getProfileAvatar(logo)}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <div
            className={`font-poppins font-semibold ${
              small
                ? 'text-[14px] text-[#434343] dark:text-[#fdfdfd]'
                : 'text-[12.29px] text-[#2a2a2a] dark:text-[#d5d5d5] md:text-[16px] 3xl:text-[24px]'
            }`}
          >
            {name}
          </div>
          <VerifiedIcon
            className={
              small
                ? 'ml-[1.83px] -mb-[2px] h-[16.74px] w-[16.74px]'
                : 'ml-[2.3px] h-[20.26px] w-[20.26px] md:h-[26.37px] md:w-[26.37px] 2xl:h-[27.05px] 3xl:w-[27.05px]'
            }
          />
        </div>
        <div className={small ? 'mt-[1.83px]' : 'mt-[3px]'}>
          <div
            className={`font-poppins font-medium text-[#666] ${
              small ? 'text-[8.52px]' : 'text-[10.75px] md:text-[14px]'
            }`}
          >
            {followers} Followers
          </div>
        </div>
      </div>
    </div>
  );
}
