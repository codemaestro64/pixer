import Image from '@/components/ui/image';
import userProfileDefault from '@/assets/images/user-profile-default.svg';
import Avatar from 'react-avatar';
import { getProfileAvatar } from '@/lib/constants';

export default function FeedInput({
  feedDescr,
  setFeedDescr,
  me,
}: {
  feedDescr: string;
  setFeedDescr: any;
  me?: any;
}) {
  return (
    <div className="rounded-[18px] bg-[#fdfdfd] px-[23px] py-[17.5px] dark:bg-[#262626] md:flex md:items-center md:gap-[15px] md:px-[50px] 2xl:px-[60px] 2xl:py-[38px]">
      <div className="hidden md:block">
        <div className="relative h-[42px] w-[42px] overflow-hidden rounded-full border border-brand">
          <Avatar
            size="100%"
            round={true}
            name={me.name}
            textSizeRatio={2}
            src={getProfileAvatar(me.profile)}
          />
        </div>
      </div>
      <div className="w-full">
        <input
          type="text"
          value={feedDescr}
          onChange={(e) => setFeedDescr(e.target.value)}
          placeholder="Write something... ?"
          className="h-[49px] w-full rounded-[100px] border border-brand bg-[#f8f8f8] px-[24px] py-[14px] text-[16px] font-medium italic placeholder-dark-850 dark:bg-[#2B2A2A] dark:text-white dark:placeholder-[#545454]"
        />
      </div>
    </div>
  );
}
