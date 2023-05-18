import Image from '@/components/ui/image';

export default function AuthorsLogo({ logo }: { logo: string }) {
  return (
    <div className='relative z-[3] h-[197px] w-[197px] mt-[-96px]'>
      <div className='absolute inset-0 bg-brand rounded-[21.39px]'></div>
      <div className='absolute bottom-[13px] right-[12px] h-[190px] w-[190px] rounded-[20.36px] overflow-hidden'>
        <Image src={logo} alt='Author logo' layout='fill' objectFit='cover' />
      </div>
    </div>
  )
}