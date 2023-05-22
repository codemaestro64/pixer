import { useState , useRef, useEffect } from 'react';

import Image from '@/components/ui/image';
import centerImage from '@/assets/images/shops/image-1.png';
import imageTwo from '@/assets/images/shops/image-2.png';
import imageThree from '@/assets/images/shops/image-3.png';
import imageFour from '@/assets/images/shops/image-4.png';
import { ArrowLeftLineIcon } from '@/components/icons/arrow-left-line-icon';
import { StarIcon } from '@/components/icons/star-icon';
import { DownloadAltIcon } from '@/components/icons/download-alt-icon';
import { ShoppingBagFillIcon } from '@/components/icons/shopping-bag-fill-icon';

interface CarouselItemProps {
  data: {
    name: string;
    rating: string;
    downloads: string;
    image: StaticImageData;
    price: string;
  };
  index: number;
  active: boolean;
  centralItem: number;
  carouselIndexPositions: number[];
  updateCentralItemOnClick: (value: number) => void;
}

function CarouselButton({ rotate, active, left, onClick }: { rotate?: boolean, active: boolean, left?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`absolute z-[4] top-1/2 -translate-y-1/2 -translate-x-1/2 transition-opacity duration-500 ${
        left ? 'left-[calc(50%_-_800px)]' : 'left-[calc(50%_+_800px)]'
      } ${
        !active ? 'opacity-0' : 'opacity-100 delay-300'
      }`}
    >
      <ArrowLeftLineIcon className={`w-[42px] h-[42px] text-white ${
        rotate ? 'rotate-180' : ''
      }`} />
    </button>
  )
}

