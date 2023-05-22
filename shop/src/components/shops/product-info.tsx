import Image from '@/components/ui/image';

interface ProductInfoProps {
  logo: StaticImageData;
  name: string;
  author: string;
  small?: boolean;
  dark?: boolean;
}

export default function ProductInfo({ logo, name, author, small, dark }: ProductInfoProps) {
  return (
    <div className='flex items-center'>
      <div className={`${ small ? 'mr-[10px]' : 'mr-[14px]' }`}>
        <div className={`relative rounded-full overflow-hidden ${
          small ? 'w-[42.53px] h-[42.53px]' : 'w-[64px] h-[64px]'
        }`}>
          <Image src={logo} alt={name} layout='fill' objectFit='cover' />
        </div>
      </div>
      <div>
        <div className={`font-poppins font-semibold truncate-text-line-two ${
          small ? 'text-[18.9px]' : 'text-[28px]'
        } ${
          dark ? 'text-dark-300' : 'text-white'
        }`}>
          { name }
        </div>
        <div className={`${
          small ? 'text-[16.54px]' : 'text-[24.67px]'
        } ${
          dark ? 'text-[#1B1B1B80]' : 'text-[#FEFEFE80]'
        }`}>
          { author }
        </div>
      </div>
    </div>
  )
}