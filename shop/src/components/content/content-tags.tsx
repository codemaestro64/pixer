export default function ContentTags({ tags }: { tags: string[] }) {
  return (
    <div className="scrollbar-hide flex gap-[14px] overflow-auto">
      {tags.map((tag, index) => (
        <button
          key={index}
          className="h-[48px] whitespace-nowrap rounded-[107px] border border-[#fbfbfb] bg-[#fbfbfb] px-[32.2px] font-poppins text-[16px] font-semibold text-[#989898] dark:border-[#282828] dark:bg-[#111] 3xl:h-[63.35px] 3xl:text-[19.32px]"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
