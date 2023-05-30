import Image from '@/components/ui/image';
import slogoLogo from '@/assets/images/shops/quinary/slogo-logo.png';

export default function SlogoLogo() {
  return (
    <div className='relative w-[200px] h-[108px]'>
      <Image
        src={slogoLogo}
        alt='Slogo'
        layout='fill'
        objectFit='cover'
      />
    </div>
  )
}