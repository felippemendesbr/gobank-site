import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import greenSelectArrow from '../../public/svgs/green-select-arrow.svg';

import maquininhasGoPayUm from '../../public/images/maquininhas-go-pay/maquininhas-go-pay-um.webp';
import maquininhasGoPayDois from '../../public/images/maquininhas-go-pay/maquininhas-go-pay-dois.webp';
import maquininhasGoPayTres from '../../public/images/maquininhas-go-pay/maquininhas-go-pay-tres.webp';
import maquininhasGoPayQuatro from '../../public/images/maquininhas-go-pay/maquininhas-go-pay-quatro.webp';

import image from '../../public/images/image-maquininhas-gopay.webp';

import blackArrowDropdownMenu from '../../public/svgs/black-arrow-dropdown-menu.svg';
import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';

import maquininhaUm from '../../public/svgs/maquininha-um.svg';
import maquininhaDois from '../../public/svgs/maquininha-dois.svg';
import maquininhaTres from '../../public/svgs/maquininha-tres.svg';
import maquininhaQuatro from '../../public/svgs/maquininha-quatro.svg';
import maquininhaCinco from '../../public/svgs/maquininha-cinco.svg';

import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const AdaptiveHeight: KeenSliderPlugin = (slider) => {
  function updateHeight() {
    slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + 'px';
  }

  slider.on('created', updateHeight);
  slider.on('slideChanged', updateHeight);
};

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

import { useRouter } from 'next/router';
import Head from 'next/head';

type FormData = {
  nomeDaEmpresa: string;
  cpfCnpj: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  whatsapp?: boolean;
  jaEClienteDoGoBank: string;
  mensagem?: string;
};

const validaCPF = (cpf: any) => {
  return cpf.length === 11;
};

const validaCNPJ = (cnpj: any) => {
  return cnpj.length === 14;
};

