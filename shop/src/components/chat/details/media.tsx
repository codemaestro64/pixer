import Image from '@/components/ui/image';

type ChatMediaProps = {
  media: any;
};

const ChatMedia: React.FC<ChatMediaProps> = ({ media }) => {
  return (
    <Image
      alt="avatar"
      quality={100}
      objectFit="cover"
      src={media}
      className="rounded-[16px] bg-light-500 dark:bg-dark-300"
    />
  );
};

export default ChatMedia;
