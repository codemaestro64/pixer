import Image from '@/components/ui/image';
import digishopLogo from '@/assets/images/shops/digishop-logo.png';
import digishopLogoDark from '@/assets/images/shops/digishop-logo-dark.png';

export default function DigishopLogo({ dark }: { dark?: boolean }) {
  return (
    <div className='relative w-[116.14px] h-[58.23px]'>
      { !dark ? (
        <Image src={digishopLogo} alt='DigiShop' layout='fill' objectFit='contain' />
      ) : (
        <Image src={digishopLogoDark} alt='DigiShop' layout='fill' objectFit='contain' />
      )}
    </div>
  )
}