const validationSchema = Yup.object().shape({
  nomeDaEmpresa: Yup.string().required('Nome da Empresa é obrigatório'),
  cpfCnpj: Yup.string()
    .required('Este campo é obrigatório.')
    .test('valida-cpf-cnpj', 'CPF ou CNPJ inválido', (value) => {
      const apenasNumeros = value.replace(/\D/g, '');
      return validaCPF(apenasNumeros) || validaCNPJ(apenasNumeros);
    }),
  nomeCompleto: Yup.string().required('Nome completo é obrigatório'),
  email: Yup.string().email('Por favor, insira um endereço de e-mail válido').required('E-mail é obrigatório'),
  telefone: Yup.string()
    .required('Telefone é obrigatório')
    .matches(/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/, 'Telefone inválido'),
  whatsapp: Yup.boolean(),
  jaEClienteDoGoBank: Yup.string().required('Seleção obrigatória').oneOf(['Desejo contratar', 'Já sou cliente e desejo atendimento', 'Sou parceiro', 'Outro'], 'Seleção obrigatória'),
  mensagem: Yup.string(),
});
export default function MaquininhasGoPay() {
  // Recaptcha
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(true);
  const handleRecaptcha = (value: string | null) => {
    setRecaptchaValue(value);
    setIsRecaptchaValid(!!value);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      vertical: true,
      drag: false,
      slides: {
        perView: 1,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      AdaptiveHeight,
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

  // Mascara Telefone
  const [telefoneValue, setTelefoneValue] = useState('');

  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => (p2.length === 4 ? `(${p1}) ${p2}-${p3}` : `(${p1}) ${p2}${p3}`));
    } else {
      return digits.replace(/(\d{2})(\d{0,5})(\d{0,4})/, (match, p1, p2, p3) => (p2.length === 5 ? `(${p1}) ${p2}-${p3}` : `(${p1}) ${p2}${p3}`));
    }
  };
  // Mascara Telefone

  // React Hook Form
  const router = useRouter();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const [emailSuccessfullySent, setEmailSuccessfullySent] = useState(false);

  async function onSubmit(data: FormData) {
    if (recaptchaValue) {
      const emailBody = {
        nomeDaEmpresa: data.nomeDaEmpresa,
        cpfCnpj: data.cpfCnpj,
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
        jaEClienteDoGoBank: data.jaEClienteDoGoBank,
        mensagem: data.mensagem,
      };

      const form = new FormData();
      for (const field in emailBody) {
        // @ts-ignore
        form.append(field, emailBody[field]);
      }

      await axios
        .post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/110/feedback?_wpcf7_unit_tag=true`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          console.log(response);
          reset();
          router.push(`/agradecimento-maquininhas-go-pag`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsRecaptchaValid(false);
    }
  }

  // React Hook Form

  // CPF/CNPJ
  const [inputValue, setInputValue] = useState('');
  const [documentoTipo, setDocumentoTipo] = useState('');

  const aplicaMascara = (valor: any) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 11) {
      return numeros
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    } else {
      return numeros
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valorComMascara = aplicaMascara(event.target.value);
    setInputValue(valorComMascara);
    setValue('cpfCnpj', valorComMascara);

    const apenasNumeros = valorComMascara.replace(/\D/g, '');
    if (apenasNumeros.length === 11) {
      setDocumentoTipo('CPF');
    } else if (apenasNumeros.length === 14) {
      setDocumentoTipo('CNPJ');
    } else {
      setDocumentoTipo('');
    }
  };

  useEffect(() => {
    if (documentoTipo === 'CPF') {
      setValue('nomeDaEmpresa', '-');
    } else if (documentoTipo === 'CNPJ') {
      setValue('nomeDaEmpresa', '');
    }
  }, [documentoTipo, setValue]);
  // CPF/CNPJ

  return (
    <>
      <Head>
        <title>Maquininhas Go.Pag para Empresas - Soluções de Pagamento Simples para PJ</title>
        <meta name='description' content='Descubra as maquininhas Go.Pag exclusivas para PJ. Soluções de pagamento simples para impulsionar seu negócio. Adquira já e simplifique suas transações.' />
        <meta name='keywords' content='Maquininhas gopay para PJ' />
        <link rel='canonical' content='https://www.gobank.com.br/maquininhas-go-pag' />
        <meta property='og:title' content='Maquininhas Go.Pag para Empresas - Soluções de Pagamento Simples para PJ' />
        <meta property='og:description' content='Descubra as maquininhas Go.Pag exclusivas para PJ. Soluções de pagamento simples para impulsionar seu negócio. Adquira já e simplifique suas transações.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/maquininhas-go-pag' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Maquininhas Go.Pag para Empresas - Soluções de Pagamento Simples para PJ' />
        <meta name='twitter:description' content='Descubra as maquininhas Go.Pag exclusivas para PJ. Soluções de pagamento simples para impulsionar seu negócio. Adquira já e simplifique suas transações.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='maquininhas-go-pag_CTA'>
        <section>
          <div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank'>
            <div style={bgTransformStyle}></div>

            <div className='flex w-full max-w-[1185px] flex-col items-center px-5 py-5 lg:gap-12 lg:pt-28 xl:flex-row'>
              <div className='flex flex-col lg:max-w-[481px]'>
                <h1 className='mb-9 text-4xl font-light text-white lg:text-6xl'>
                  Maquininhas <strong className='font-light text-green-go-bank'>Go.Pag</strong>
                </h1>
                <p className='w-full text-2xl font-light text-white lg:max-w-[660px]'>Turbine seu negócio e suas vendas no débito e crédito com as melhores taxas do mercado. Aceitamos as principais bandeiras.</p>
              </div>

              <Image className='hidden w-1/2 rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 lg:flex' src={image} alt='Image' />
            </div>
            <div id='form' />

            <div className='m-5 w-full max-w-[1185px] rounded-bl-25 rounded-br-50 rounded-tl-50 rounded-tr-50 border-[1px] border-green-go-bank p-4  lg:mt-36'>
              <form onSubmit={handleSubmit(onSubmit)} className='flex w-full max-w-[1185px] flex-col rounded-bl-25 rounded-br-50 rounded-tl-50 rounded-tr-50 bg-white p-5 p-5 lg:px-14 lg:py-9'>
                {/*Nome da Empresa e CPF*/}
                <div className='mb-8 flex flex-col gap-8 xl:flex-row'>
                  <div className='w-full'>
                    <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                      <input maxLength={18} value={inputValue} onChange={handleChange} placeholder='CPF/CNPJ:' className='w-full bg-transparent text-lg text-black-go-bank outline-0  placeholder:text-black-go-bank ' />
                      <p className='select-none text-lg text-green-go-bank'>*</p>
                    </div>
                    {errors.cpfCnpj && <p className='pt-1 text-red-500'>{errors.cpfCnpj.message}</p>}
                  </div>

                  {documentoTipo === 'CNPJ' && (
                    <div className='w-full'>
                      <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                        <input {...register('nomeDaEmpresa')} placeholder='Nome da empresa:' className='w-full bg-transparent text-lg text-black-go-bank outline-0  placeholder:text-black-go-bank ' />
                        <p className='select-none text-lg text-green-go-bank'>*</p>
                      </div>
                      {errors.nomeDaEmpresa && <p className='pt-1 text-red-500'>{errors.nomeDaEmpresa.message}</p>}
                    </div>
                  )}
                </div>
                {/*Nome da Empresa e CPF*/}

                {/*Nome do responsavel*/}
                <div className='mb-5 w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5 '>
                    <input {...register('nomeCompleto')} placeholder='Nome completo:' className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.nomeCompleto && <p className='pt-1 text-red-500'>{errors.nomeCompleto.message}</p>}
                </div>
                {/*Nome do responsavel*/}

                {/*E-mail e Telefone*/}
                <div className='mb-5 w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                    <input {...register('email')} placeholder='E-mail:' className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.email && <p className='pt-1 text-red-500'>{errors.email.message}</p>}
                </div>

                <div className='mb-5 w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                    <Controller
                      name='telefone'
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <input
                          value={value || ''} // Usando o valor do 'field'
                          onChange={(e) => onChange(formatTelefone(e.target.value))}
                          placeholder='Telefone:'
                          className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank'
                        />
                      )}
                    />
                    <div className='flex w-full max-w-[145px] gap-2'>
                      <label htmlFor='whatsapp' className='m-0 p-0 text-black-go-bank'>
                        Tem WhatsApp?
                      </label>
                      <input type='checkbox' id='whatsapp' {...control.register('whatsapp')} className='' />
                    </div>
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.telefone && <p className='pt-1 text-red-500'>{errors.telefone.message}</p>}
                </div>
                {/*E-mail e Telefone*/}

                {/*Já é cliente da GoCapital?*/}
                <div className='mb-5 w-full'>
                  <div className='relative flex w-full items-center gap-5 border-b-[1px]  border-black-go-bank pb-5'>
                    <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                    <select {...register('jaEClienteDoGoBank')} className='z-1 relative w-full appearance-none bg-transparent text-lg text-black-go-bank outline-0'>
                      <option disabled selected className='text-black-go-bank'>
                        Já é cliente da GoCapital?
                      </option>
                      <option value='Desejo contratar' className='text-black-go-bank'>
                        Desejo contratar
                      </option>
                      <option value='Já sou cliente e desejo atendimento' className='text-black-go-bank'>
                        Já sou cliente e desejo atendimento
                      </option>
                      <option value='Sou parceiro' className='text-black-go-bank'>
                        Sou parceiro
                      </option>
                      <option value='Outro' className='text-black-go-bank'>
                        Outro
                      </option>
                    </select>
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.jaEClienteDoGoBank && <p className='pt-1 text-red-500'>{errors.jaEClienteDoGoBank.message}</p>}
                </div>
                {/*Já é cliente da GoCapital?*/}

                {/*Mensagem*/}
                <div className='mb-16 flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                  <textarea {...register('mensagem')} placeholder='Mensagem:' className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank' />
                </div>
                {/*Mensagem*/}

                {/*Botao*/}
                <div className='flex w-full flex-col justify-end gap-5 lg:flex-row'>
                  <div className='flex w-full flex-col justify-end gap-5'>
                    <ReCAPTCHA sitekey='6Lc9PBotAAAAAENTOBGIFCZuB-00d61pOb2a-47O' onChange={handleRecaptcha} />
                    {!isRecaptchaValid && <p className='text-red-500'>Por favor, preencha o reCAPTCHA.</p>}
                  </div>

                  <button className={`group relative flex w-full flex-row items-center justify-between rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[80px] xl:max-w-[550px] xl:px-12 ${isSubmitting ? 'cursor-wait' : ''}`} disabled={isSubmitting}>
                    <p>Quero falar com especialista</p>
                    <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                  </button>
                </div>
                {/*Botao*/}
              </form>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-[#1D1D1D]'>
          <div className='flex w-full max-w-[1185px] flex-col gap-5 px-5 py-5 lg:py-20'>
            <h1 className='text-4xl text-white'>
              <strong className='font-normal text-green-go-bank'>A Go.Pag Maquininha</strong> é perfeita para o seu negócio
            </h1>
            <p className='mb-5 text-lg text-white lg:mb-32'>Não importa o tamanho da sua empresa: tem uma Go.Pag feita para você!</p>

            <div className='mb-5 flex flex-col justify-between gap-5 lg:mb-24 lg:flex-row'>
              <div className='flex flex-col items-center gap-5 lg:max-w-[200px] lg:gap-12'>
                <Image className='h-[61px] w-[61px]' src={maquininhaUm} alt='' />
                <p className='text-center text-white'>Taxas a partir de 0,99%</p>
              </div>

              <div className='flex flex-col items-center gap-5 lg:max-w-[200px] lg:gap-12'>
                <Image className='h-[61px] w-[61px]' src={maquininhaDois} alt='' />
                <p className='text-center text-white'>Sem aluguel</p>
              </div>

              <div className='flex flex-col items-center gap-5 lg:max-w-[200px] lg:gap-12'>
                <Image className='h-[61px] w-[61px]' src={maquininhaTres} alt='' />
                <p className='text-center text-white'>Antecipação de recebíveis em até 1 dia útil</p>
              </div>

              <div className='flex flex-col items-center gap-5 lg:max-w-[200px] lg:gap-12'>
                <Image className='h-[61px] w-[61px]' src={maquininhaQuatro} alt='' />
                <p className='text-center text-white'>Tecnologia 4G</p>
              </div>

              <div className='flex flex-col items-center gap-5 lg:max-w-[200px] lg:gap-12'>
                <Image className='h-[61px] w-[61px]' src={maquininhaCinco} alt='' />
                <p className='text-center text-white'>Geração de QR Code para pagamento via PIX</p>
              </div>
            </div>

            <div className='flex w-full justify-end gap-5'>
              <Link href='#form' className='group relative mx-auto flex w-full flex-row items-center justify-between rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[80px] xl:max-w-[450px] xl:px-12'>
                <p>Quero falar com especialista</p>
                <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
              </Link>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-white'>
          <div className='flex w-full max-w-[1185px] flex-col items-center gap-5 px-5 py-5 lg:flex-col-reverse lg:py-20 xl:flex-row'>
            {loaded && instanceRef.current && (
              <div className='flex -rotate-90 flex-col gap-5 xl:rotate-0'>
                <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 bg-white transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}>
                  <Image className='flex group-hover:hidden' src={blackArrowDropdownMenu} alt='' />
                  <Image className='hidden rotate-180 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                </div>

                <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 bg-white transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}>
                  <Image className='flex rotate-180 group-hover:hidden' src={blackArrowDropdownMenu} alt='' />
                  <Image className='hidden group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                </div>
              </div>
            )}

            <div className='flex flex-col items-center justify-center gap-14 xl:flex-row '>
              <div className='flex w-full max-w-[500px] justify-center'>
                <div ref={sliderRef} className='keen-slider h-[300px] w-full max-w-[300px] lg:h-[500px] lg:max-w-full'>
                  <div className='keen-slider__slide flex h-full w-full items-center justify-center'>
                    <Image className='h-full w-full rounded-40 object-cover' src={maquininhasGoPayUm} alt='' />
                  </div>
                  <div className='keen-slider__slide flex h-full w-full items-center justify-center'>
                    <Image className='h-full w-full rounded-40 object-cover' src={maquininhasGoPayDois} alt='' />
                  </div>
                  <div className='keen-slider__slide flex h-full w-full items-center justify-center'>
                    <Image className='h-full w-full rounded-40 object-cover' src={maquininhasGoPayTres} alt='' />
                  </div>
                  <div className='keen-slider__slide flex h-full w-full items-center justify-center'>
                    <Image className='h-full w-full rounded-40 object-cover' src={maquininhasGoPayQuatro} alt='' />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <p className='mb-8 max-w-[532px] text-lg text-black-go-bank'>As maquininhas de cartão Go.Pag são ideais para empresas de pequeno e médio porte que precisam oferecer mais formas de pagamento, mas não querem ficar no prejuízo.</p>
                <p className='text-4xl'>
                  Sabemos o quanto as taxas de juros abusivas podem atrapalhar o faturamento do seu negócio, mas adiantamos que <strong className='font-normal text-green-go-bank'>esse problema termina aqui!</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-[#F0F0F0]'>
          <div className='flex w-full max-w-[1185px] flex-col px-5 py-5 lg:py-28'>
            <h1 className='pb-7 text-4xl xl:text-6xl'>
              Esse é o jeito <strong className='font-normal text-green-go-bank'>GoCapital!</strong>
            </h1>
            <p className='w-full max-w-[600px] pb-11 text-lg'>Muito mais do que uma instituição financeira: somos seu parceiro de negócios! Veja como estamos fazendo a diferença na vida de milhares de pessoas e empresas.</p>

            <div className='flex flex-col justify-between gap-5 lg:flex-row'>
              <div className='bg-white-este-e-o-jeito-1 flex w-full flex-col gap-8 rounded-bl-50 rounded-br-50 rounded-tl-25 rounded-tr-50 p-5 lg:max-w-[360px] xl:p-14'>
                <p className='text-4xl text-black'>
                  Atendimento <strong className='font-normal text-green-go-bank'>personalizado</strong>
                </p>
                <p>Nossos consultores estão preparados para encontrar as melhores soluções financeiras para você e para o seu negócio. Receba uma consultoria focada nos seus objetivos.</p>
              </div>

              <div className='bg-white-este-e-o-jeito-2 flex w-full flex-col gap-8 rounded-bl-50 rounded-br-50 rounded-tl-25 rounded-tr-50 p-5 lg:max-w-[360px] xl:p-14'>
                <p className='text-4xl text-black'>
                  Na palma da <strong className='font-normal text-green-go-bank'>sua mão</strong>
                </p>
                <p>Faça tudo pela internet, pelo seu celular ou computador, sem sair de casa. Além de mais praticidade, você conta com uma consultoria financeira personalizada.</p>
              </div>

              <div className='bg-white-este-e-o-jeito-3 flex w-full flex-col gap-8 rounded-bl-50 rounded-br-50 rounded-tl-25 rounded-tr-50 p-5 lg:max-w-[360px] xl:p-14'>
                <p className='text-4xl text-black'>
                  Tecnologia e <strong className='font-normal text-green-go-bank'>eficiência</strong>
                </p>
                <p>Conte com o apoio da plataforma líder em crédito no Brasil. Garantimos mais agilidade e eficiência para você sempre que precisar.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
