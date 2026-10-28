import { CSSProperties, useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import imagem from '../../public/images/image-trabalhe-conosco.webp';

export default function TrabalheConosco() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percentageScrolled = scrolled / totalHeight;
      setScrollPercentage(percentageScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scaleValue = 1 + scrollPercentage * 12;
  const rotateValue = scrollPercentage * 360;
  const bgTransformStyle: CSSProperties = {
    transform: `translate(-50%, -50%) scale(${scaleValue}) rotate(${rotateValue}deg)`,
    transition: 'transform 1s ease',
    backgroundImage: `url(/images/background.webp)`,
    backgroundSize: 'cover',
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '101%',
    height: '101%',
    zIndex: -1,
  };

  return (
    <>
      <Head>
        <title>Vem Ser GoCapital! Trabalhe Conosco e Faça Parte Do Nosso Time</title>
        <meta name='description' content='Já pensou em fazer parte do movimento que está desburocratizando os produtos e serviços financeiros? Então vem ser GoCapital! Confira as vagas disponíveis e trabalhe conosco.' />
        <meta name='keywords' content='Trabalhe Conosco gobank' />
        <link rel='canonical' content='https://www.gobank.com.br/trabalhe-conosco' />
        <meta property='og:title' content='Vem Ser GoCapital! Trabalhe Conosco e Faça Parte Do Nosso Time' />
        <meta property='og:description' content='Já pensou em fazer parte do movimento que está desburocratizando os produtos e serviços financeiros? Então vem ser GoCapital! Confira as vagas disponíveis e trabalhe conosco.' />
        <meta property='og:url' content='https://www.gobank.com.br/trabalhe-conosco' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Vem Ser GoCapital! Trabalhe Conosco e Faça Parte Do Nosso Time' />
        <meta name='twitter:description' content='Já pensou em fazer parte do movimento que está desburocratizando os produtos e serviços financeiros? Então vem ser GoCapital! Confira as vagas disponíveis e trabalhe conosco.' />
      </Head>
      <main className='trabalhe-conosco_CTA'>
        <section>
          <div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank bg-black'>
            <div style={bgTransformStyle}></div>

            <div className='flex w-full max-w-[1185px] flex-col gap-10 px-5 py-5 lg:flex-row lg:items-center lg:gap-5 xl:py-28'>
              <div className='flex w-full flex-col'>
                <h1 className='mb-14 text-6xl text-white'>
                  Trabalhe
                  <br /> <strong className='font-normal text-green-go-bank'>Conosco</strong>
                </h1>
                <p className='mb-5 w-full text-lg text-white lg:max-w-[600px]'>A GoCapital nasceu em 2011 com o objetivo de desburocratizar os produtos e serviços financeiros, com o apoio de um time dedicado e humanizado.</p>
                <p className='mb-5 w-full text-lg text-white lg:max-w-[600px]'>E se você quer abraçar esse desafio e crescer em um ambiente acolhedor, em constante evolução, nós queremos te conhecer!</p>
                <p className='mb-10 w-full text-lg text-white lg:max-w-[600px]'>Confira as vagas disponíveis e seja um Go.Capiter!</p>

                <a
                  href='https://gocapital.vagas.solides.com.br/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative flex w-full flex-row items-center justify-between rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl text-black-go-bank transition-opacity hover:opacity-80 xl:h-[80px] xl:max-w-[550px] xl:px-12'
                >
                  <span>Visualizar vagas disponíveis</span>
                  <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Ícone de seta' />
                </a>
              </div>

              <div className='hidden w-full max-w-[535px] lg:block'>
                <Image src={imagem} alt='Trabalhe conosco na GoCapital' className='h-auto w-full rounded-t-40 rounded-bl-20 rounded-br-40 object-cover' />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
