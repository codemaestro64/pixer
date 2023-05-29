import SecondaryButton from '../secondary-button';

export default function TertiaryHero({ title }: { title: string }) {
  return (
    <div className='max-w-[906px]'>
      <h1 className='text-[108px] leading-[0.95] text-[#333333] font-raleway font-bold'>
        { title }
      </h1>
      <div className='mt-[45px] flex flex-wrap gap-[27px]'>
        <SecondaryButton label='Follow Us' primary dark />
        <SecondaryButton label='Save to favorite' dark />
      </div>
    </div>
  )
}