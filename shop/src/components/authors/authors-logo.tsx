import Image from '@/components/ui/image';

export default function AuthorsLogo({ logo }: { logo: string }) {
  return (
    <div className='relative z-[3] h-[112.42px] xl:h-[197px] w-[112.42px] xl:w-[197px] mt-[-81.42px] xl:mt-[-96px]'>
      <div className='absolute inset-0 bg-brand rounded-[12.21px] xl:rounded-[21.39px]'></div>
      <div className='h-[113.95px] xl:h-[190px] w-[113.95px] xl:w-[190px] bottom-[3.05px] xl:bottom-[13px] right-[3.05px] xl:right-[12px] absolute rounded-[12.21px] xl:rounded-[20.36px] overflow-hidden'>
        <Image src={logo} alt='Author logo' layout='fill' objectFit='cover' />
      </div>
    </div>
  )
}