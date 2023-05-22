export default function AllProduct({ dark }: { dark?: boolean }) {
  return (
    <div className='py-[14px] px-[40px] flex items-center justify-between'>
      <div>
        <div className={`text-[32px] font-semibold font-poppins ${
          dark ? 'text-[#010101]' : 'text-white'
        }`}>
          All Product
        </div>
      </div>
      <div>
        <button className={`text-[28px] font-poppins font-normal ${
          dark ? 'text-[#656565]' : 'text-[#DDDDDD]'
        }`}>
          View All
        </button>
      </div>
    </div>
  )
}