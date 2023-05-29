function HeroButton({ label, primary = false }: {
  label: string;
  primary?: boolean;
}) {
  return (
    <button className={`inline-block py-[10px] px-[20px] min-w-[200px] h-[56px] rounded-[5px] border text-[16px] text-white font-poppins text-center ${
      primary ? 
        'bg-[#010101] border-[#010101]' :
        'bg-transparent border-white'
    }`}>
      { label }
    </button>
  )
}

export default function QuaternaryHero({ title, subtitle }: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className='max-w-[738px]'>
        <h1 className='text-[64px] text-white font-poppins font-bold'>
          { title }
        </h1>
      </div>
      <div className='mt-[39px] max-w-[545px]'>
        <p className='text-[18px] text-white font-poppins font-semibold uppercase tracking-widest'>
          { subtitle }
        </p>
      </div>
      <div className='mt-[45px] flex flex-wrap gap-[45px]'>
        <HeroButton label='Explore our product' primary />
        <HeroButton label='Save to favorite' />
      </div>
    </div>
  )
}