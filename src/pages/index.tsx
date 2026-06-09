import { CSSProperties, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { GetStaticProps } from 'next';

import blogCardArrow from '../../public/svgs/blog-card-arrow.svg';
import buttonWhiteArrow from '../../public/svgs/button-white-arrow.svg';
import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import downArrowWithACircleAroundIt from '../../public/svgs/down-arrow-with-a-circle-around-it.svg';

import personalizedService from '../../public/svgs/personalized-service.svg';
import heart from '../../public/svgs/heart.svg';
import user from '../../public/svgs/user.svg';
import risk from '../../public/svgs/risk.svg';
import wallet from '../../public/svgs/wallet.svg';
import paymentMachineCoin from '../../public/svgs/payment-machine-coin.svg';
import creditCard from '../../public/svgs/credit-card.svg';
import shield from '../../public/svgs/shield.svg';

import inspiraDesign from '../../public/images/clientes/inspira-design.webp';
import ballagro from '../../public/images/clientes/ballagro.webp';
import brosz from '../../public/images/clientes/brosz.webp';
import ikasalimp from '../../public/images/clientes/ikasalimp.webp';
import multiversoEscolaTattoo from '../../public/images/clientes/multiverso-escola-tattoo.webp';
import sidlar from '../../public/images/clientes/sidlar.webp';

import imageMobile from '../../public/images/image-mobile.webp';
import imageMobileMobile from '../../public/images/image-mobile-mobile.webp';

import imagemHomeSlideUm from '../../public/images/home/imagem-home-slide-um.webp';
import imagemHomeSlideDois from '../../public/images/home/imagem-home-slide-dois.webp';
import imagemHomeSlideTres from '../../public/images/home/imagem-home-slide-tres.webp';
import imagemHomeSlideQuatro from '../../public/images/home/imagem-home-slide-quatro.webp';
import imagemHomeSlideCinco from '../../public/images/home/imagem-home-slide-cinco.webp';
import imagemHomeSlideSeis from '../../public/images/home/imagem-home-slide-seis.webp';

import photosOfTheSectionThatHasABoyComingOutOfTheSmartphone from '../../public/images/photos-of-the-section-that-has-a-boy-coming-out-of-the-smartphone.webp';

const inter = Inter({ subsets: ['latin'] });

import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import dowloadOnTheAppStore from '../../public/images/dowload-on-the-app-store.webp';
import getItOnGooglePlay from '../../public/images/get-it-on-google-play.webp';

import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';
import Head from 'next/head';

const animation = { duration: 50000, easing: (t: number) => t };
const animationClientes = { duration: 10000, easing: (t: number) => t };
const animationPalavras = { duration: 10000, easing: (t: number) => t };

export interface TPost {
  _embedded: any;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  id: string;
  date: string;
}

export interface IBlog {
  posts: TPost[];
}

const hasFeaturedMedia = (post: TPost) =>
  Boolean(post._embedded?.['wp:featuredmedia']?.[0]?.source_url);

export const getStaticProps: GetStaticProps = async () => {
  const postsFetch = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=100`);
  const postsArr = await postsFetch.json();
  const posts = Array.isArray(postsArr) ? postsArr.filter(hasFeaturedMedia) : [];

  return {
    props: {
      posts,
    },
    revalidate: 86400,
  };
};

const AdaptiveHeight: KeenSliderPlugin = (slider) => {
  function updateHeight() {
    slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + 'px';
  }

  slider.on('created', updateHeight);
  slider.on('slideChanged', updateHeight);
};

export default function Home({ posts }: IBlog) {
  // Efeito
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
  // Efeito

  // Efeito Cards Verdes
  const [activeDiv, setActiveDiv] = useState(0);
  const rotateActiveDiv = () => {
    setActiveDiv((prevActiveDiv) => (prevActiveDiv + 1) % 3);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      rotateActiveDiv();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  // Efeito Cards Verdes

  // Slider Clientes
  const [sliderRefClientes] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: false,

    slides: { perView: 5, spacing: 93 },
    created(s) {
      s.moveToIdx(5, true, animationClientes);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animationClientes);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animationClientes);
    },
  });
  // Slider Clientes

  // Slider Palavras
  const [sliderRefPalavras] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: false,
    mode: 'snap',
    rtl: false,
    slides: { perView: 'auto' },
    created(s) {
      s.moveToIdx(1, true, animationPalavras);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animationPalavras);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animationPalavras);
    },
  });
  // Slider Palavras

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    drag: true,
    slides: { perView: 1, spacing: 20 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(s) {
      s.moveToIdx(2, true, animation);
      setLoaded(true);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  // Slider Lets GoBank
  const [currentSlideLetsGoBank, setCurrentSlideLetsGoBank] = useState(0);
  const [loadedLetsGoBank, setLoadedLetsGoBank] = useState(false);
  const [sliderRefLetsGoBank, instanceRefLetsGoBank] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 20,
      },
      slideChanged(slider) {
        setCurrentSlideLetsGoBank(slider.track.details.rel);
      },
      created() {
        setLoadedLetsGoBank(true);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );
  // Slider Lets GoBank

  // Slider principal
  const [currentSlideHome, setCurrentSlideHome] = useState(0);
  const [loadedHome, setLoadedHome] = useState(false);
  const [sliderRefHome, instanceRefHome] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      vertical: true,
      slides: {
        perView: 1,
        spacing: 20,
      },
      drag: false,
      slideChanged(slider) {
        setCurrentSlideHome(slider.track.details.rel);
      },
      created() {
        setLoadedHome(true);
      },
    },
    [
      AdaptiveHeight,
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = true;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  return (
    <>
      <Head>
        <title>GoCapital - Soluções Financeiras para Pessoa Jurídica (PJ)</title>
        <meta name='description' content='Abra sua conta e conheça as soluções financeiras da GoCapital para empresas, pessoa jurídica (PJ). Crédito descomplicado, conta escrow, financiamentos, seguros +' />
        <meta name='keywords' content='gocapital instituição financeira digital' />
        <link rel='canonical' content='https://www.gobank.com.br/' />
        <meta property='og:title' content='GoCapital - Soluções Financeiras para Pessoa Jurídica (PJ)' />
        <meta property='og:description' content='Abra sua conta e conheça as soluções financeiras da GoCapital para empresas, pessoa jurídica (PJ). Crédito descomplicado, conta escrow, financiamentos, seguros +' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='GoCapital - Soluções Financeiras para Pessoa Jurídica (PJ)' />
        <meta name='twitter:description' content='Abra sua conta e conheça as soluções financeiras da GoCapital para empresas, pessoa jurídica (PJ). Crédito descomplicado, conta escrow, financiamentos, seguros +' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='home__CTA'>
        <div className=' flex items-center justify-center'>
          <div style={bgTransformStyle}></div>
          <section className='relative flex w-full max-w-[1185px] flex-col items-center overflow-hidden px-5 py-5 lg:py-40'>
            <h1 className=' w-full text-center text-2xl font-thin	text-white lg:text-4xl'>
              Let&apos;s <strong className='font-medium'>GoCapital</strong> Fundo de Investimento
            </h1>

            <div ref={sliderRefLetsGoBank} className='keen-slider'>
              <div className='keen-slider__slide text-center text-2xl font-extralight	text-white lg:text-6xl'>
                Taxas a <strong className='font-extralight text-green-go-bank'>partir de 0,99%</strong>
                <br /> nas maquininhas Go.Pag
              </div>
              <div className='keen-slider__slide text-center text-2xl font-extralight	text-white lg:text-6xl'>
                <strong className='font-extralight text-green-go-bank'>Antecipação </strong>
                <br /> de recebíveis
              </div>
              <div className='keen-slider__slide text-center text-2xl font-extralight	text-white lg:text-6xl'>
                Crédito
                <br /> <strong className='font-extralight text-green-go-bank'>facilitado para PJ </strong>
              </div>
              <div className='keen-slider__slide text-center text-2xl font-extralight	text-white lg:text-6xl'>
                E muito <strong className='font-extralight text-green-go-bank'>+</strong>
              </div>
              <div className='keen-slider__slide text-center text-2xl font-extralight	text-white lg:text-6xl'>
                A <strong className='font-extralight text-green-go-bank'>instituição financeira completa</strong>
                <br /> para sua empresa
              </div>
            </div>

            {loadedLetsGoBank && instanceRefLetsGoBank.current && (
              <div className='dots mt-5 flex gap-3 lg:absolute lg:right-5 lg:z-10 lg:mt-0 lg:flex-col'>
                {[...Array(instanceRefLetsGoBank.current.track.details.slides.length).keys()].map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRefLetsGoBank.current?.moveToIdx(idx);
                      }}
                      className={'dot' + (currentSlideLetsGoBank === idx ? ' h-[7px] w-[7px] rounded-2xl bg-white lg:h-[45px]' : ' h-[7px] w-[7px] rounded-2xl bg-[#3A3A3A] lg:h-[18px]')}
                    ></button>
                  );
                })}
              </div>
            )}

            <Link href='/converse-com-o-gocapital' className='cta_fale_com_gerente group my-5 flex w-full items-center justify-center gap-2.5 rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 border-[1px] border-white p-5 transition-all hover:rounded-bl-30 hover:rounded-tl-15 lg:mb-44 lg:mt-32 lg:h-[80px] lg:max-w-[365px] lg:hover:max-w-[409px]'>
              <p className='text-2xl text-white cta_fale_com_gerente'>Fale com o seu gerente </p>
              <Image className='transition-all group-hover:rotate-45 cta_fale_com_gerente' src={buttonWhiteArrow} alt='' />
            </Link>

            <div className='flex w-full flex-col items-center gap-5 overflow-hidden rounded-bl-50 rounded-br-25 rounded-tl-50 rounded-tr-50 border-[1px] border-black-go-bank bg-black-go-bank/10 p-5 backdrop-blur-lg xl:h-[737px] xl:flex-row'>
              {loadedHome && instanceRefHome.current && (
                <div className='flex -rotate-90 flex-col gap-5 xl:rotate-0'>
                  <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRefHome.current?.prev()}>
                    <Image className='flex rotate-180 group-hover:hidden' src={whiteArrowDropdownMenu} alt='' />
                    <Image className='hidden rotate-180 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                  </div>

                  <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRefHome.current?.next()}>
                    <Image className='flex group-hover:hidden ' src={whiteArrowDropdownMenu} alt='' />
                    <Image className='hidden group-hover:flex ' src={whiteArrowDropdownMenu} alt='' />
                  </div>
                </div>
              )}

              <div ref={sliderRefHome} className='keen-slider rolagem_produtos h-[800px] max-w-[320px] lg:h-[520px] lg:max-w-full'>
                {/*Abra sua conta*/}
                <div className='keen-slider__slide flex h-[800px] flex-col items-center gap-5 lg:h-auto xl:flex-row'>
                  <Image className='flex' src={imagemHomeSlideQuatro} alt='' />
                  <div className='flex h-full flex-col justify-between'>
                    <div>
                      <div className='mb-5 flex items-center gap-5 lg:mb-10'>
                        <Image className='hidden lg:flex' src={wallet} alt='' />
                        <p className='text-3xl text-green-go-bank lg:text-6xl'>Abra sua conta</p>
                      </div>
                      <p className='text-xl text-white'>
                        Conheça as vantagens da conta para atender às verdadeiras necessidades da sua empresa e dos seus colaboradores. Seja na hora de receber, movimentar e usar seu dinheiro com toda segurança, a conta digital é a solução.
                      </p>
                    </div>
                    <Link href='/abra-sua-conta' className='cta_produtos_abra_sua_conta flex items-center justify-center gap-1.5 rounded-bl-20 rounded-br-20 rounded-tl-20 rounded-tr-10 bg-white p-5 transition-opacity hover:opacity-80 lg:h-[58px] lg:max-w-[395px]'>
                      <p className='text-xl cta_produtos_abra_sua_conta'>Abra sua conta!</p>
                      <Image className='cta_produtos_abra_sua_conta' src={buttonBlackArrow} alt='' />
                    </Link>
                  </div>
                </div>
                {/*Abra sua conta*/}

                {/*Crédito Descomplicado*/}
                <div className='keen-slider__slide rolagem_produtos_credito flex h-[800px] flex-col items-center gap-5 lg:h-auto xl:flex-row'>
                  <Image className='flex' src={imagemHomeSlideCinco} alt='' />
                  <div className='flex h-full flex-col justify-between'>
                    <div>
                      <p className='mb-5 text-2xl text-white lg:mb-7'>
                        Precisando de crédito <strong>para crescer</strong>?
                      </p>
                      <div className='mb-5 flex gap-5 lg:mb-10'>
                        <Image className='hidden lg:flex' src={creditCard} alt='' />
                        <p className='text-3xl text-green-go-bank lg:text-6xl'>Crédito Descomplicado</p>
                      </div>
                      <p className='text-xl text-white '>
                        <strong>Já é nosso cliente?</strong> Então faça o download do aplicativo da GoCapital e movimente sua conta onde e quando quiser.
                      </p>
                    </div>
                    <Link href='/credito-descomplicado' className='cta_produtos_credito_simule flex items-center justify-center gap-1.5 rounded-bl-20 rounded-br-20 rounded-tl-20 rounded-tr-10 bg-white p-5 transition-opacity hover:opacity-80 lg:h-[58px] lg:max-w-[395px]'>
                      <p className='text-xl clear-startcta_produtos_credito_simule'>Faça sua simulação aqui</p>
                      <Image src={buttonBlackArrow} alt='' className='cta_produtos_credito_simule' />
                    </Link>
                  </div>
                </div>
                {/*Crédito Descomplicado*/}

                {/*Financiamentos*/}
                <div className='keen-slider__slide rolagem_produtos_financiamentos flex h-[800px] flex-col items-center gap-5 lg:h-auto xl:flex-row'>
                  <Image className='flex' src={imagemHomeSlideSeis} alt='' />
                  <div className='flex h-full flex-col justify-between'>
                    <div>
                      <p className='mb-5 text-2xl text-white lg:mb-7'>
                        Pensando em <strong>expandir</strong> o seu negócio?
                      </p>
                      <div className='mb-5 flex gap-5 lg:mb-10'>
                        <Image className='hidden lg:flex' src={paymentMachineCoin} alt='' />
                        <p className='text-3xl text-green-go-bank lg:text-6xl'>Financiamentos</p>
                      </div>
                      <p className='mb-5 text-xl text-white lg:mb-48'>
                        Conheça agora as nossas <strong>soluções de financiamento</strong> e tenha as melhores condições para fazer sua empresa decolar.
                      </p>
                    </div>
                    <Link href='/financiamentos' className='cta_produtos_financiamentos_simule flex items-center justify-center gap-1.5 rounded-bl-20 rounded-br-20 rounded-tl-20 rounded-tr-10 bg-white p-5 transition-opacity hover:opacity-80 lg:h-[58px] lg:max-w-[395px]'>
                      <p className='text-xl cta_produtos_financiamentos_simule'>Faça sua simulação aqui</p>
                      <Image className='cta_produtos_financiamentos_simule' src={buttonBlackArrow} alt='' />
                    </Link>
                  </div>
                </div>
                {/*Crédito Descomplicado*/}

                {/*Maquininha Go.Pag*/}
                <div className='keen-slider__slide rolagem_produtos_maquininha flex h-[800px] flex-col items-center gap-5 lg:h-auto xl:flex-row'>
                  <Image className='flex' src={imagemHomeSlideUm} alt='' />
                  <div className='flex h-full flex-col justify-between'>
                    <div>
                      <p className='mb-5 text-2xl text-white lg:mb-7'>
                        Uma instituição financeira completa <strong>pensado para PJ</strong>
                      </p>
                      <div className='mb-5 flex gap-5 lg:mb-10'>
                        <Image className='hidden lg:flex' src={downArrowWithACircleAroundIt} alt='' />
                        <p className='text-3xl text-green-go-bank lg:text-6xl'>Maquininha Go.Pag</p>
                      </div>
                      <p className='text-xl text-white '>Conheça as maquininhas de cartão Go.Pag ideais para turbinar as vendas do seu negócio com taxas a partir de 0,99% e as melhores condições para sua empresa. Aceitamos as principais bandeiras!</p>
                    </div>
                    <Link href='/maquininhas-go-pag' className='cta_produtos_vender_mais flex items-center justify-center gap-1.5 rounded-bl-20 rounded-br-20 rounded-tl-20 rounded-tr-10 bg-white p-5 transition-opacity hover:opacity-80 lg:h-[58px] lg:max-w-[395px]'>
                      <p className='text-xl cta_produtos_vender_mais'>Venha vender mais com a Go.Pag!</p>
                      <Image className='cta_produtos_vender_mais' src={buttonBlackArrow} alt='' />
                    </Link>
                  </div>
                </div>
                {/*Maquininha Go.Pag*/}

                {/*Baixe o APP*/}
                <div className='keen-slider__slide rolagem_produtos_baixe_app flex h-[800px] flex-col items-center gap-5 lg:h-auto xl:flex-row'>
                  <Image className='flex' src={imagemHomeSlideTres} alt='' />
                  <div className='flex h-full flex-col justify-between'>
                    <div>
                      <p className='mb-5 text-2xl text-white lg:mb-7'>
                        Uma instituição financeira completa <strong>pensado para PJ</strong>
                      </p>
                      <div className='mb-5 flex flex-col gap-5 lg:mb-10 lg:flex-row'>
                        <Image className='hidden lg:flex' src={downArrowWithACircleAroundIt} alt='' />
                        <p className='text-3xl text-green-go-bank lg:text-6xl'>Baixe o app</p>
                      </div>
                      <p className='text-xl text-white'>Já é nosso cliente? Então faça o download do aplicativo da GoCapital e movimente sua conta onde e quando quiser.</p>
                    </div>
                    <div className='flex gap-4'>
                      <a href='https://apps.apple.com/br/app/go-bank/id1565213260' target='_blank' className='cta_produtos_apple transition-opacity hover:opacity-80'>
                        <Image width={214} src={dowloadOnTheAppStore} alt='Imagem de um botão da App Store' className='cta_produtos_apple' />
                      </a>
                      <a href='https://play.google.com/store/apps/details?id=br.com.fourbank.gobank' target='_blank' className='cta_produtos_google transition-opacity hover:opacity-80'>
                        <Image width={214} src={getItOnGooglePlay} alt='Imagem de um botão do Google Play' className='cta_produtos_google' />
                      </a>
                    </div>
                  </div>
                </div>
                {/*Baixe o APP*/}

                {/*Seguros*/}
                <div className='keen-slider__slide rolagem_produtos_seguros flex h-[800px] flex-col items-center gap-5 lg:h-auto xl:flex-row'>
                  <Image className='flex' src={imagemHomeSlideDois} alt='' />
                  <div className='flex h-full flex-col justify-between'>
                    <div>
                      <p className='mb-5 text-2xl text-white lg:mb-7'>
                        Uma instituição financeira completa <strong>pensado para PJ</strong>
                      </p>
                      <div className='mb-5 flex gap-5 lg:mb-10'>
                        <Image className='hidden lg:flex' src={shield} alt='' />
                        <p className='text-3xl text-green-go-bank lg:text-6xl'>Seguros</p>
                      </div>
                      <p className='text-xl text-white'>Aqui você encontra soluções para proteger e cuidar de você, da sua família e do seu patrimônio com uma cobertura completa.</p>
                    </div>
                    <Link href='/seguros-e-consorcios' className='flex h-[58px] max-w-[395px] items-center justify-center gap-1.5 rounded-bl-20 rounded-br-20 rounded-tl-20 rounded-tr-10 bg-white transition-opacity hover:opacity-80'>
                      <p className='text-xl'>Faça uma cotação</p>
                      <Image src={buttonBlackArrow} alt='' />
                    </Link>
                  </div>
                </div>
                {/*Seguros*/}
              </div>
            </div>
          </section>
        </div>

        <section className='overflow-hidden bg-gray-dark-go-bank py-5 xl:py-20'>
          <div ref={sliderRefPalavras} className='keen-slider' style={{ maxWidth: 1920, minWidth: 1920 }}>
            <p style={{ maxWidth: 450, minWidth: 450 }} className='keen-slider__slide py-5 text-center text-8xl text-white'>
              Parceiro.
            </p>
            <p style={{ maxWidth: 750, minWidth: 750 }} className='keen-slider__slide py-5 text-center text-8xl text-white'>
              Digital Humano.
            </p>
            <p style={{ maxWidth: 450, minWidth: 450 }} className='keen-slider__slide py-5 text-center text-8xl text-white'>
              Completo.
            </p>
            <p style={{ maxWidth: 450, minWidth: 450 }} className='keen-slider__slide py-5 text-center text-8xl text-white'>
              Parceiro.
            </p>
            <p style={{ maxWidth: 750, minWidth: 750 }} className='keen-slider__slide py-5 text-center text-8xl text-white'>
              Digital Humano.
            </p>
            <p style={{ maxWidth: 450, minWidth: 450 }} className='keen-slider__slide py-5 text-center text-8xl text-white'>
              Completo.
            </p>
          </div>

          <div className='mt-5 flex items-center justify-center xl:mt-16'>
            <div className='w-full max-w-[1200px] px-5'>
              <div className='relative flex flex-col justify-between gap-5 xl:flex-row'>
                <Image className='flex w-full xl:hidden' src={imageMobileMobile} alt='' />

                <div className='relative z-10 flex flex-col gap-5 xl:gap-12'>
                  <div className={`flex h-[137] w-full gap-5 rounded-2xl px-5 py-5 transition-all lg:rounded-bl-50 lg:rounded-br-50 lg:rounded-tl-50 lg:rounded-tr-25 lg:px-12 xl:max-w-[500px] ${activeDiv === 0 ? 'bg-[#00DB8799] backdrop-blur-lg' : ''}`}>
                    <div className='flex flex-col gap-3'>
                      <p className='text-xl font-semibold text-white'>Atendimento personalizado</p>
                      <p className={`text-base transition-all ${activeDiv === 0 ? 'text-black-go-bank' : 'text-white'}`}>Como uma instituição financeira humanizada, entendemos que sua empresa é única e possui necessidades e objetivos individualizados que serão priorizados.</p>
                    </div>
                    <Image className={`flex transition-all ${activeDiv === 0 ? 'opacity-100' : 'opacity-0'}`} src={personalizedService} alt='' />
                  </div>

                  <div className={`flex h-[137] w-full gap-5 rounded-2xl px-5 py-5 transition-all lg:rounded-bl-50 lg:rounded-br-50 lg:rounded-tl-50 lg:rounded-tr-25 lg:px-12 xl:max-w-[500px] ${activeDiv === 1 ? 'bg-[#00DB8799] backdrop-blur-lg' : ''}`}>
                    <div className='flex flex-col gap-3'>
                      <p className='text-xl font-semibold text-white'>Facilidade de acesso e conveniência</p>
                      <p className={`text-base transition-all ${activeDiv === 1 ? 'text-black-go-bank' : 'text-white'}`}>Seja no digital ou em uma de nossas unidades, você sempre é bem-vindo para discutir as necessidades financeiras do seu negócio com um time humano.</p>
                    </div>
                    <Image className={`flex transition-all ${activeDiv === 1 ? 'opacity-100' : 'opacity-0'}`} src={heart} alt='' />
                  </div>

                  <div className={`flex h-[137] w-full gap-5 rounded-2xl px-5 py-5 transition-all lg:rounded-bl-50 lg:rounded-br-50 lg:rounded-tl-50 lg:rounded-tr-25 lg:px-12 xl:max-w-[500px] ${activeDiv === 2 ? 'bg-[#00DB8799] backdrop-blur-lg' : ''}`}>
                    <div className='flex flex-col gap-3'>
                      <p className='text-xl font-semibold text-white'>Comunicação clara e transparente</p>
                      <p className={`text-base transition-all ${activeDiv === 2 ? 'text-black-go-bank' : 'text-white'}`}>Sem pegadinhas. Sem letras miúdas. Na GoCapital você encontra as melhores taxas do mercado para alavancar sua empresa.</p>
                    </div>
                    <Image className={`flex transition-all ${activeDiv === 2 ? 'opacity-100' : 'opacity-0'}`} src={user} alt='' />
                  </div>
                </div>

                <Image className='absolute left-[300px] right-0 top-[-225px] hidden xl:flex' src={imageMobile} alt='' />

                <div className='relative z-10 flex w-full flex-col items-end xl:max-w-[454px]'>
                  <p className='mb-5 w-full text-3xl text-white xl:mb-7 xl:max-w-[333px]'>Afinal, a instituição financeira da sua empresa precisa colocar você como prioridade.</p>

                  <p className='mb-5 w-full text-lg text-white xl:mb-20 xl:max-w-[333px]'>Acreditamos na importância da conexão humana nas instituições financeiras para construir relacionamentos sólidos e duradouros com os nossos clientes.</p>

                  <div className='w-full xl:max-w-[333px]'>
                    <Image className='mb-5 xl:mb-16' src={photosOfTheSectionThatHasABoyComingOutOfTheSmartphone} alt='' />
                  </div>

                  <Link href='/sobre-o-gocapital' className='cta_nosso_jeito_gobank flex w-full items-center justify-center rounded-[76px] bg-green-go-bank px-5 py-2.5 text-lg transition-opacity hover:opacity-80 lg:px-12 lg:text-2xl xl:h-[100px] xl:max-w-[454px] xl:rounded-[100px]'>
                    <p className='cta_nosso_jeito_gobank'>Saiba o nosso jeito de fazer negócios em Sobre a GoCapital!</p>
                    <Image className='cta_nosso_jeito_gobank' src={buttonBlackArrow} alt='' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center overflow-hidden border-t-[2px] border-green-go-bank bg-white px-5 py-5 lg:py-20'>
          <div className='flex w-full max-w-[1185px] flex-col items-center gap-5 lg:flex-row'>
            <h1 className='w-full max-w-[432px] text-4xl font-light text-black-go-bank'>
              <strong className='font-normal text-green-go-bank'>Já são + de 3.000</strong> clientes atendidos em todo o Brasil!
            </h1>

            <div ref={sliderRefClientes} className='keen-slider' style={{ maxWidth: 733, minWidth: 733 }}>
              <div className='keen-slider__slide flex items-center justify-center'>
                <Image className='' src={inspiraDesign} alt='' />
              </div>
              <div className='keen-slider__slide flex items-center justify-center'>
                <Image className='' src={ballagro} alt='' />
              </div>
              <div className='keen-slider__slide flex items-center justify-center'>
                <Image className='' src={brosz} alt='' />
              </div>
              <div className='keen-slider__slide flex items-center justify-center'>
                <Image className='' src={ikasalimp} alt='' />
              </div>
              <div className='keen-slider__slide flex items-center justify-center'>
                <Image className='' src={multiversoEscolaTattoo} alt='' />
              </div>
              <div className='keen-slider__slide flex items-center justify-center'>
                <Image className='' src={sidlar} alt='' />
              </div>
            </div>
          </div>
        </section>

        <section className='flex-col items-center justify-center gap-5 overflow-hidden bg-white pb-5 lg:gap-36 lg:pb-32 lg:pt-10'>
          <span className='mx-auto mb-5 flex w-full max-w-[1200px] p-5 lg:mb-32'>
            <h1 className='mx-auto text-4xl text-black-go-bank lg:text-center lg:text-6xl'>
              Tudo o que você precisa saber sobre o{' '}
              <span className='xl:flex'>
                <strong className='relative font-normal text-green-go-bank xl:flex xl:flex-col xl:items-center xl:justify-center'>
                  mercado financeiro <Image className='hidden pt-2 xl:flex' src={risk} alt='' />
                </strong>{' '}
                você encontra aqui!
              </span>
            </h1>
          </span>

          <div className='hidden lg:flex'>
            <div ref={sliderRef} className='keen-slider flex' style={{ maxWidth: 1860, minWidth: 1860 }}>
              <div style={{ maxWidth: 1860, minWidth: 1860 }} className='keen-slider__slide flex h-[640px] justify-center gap-8'>
                <div className='flex min-w-[305px] flex-col justify-center gap-8'>
                  {posts.length > 0 && (
                    <Link href={`/blog/${posts[0].slug}`} key={posts[0].id} className='relative flex h-[305px] min-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                      <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[0]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[0].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='relative z-10 flex justify-end'>
                        <Image src={blogCardArrow} alt='Seta indicando que o card leva para outra página' />
                      </div>
                      <p className='relative z-10 text-xl text-white'>{posts[0].title.rendered}</p>
                    </Link>
                  )}

                  {posts.length > 1 && (
                    <Link href={`/blog/${posts[1].slug}`} key={posts[1].id} className='relative flex h-[305px] min-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                      <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[1]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[1].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='relative z-10 flex justify-end'>
                        <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                      </div>
                      <p className='relative z-10 text-xl text-white'>{posts[1].title.rendered}</p>
                    </Link>
                  )}
                </div>

                {posts.length > 2 && (
                  <Link href={`/blog/${posts[2].slug}`} key={posts[2].id} className='relative flex h-[640px] min-w-[640px] flex-col justify-between overflow-hidden rounded-b-74 rounded-tl-74 rounded-tr-37 p-10 transition-opacity hover:opacity-80'>
                    <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={640} height={640} src={posts[2]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[2].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='relative z-10 flex justify-end'>
                      <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                    </div>
                    <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                  </Link>
                )}

                <div className='flex w-[855px] flex-col gap-8'>
                  <div className='flex flex-row gap-8'>
                    {posts.length > 3 && (
                      <Link href={`/blog/${posts[3].slug}`} key={posts[3].id} className='relative flex h-[305px] max-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[3]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[3].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                      </Link>
                    )}

                    {posts.length > 4 && (
                      <Link href={`/blog/${posts[4].slug}`} key={posts[4].id} className='relative flex h-[305px] w-[518px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={518} height={305} src={posts[4]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[4].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[4].title.rendered}</p>
                      </Link>
                    )}
                  </div>

                  <div className='flex flex-row gap-8'>
                    {posts.length > 5 && (
                      <Link href={`/blog/${posts[5].slug}`} key={posts[5].id} className='relative flex h-[305px] w-[518px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={518} height={305} src={posts[5]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[5].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[5].title.rendered}</p>
                      </Link>
                    )}

                    {posts.length > 6 && (
                      <Link href={`/blog/${posts[6].slug}`} key={posts[6].id} className='relative flex h-[305px] w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[6]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[6].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[6].title.rendered}</p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ maxWidth: 1860, minWidth: 1860 }} className='keen-slider__slide flex h-[640px] justify-center gap-8'>
                <div className='flex min-w-[305px] flex-col justify-center gap-8'>
                  {posts.length > 0 && (
                    <Link href={`/blog/${posts[0].slug}`} key={posts[0].id} className='relative flex h-[305px] min-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                      <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[0]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[0].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='relative z-10 flex justify-end'>
                        <Image src={blogCardArrow} alt='Seta indicando que o card leva para outra página' />
                      </div>
                      <p className='relative z-10 text-xl text-white'>{posts[0].title.rendered}</p>
                    </Link>
                  )}

                  {posts.length > 1 && (
                    <Link href={`/blog/${posts[1].slug}`} key={posts[1].id} className='relative flex h-[305px] min-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                      <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[1]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[1].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='relative z-10 flex justify-end'>
                        <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                      </div>
                      <p className='relative z-10 text-xl text-white'>{posts[1].title.rendered}</p>
                    </Link>
                  )}
                </div>

                {posts.length > 2 && (
                  <Link href={`/blog/${posts[2].slug}`} key={posts[2].id} className='relative flex h-[640px] min-w-[640px] flex-col justify-between overflow-hidden rounded-b-74 rounded-tl-74 rounded-tr-37 p-10 transition-opacity hover:opacity-80'>
                    <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={640} height={640} src={posts[2]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[2].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='relative z-10 flex justify-end'>
                      <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                    </div>
                    <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                  </Link>
                )}

                <div className='flex w-[855px] flex-col gap-8'>
                  <div className='flex flex-row gap-8'>
                    {posts.length > 3 && (
                      <Link href={`/blog/${posts[3].slug}`} key={posts[3].id} className='relative flex h-[305px] max-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[3]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[3].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                      </Link>
                    )}

                    {posts.length > 4 && (
                      <Link href={`/blog/${posts[4].slug}`} key={posts[4].id} className='relative flex h-[305px] w-[518px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={518} height={305} src={posts[4]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[4].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[4].title.rendered}</p>
                      </Link>
                    )}
                  </div>

                  <div className='flex flex-row gap-8'>
                    {posts.length > 5 && (
                      <Link href={`/blog/${posts[5].slug}`} key={posts[5].id} className='relative flex h-[305px] w-[518px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={518} height={305} src={posts[5]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[5].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[5].title.rendered}</p>
                      </Link>
                    )}

                    {posts.length > 6 && (
                      <Link href={`/blog/${posts[6].slug}`} key={posts[6].id} className='relative flex h-[305px] w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[6]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[6].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[6].title.rendered}</p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex p-5 lg:hidden'>
            <div className='flex w-full flex-col gap-[30px] xl:flex-row'>
              {posts.length > 0 && (
                <Link href={`/blog/${posts[0].slug}`} key={posts[0].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:h-[606px] xl:max-w-[585px]'>
                  <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[0]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[0].title.rendered} />
                  <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                  <div className='flex gap-5'>
                    <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]'></div>
                    <p className='relative z-10 text-xl	text-white'>{posts[0].title.rendered}</p>
                  </div>
                </Link>
              )}

              <div className='flex flex-col gap-[30px]'>
                <div className='flex flex-col gap-[30px] xl:flex-row'>
                  {posts.length > 1 && (
                    <Link href={`/blog/${posts[1].slug}`} key={posts[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                      <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[1]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[1].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]'></div>
                        <p className='relative z-10 text-xl	text-white'>{posts[1].title.rendered}</p>
                      </div>
                    </Link>
                  )}

                  {posts.length > 2 && (
                    <Link href={`/blog/${posts[2].slug}`} key={posts[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                      <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[2]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[2].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]'></div>
                        <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                      </div>
                    </Link>
                  )}
                </div>

                {posts.length > 3 && (
                  <Link href={`/blog/${posts[3].slug}`} key={posts[3].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                    <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={posts[3]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[3].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='flex gap-5'>
                      <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]'></div>
                      <p className='relative z-10 text-xl	text-white'>{posts[3].title.rendered}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