function CarouselItem({
  index,
  data,
  centralItem,
  active,
  carouselIndexPositions,
  updateCentralItemOnClick,
}: CarouselItemProps) {
  const { name, downloads, image, rating, price } = data;
  const isCentral = index === centralItem;
  
  function getClasses() {
    const itemIndex = carouselIndexPositions.indexOf(index);
    
    // [] [] [x] [] []
    if (isCentral) {
      const style = !active ? 'w-[1013.17px] h-[675.87px]' : 'w-[860.26px] h-[573.87px]';
      return `left-1/2 z-[5] duration-1000 ${ style }`;
    } else if (itemIndex === 1 || itemIndex === 3) {
      // [] [x] [] [x] []
      let style = '';
      const left = itemIndex === 1;

      if (!active) {
        style = 'w-[626.41px] h-[417.87px] ';
        style += left ? 'left-[calc(50%_-_476px)]' : 'left-[calc(50%_+_476px)]';
      } else {
        style = 'w-[531.87px] h-[354.81px] ';
        style += left ? 'left-[calc(50%_-_390px)]' : 'left-[calc(50%_+_390px)]';
      }

      return `z-[3] duration-1000 ${ style }`;
    } else if (itemIndex === 0 || itemIndex === 4) {
      // [x] [] [] [] [x]
      const animation = !active ? 'opacity-0' : 'opacity-100';
      const side = itemIndex === 0 ? 'left-[calc(50%_-_566px)]' : 'left-[calc(50%_+_566px)]';

      return `w-[398.46px] h-[265.81px] duration-500 z-[1] ${ side } ${ animation }`;
    } else return '';
  }

  const subItemsClasses = 'transition-opacity duration-500 ' + (!active ? 'invisible opacity-0' : isCentral ? 'delay-[700ms] visible opacity-100' : 'invisible opacity-0');
  
  return (
    <div
      onClick={() => !isCentral ? updateCentralItemOnClick(index) : '' }
      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all ${ getClasses() }`}
    >
      <Image src={image} alt={name} layout='fill' objectFit='cover' />
      {/* side */}
      <div className='absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 bg-[#7B5BD7] blur-[15px] z-[-1] h-4/5 w-[18px]'></div>
      <div className='absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 bg-[#7B5BD7] blur-[15px] z-[-1] h-4/5 w-[18px]'></div>
      {/* price */}
      <div className='absolute bottom-[24.38px] right-[56.26px]'>
        <button className={`text-[19.19px] text-white font-poppins font-bold bg-[#7B5BD7] rounded-full py-[15px] px-[22px] min-w-[160px] ${ subItemsClasses }`}>
          $ { price }
        </button>
      </div>
      {/* bottom content */}
      <div className={`absolute top-full left-0 right-0 py-[20px] px-[10px] ${ subItemsClasses } flex items-center`}>
        <div className='space-y-[16px]'>
          <div className='text-[28px] font-bold text-white font-poppins'>
            { name }
          </div>
          <div className='flex items-center space-x-[24px]'>
            <div className='flex items-center'>
              <StarIcon className='h-[20px] w-[20px] mr-[17.25px] text-[#FFC42C]' />
              <span className='text-[19.71px] text-[#FEFEFE] font-poppins font-semibold'>
                { rating }
              </span>
            </div>
            <div className='flex items-center'>
              <DownloadAltIcon className='h-[20px] w-[20px] mr-[17.25px] text-white' />
              <span className='text-[19.71px] text-[#FEFEFE] font-poppins font-semibold'>
                { downloads } downloads
              </span>
            </div>
          </div>
        </div>
        <div className='ml-auto pr-[8px]'>
          <button className='flex items-center justify-center w-[156px] h-[85px] bg-[#FFBB38] rounded-[125.68px]'>
            <ShoppingBagFillIcon className='w-[42.29px] h-[42.29px] text-white' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PrimaryCarousel() {
  const [active, setActive] = useState(false);
  const [centralItem, setCentralItem] = useState(0);
  const elRef = useRef<HTMLDivElement>(null);
  const carouselIndexPositions: number[] = [];
  const sidewaysPositions = 2;
  let backward = 0;
  let forward = 0;
  const data = [
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      price: '45.00',
      image: centerImage,
    },
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      price: '45.00',
      image: imageTwo,
    },
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      price: '45.00',
      image: imageThree,
    },
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      price: '45.00',
      image: imageTwo,
    },
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      price: '45.00',
      image: imageFour,
    }
  ];

  for (let i = 1; i <= sidewaysPositions; i++) {
    if (centralItem - i >= 0) {
      carouselIndexPositions.unshift(centralItem - i);
    } else {
      carouselIndexPositions.unshift(data.length - (backward + 1));
      backward++;
    }
  }

  carouselIndexPositions.push(centralItem);

  for (let i = 1; i <= sidewaysPositions; i++) {
    if (centralItem + i <= data.length - 1) {
      carouselIndexPositions.push(centralItem + i);
    } else {
      carouselIndexPositions.push(forward);
      forward++;
    }
  }

  function updateCentralItem(value: number) {
    setCentralItem((current) => {
      if (current + value < 0) return data.length - 1;
      else if (current + value >= data.length) return 0;
      return current + value;
    });
  }

  function updateCentralItemOnClick(value: number) {
    setCentralItem(value);
  }

  useEffect(() => {
    function onUserScroll() {
      if (elRef.current === null) return;
      const { current: el } = elRef;
      const triggerHeight = window.innerHeight / 2;
      const { top: topOfElement } = el.getBoundingClientRect();
      setActive(topOfElement < triggerHeight);
    }
    
    window.addEventListener('scroll', onUserScroll)
    return () => window.removeEventListener('scroll', onUserScroll)
  }, []);
  
  return (
    <div className='relative h-[675.87px]' ref={elRef}>
      { data.map((item, index) => (
        <CarouselItem
          key={index}
          index={index}
          data={item}
          carouselIndexPositions={carouselIndexPositions}
          updateCentralItemOnClick={updateCentralItemOnClick}
          centralItem={centralItem}
          active={active}
        />
      )) }
      <CarouselButton
        onClick={() => updateCentralItem(-1)}
        active={active} 
        left
        />
      <CarouselButton
        onClick={() => updateCentralItem(1)}
        active={active} 
        rotate
      />
    </div>
  )
}