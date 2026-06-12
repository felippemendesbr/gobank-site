import { ChangeEvent, CSSProperties, SetStateAction, useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import buttonWhiteArrow from '../../public/svgs/button-white-arrow.svg';
import buttonGreenArrow from '../../public/svgs/button-green-arrow.svg';

import credtioDescomplicadoUm from '../../public/svgs/credito-descomplicado-um.svg';
import credtioDescomplicadoDois from '../../public/svgs/credito-descomplicado-dois.svg';
import credtioDescomplicadoTres from '../../public/svgs/credito-descomplicado-tres.svg';
import credtioDescomplicadoQuatro from '../../public/svgs/credito-descomplicado-quatro.svg';
import credtioDescomplicadoCinco from '../../public/svgs/credito-descomplicado-cinco.svg';
import credtioDescomplicadoSeis from '../../public/svgs/credito-descomplicado-seis.svg';
import credtioDescomplicadoSete from '../../public/svgs/credito-descomplicado-sete.svg';

import image from '../../public/images/image-credito-descomplicado.webp';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';

const animation = { duration: 20000, easing: (t: number) => t };

type FormData = {
  nomeDaEmpresa: string;
  cpfCnpj: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  whatsapp?: boolean;
  cidadeEUF: string;
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
  cidadeEUF: Yup.string().required('Cidade e UF é obrigatório'),
  mensagem: Yup.string(),
});

