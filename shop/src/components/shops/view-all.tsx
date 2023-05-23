import { ArrowLeftLineIcon } from "../icons/arrow-left-line-icon"

export default function ViewAll({ dark }: { dark?: boolean }) {
  return (
    <button className='p-[10px] flex items-center'>
      <span className={`text-[18px] leading-[1.17] font-poppins font-semibold uppercase ${ dark ? 'text-[#1B1B1B]' : 'text-white' }`}>
        View All
      </span>
      <ArrowLeftLineIcon className={`w-[24px] h-[24px] ml-[10px] rotate-180 ${
        dark ? 'text-[#1B1B1B]' : 'text-[#3CFF38]'
      }`} />
    </button>
  )
}