export default function TradeTitle({ title }: { title: string }) {
  return (
    <h1 className='text-[38px] lg:text-[40px] 2xl:text-[48px] text-dark-300 dark:text-white font-poppins font-bold leading-[1.68]'>
      {title}
    </h1>
  )
}