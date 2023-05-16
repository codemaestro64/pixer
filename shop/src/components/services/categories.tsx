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
    <div className='px-[8.14px] space-x-[15.35px] flex overflow-x-auto scrollbar-hide'>
      { categories.map(({ name, icon, active = false }, index) => (
        <button key={index} className={`px-[14px] py-[11.67px] text-[8.6px] font-poppins font-medium whitespace-nowrap border rounded-[6.14px] flex items-center ${
          active ? 'text-brand dark:text-[#FEFEFE] border-brand' : 'text-[#898989] dark:text-[#656565] border-[#454545]'
        }`}>
          { React.cloneElement(icon, { 
            className: 'w-[14.74px] h-[14.74px]' 
          }) }
          <div className='ml-[6.14px]'>{ name }</div>
        </button>
      )) }
    </div>
  )
}