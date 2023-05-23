interface SecondaryButtonProps {
  label: string;
  primary?: boolean;
  wide?: boolean;
  semibold?: boolean;
  dark?: boolean;
}

export default function SecondaryButton({ label, primary, wide, semibold, dark }: SecondaryButtonProps) {
  let style = '';
  if (dark) {
    style += primary ? ' bg-[#060606] text-white' : ' bg-transparent text-[#060606]'
    style += ' border-[#060606]'
  } else {
    style += primary ? ' bg-[#3CFF38] text-[#141414]' : ' bg-transparent text-[#3CFF38]';
    style += ' border-[#3CFF38]'
  }
  style += wide ? ' w-full' : ' min-w-[247.39px]';
  style += semibold ? ' font-semibold' : ' font-normal';
  
  return (
    <button className={`h-[69px] py-[12px] px-[25px] text-[19.79px] font-poppins border rounded-[6px] flex items-center justify-center ${ style }`}>
      { label }
    </button>
  )
}