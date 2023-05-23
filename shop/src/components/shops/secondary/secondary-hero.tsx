import SecondaryButton from '../secondary-button';

export default function SecondaryHero({ title }: { title: string }) {
  return (
    <div className='max-w-[654px]'>
      <h1 className='text-[64px] leading-[1.25] text-[#FEFEFE] font-quicksand font-semibold'>{ title }</h1>
      <div className='mt-[36px] flex flex-wrap gap-[27px]'>
        <SecondaryButton label='Explore our product' primary />
        <SecondaryButton label='Save to favorite' />
      </div>
    </div>
  )
}