import { AvatarAddIcon } from '@/components/icons/avatar-add-icon';
import Image from '@/components/ui/image';

type ChatAvatarProps = {
  addNew: boolean;
  avatar?: any;
};

const ChatAvatar: React.FC<ChatAvatarProps> = ({ addNew, avatar }) => {
  return addNew ? (
    <div className="flex aspect-square h-[58px] items-center justify-center rounded-full bg-white dark:bg-dark-100">
      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-dashed border-dark-800 bg-dark-100">
        <AvatarAddIcon className="h-[18px] w-[18px] text-light-100" />
      </div>
    </div>
  ) : (
    <div className="flex aspect-square h-[58px] items-center justify-center rounded-full border-2 border-online bg-white dark:bg-dark-100">
      <div className="h-[48px] w-[48px] ">
        <Image
          alt="avatar"
          quality={100}
          objectFit="cover"
          src={avatar}
          className="rounded-full bg-light-500 dark:bg-dark-300"
        />
      </div>
    </div>
  );
};

export default ChatAvatar;
