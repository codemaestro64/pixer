import { useState , useRef, useEffect, useCallback } from 'react';

import Image from '@/components/ui/image';
import centerImage from '@/assets/images/shops/image-1.png';
import imageTwo from '@/assets/images/shops/image-2.png';
import imageThree from '@/assets/images/shops/image-3.png';
import imageFour from '@/assets/images/shops/image-4.png';
import { ArrowLeftLineIcon } from '@/components/icons/arrow-left-line-icon';
import { StarIcon } from '@/components/icons/star-icon';
import { DownloadAltIcon } from '@/components/icons/download-alt-icon';

interface CarouselItemProps {
  data: {
    name: string;
    rating: string;
    downloads: string;
    image: StaticImageData;
  };
  showItems: number[];
  active: boolean;
  index: number;
  centralItem: number;
}

function CarouselButton({ rotate, active, left, onClick }: { rotate?: boolean, active: boolean, left?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`absolute z-[4] top-1/2 -translate-y-1/2 -translate-x-1/2 transition-opacity duration-500 ${
        left ? 'left-[calc(50%-800px)]' : 'left-[calc(50%+800px)]'
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

function CarouselItem({ data, showItems, index, centralItem, active }: CarouselItemProps) {
  const { name, downloads, image, rating } = data;
  const isCentral = index === centralItem;
  
  function getClasses() {
    const itemIndex = showItems.indexOf(index);
    
    if (isCentral) {
      const style = !active ? 'w-[1013.17px] h-[675.87px]' : 'w-[860.26px] h-[573.87px]';
      return `left-1/2 z-[3] duration-1000 ${ style }`;
    } else if (itemIndex === 1 || itemIndex === showItems.length - 2) {
      let style = '';
      const left = itemIndex === 1;

      if (!active) {
        style = 'w-[626.41px] h-[417.87px] ';
        style += left ? 'left-[calc(50%_-_476px)]' : 'left-[calc(50%_+_476px)]';
      } else {
        style = 'w-[531.87px] h-[354.81px] ';
        style += left ? 'left-[calc(50%_-_390px)]' : 'left-[calc(50%_+_390px)]';
      }

      return `z-[2] duration-1000 ${ style }`;
    } else if (itemIndex === 0 || itemIndex === showItems.length - 1) {
      const animation = !active ? 'opacity-0' : 'opacity-100';
      const side = itemIndex === 0 ? 'left-[calc(50%_-_566px)]' : 'left-[calc(50%_+_566px)]';

      return `w-[398.46px] h-[265.81px] duration-500 z-[1] ${ side } ${ animation }`;
    } else return '';
  }
  
  return (
    <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all ${getClasses()}`}>
      <Image src={image} alt={name} layout='fill' objectFit='cover' />
      <div className={`absolute top-full left-0 right-0 py-[20px] px-[10px] transition-opacity duration-500 ${
        !active ? 'invisible opacity-0' : isCentral ? 'delay-[700ms] visible opacity-100' : 'invisible opacity-0'
      }`}>
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
        <div></div>
      </div>
    </div>
  )
}

export default function PrimaryCarousel() {
  const [active, setActive] = useState(false);
  const [centralItem, setCentralItem] = useState(0);
  const [showItems, setShowItems] = useState<number[]>([]);
  const elRef = useRef<HTMLDivElement>(null);

  const dataArray = [
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      image: centerImage,
    },
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      image: imageTwo,
    },
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      image: imageThree,
    },
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      image: imageTwo,
    },
    {
      name: 'Estrella Motion Picture Poster and Walls',
      rating: '4.8',
      downloads: '2.6k',
      image: imageFour,
    }
  ];

  const updateSideItems = useCallback(() => {
    const array: number[] = [];
    const amount = 2;
    let negative = 0;
    let positive = 0;

    for (let i = 1; i <= amount; i++) {
      if (centralItem - i >= 0) {
        array.unshift(centralItem - i);
      } else {
        array.unshift(dataArray.length - (negative + 1));
        negative++;
      }
    }

    array.push(centralItem);

    for (let i = 1; i <= amount; i++) {
      if (centralItem + i <= dataArray.length - 1) {
        array.push(centralItem + i);
      } else {
        array.push(positive);
        positive++;
      }
    }

    setShowItems(array);
  }, [centralItem, dataArray.length]);

  const updateCentralItem = useCallback((value) => {
    setCentralItem((current) => {
      if (current + value < 0) return dataArray.length - 1;
      else if (current + value >= dataArray.length) return 0;
      return current + value;
    });

    updateSideItems();
  }, [centralItem, updateSideItems, dataArray.length]);

  useEffect(updateSideItems, [updateSideItems]);

  useEffect(() => {
    function onUserScroll() {
      if (elRef.current === null) return;
      const { current: el } = elRef;
      const triggerHeight = window.innerHeight / 2;
      const { top: topOfElement } = el.getBoundingClientRect();
      setActive(topOfElement < triggerHeight ? true : false);
    }
    
    window.addEventListener('scroll', onUserScroll)
    return () => window.removeEventListener('scroll', onUserScroll)
  }, []);
  
  return (
    <div className='relative h-[675.87px]' ref={elRef}>
      { dataArray.map((data, index) => (
        <CarouselItem
          key={index}
          index={index}
          data={data}
          showItems={showItems}
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