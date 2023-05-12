type ChatDetailSectionProps = {
  title: string;
  amount: number;
  onClickedSeeAll: any;
};

const ChatDetailSection: React.FC<ChatDetailSectionProps> = ({
  title,
  amount,
  onClickedSeeAll,
}) => {
  return (
    <div
      className={`${
        title == 'Media' ? 'top-0' : 'top-0 mt-10'
      } sticky z-20 flex flex-row items-center justify-between bg-white dark:bg-dark-100`}
    >
      <div className="flex shrink flex-row items-center">
        <div className="text-xl text-black dark:text-white">{title}</div>
        <div className="ml-2 mt-1 text-[10px] text-gray-500 dark:text-gray-400">
          {amount}
        </div>
      </div>
      <button
        className="flex items-center justify-center hover:opacity-40"
        onClick={() => onClickedSeeAll(title)}
      >
        <p className="text-[10px] text-gray-500 dark:text-gray-400">See All</p>
      </button>
    </div>
  );
};

export default ChatDetailSection;
