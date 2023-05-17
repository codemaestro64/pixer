import React from 'react';
import { PencilRulerIcon } from "../icons/pencil-ruler-icon"
import { MegaphoneIcon } from '../icons/megaphone-icon';
import { QuillPenIcon } from '../icons/quill-pen-icon';
import { MovieIcon } from '../icons/movie-icon';
import { DiskIcon } from '../icons/disk-icon';
import { MacbookIcon } from '../icons/macbook-icon';

export default function Caregories() {
  const categories = [
    { name: 'Graphic & Design', icon: <PencilRulerIcon />, active: true },
    { name: 'Digital Marketing', icon: <MegaphoneIcon /> },
    { name: 'Writing & Translate', icon: <QuillPenIcon /> },
    { name: 'Video & Animation', icon: <MovieIcon /> },
    { name: 'Music & Audio', icon: <DiskIcon /> },
    { name: 'Programming & Tech', icon: <MacbookIcon /> }
  ]

  return (
    <div className='px-[8.14px] xl:px-[12px] space-x-[15.35px] xl:space-x-[25px] flex overflow-x-auto scrollbar-hide'>
      { categories.map(({ name, icon, active = false }, index) => (
        <button key={index} className={`px-[14px] xl:px-[21.5px] py-[11.67px] xl:py-[20.5px] text-[8.6px] xl:text-[14px] font-poppins font-medium whitespace-nowrap border rounded-[6.14px] flex items-center ${
          active ? 'text-brand dark:text-[#FEFEFE] border-brand' : 'text-[#898989] dark:text-[#656565] border-[#454545] xl:border-[#D4D4D4] xl:dark:border-[#454545]'
        }`}>
          { React.cloneElement(icon, { 
            className: 'w-[14.74px] h-[14.74px] xl:w-[24px] xl:h-[24px]' 
          }) }
          <div className='ml-[6.14px] xl:ml-[10px]'>{ name }</div>
        </button>
      )) }
    </div>
  )
}