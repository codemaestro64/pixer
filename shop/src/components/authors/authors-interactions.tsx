import { ChatFillIcon } from "../icons/chat-fill-icon"

export function AuthorsButton({ label, primary, bold }: { label: string, primary?: boolean, bold?: boolean }) {
  return (
    <button className={`h-[48px] min-w-[120px] px-[35px] font-poppins rounded-[100px] ${
      primary ? 'text-white bg-brand' : 'text-[#1B9B6B] dark:text-[#5BFFC2] border border-[#1B9B6B] dark:border-[#5BFFC2]'
    } ${
      bold ? 'text-[18px] font-semibold' : 'text-[16px] font-normal'
    }`}>
      { label }
    </button>
  )
}

export default function AtuhorsInteractions() {
  return (
    <div className='space-x-[21px] flex items-center'>
      <button className='h-[48px] w-[48px] flex items-center justify-center border border-brand dark:border-[#5BFFC2] rounded-full'>
        <ChatFillIcon className='h-[18px] w-[18px] text-brand' />
      </button>
      <AuthorsButton label='Trade' />
      <AuthorsButton label='Follow' primary />
    </div>
  )
}