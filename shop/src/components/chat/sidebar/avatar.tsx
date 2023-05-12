import { AvatarAddIcon } from '@/components/icons/avatar-add-icon';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import Avatar from 'react-avatar';

type ChatAvatarProps = {
  addNew: boolean;
  info?: any;
  onClickedAvatar?: any;
};

const ChatAvatar: React.FC<ChatAvatarProps> = ({
  addNew,
  info,
  onClickedAvatar,
}) => {
  return addNew ? (
    <div className="flex aspect-square h-[58px] items-center justify-center rounded-full bg-white  dark:bg-dark-100">
      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-dashed border-dark-800 bg-dark-100 hover:bg-dark-300">
        <AvatarAddIcon className="h-[18px] w-[18px] text-light-100" />
      </div>
    </div>
  ) : (
    <div
      className={`${
        info?.online ? 'border-2 border-online' : 'border-0'
      } inline-flex aspect-square h-[58px] transform items-center justify-center rounded-full  bg-white transition-transform first-line:relative active:scale-75 dark:bg-dark-100`}
    >
      <Button
        variant="icon"
        className="h-[48px] w-[48px] hover:opacity-40"
        onClick={() => onClickedAvatar(info)}
      >
        <Avatar
          size="48"
          round={true}
          name={info.name}
          textSizeRatio={2}
          src={info?.avatar}
        />
      </Button>
    </div>
  );
};

export default ChatAvatar;
