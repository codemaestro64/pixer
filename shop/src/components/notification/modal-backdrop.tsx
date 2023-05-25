export default function ModalBackdrop({ children }: { children: React.ReactElement | string }) {
  return (
    <div className='fixed top-16 sm:top-[70px] left-0 right-0 bottom-0 bg-[#E9E9E980] dark:bg-[#13131380] backdrop-blur-[10px]'>
      { children ? children : null }
    </div>
  )
}