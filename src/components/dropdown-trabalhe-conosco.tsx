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
  hrefButton?: string;
}

export default function DropdownTrabalheConosco({ title, children, hrefButton }: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full'>
      <div className={`flex items-center justify-between gap-5 rounded-tl-15 rounded-tr-30 px-5 py-5 lg:px-9 ${isOpen ? 'bg-[#F0F0F0]' : 'rounded-bl-30 rounded-br-30 border-[1px] border-grayish-white-go-bank bg-white'}`}>
        <p className={`text-xl font-light text-black-go-bank xl:text-3xl`}>{title}</p>
        <button className={`flex h-[43px] w-full min-w-[43px] max-w-[43px] cursor-pointer items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 bg-green-go-bank transition-opacity hover:opacity-80`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Image src={whiteArrowDropdownMenu} alt='Seta do dropdown' className='rotate-180' /> : <Image src={whiteArrowDropdownMenu} alt='Seta do dropdown' />}
        </button>
      </div>
      <div className={`${isOpen ? '' : 'hidden'} flex flex-col items-start gap-5 rounded-bl-30 rounded-br-30 bg-[#F0F0F0] px-5 py-5 text-xl text-black-go-bank lg:px-9`}>
        {children}
        {hrefButton && (
          <Link href={hrefButton || '/'} className='group flex w-full items-center justify-center gap-2.5 rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 bg-green-go-bank text-lg text-white transition-all hover:rounded-bl-30 hover:rounded-tl-15 hover:opacity-80 xl:h-[80px] xl:max-w-[287px] xl:hover:max-w-[331px] '>
            <span className='text-2xl text-black'>Candidate-se</span>
            <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Seta do botão' />
          </Link>
        )}
      </div>
    </div>
  );
}
