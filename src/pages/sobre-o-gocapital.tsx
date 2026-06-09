import { CSSProperties, useEffect, useState } from 'react';

import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import image1 from '../../public/images/sobre-o-gocapital/1.webp';
import image10 from '../../public/images/sobre-o-gocapital/10.webp';
import image11 from '../../public/images/sobre-o-gocapital/11.webp';
import image12 from '../../public/images/sobre-o-gocapital/12.webp';
import image13 from '../../public/images/sobre-o-gocapital/13.webp';
import image14 from '../../public/images/sobre-o-gocapital/14.webp';
import image15 from '../../public/images/sobre-o-gocapital/15.webp';
import image2 from '../../public/images/sobre-o-gocapital/2.webp';
import image3 from '../../public/images/sobre-o-gocapital/3.webp';
import image4 from '../../public/images/sobre-o-gocapital/4.webp';
import image6 from '../../public/images/sobre-o-gocapital/6.webp';
import image7 from '../../public/images/sobre-o-gocapital/7.webp';
import image8 from '../../public/images/sobre-o-gocapital/8.webp';
import image9 from '../../public/images/sobre-o-gocapital/9.webp';

import sobreOGocapitalDois from '../../public/svgs/sobre-o-gocapital-dois.svg';
import sobreOGocapitalQuatro from '../../public/svgs/sobre-o-gocapital-quatro.svg';
import sobreOGocapitalTres from '../../public/svgs/sobre-o-gocapital-tres.svg';
import sobreOGocapitalUm from '../../public/svgs/sobre-o-gocapital-um.svg';

import timelineGreen from '../../public/svgs/timeline-green.svg';
import timelineWhite from '../../public/svgs/timeline-white.svg';

import quotationMarks from '../../public/svgs/quotation-marks.svg';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import blackArrowDropdownMenu from '../../public/svgs/black-arrow-dropdown-menu.svg';
import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';

const animation = { duration: 50000, easing: (t: number) => t };

export interface TDepoimentos {
  _embedded: any;
  title: {
    rendered?: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    empresa: string;
  };
  id: string;
}