export default function CreditoDescomplicado() {
  // Recaptcha
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(true);
  const handleRecaptcha = (value: string | null) => {
    setRecaptchaValue(value);
    setIsRecaptchaValid(!!value);
  };

  // Slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: true,
    breakpoints: {
      '(min-width: 991px)': {
        slides: { perView: 3, spacing: 20 },
      },
    },
    slides: {
      perView: 1,
      spacing: 20,
    },
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
  // Slide

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
    setValue,
    register,
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
        cidadeEUF: data.cidadeEUF,
        mensagem: data.mensagem,
      };
      const form = new FormData();
      for (const field in emailBody) {
        // @ts-ignore
        form.append(field, emailBody[field]);
      }
      await axios
        .post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/34/feedback?_wpcf7_unit_tag=true`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          console.log(response);
          reset();
          router.push(`/agradecimento-credito-descomplicado`);
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
        <title>Crédito Descomplicado na GoCapital P/ Pessoa Jurídica (PJ) </title>
        <meta name='description' content='Conheça as linhas de crédito descomplicado na GoCapital para PJ. Pensadas para empresas, temos opções de crédito com taxas à partir de 1,5%. Consulte a disponibilidade para o seu CNPJ.' />
        <meta name='keywords' content='Crédito para PJ' />
        <link rel='canonical' content='https://www.gobank.com.br/credito-descomplicado' />
        <meta property='og:title' content='Crédito Descomplicado na GoCapital P/ Pessoa Jurídica (PJ) ' />
        <meta property='og:description' content='Conheça as linhas de crédito descomplicado na GoCapital para PJ. Pensadas para empresas, temos opções de crédito com taxas à partir de 1,5%. Consulte a disponibilidade para o seu CNPJ.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/credito-descomplicado' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Crédito Descomplicado na GoCapital P/ Pessoa Jurídica (PJ) ' />
        <meta name='twitter:description' content='Conheça as linhas de crédito descomplicado na GoCapital para PJ. Pensadas para empresas, temos opções de crédito com taxas à partir de 1,5%. Consulte a disponibilidade para o seu CNPJ.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='credito-descomplicado_CTA'>
        <section>
          <div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank'>
            <div style={bgTransformStyle}></div>

            <div className='flex w-full max-w-[1185px] items-center gap-5 px-5 pt-5 xl:pt-28'>
              <div className='flex flex-col'>
                <h1 className='mb-9 text-4xl font-light text-white lg:text-5xl'>
                  Crédito <strong className='font-light text-green-go-bank'>Descomplicado</strong> para PJ
                </h1>
                <p className='mb-16 w-full max-w-[660px] text-2xl font-light text-white'>A GoCapital oferece soluções de acesso a linhas de crédito desburocratizadas para impulsionar o desenvolvimento da sua empresa. Um dos nossos executivos cuidará da análise e fornecerá total suporte durante o processo de contratação de empréstimos, garantindo agilidade e segurança.</p>
                <Link href='#form' className='group relative flex max-w-[485px] flex-row items-center justify-between rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 bg-green-go-bank p-5 text-2xl transition-all hover:opacity-80 lg:hover:max-w-[508px] xl:h-[80px] xl:px-12'>
                  <p>Quero falar com especialista</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                </Link>
              </div>
              <Image className='hidden w-1/2 rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 lg:flex' src={image} alt='Image' />
            </div>

            <form id='form' onSubmit={handleSubmit(onSubmit)} className='flex w-full max-w-[1185px] flex-col p-5 pt-5 xl:mb-32 xl:pt-36'>
              {/*Nome da Empresa e CPF*/}
              <div className='mb-8 flex flex-col gap-8 xl:flex-row'>
                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input maxLength={18} value={inputValue} onChange={handleChange} placeholder='CPF/CNPJ:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.cpfCnpj && <p className='pt-1 text-red-500'>{errors.cpfCnpj.message}</p>}
                </div>

                {documentoTipo === 'CNPJ' && (
                  <div className='w-full'>
                    <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                      <input {...register('nomeDaEmpresa')} placeholder='Nome da empresa:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                      <p className='select-none text-lg text-green-go-bank'>*</p>
                    </div>
                    {errors.nomeDaEmpresa && <p className='pt-1 text-red-500'>{errors.nomeDaEmpresa.message}</p>}
                  </div>
                )}
              </div>
              {/*Nome da Empresa e CPF*/}

              {/*Nome completo*/}
              <div className='mb-8 flex flex-col gap-8 xl:flex-row'>
                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5 '>
                    <input {...register('nomeCompleto')} placeholder='Nome do responsável:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.nomeCompleto && <p className='pt-1 text-red-500'>{errors.nomeCompleto.message}</p>}
                </div>

                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input {...register('email')} placeholder='E-mail:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.email && <p className='pt-1 text-red-500'>{errors.email.message}</p>}
                </div>
              </div>
              {/*Nome completo*/}

              {/*E-mail e Telefone*/}
              <div className='mb-8 flex flex-col gap-8 xl:flex-row'>
                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <Controller
                      name='telefone'
                      control={control}
                      render={(
                        { field: { onChange, value } } // Desestruturando corretamente o objeto 'field'
                      ) => (
                        <input
                          value={value || ''} // Usando o valor do 'field'
                          onChange={(e) => onChange(formatTelefone(e.target.value))} // Usando o manipulador 'onChange' do 'field'
                          placeholder='Telefone:'
                          className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white'
                        />
                      )}
                    />
                    <div className='flex w-full max-w-[145px] gap-2'>
                      <label htmlFor='whatsapp' className='m-0 p-0 text-white'>
                        Tem WhatsApp?
                      </label>
                      <input type='checkbox' id='whatsapp' {...control.register('whatsapp')} className='' />
                    </div>
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.telefone && <p className='pt-1 text-red-500'>{errors.telefone.message}</p>}
                </div>

                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input {...register('cidadeEUF')} placeholder='Cidade/UF:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.cidadeEUF && <p className='pt-1 text-red-500'>{errors.cidadeEUF.message}</p>}
                </div>
              </div>
              {/*E-mail e Telefone*/}

              {/*Cidade e Mensagem*/}
              <div className='mb-8 flex flex-col items-start gap-8 xl:flex-row'>
                <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                  <textarea {...register('mensagem')} placeholder='Mensagem:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                </div>
              </div>
              {/*Cidade e Mensagem*/}

              {/*Mensagem e botao*/}
              <div className='flex flex-col gap-8 xl:flex-row'>
                <div className='flex w-full flex-col justify-end gap-5'>
                  <ReCAPTCHA sitekey='6Lc9PBotAAAAAENTOBGIFCZuB-00d61pOb2a-47O' onChange={handleRecaptcha} />
                  {!isRecaptchaValid && <p className='text-red-500'>Por favor, preencha o reCAPTCHA.</p>}
                </div>

                <div className='flex w-full justify-end gap-5'>
                  <button className={`group relative flex w-full flex-row items-center justify-between rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[80px] xl:max-w-[550px] xl:px-12 ${isSubmitting ? 'cursor-wait' : ''}`} disabled={isSubmitting}>
                    <p>Quero falar com especialista</p>
                    <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                  </button>
                </div>
              </div>
              {/*Mensagem e botao*/}
            </form>
          </div>
        </section>

        <section className='flex items-center justify-center bg-gray-dark-go-bank px-5 py-5 xl:pb-28 xl:pt-20'>
          <div className='flex w-full flex-col items-center'>
            <div className='flex w-full max-w-[1185px] flex-col justify-between gap-5 px-5 py-5 xl:flex-row xl:py-28'>
              <h1 className='max-w-[850px]	text-4xl font-light text-white'>
                O crédito que sua empresa precisa com condições <strong className='font-normal text-green-go-bank'>que cabem no seu bolso.</strong>
              </h1>

              {loaded && instanceRef.current && (
                <div className='flex gap-5'>
                  <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}>
                    <Image className='flex rotate-90 group-hover:hidden' src={whiteArrowDropdownMenu} alt='' />
                    <Image className='hidden rotate-90 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                  </div>

                  <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}>
                    <Image className='flex -rotate-90 group-hover:hidden' src={whiteArrowDropdownMenu} alt='' />
                    <Image className='hidden -rotate-90 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                  </div>
                </div>
              )}
            </div>

            <div ref={sliderRef} className='keen-slider flex'>
              <div className='keen-slider__slide flex flex-col justify-between gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black p-10'>
                <div className='flex flex-col gap-14'>
                  <p className='text-4xl font-light text-white'>
                    Crédito PJ <strong className='font-light text-green-go-bank'>com garantia de imóvel</strong>
                  </p>
                  <p className='text-lg text-white'>Capital de giro de longo prazo para pessoa jurídica com as melhores taxas do mercado.</p>
                </div>
                <Link href='#form' className='group flex flex-row items-center gap-5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-white'>Quero contratar!</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonWhiteArrow} alt='' />
                </Link>
              </div>

              <div className=' keen-slider__slide flex flex flex-col flex-col justify-between gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black-go-bank p-10'>
                <div className='flex flex-col gap-14'>
                  <p className='text-4xl font-light text-white'>
                    Crédito PJ <strong className='font-light text-green-go-bank'>com garantia de veículo</strong>
                  </p>
                  <p className='text-lg text-white'>Modalidade de capital de giro com garantia de veículo com foco em pequenas e médias empresas.</p>
                </div>
                <Link href='#form' className='group flex flex-row items-center gap-5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-green-go-bank'>Quero contratar!</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonGreenArrow} alt='' />
                </Link>
              </div>

              <div className='keen-slider__slide flex flex-col justify-between gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black p-10'>
                <div className='flex flex-col gap-14'>
                  <p className='text-4xl font-light text-white'>
                    Crédito PJ <strong className='font-light text-green-go-bank'>para capital de giro</strong>
                  </p>
                  <p className='text-lg text-white'>Linha de crédito pessoa jurídica com a finalidade de fortalecer o caixa da empresa. Operações com garantia: aval – duplicata – investimentos, entre outros.</p>
                </div>
                <Link href='#form' className='group flex flex-row items-center gap-5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-white'>Quero contratar!</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonWhiteArrow} alt='' />
                </Link>
              </div>

              <div className='keen-slider__slide flex flex flex-col flex-col justify-between gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black-go-bank p-10'>
                <div className='flex flex-col gap-14'>
                  <p className='text-4xl font-light text-white'>
                    Crédito PJ <strong className='font-light text-green-go-bank'>para antecipação de recebíveis</strong>
                  </p>
                  <p className='text-lg text-white'>O processo de antecipação com a GoCapital é totalmente digital, com menos burocracia, taxas mais atrativas, transparência e atendimento especializado.</p>
                </div>
                <Link href='#form' className='group flex flex-row items-center gap-5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-green-go-bank'>Quero contratar!</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonGreenArrow} alt='' />
                </Link>
              </div>

              <div className='keen-slider__slide flex flex-col justify-between gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black p-10'>
                <div className='flex flex-col gap-14'>
                  <p className='text-4xl font-light text-white'>
                    Crédito PJ <strong className='font-light text-green-go-bank'>com garantia de imóvel</strong>
                  </p>
                  <p className='text-lg text-white'>Capital de giro de longo prazo para pessoa jurídica com as melhores taxas do mercado.</p>
                </div>
                <Link href='#form' className='group flex flex-row items-center gap-5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-white'>Quero contratar!</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonWhiteArrow} alt='' />
                </Link>
              </div>

              <div className=' keen-slider__slide flex flex flex-col flex-col justify-between gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black-go-bank p-10'>
                <div className='flex flex-col gap-14'>
                  <p className='text-4xl font-light text-white'>
                    Crédito PJ <strong className='font-light text-green-go-bank'>com garantia de veículo</strong>
                  </p>
                  <p className='text-lg text-white'>Modalidade de capital de giro com garantia de veículo com foco em pequenas e médias empresas.</p>
                </div>
                <Link href='#form' className='group flex flex-row items-center gap-5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-green-go-bank'>Quero contratar!</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonGreenArrow} alt='' />
                </Link>
              </div>

              <div className='keen-slider__slide flex flex-col justify-between gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black p-10'>
                <div className='flex flex-col gap-14'>
                  <p className='text-4xl font-light text-white'>
                    Crédito PJ <strong className='font-light text-green-go-bank'>para capital de giro</strong>
                  </p>
                  <p className='text-lg text-white'>Linha de crédito pessoa jurídica com a finalidade de fortalecer o caixa da empresa. Operações com garantia: aval – duplicata – investimentos, entre outros.</p>
                </div>
                <Link href='#form' className='group flex flex-row items-center gap-5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-white'>Quero contratar!</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonWhiteArrow} alt='' />
                </Link>
              </div>

              <div className=' keen-slider__slide flex flex flex-col flex-col justify-between gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black-go-bank p-10'>
                <div className='flex flex-col gap-14'>
                  <p className='text-4xl font-light text-white'>
                    Crédito PJ <strong className='font-light text-green-go-bank'>para antecipação de recebíveis</strong>
                  </p>
                  <p className='text-lg text-white'>Capital de giro de longo prazo para pessoa jurídica com as melhores taxas do mercado.</p>
                </div>
                <Link href='#form' className='group flex flex-row items-center gap-5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-green-go-bank'>Quero contratar!</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonGreenArrow} alt='' />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-white'>
          <div className='w-full max-w-[1185px] px-5 py-5	lg:pb-10 lg:pt-10'>
            <h1 className='mx-auto mb-5 text-center text-4xl lg:mb-24 lg:max-w-[938px]'>
              <strong className='font-normal text-green-go-bank'>Temos condições especiais em linhas de crédito para você que deseja </strong> ampliar sua empresa.
            </h1>

            <div className='mb-5 flex flex-col flex-wrap items-center justify-between gap-5 lg:mb-16 lg:flex-row lg:gap-10'>
              <div className='flex w-full max-w-[200px] flex-col items-center justify-center gap-5 lg:gap-9'>
                <Image src={credtioDescomplicadoUm} alt='' />
                <p className='text-center text-lg'>Taxas a partir de 1,5%</p>
              </div>

              <div className='flex w-full max-w-[200px] flex-col items-center justify-center gap-5 lg:gap-9'>
                <Image src={credtioDescomplicadoDois} alt='' />
                <p className='text-center text-lg'>Financiamento de veículos</p>
              </div>

              <div className='flex w-full max-w-[200px] flex-col items-center justify-center gap-5 lg:gap-9'>
                <Image src={credtioDescomplicadoTres} alt='' />
                <p className='text-center text-lg'>Crédito BNDES - Desenvolve SP e FGI</p>
              </div>

              <div className='flex w-full max-w-[200px] flex-col items-center justify-center gap-5 lg:gap-9'>
                <Image src={credtioDescomplicadoQuatro} alt='' />
                <p className='text-center text-lg'>PRONAMPE - Pequenas e Médias Empresas</p>
              </div>
            </div>

            <div className='flex flex-col flex-wrap items-center justify-center gap-5 lg:flex-row lg:gap-x-10'>
              <div className='flex w-full max-w-[200px] flex-col items-center justify-center gap-5 lg:gap-9'>
                <Image src={credtioDescomplicadoCinco} alt='' />
                <p className='text-center text-lg'>Capital de Giro (Aval)</p>
              </div>

              <div className='flex w-full max-w-[200px] flex-col items-center justify-center gap-5 lg:gap-9'>
                <Image src={credtioDescomplicadoSeis} alt='' />
                <p className='text-center text-lg'>Capital de Giro com garantia de imóvel e veículo</p>
              </div>

              <div className='flex w-full max-w-[200px] flex-col items-center justify-center gap-5 lg:gap-9'>
                <Image src={credtioDescomplicadoSete} alt='' />
                <p className='text-center text-lg'>Home Equity</p>
              </div>
            </div>

            <Link href='#form' className='group relative mx-auto my-5 flex flex-row items-center justify-between rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 lg:mt-24 lg:max-w-[442px] xl:h-[110px] xl:px-12'>
              <p>Consulte o crédito disponível para a sua empresa</p>
              <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
            </Link>
          </div>
        </section>

        <section className='flex items-center justify-center bg-white pb-5 lg:pb-32'>
          <div className='flex w-full max-w-[1554px] items-center justify-center gap-5 bg-[#F0F0F0] px-5 py-5 lg:rounded-bl-50 lg:rounded-br-25 lg:rounded-tl-50 lg:rounded-tr-50 lg:py-20'>
            <div className='flex w-full max-w-[1200px] flex-col items-end gap-5 lg:flex-row lg:gap-11'>
              <div className='w-full lg:max-w-[50%]'>
                <p className='mb-20 text-4xl text-black-go-bank'>
                  Para quais finalidades posso utilizar as <strong className='font-normal text-green-go-bank'>linhas de crédita GoCapital?</strong>
                </p>
                <ul className='flex list-disc flex-col gap-5 pl-7 text-3xl'>
                  <li>Ampliar sua empresa</li>
                  <li>Aumentar sua produção</li>
                  <li>Investir em máquinas e equipamentos</li>
                  <li>Capital de giro para fôlego do seu caixa</li>
                  <li>Aquisição de matéria-prima e outras necessidades para o seu negócio</li>
                </ul>
              </div>
              <div className='flex w-full flex-col justify-start gap-5 lg:max-w-[50%] lg:gap-24'>
                <p className='text-2xl'>Tudo isso com a vantagem de prazos e condições que possibilitam pagar esse seu investimento com os resultados obtidos a médio e longo prazo.</p>
                <Link href='#form' className='group relative flex flex-row  items-center justify-between rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[110px] xl:px-12'>
                  <p>Consulte o crédito disponível para a sua empresa</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                </Link>
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
