export default function PrimaryButton({ value, primary }: { value: string, primary?: boolean }) {
  return (
    <button className={`min-w-[247.39px] h-[69.27px] text-[19.79px] text-white font-poppins font-normal rounded-[6.18px] ${ 
      primary ? 'bg-[#FFBB38]' : 'border border-white'
    }`}>
      { value }
    </button>
  )
}