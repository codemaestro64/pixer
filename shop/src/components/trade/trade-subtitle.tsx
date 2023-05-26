export default function TradeSubtitle({ subtitle }: { subtitle: string }) {
  return (
    <div className='lg:px-[5px] 2xl:px-[10px] py-[12.5px]'>
      <h2 className='text-[18px] lg:text-[20px] 2xl:text-[22px] text-dark-300 dark:text-white leading-[1.68] font-poppins font-bold'>
        {subtitle}
      </h2>
    </div>
  )
}