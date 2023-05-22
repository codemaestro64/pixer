import { ShoppingBagFillIcon } from '../icons/shopping-bag-fill-icon';

export default function ShoppingButton({ alt, yellowLime }: { alt?: boolean, yellowLime?: boolean }) {
  let style = '';
  if (alt) {
    style = 'min-w-[82.69px] h-[56.7px] bg-brand rounded-[84.25px] text-white';
  } else {
    style = `min-w-[123.36px] h-[84.59px] rounded-[125.68px] border border-brand ${
      yellowLime ? 'bg-[#BFFF07] text-[#010101]' : 'bg-[#FFB729] text-white'
    }`;
  }
  
  return (
    <button className={`flex items-center justify-center ${ style }`}>
      <ShoppingBagFillIcon className={`${
        alt ? 'w-[28.35px] h-[28.35px]' : 'w-[42.29px] h-[42.29px]'
      }`} />
    </button>
  )
}