import { useState } from 'react';

import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';
import blackArrowDropdownMenu from '../../public/svgs/black-arrow-dropdown-menu.svg';
import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import buttonGreenArrow from '../../public/svgs/button-green-arrow.svg';

import Image from 'next/image';
import Link from 'next/link';

interface IDropdown {
  title: string;
  children: React.ReactNode;
  textButton?: string;
  hrefButton?: string;
}

export default function DropdownSeguroFinanciamento({ title, children, textButton, hrefButton }: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full'>
      <div className={`flex items-center justify-between gap-5 rounded-tl-15 rounded-tr-30 px-5 py-5 lg:px-9 ${isOpen ? 'bg-gray-light-go-bank' : 'rounded-bl-30 rounded-br-30 bg-grayish-white-go-bank'}`}>
        <p className={`text-xl xl:text-3xl ${isOpen ? 'text-white' : 'gray-light-go-bank'}`}>{title}</p>
        <button className={`cursor-pointer rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 ${isOpen ? 'bg-white' : 'bg-gray-very-light-go-bank'} flex h-[43px] w-full min-w-[43px] max-w-[43px] items-center justify-center transition-opacity hover:opacity-80`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Image src={blackArrowDropdownMenu} alt='Seta do dropdown' /> : <Image src={whiteArrowDropdownMenu} alt='Seta do dropdown' />}
        </button>
      </div>
      <div className={`${isOpen ? '' : 'hidden'} flex flex-col items-start gap-5 rounded-bl-30 rounded-br-30 bg-gray-light-go-bank px-5 py-5 text-white lg:px-9`}>
        {children}
        {textButton && (
          <Link href={hrefButton || '/'} className='group flex items-center justify-center gap-2.5 text-lg text-white transition-all hover:ml-5 hover:opacity-80'>
            <span className='text-2xl text-green-go-bank'>{textButton}</span>
            <Image className='transition-all group-hover:rotate-45' src={buttonGreenArrow} alt='Seta do botão' />
          </Link>
        )}
      </div>
    </div>
  );
}
