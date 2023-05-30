export default function LabelViewAll({ label }: { label: string }) {
  return (
    <div className='py-[14px] px-[40px] flex items-center justify-between'>
      <div className='text-[32px] text-dark-300 dark:text-white font-poppins font-semibold'>
        { label }
      </div>
      <button className='text-[28px] text-[#656565] dark:text-[#909090] font-poppins font-normal bg-transparent'>
        View All
      </button>
    </div>
  )
}