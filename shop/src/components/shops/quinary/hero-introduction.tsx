function Button({ label, primary }: { label: string, primary?: boolean }) {
  const style = primary ?
    'border-brand bg-brand text-[#FDF3EA]' :
    'border-black dark:border-white bg-transparent text-black dark:text-white'
  
  return (
    <button className={`min-w-[200px] h-[56px] rounded-[5px] px-[20px] py-[10px] text-[16px] font-poppins font-normal text-center border ${ style }`}>
      { label }
    </button>
  )
}

export default function HeroIntroduction() {
  return (
    <div>
      <div>
        <div className='text-[18px] text-dark-300 dark:text-[#FEFEFE] font-semibold font-poppins uppercase tracking-[0.37em]'>
          Welcome to Shopie
        </div>
      </div>
      <div className='mt-[19.58px] max-w-[668px]'>
        <h1 className='text-[64px] text-dark-300 dark:text-[#FEFEFE] font-poppins font-normal'>
          Get a <span className='font-bold'>ready-to-use</span> template for your business
        </h1>
      </div>
      <div className='mt-[35px] flex gap-[45px]'>
        <Button label='Explore our product' primary />
        <Button label='Save to favorite' />
      </div>
    </div>
  )
}