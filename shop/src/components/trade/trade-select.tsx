import { useState } from 'react';

export default function TradeSelect() {
  const [selectedItem, setSelectedItem] = useState('latest');
  return (
    <div>
      <select
        value={selectedItem}
        onChange={(event) => setSelectedItem(event.target.value)}
        className='pl-[24px] lg:pl-[27px] 2xl:pl-[30px] pr-[48px] lg:pr-[54px] 2xl:pr-[64px] py-[10px] lg:py-[11px] 2xl:py-[12.5px] text-[18px] lg:text-[20px] 2xl:text-[22px] leading-[1.68] font-bold text-[#343434] dark:text-white rounded-[10px] border border-[#D6D6D6] dark:border-[#8D8D8D] bg-transparent'
      >
        <option value='latest'>Latest</option>
      </select>
    </div>
  )
}