export interface IDepoimentos {
  depoimentos: TDepoimentos[];
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const fetchDepoimentos = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/depoimentos?_embed=true&per_page=100`);
  const depoimentos = await fetchDepoimentos.json();

  return {
    props: {
      depoimentos,
    },
    revalidate: 86400,
  };
};

export default function SobreOGocapital({ depoimentos }: IDepoimentos) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    drag: false,
    rtl: false,
    slides: { perView: 6, spacing: 20 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(s) {
      s.moveToIdx(5, true, animation);
      setLoaded(true);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  const [currentSlideTimeline, setCurrentSlideTimeline] = useState(0);
  const [loadedTimeline, setLoadedTimeline] = useState(false);
  const [sliderRefTimeline, instanceRefTimeline] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      '(min-width: 1200px)': {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlideTimeline(slider.track.details.rel);
    },
    created() {
      setLoadedTimeline(true);
    },
  });

  const [currentSlideDepoimentos, setCurrentSlideDepoimentos] = useState(0);
  const [loadedDepoimentos, setLoadedDepoimentos] = useState(false);
  const [sliderRefDepoimentos, instanceRefDepoimentos] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      breakpoints: {
        '(min-width: 1200px)': {
          slides: { perView: 1, spacing: 10 },
        },
      },
      slides: { perView: 1 },
      slideChanged(slider) {
        setCurrentSlideDepoimentos(slider.track.details.rel);
      },
      created() {
        setLoadedDepoimentos(true);
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
          }, 5000);
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
        <title>Sobre a GoCapital - Desde 2011 Desburocratizando Produtos e Serviços Financeiros</title>
        <meta name='description' content='Somos uma instituição financeira digital completa fundada em 2011 e pensando para oferecer as melhores soluções financeiras com condições pensadas para empresas e profissionais PJ.' />
        <meta name='keywords' content='Blog gobank' />
        <link rel='canonical' content='https://www.gobank.com.br/sobre-o-gocapital' />
        <meta property='og:title' content='Sobre a GoCapital - Desde 2011 Desburocratizando Produtos e Serviços Financeiros' />
        <meta property='og:description' content='Somos uma instituição financeira digital completa fundada em 2011 e pensando para oferecer as melhores soluções financeiras com condições pensadas para empresas e profissionais PJ.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/sobre-o-gocapital' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Sobre a GoCapital - Desde 2011 Desburocratizando Produtos e Serviços Financeiros' />
        <meta name='twitter:description' content='Somos uma instituição financeira digital completa fundada em 2011 e pensando para oferecer as melhores soluções financeiras com condições pensadas para empresas e profissionais PJ.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='sobre-o-gocapital_CTA'>
        <section>
          <div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank'>
            <div style={bgTransformStyle}></div>

            <div className='flex w-full max-w-[1185px] flex-col gap-9 px-5 py-5 lg:flex-row xl:py-28'>
              <div className='flex flex-col'>
                <p className='mb-5 text-4xl font-thin text-white lg:mb-10'>
                  Let&apos;s <strong className='font-medium'>GoCapital!</strong>
                </p>
                <h1 className='text-6xl  font-light text-white lg:mb-9'>
                  <strong className='font-light text-green-go-bank'>Prazer,</strong> somos a GoCapital!
                </h1>
              </div>

              <div className='flex w-full max-w-[739px] flex-col gap-5'>
                <p className='text-lg text-white'>Somos uma instituição financeira digital completa fundada em 2011 por empreendedores vindos de grandes bancos. Criamos soluções a partir de produtos e serviços financeiros pensados especialmente para o seu negócio.</p>
                <p className='text-lg text-white'>Nosso principal objetivo é desburocratizar os serviços financeiros e o mercado de crédito para que sua empresa possa evoluir com as melhores oportunidades do mercado.</p>
                <p className='text-lg text-white'>Buscamos uma parceria verdadeira e uma relação duradoura com nossos clientes, tornando seus negócios mais rentáveis com um atendimento personalizado e humanizado.</p>
                <p className='text-xl text-green-go-bank'>Te damos as boas-vindas ao jeito GoCapital de fazer negócios!</p>
                <p className='text-lg text-white'>Sua empresa está pronta para crescer com a gente?</p>
              </div>
            </div>

            <div ref={sliderRef} className='mb-5 flex lg:mb-28' style={{ maxWidth: 1920, minWidth: 1920 }}>
              <Image className='keen-slider__slide' src={image1} alt='' />
              <Image className='keen-slider__slide' src={image2} alt='' />
              <Image className='keen-slider__slide' src={image3} alt='' />
              <Image className='keen-slider__slide' src={image4} alt='' />
              <Image className='keen-slider__slide' src={image6} alt='' />
              <Image className='keen-slider__slide' src={image7} alt='' />
              <Image className='keen-slider__slide' src={image8} alt='' />
              <Image className='keen-slider__slide' src={image9} alt='' />
              <Image className='keen-slider__slide' src={image10} alt='' />
              <Image className='keen-slider__slide' src={image11} alt='' />
              <Image className='keen-slider__slide' src={image12} alt='' />
              <Image className='keen-slider__slide' src={image13} alt='' />
              <Image className='keen-slider__slide' src={image14} alt='' />
              <Image className='keen-slider__slide' src={image15} alt='' />
            </div>

            <div className='mb-5 flex flex-col gap-20 p-5 lg:mb-28 lg:flex-row'>
              <div className='flex flex-col items-center'>
                <div className='mb-8 flex h-[55px] w-[55px] items-center justify-center'>
                  <Image src={sobreOGocapitalUm} alt='' className='' />
                </div>
                <p className='mb-6 text-2xl text-green-go-bank'>2011</p>
                <p className='text-center text-lg text-white'>Há mais de uma década estamos desburocratizando processos financeiros.</p>
              </div>

              <div className='flex flex-col items-center'>
                <div className='mb-8 flex h-[55px] w-[55px] items-center justify-center'>
                  <Image src={sobreOGocapitalDois} alt='' className='mb-8' />
                </div>
                <p className='mb-6 text-center text-2xl text-green-go-bank'>
                  Abrangência <br /> nacional
                </p>
                <p className='text-center text-lg text-white'>Possuímos atendimento em todo o Brasil.</p>
              </div>

              <div className='flex flex-col items-center '>
                <div className='mb-8 flex h-[55px] w-[55px] items-center justify-center'>
                  <Image src={sobreOGocapitalTres} alt='' className='mb-8' />
                </div>
                <p className='mb-6 text-2xl text-green-go-bank'>R$ 2bi</p>
                <p className='text-center text-lg text-white'>Ao todo já são mais de dois bilhões de reais em crédito pagos.</p>
              </div>

              <div className='flex flex-col items-center '>
                <div className='mb-8 flex h-[55px] w-[55px] items-center justify-center'>
                  <Image src={sobreOGocapitalQuatro} alt='' className='mb-8' />
                </div>
                <p className='mb-6 text-2xl text-green-go-bank'>Digital e humano</p>
                <p className='text-center text-lg text-white'>Toda a praticidade dos serviços digitais com um atendimento humanizado.</p>
              </div>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-white'>
          <div className='w-full max-w-[1185px] px-5 pb-5 pt-5 lg:pb-32 lg:pt-20'>
            <h1 className='pb-5 text-4xl text-black-go-bank lg:pb-20'>
              Nossos <strong className='font-normal text-green-go-bank'>pilares</strong>
            </h1>

            <div className='flex flex-col gap-8 lg:flex-row'>
              <div className='rounded-t-50 rounded-bl-25 rounded-br-50 bg-[#F0F0F0] p-5 lg:w-[360px] lg:px-11 lg:py-16'>
                <p className='mb-12 text-4xl text-green-go-bank'>Empatia</p>
                <p className='mb-2.5 text-2xl text-black-go-bank'>A arte de pensar no próximo</p>
                <p className='mb-5 text-black-go-bank'>Nos movemos sempre pensando no próximo, todos os nossos produtos e serviços devem fazer sentido para o nosso maior bem: nossos clientes! </p>
                <p className='text-black-go-bank'>Por essa razão, focamos no atendimento individual e personalizado, que leva em consideração suas necessidades e objetivos como profissional e/ou empresa.</p>
              </div>

              <div className='rounded-t-50 rounded-bl-25 rounded-br-50 bg-[#F0F0F0] p-5 lg:w-[360px] lg:px-11 lg:py-16'>
                <p className='mb-12 text-4xl text-green-go-bank'>Propósito</p>
                <p className='mb-2.5 text-2xl text-black-go-bank'>A arte de entregar valor</p>
                <p className='mb-5 text-black-go-bank'>Somos movidos pela paixão de apoiar micro, pequenas e médias empresas a preservar e expandir seu negócio.</p>
                <p className='text-black-go-bank'>Queremos contribuir para que o maior número de negócios alcancem seus objetivos, facilitando o acesso a linhas de crédito com produtos financeiros vantajosos para nossos clientes.</p>
              </div>

              <div className='rounded-t-50 rounded-bl-25 rounded-br-50 bg-black-go-bank p-5 lg:w-[360px] lg:px-11 lg:py-16'>
                <p className='mb-12 text-4xl text-green-go-bank'>Legado</p>
                <p className='mb-2.5 text-2xl text-white'>A arte da perenidade</p>
                <p className='mb-5 text-white'>Nossos relacionamentos são construídos em fundamentos sólidos, acreditamos nas pessoas com as quais nos conectamos.</p>
                <p className='text-white'>Nossa missão é desenvolver uma relação duradoura e que faça sentido para os nossos clientes, colaboradores e fornecedores, deixando uma marca de comprometimento e excelência na entrega.</p>
              </div>
            </div>
          </div>
        </section>

        <section className='relative flex items-center justify-center bg-[#1D1D1D]'>
          <div className='w-full max-w-[1185px] px-5 py-5	xl:py-20 '>
            <div className='mb-5 flex justify-between xl:mb-20'>
              <h1 className='text-4xl text-white'>
                Linha do <strong className='font-normal text-green-go-bank'>tempo</strong>
              </h1>

              {loadedTimeline && instanceRefTimeline.current && (
                <div className='flex gap-5'>
                  <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRefTimeline.current?.prev()}>
                    <Image className='flex rotate-90 group-hover:hidden' src={whiteArrowDropdownMenu} alt='' />
                    <Image className='hidden rotate-90 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                  </div>

                  <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRefTimeline.current?.next()}>
                    <Image className='flex -rotate-90 group-hover:hidden' src={whiteArrowDropdownMenu} alt='' />
                    <Image className='hidden -rotate-90 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                  </div>
                </div>
              )}
            </div>

            <div className='absolute left-0 right-0 top-[460px] hidden h-[3px] w-full bg-[#333333] xl:flex'></div>

            <div ref={sliderRefTimeline} className='keen-slider flex'>
              <div className='keen-slider__slide flex flex-col items-center xl:mt-[120px]'>
                <p className='mb-8 text-center text-2xl text-white'>Fundação</p>
                <p className='mb-3 text-center text-4xl text-green-go-bank'>2011</p>
                <Image src={timelineGreen} alt='' />
              </div>

              <div className='keen-slider__slide flex flex-col items-center xl:mt-[236px]'>
                <Image src={timelineWhite} alt='' />
                <p className='mb-8 mt-3 text-center text-4xl text-white'>2011</p>
                <p className='mb-8 text-center text-2xl text-white'>Prêmio Finep de Empresa investidora</p>
                <p className='mb-8 text-center text-2xl text-white'>Início de atendimento a PMES através do gestão 360º</p>
              </div>

              <div className='keen-slider__slide flex flex-col items-center'>
                <p className='mb-8 text-center text-2xl text-white'>Lançamento da Go.Credit para PMES</p>
                <p className='mb-8 text-center text-lg text-[#AEAEAE]'>Com fluxo automatizado de qualificação e formalização</p>
                <p className='mb-3 text-center text-4xl text-green-go-bank'>2015</p>
                <Image src={timelineGreen} alt='' />
              </div>

              <div className='keen-slider__slide flex flex-col items-center xl:mt-[235px]'>
                <Image src={timelineWhite} alt='' />
                <p className='mb-8 mt-3 text-center text-4xl text-white'>2017</p>
                <p className='mb-8 text-center text-2xl text-white'>Criação do fundo Go</p>
                <p className='mb-8 text-center text-lg text-[#AEAEAE]'>Focado em crédito para PMES</p>
              </div>

              <div className='keen-slider__slide flex flex-col items-center xl:mt-[88px]'>
                <p className='mb-8 text-center text-2xl text-white'>Prêmio BNDES de Fintechs</p>
                <p className='mb-3 text-center text-4xl text-green-go-bank'>2019</p>
                <Image src={timelineGreen} alt='' />
              </div>

              <div className='keen-slider__slide flex flex-col items-center xl:mt-[235px]'>
                <Image src={timelineWhite} alt='' />
                <p className='mb-8 mt-3 text-center text-4xl text-white'>2021</p>
                <p className='mb-8 text-center text-2xl text-white'>Lançamento da Instituição Financeira Digital PJ-PF</p>
              </div>

              <div className='keen-slider__slide flex flex-col items-center xl:mt-[120px]'>
                <p className='mb-8 text-center text-2xl text-white'>Go Pag Conta Escrow</p>
                <p className='mb-3 text-center text-4xl text-green-go-bank'>2022</p>
                <Image src={timelineGreen} alt='' />
              </div>

              <div className='keen-slider__slide flex flex-col items-center xl:mt-[235px]'>
                <Image src={timelineWhite} alt='' />
                <p className='mb-8 mt-3 text-4xl text-white'>2023</p>
                <p className='mb-8 text-2xl text-white'>Inauguração da unidade de Mogi das Cruzes</p>
              </div>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-white'>
          <div className='w-full max-w-[1185px] px-5 py-5	lg:py-20'>
            <div className='mb-5 flex flex-col items-center justify-between gap-5 lg:mb-20 lg:flex-row '>
              <h1 className='w-full	max-w-full text-6xl text-black-go-bank lg:max-w-[680px]'>
                <strong className='font-normal text-green-go-bank'>Veja a opinião</strong> de <br /> quem já é nosso cliente:
              </h1>
              <div className='flex w-full flex-col gap-5 lg:w-auto lg:items-end'>
                {loadedDepoimentos && instanceRefDepoimentos.current && (
                  <div className='flex gap-5'>
                    <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRefDepoimentos.current?.prev()}>
                      <Image className='flex -rotate-90 group-hover:hidden' src={blackArrowDropdownMenu} alt='' />
                      <Image className='hidden rotate-90 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                    </div>

                    <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRefDepoimentos.current?.next()}>
                      <Image className='flex rotate-90 group-hover:hidden' src={blackArrowDropdownMenu} alt='' />
                      <Image className='hidden -rotate-90 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div ref={sliderRefDepoimentos} className='keen-slider' style={{ maxWidth: 1220 }}>
              {depoimentos.map((depoimento) => (
                <div key={depoimento.id} className='keen-slider__slide flex flex-col-reverse items-center gap-5 rounded-t-40 rounded-bl-20 rounded-br-40 border-2 border-[#EFEFEF] bg-[#F8F8F8] p-5 lg:flex-row lg:p-10'>
                  {depoimento && (
                    <>
                      <Image className='hidden lg:flex' src={quotationMarks} alt='' />
                      {depoimento.content && depoimento.content.rendered && <div className='lg:max-w-1/2 w-full text-3xl' dangerouslySetInnerHTML={{ __html: depoimento.content.rendered }} />}
                      <div className='flex flex-col items-center justify-center'>
                        {depoimento._embedded && depoimento._embedded['wp:featuredmedia'] && depoimento._embedded['wp:featuredmedia'][0] && depoimento._embedded['wp:featuredmedia'][0].source_url && <Image className='mb-5 rounded-t-15 rounded-bl-5 rounded-br-15' width={75} height={75} src={depoimento._embedded['wp:featuredmedia'][0].source_url} alt='' />}
                        {depoimento.title && depoimento.title.rendered && <p className='mb-2 text-center text-2xl text-green-go-bank'>{depoimento.title.rendered}</p>}
                        {depoimento.acf && depoimento.acf.empresa && <p className='mb-2 text-center text-lg text-black-go-bank'>{depoimento.acf.empresa}</p>}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
