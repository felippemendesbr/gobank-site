import { useState } from 'react';

import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';
import Image from 'next/image';

interface IDropdown {
  title: string;
  children: React.ReactNode;
  imageSrc: string;
}

export default function Dropdown({ title, children, imageSrc }: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='flex items-center justify-between gap-5 rounded-bl-30 rounded-br-30 rounded-tl-15 rounded-tr-30 bg-gray-light-go-bank px-5 py-5 lg:px-16'>
        <h1 className='text-3xl text-white'>{title}</h1>
        <button className='flex h-[43px] w-full max-w-[43px] cursor-pointer items-center justify-center rounded-bl-10 rounded-br-5 rounded-tl-10 rounded-tr-10 bg-gray-very-light-go-bank transition-opacity hover:opacity-80' onClick={() => setIsOpen(!isOpen)}>
          <Image src={imageSrc} alt='Seta do dropdown' className={`${isOpen ? 'rotate-180 transform' : ''}`} />
        </button>
      </div>
      <div className={`${isOpen ? '' : 'hidden'} mt-5 rounded-bl-30 rounded-br-30 rounded-tl-15 rounded-tr-30 bg-black py-5 pl-5 pr-5 lg:pl-16`}>{children}</div>
    </div>
  );
}
