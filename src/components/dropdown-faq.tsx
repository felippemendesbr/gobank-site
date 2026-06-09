import { useState } from 'react';

import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';
import blackArrowDropdownMenu from '../../public/svgs/black-arrow-dropdown-menu.svg';
import Image from 'next/image';
import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import Link from 'next/link';

interface IDropdown {
  title: string;
  children: React.ReactNode;
  textButton?: string;
  hrefButton?: string;
}

export default function DropdownFAQ({ title, children, textButton, hrefButton }: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='jsSearchFAQ w-full'>
      <div className={`flex items-center justify-between gap-5 rounded-tl-15 rounded-tr-30 px-9 py-5 ${isOpen ? 'bg-gray-medium-go-bank' : 'rounded-bl-30 rounded-br-30 bg-gray-light-go-bank'}`}>
        <p className={`text-xl font-light ${isOpen ? 'text-green-go-bank' : 'text-white'}`}>{title}</p>
        <button className={`cursor-pointer rounded-bl-10 rounded-br-5 rounded-tl-10 rounded-tr-10 ${isOpen ? 'bg-green-go-bank' : 'bg-gray-very-light-go-bank'} flex h-[43px] w-full max-w-[43px] items-center justify-center transition-opacity hover:opacity-80`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Image src={blackArrowDropdownMenu} alt='Seta do dropdown' /> : <Image src={whiteArrowDropdownMenu} alt='Seta do dropdown' />}
        </button>
      </div>
      <div className={`${isOpen ? '' : 'hidden'} flex flex-col items-start gap-5 rounded-bl-30 rounded-br-30 bg-gray-medium-go-bank px-9 py-5`}>
        {children}
        {textButton && (
          <Link href={hrefButton || '/'} className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
            <span>{textButton}</span>
            <Image src={buttonBlackArrow} alt='Seta do botão' />
          </Link>
        )}
      </div>
    </div>
  );
}
