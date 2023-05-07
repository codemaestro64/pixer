import { PDFIcon } from '@/components/icons/chat/pdf-icon';
import { ImageIcon } from '@/components/icons/chat/image-icon';
import { VideoIcon } from '@/components/icons/chat/video-icon';
import { FigmaIcon } from '@/components/icons/chat/figma-icon';

type ChatFileProps = {
  type: string;
  name: string;
  size: string;
  date: string;
};

const ChatFile: React.FC<ChatFileProps> = ({ type, name, size, date }) => {
  const getFileIcon = () => {
    if (type == 'pdf') {
      return (
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-red-500">
          <PDFIcon className="h-[20px] w-[20px] text-white" />
        </div>
      );
    } else if (type == 'jpg') {
      return (
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-green-500">
          <ImageIcon className="h-[20px] w-[20px] text-white" />
        </div>
      );
    } else if (type == 'mp4') {
      return (
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-blue-500">
          <VideoIcon className="h-[20px] w-[20px] text-white" />
        </div>
      );
    } else if (type == 'fig') {
      return (
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-yellow-500">
          <FigmaIcon className="h-[20px] w-[20px] text-white" />
        </div>
      );
    }
  };

  return (
    <li className="py-3 sm:py-2">
      <div className="flex items-center space-x-2">
        <div className="flex-shrink-0">{getFileIcon()}</div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 min-w-0 items-center truncate text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="flex items-center truncate text-[10px] text-gray-500 dark:text-gray-400">
            {size}
            <svg
              width="2"
              height="2"
              fill="currentColor"
              className="mx-2 text-slate-300"
              aria-hidden="true"
            >
              <circle cx="1" cy="1" r="1" />
            </svg>
            {date}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ChatFile;
