import { useEffect } from 'react';

export default function TradeBackdrop({ children, isModalActive, containerRef }: {
  children: React.ReactElement
  isModalActive: boolean;
  containerRef: any;
}) {
  
  useEffect(() => {
    if (isModalActive) {
      document.documentElement.style.overflow = 'hidden';
      window.innerWidth > 640 ? document.documentElement.style.paddingRight = '6px' : null;
    } else {
      document.documentElement.style.overflow = 'visible';
      document.documentElement.style.paddingRight = '0px';
    }
  }, [isModalActive]);

  return (
    <>
      { isModalActive ? (
        <div
          className='fixed z-40 top-16 sm:top-[70px] right-0 bottom-0 bg-[#ECECEC80] dark:bg-[#02020280] backdrop-blur-[5px] flex lg:items-center justify-center overflow-auto'
          style={{
            width: containerRef?.current.getBoundingClientRect().width + 'px'
          }}
        >
          { children }
        </div>
      ) : null}
    </>
  )
}