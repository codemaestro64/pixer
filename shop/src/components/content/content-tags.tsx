export default function ContentTags() {
  const tags = ['HTML', 'Figma', 'React Js', 'Css', 'Tailwind', 'Next Js'];
  return (
    <div className='flex gap-[14px] overflow-scroll scrollbar-hide'>
      { tags.map((tag, index) => (
        <button key={index} className='h-[48px] 3xl:h-[63.35px] px-[32.2px] text-[16px] 3xl:text-[19.32px] text-[#989898] font-poppins font-semibold border border-[#fbfbfb] dark:border-[#282828] rounded-[107px] bg-[#fbfbfb] dark:bg-[#111] whitespace-nowrap'>
          { tag }
        </button>
      )) }
    </div>
  )
}