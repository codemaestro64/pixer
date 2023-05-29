import Image from '@/components/ui/image';
import servicesPicture from '@/assets/images/services/services-picture.png';
import RatingStars from './rating-stars';
import Avatar from 'react-avatar';
import { getProfileAvatar } from '@/lib/constants';

function Profile({ name, info }: { name: string; info: any }) {
  return (
    <div className="flex items-center">
      <div className="relative mr-[9.44px] xl:mr-[10px]">
        <div className="h-[39px] w-[39px] xl:h-[62px] xl:w-[62px] relative rounded-full overflow-hidden">
          <Avatar
            size="100%"
            round={true}
            name={name}
            textSizeRatio={2}
            src={getProfileAvatar(info)}
          />
        </div>
        {/* status */}
        <div className="absolute right-[5.03px] xl:right-[8px] bottom-0 h-[8.55px] w-[8.55px] xl:h-[12px] xl:w-[12px] rounded-full bg-[#34C75D] xl:border xl:border-[#767676] xl:dark:border-dark-100"></div>
      </div>
      <div>
        <div className="text-[13.84px] xl:text-[20px] text-dark-300 dark:text-white font-poppins font-medium">
          {name}
        </div>
        <div className="text-[7.55px] xl:text-[12px] italic font-medium font-poppins">
          {`@${name.toLowerCase().replace(' ', '_')}`}
        </div>
      </div>
    </div>
  );
}

function TopRated() {
  return (
    <div className="text-[8.81px] xl:text-[14px] px-[9.08px] xl:px-[15px] py-[10.17px] xl:py-[16px] font-poppins font-medium text-[#FF8A00] bg-[#F7F7F7] dark:bg-[#181818]">
      Top Rated
    </div>
  );
}

function Order() {
  return (
    <div className="px-[5.85px] xl:px-[11px] py-[5.52px] xl:py-[10px]">
      <div className="text-[7.73px] xl:text-[14px] text-[#767676] font-poppins italic font-medium">
        01 Order in Queue
      </div>
    </div>
  );
}

function Separator({ hideOnXl = false }) {
  return (
    <div
      className={`w-[1px] self-stretch bg-[#EBEBEB] dark:bg-[#343434] ${
        hideOnXl ? 'xl:hidden' : ''
      }`}
    ></div>
  );
}

export default function ProfileInfo({
  name,
  info,
}: {
  name: string;
  info: any;
}) {
  return (
    <div className="px-[6.29px] xl:px-[10px] flex items-center justify-between">
      <div className="flex items-center space-x-[9.44px] xl:space-x-[15px]">
        <Profile name={name} info={info} />
        <TopRated />
      </div>
      <Separator hideOnXl />
      <div className="space-x-[2.72px] xl:space-x-[5px] flex items-center">
        <RatingStars rating={4.8} stars={4} />
        <Separator />
        <Order />
      </div>
    </div>
  );
}
