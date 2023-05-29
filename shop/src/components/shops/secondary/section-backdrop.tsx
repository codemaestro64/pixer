export default function SectionBackdrop({ children, variant = 'dark' }: {
  children?: React.ReactNode
  variant?: 'light' | 'dark'
}) {
  return (
    <section className={`relative overflow-hidden ${
      variant === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#0E0725]'
    }`}>
      {/* backdrop */}
      <div className='absolute inset-0 z-[2] bg-[#3CFF3812] backdrop-blur-[240px]'></div>
      <div className='max-w-[1728px] mx-auto relative'>
        {/* right top */}
        <div className='absolute w-[864px] h-[864px] top-[-258px] right-[-102px] bg-[#3CFF383D] rounded-full blur-[240px] z-[1]'></div>
        {/* left bottom */}
        <div className='absolute w-[1151px] h-[1151px] top-[275px] left-[-721px] bg-[#3CFF3821] rounded-full blur-[240px] z-[1]'></div>
        <div className='z-[10]'>
          { children }
        </div>
      </div>
    </section>
  )
}