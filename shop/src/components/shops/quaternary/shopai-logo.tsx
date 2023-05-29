import Image from '@/components/ui/image';
import shopaiLogo from '@/assets/images/shops/quaternary/shopai-logo.png';

export default function ShopaiLogo() {
  return (
    <div className='relative w-[170px] h-[65px]'>
      <Image src={shopaiLogo} alt='Shopai' layout='fill' objectFit='contain' />
    </div>
  )
}