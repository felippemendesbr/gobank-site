import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';
import buttonGreenArrow from '../../public/svgs/button-green-arrow.svg';
import buttonGreenArrowAlt from '../../public/svgs/button-green-arrow-alt.svg';
import greenSelectArrow from '../../public/svgs/green-select-arrow.svg';

import image from '../../public/images/image-seja-um-parceiro.webp';

import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';

import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const animation = { duration: 20000, easing: (t: number) => t };

type FormData = {
  nomeCompleto: string;
  nomeDaEmpresa: string;
  cpfCnpj: string;
  estado: string;
  cidade: string;
  telefone: string;
  whatsapp?: boolean;
  atuacao: any[];
  funcao: string;
  media: string;
  outros?: string;
  mensagem: string;
  email: string;
};

const validaCPF = (cpf: any) => {
  return cpf.length === 11;
};

const validaCNPJ = (cnpj: any) => {
  return cnpj.length === 14;
};

type Estado = {
  id: number;
  nome: string;
  sigla: string;
};

type Cidade = {
  id: number;
  nome: string;
};

const validationSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required('Nome completo é obrigatório'),
  nomeDaEmpresa: Yup.string().required('Nome da Empresa é obrigatório'),
  cpfCnpj: Yup.string()
    .required('Este campo é obrigatório.')
    .test('valida-cpf-cnpj', 'CPF ou CNPJ inválido', (value) => {
      const apenasNumeros = value.replace(/\D/g, '');
      return validaCPF(apenasNumeros) || validaCNPJ(apenasNumeros);
    }),
  estado: Yup.string().required('Selecione o estado e a cidade'),
  cidade: Yup.string().required('Selecione o estado e a cidade'),
  telefone: Yup.string()
    .required('Telefone é obrigatório')
    .matches(/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/, 'Telefone inválido'),
  whatsapp: Yup.boolean(),
  atuacao: Yup.array().of(Yup.string()).min(1, 'Selecione pelo menos um produto de crédito').required('A seleção de um produto de crédito é obrigatória'),
  funcao: Yup.string().required('A seleção de uma função é obrigatória'),
  media: Yup.string().required('A seleção da média de propostas é obrigatória'),
  outros: Yup.string(),
  mensagem: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Por favor, insira um endereço de e-mail válido').required('E-mail é obrigatório'),
});

export default function SejaUmParceiro() {
  // Recaptcha
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(true);
  const handleRecaptcha = (value: string | null) => {
    setRecaptchaValue(value);
    setIsRecaptchaValid(!!value);
  };

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
    slideChanged(slider: any) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(s: any) {
      setLoaded(true);
    },
  });

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
    trigger,
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const [emailSuccessfullySent, setEmailSuccessfullySent] = useState(false);

  async function onSubmit(data: FormData) {
    if (recaptchaValue) {
      const emailBody = {
        nomeCompleto: data.nomeCompleto,
        nomeDaEmpresa: data.nomeDaEmpresa,
        cpfCnpj: data.cpfCnpj,
        estado: data.estado,
        cidade: data.cidade,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
        atuacao: data.atuacao,
        funcao: data.funcao,
        media: data.media,
        outros: data.outros,
        mensagem: data.mensagem,
        email: data.email,
      };

      const form = new FormData();
      for (const field in emailBody) {
        // @ts-ignore
        form.append(field, emailBody[field]);
      }

      try {
        const response = await axios.post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/147/feedback?_wpcf7_unit_tag=true`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response);
        reset();
        router.push(`/agradecimento-seja-um-parceiro`);
      } catch (error) {
        console.error('Erro ao enviar o formulário: ', error);
      }
      console.log(data);
    } else {
      setIsRecaptchaValid(false);
    }
  }

  // React Hook Form

  // Estado e cidade
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json())
      .then((data) => setEstados(data));
  }, []);
  useEffect(() => {
    if (estadoSelecionado) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
        .then((response) => response.json())
        .then((data) => setCidades(data));
    }
  }, [estadoSelecionado]);
  const handleEstadoChange = (event: any) => {
    setEstadoSelecionado(event.target.value);
    setCidades([]);
  };
  // Estado e cidade

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

  // Etapa
  const [etapaAtual, setEtapaAtual] = useState(1);
  const handleProximaEtapa = async () => {
    let camposValidos = false;

    if (etapaAtual === 1) {
      camposValidos = await trigger(['nomeCompleto', 'cpfCnpj', 'nomeDaEmpresa', 'telefone', 'estado', 'cidade', 'email']);
    } else if (etapaAtual === 2) {
      camposValidos = await trigger(['atuacao', 'funcao', 'media', 'outros']); // Inclua aqui todos os campos da etapa 2
    }

    if (camposValidos) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      console.log('Falha na validação dos campos da etapa', etapaAtual);
    }
  };

  const handleEtapaAnterior = () => {
    setEtapaAtual(etapaAtual - 1);
  };
  // Etapa

  return (
    <>
      <Head>
        <title>Seja um Parceiro GoCapital - Impulsione sua Receita Rápido e Fácil!</title>
        <meta name='description' content='Conheça todas as vantagens de ser um parceiro da GoCapital! Aumente seu portfólio, faça com que o cliente tenha maior poder de compra e impulsione a sua receita.' />
        <meta name='keywords' content='Seja um parceiro gobank' />
        <link rel='canonical' content='https://www.gobank.com.br/seja-um-parceiro' />
        <meta property='og:title' content='Seja um Parceiro GoCapital - Impulsione sua Receita Rápido e Fácil!' />
        <meta property='og:description' content='Conheça todas as vantagens de ser um parceiro da GoCapital! Aumente seu portfólio, faça com que o cliente tenha maior poder de compra e impulsione a sua receita.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/seja-um-parceiro' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Seja um Parceiro GoCapital - Impulsione sua Receita Rápido e Fácil!' />
        <meta name='twitter:description' content='Conheça todas as vantagens de ser um parceiro da GoCapital! Aumente seu portfólio, faça com que o cliente tenha maior poder de compra e impulsione a sua receita.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='seja-um-parceiro_CTA'>
        <section>
          <div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank'>
            <div style={bgTransformStyle}></div>

            <div className='flex w-full max-w-[1185px] items-center gap-5 px-5 py-5 xl:py-28'>
              <div className='flex flex-col'>
                <h1 className='mb-9 text-4xl font-light text-white lg:text-6xl'>
                  GoCapital <strong className=' font-light text-green-go-bank'>Partners</strong>
                </h1>
                <p className=' mb-5 w-full max-w-[660px] text-2xl font-light text-white xl:mb-32'>Ofereça soluções exclusivas que viabilizam novos negócios para seus clientes</p>
                <Link href='#form' className='group relative flex max-w-[360px] flex-row items-center justify-between rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[80px] xl:px-12'>
                  <p>Quero ser parceiro</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                </Link>
              </div>
              <Image className='hidden w-1/2 rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 lg:flex' src={image} alt='Image' />
            </div>

            <div className='flex w-full max-w-[1185px] flex-col items-center justify-center p-5 '>
              <div className='flex flex-col gap-5 lg:flex-row'>
                <div className='flex flex-col gap-5 rounded-bl-50 rounded-br-25 rounded-tl-50 rounded-tr-50 bg-white px-5 py-5 xl:h-[278px] xl:max-w-[278px] xl:pb-0 xl:pt-8'>
                  <p className='text-4xl font-light text-black-go-bank'>
                    Aumente seu <strong className='font-light text-green-go-bank'>portfólio</strong>
                  </p>
                  <p className='text-lg text-black-go-bank'>Faça com que o cliente tenha maior poder de compra com crédito de qualidade e acelere suas vendas.</p>
                </div>

                <div className='flex flex-col gap-5 rounded-bl-50 rounded-br-25 rounded-tl-50 rounded-tr-50 bg-gray-light-go-bank px-5 py-5 xl:h-[278px] xl:max-w-[278px] xl:pb-0 xl:pt-8'>
                  <p className='text-4xl font-light text-white'>
                    <strong className='font-light text-green-go-bank'>Rápido</strong> e fácil
                  </p>
                  <p className='text-lg text-white'>Preencha seu formulário on-line e acompanhe o andamento das indicações com um de nossos consultores.</p>
                </div>

                <div className='flex flex-col gap-5 rounded-bl-50 rounded-br-25 rounded-tl-50 rounded-tr-50 bg-green-go-bank px-5 py-5 xl:h-[278px] xl:max-w-[278px] xl:pb-0 xl:pt-8'>
                  <p className='text-4xl font-light text-white'>Impulsione sua receita</p>
                  <p className='text-lg text-black-go-bank'>Para cada contrato fechado, você recebe uma comissão exclusiva da GoCapital.</p>
                </div>

                <div className='flex flex-col gap-5 rounded-bl-50 rounded-br-25 rounded-tl-50 rounded-tr-50 bg-transparent px-5 py-5 xl:h-[278px] xl:max-w-[278px] xl:pb-0 xl:pt-8'>
                  <p className='text-4xl font-light text-white'>
                    Conte com <strong className='font-light text-green-go-bank'>a gente</strong>
                  </p>
                  <p className='text-lg text-white'>Nossos consultores especializados estão sempre à disposição para te ajudar.</p>
                </div>
              </div>

              <Link href='#form' className='group relative mb-5 mt-5 flex w-full max-w-[431px] flex-row items-center justify-center gap-5 rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:mb-28 xl:mt-16 xl:h-[80px] xl:px-12'>
                <p>Quero ser parceiro</p>
                <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
              </Link>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-gray-dark-go-bank px-5 py-5 xl:pb-28 xl:pt-20'>
          <div className='flex w-full flex-col items-center'>
            <div className='flex w-full max-w-[1185px] flex-col justify-between gap-5 px-5 py-5 xl:flex-row xl:py-28'>
              <h1 className='text-4xl	font-light text-white'>
                Escolha a <strong className='font-normal text-green-go-bank'>melhor</strong> solução para o seu cliente:
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
              <div className='keen-slider__slide flex flex-col gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black p-10'>
                <p className='text-4xl font-light text-white'>
                  <strong className='font-light text-green-go-bank'>Capital de giro</strong> sem garantias físicas
                </p>
                <p className='text-lg text-white'>Empréstimo desburocratizado sem garantias físicas.</p>
                <p className='text-lg text-white'>Para empresas com entre 1 a 3 anos de atividade: Crédito com limite de R$ 150 mil em 24 parcelas e até 6 meses de carência.</p>
                <p className='text-lg text-white'>Para empresas com mais de 3 anos de atividade: Crédito com limite de R$ 700 mil em 60 parcelas e até 12 meses de carência.</p>
              </div>

              <div className=' keen-slider__slide flex flex-col gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black-go-bank p-10'>
                <p className='text-4xl font-light text-white'>
                  Empréstimo <strong className='font-light text-green-go-bank'>com garantia de imóvel</strong>
                </p>
                <p className='text-lg text-white'>Taxa: A partir de 0.59% a.m. fixa ou 1% + IPCA, Prazo: até 240 meses.</p>
                <p className='text-lg text-white'>Carência: 30 dias.</p>
                <p className='text-lg text-white'>Empréstimo com imóveis como garantia com taxas a partir de 0.59% a.m. fixa ou 1% + IPCA. Nesta modalidade o prazo é de até 240 meses com 30 dias de carência.</p>
              </div>

              <div className=' keen-slider__slide flex flex-col gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black p-10'>
                <p className='text-4xl font-light text-white'>
                  <strong className='font-light text-green-go-bank'>Antecipação</strong> de recebíveis
                </p>
                <p className='text-lg text-white'>O processo de antecipação com a GoCapital é totalmente digital, com menos burocracia, taxas mais atrativas, transparência e atendimento especializado.</p>
              </div>

              <div className=' keen-slider__slide flex flex-col gap-5 rounded-bl-50 rounded-br-50 rounded-tl-50 rounded-tr-25 bg-black-go-bank p-10'>
                <p className='text-4xl font-light text-white'>
                  Empréstimo <strong className='font-light text-green-go-bank'>com garantia de veículo</strong>
                </p>
                <p className='text-lg text-white'>Empréstimo facilitado com veículos como garantia. Essa modalidade oferece melhores condições para o contratante e juros a partir de 0,99% ao mês.</p>
              </div>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-white bg-cover bg-center px-5 py-5 lg:bg-background-por-que-escolher-go-bank xl:pb-28 xl:pt-20'>
          <div className='flex w-full max-w-[1185px] justify-end'>
            <div className='w-full lg:max-w-[754px]'>
              <h1 className='mb-5 text-5xl text-black-go-bank lg:mb-16 lg:text-6xl'>
                <strong className='font-normal text-green-go-bank'>Por que escolher a GoCapital</strong> como parceiro?
              </h1>
              <p className='mb-5 text-lg'>
                Nós, como GoCapital, <strong>acreditamos que a matéria-prima para o sucesso são relações sólidas com parceiros estratégicos</strong> que compartilham da mesma visão de negócio e valores que nossa empresa.
              </p>
              <p className='mb-5 text-lg'>Nosso objetivo central é democratizar o acesso a crédito para nossos clientes com as melhores condições de mercado, fortalecendo seus negócios e criando novas oportunidades para seu crescimento.</p>
              <p className='mb-5 text-lg lg:mb-32'>
                Para isso, <strong>procuramos uma rede de parceiros confiáveis</strong> como contadores, correspondentes bancários, consultores e gestores financeiros que podem diversificar o portfólio e aumentar sua receita com nossos produtos de crédito.
              </p>
              <Link href='#form' className='group relative mb-5 mt-5 flex w-full flex-row items-center justify-center gap-5 rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 lg:max-w-[431px] xl:mb-10 xl:mt-16 xl:h-[80px] xl:px-12'>
                <p>Quero ser parceiro</p>
                <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
              </Link>
            </div>
          </div>
        </section>

        <section id='form' className='flex items-center justify-center bg-white bg-center px-5 py-5 lg:bg-background-por-que-escolher-go-bank-form lg:py-28'>
          <div className='flex w-full max-w-[1185px] justify-center'>
            <div className='P-5 flex w-full flex-col gap-5 rounded-50 bg-white lg:flex-row lg:gap-24 lg:p-20'>
              <div className='flex flex-col gap-5 text-lg'>
                <p>
                  <strong>Preencha seus dados</strong> para darmos início a nossa parceria
                </p>
                <h1 className=' text-4xl font-light lg:text-6xl'>
                  Informações de <strong className='font-light text-green-go-bank'>contato</strong>
                </h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col lg:max-w-[585px]'>
                {/*Etapa Um*/}
                {etapaAtual === 1 && (
                  <div className='flex h-full w-full flex-col justify-between lg:max-w-[585px]'>
                    <div>
                      {/*Nome completo*/}
                      <div className='mb-8 w-full'>
                        <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                          <input {...register('nomeCompleto')} placeholder='Nome Completo:' className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank' />
                          <p className='select-none text-lg text-green-go-bank'>*</p>
                        </div>
                        {errors.nomeCompleto && <p className='pt-1 text-red-500'>{errors.nomeCompleto.message}</p>}
                      </div>
                      {/*Nome completo*/}

                      {/*Nome da Empresa*/}
                      <div className='mb-8 w-full'>
                        <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                          <input maxLength={18} value={inputValue} onChange={handleChange} placeholder='CPF/CNPJ:' className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank' />
                          <p className='select-none text-lg text-green-go-bank'>*</p>
                        </div>
                        {errors.cpfCnpj && <p className='pt-1 text-red-500'>{errors.cpfCnpj.message}</p>}
                      </div>
                      {/*Nome da Empresa*/}

                      {/*CNPJ*/}
                      {documentoTipo === 'CNPJ' && (
                        <div className='mb-8 w-full'>
                          <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                            <input {...register('nomeDaEmpresa')} placeholder='Nome da empresa:' className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank' />
                            <p className='select-none text-lg text-green-go-bank'>*</p>
                          </div>
                          {errors.nomeDaEmpresa && <p className='pt-1 text-red-500'>{errors.nomeDaEmpresa.message}</p>}
                        </div>
                      )}
                      {/*CNPJ*/}

                      {/*Telefone*/}
                      <div className='mb-8 w-full'>
                        <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-3'>
                          <Controller name='telefone' control={control} render={({ field: { onChange, value } }) => <input value={value || ''} onChange={(e) => onChange(formatTelefone(e.target.value))} placeholder='Telefone:' className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank' />} />
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
                      {/*Telefone*/}

                      {/*E-mail*/}
                      <div className='mb-8 w-full'>
                        <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                          <input {...register('email')} placeholder='E-mail:' className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank' />
                          <p className='select-none text-lg text-green-go-bank'>*</p>
                        </div>
                        {errors.email && <p className='pt-1 text-red-500'>{errors.email.message}</p>}
                      </div>
                      {/*E-mail*/}

                      {/*Estado e cidade*/}
                      <div className='mb-8 flex w-full flex-col'>
                        <div className='flex w-full flex-col gap-8 lg:flex-row lg:gap-5'>
                          <div className='flex w-full flex-col'>
                            <div className='relative flex w-full items-center gap-5  border-b-[1px] border-black-go-bank pb-3'>
                              <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                              <select {...register('estado')} value={estadoSelecionado} onChange={handleEstadoChange} className='z-1 relative w-full appearance-none bg-transparent text-lg text-black-go-bank outline-0'>
                                <option className='text-black-go-bank' disabled value=''>
                                  Estado:
                                </option>
                                {estados.map((estado) => (
                                  <option className='text-black-go-bank' key={estado.id} value={estado.sigla}>
                                    {estado.nome}
                                  </option>
                                ))}
                              </select>
                              <p className='select-none text-lg text-green-go-bank'>*</p>
                            </div>
                          </div>
                          <div className='flex w-full flex-col'>
                            <div className='relative flex w-full items-center gap-5 border-b-[1px] border-black-go-bank pb-3'>
                              <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                              <select {...register('cidade')} disabled={!estadoSelecionado} className='z-1 relative w-full appearance-none bg-transparent text-lg text-black-go-bank outline-0'>
                                <option className='text-black-go-bank' disabled selected>
                                  Cidade:
                                </option>
                                {cidades.map((cidade) => (
                                  <option className='text-black-go-bank' key={cidade.id} value={cidade.nome}>
                                    {cidade.nome}
                                  </option>
                                ))}
                              </select>
                              <p className='select-none text-lg text-green-go-bank'>*</p>
                            </div>
                          </div>
                        </div>
                        {errors.cidade && <p className='pt-1 text-red-500'>{errors.cidade.message}</p>}
                      </div>
                      {/*Estado e cidade*/}
                    </div>

                    {/*Proximo*/}
                    <div className='flex cursor-pointer justify-end'>
                      <button type='button' onClick={handleProximaEtapa} className='flex gap-5 transition-opacity hover:opacity-80'>
                        <p className='text-lg text-black-go-bank'>Próximo</p>
                        <Image className='rotate-45' src={buttonGreenArrow} alt='' />
                      </button>
                    </div>
                    {/*Proximo*/}
                  </div>
                )}
                {/*Etapa Um*/}

                {/*Etapa Dois*/}
                {etapaAtual === 2 && (
                  <div className='flex w-full flex-col justify-between lg:h-full lg:max-w-[585px]'>
                    <div>
                      {/*Com qual desses produtos de crédito você atua?**/}
                      <div className='mb-8'>
                        <p className='mb-8 text-lg text-black-go-bank'>
                          Com qual desses produtos de crédito você atua? <strong className='text-green-go-bank'>*</strong>
                        </p>
                        <div className='flex flex-col gap-5'>
                          <div className='flex flex-col justify-start gap-5 lg:flex-row'>
                            {/* Empréstimos */}
                            <label className='flex cursor-pointer items-center'>
                              <input type='checkbox' value='Emprestimos' {...register('atuacao')} className='sr-only' />
                              <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                                <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                              </div>
                              <span className='text-lg font-light text-black-go-bank'>Empréstimos</span>
                            </label>

                            {/* Conta Digital e Máquina de Cartão */}
                            <label className='flex cursor-pointer items-center'>
                              <input type='checkbox' value='Conta digital e máquina de cartão' {...register('atuacao')} className='sr-only' />
                              <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                                <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                              </div>
                              <span className='text-lg font-light text-black-go-bank'>Conta digital e máquina de cartão</span>
                            </label>
                          </div>

                          <div className='flex flex-col justify-start gap-5 lg:flex-row'>
                            {/* Operações com Imóvel */}
                            <label className='flex cursor-pointer items-center'>
                              <input type='checkbox' value='Operações com Imóvel' {...register('atuacao')} className='sr-only' />
                              <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                                <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                              </div>
                              <span className='text-lg font-light text-black-go-bank'>Operações com Imóvel</span>
                            </label>

                            {/* Consórcios */}
                            <label className='flex cursor-pointer items-center'>
                              <input type='checkbox' value='Consórcios' {...register('atuacao')} className='sr-only' />
                              <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                                <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                              </div>
                              <span className='text-lg font-light text-black-go-bank'>Consórcios</span>
                            </label>

                            {/* Seguros */}
                            <label className='flex cursor-pointer items-center'>
                              <input type='checkbox' value='Seguros' {...register('atuacao')} className='sr-only' />
                              <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                                <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                              </div>
                              <span className='text-lg font-light text-black-go-bank'>Seguros</span>
                            </label>
                          </div>
                        </div>

                        {errors.atuacao && <p className='pt-1 text-red-500'>{errors.atuacao.message}</p>}
                      </div>
                      {/*Com qual desses produtos de crédito você atua?**/}

                      {/*Qual a sua principal função?**/}
                      <div className='mb-8'>
                        <p className='mb-8 text-lg text-black-go-bank'>
                          Qual a sua principal função? <strong className='text-green-go-bank'>*</strong>
                        </p>
                        <div className='flex flex-col gap-4	'>
                          {/*Advogado*/}
                          <label className='flex cursor-pointer items-center'>
                            <input type='radio' value='Advogado' {...register('funcao')} className='sr-only' />
                            <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                              <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                            </div>
                            <span className='text-lg font-light text-black-go-bank'>Advogado</span>
                          </label>
                          {/*Advogado*/}

                          {/*Consultor*/}
                          <label className='flex cursor-pointer items-center'>
                            <input type='radio' value='Consultor' {...register('funcao')} className='sr-only' />
                            <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                              <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                            </div>
                            <span className='text-lg font-light text-black-go-bank'>Consultor</span>
                          </label>
                          {/*Consultor*/}

                          {/*Contador*/}
                          <label className='flex cursor-pointer items-center'>
                            <input type='radio' value='Contador' {...register('funcao')} className='sr-only' />
                            <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                              <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                            </div>
                            <span className='text-lg font-light text-black-go-bank'>Contador</span>
                          </label>
                          {/*Contador*/}

                          {/*Outros:*/}
                          <div className='flex gap-5'>
                            <label className='flex cursor-pointer items-center'>
                              <input type='radio' value='Outros:' {...register('funcao')} className='sr-only' />
                              <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                                <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                              </div>
                              <span className='text-lg font-light text-black-go-bank'>Outros:</span>
                            </label>
                            <input {...register('outros')} className='w-full border-b-[1px] border-black-go-bank bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank' />
                          </div>
                          {/*Outros:*/}
                        </div>
                        {errors.funcao && <p className='pt-1 text-red-500'>{errors.funcao.message}</p>}
                      </div>
                      {/*Qual a sua principal função?**/}

                      <div className='mb-8'>
                        <p className='mb-8 text-lg text-black-go-bank'>
                          Qual a média de propostas que você captura por dia? <strong className='text-green-go-bank'>*</strong>
                        </p>
                        <div className='flex flex-col gap-4 lg:flex-row'>
                          {/*0 - 50*/}
                          <label className='flex cursor-pointer items-center'>
                            <input type='radio' value='0 - 50' {...register('media')} className='sr-only' />
                            <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                              <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                            </div>
                            <span className='text-lg font-light text-black-go-bank'>0 - 50</span>
                          </label>
                          {/*0 - 50*/}

                          {/*51 - 100*/}
                          <label className='flex cursor-pointer items-center'>
                            <input type='radio' value='51 - 100' {...register('media')} className='sr-only' />
                            <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                              <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                            </div>
                            <span className='text-lg font-light text-black-go-bank'>51 - 100</span>
                          </label>
                          {/*51 - 100*/}

                          {/*101 - 500*/}
                          <label className='flex cursor-pointer items-center'>
                            <input type='radio' value='101 - 500' {...register('media')} className='sr-only' />
                            <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                              <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                            </div>
                            <span className='text-lg font-light text-black-go-bank'>101 - 500</span>
                          </label>
                          {/*101 - 500*/}

                          {/*+500*/}
                          <label className='flex cursor-pointer items-center'>
                            <input type='radio' value='+500' {...register('media')} className='sr-only' />
                            <div className='radio-outer mr-2 flex h-4 w-4 items-center justify-center rounded-t-5  rounded-bl-[2px] rounded-br-5 border-2 border-gray-400'>
                              <div className='radio-inner h-4 w-4 scale-0 transform rounded-t-5 rounded-bl-[2px] rounded-br-5 bg-[#00DB87]'></div>
                            </div>
                            <span className='text-lg font-light text-black-go-bank'>+500</span>
                          </label>
                          {/*+500*/}
                        </div>
                        {errors.media && <p className='pt-1 text-red-500'>{errors.media.message}</p>}
                      </div>
                    </div>

                    {/*Anterior e Proximo*/}
                    <div className='flex justify-end gap-9'>
                      <button type='button' onClick={handleEtapaAnterior} className='flex gap-5 transition-opacity hover:opacity-80'>
                        <Image className='-rotate-[200px]' src={buttonGreenArrowAlt} alt='' />
                        <p className='text-lg text-black-go-bank'>Anterior</p>
                      </button>

                      <button type='button' onClick={handleProximaEtapa} className='flex gap-5 transition-opacity hover:opacity-80'>
                        <p className='text-lg text-black-go-bank'>Próximo</p>
                        <Image className='rotate-45' src={buttonGreenArrow} alt='' />
                      </button>
                    </div>
                    {/*Anterior e Proximo*/}
                  </div>
                )}
                {/*Etapa Dois*/}

                {/*Etapa Tres*/}
                {etapaAtual === 3 && (
                  <div className='flex h-full w-full flex-col justify-between gap-8 lg:max-w-[585px]'>
                    <div>
                      <p className='mb-8 text-lg'>
                        Para finalizar, conte um pouco mais sobre sua experiência no ramo, outros parceiros que você atua e outras informações que julgar necessárias. <strong className='text-green-go-bank'>*</strong>
                      </p>
                      <div className='flex w-full gap-5 border-b-[1px] border-black-go-bank pb-5'>
                        <textarea {...register('mensagem')} className='w-full bg-transparent text-lg text-black-go-bank outline-0 placeholder:text-black-go-bank ' />
                      </div>
                      {errors.mensagem && <p className='pt-1 text-red-500'>{errors.mensagem.message}</p>}
                    </div>

                    <div className='flex w-full flex-col justify-end gap-5'>
                      <ReCAPTCHA sitekey='6Lc9PBotAAAAAENTOBGIFCZuB-00d61pOb2a-47O' onChange={handleRecaptcha} />
                      {!isRecaptchaValid && <p className='text-red-500'>Por favor, preencha o reCAPTCHA.</p>}
                    </div>

                    {/*Anterior e Enviar*/}
                    <div className='flex items-center justify-end gap-9'>
                      <button type='button' onClick={handleEtapaAnterior} className='flex gap-5 transition-opacity hover:opacity-80'>
                        <Image className='-rotate-[200px]' src={buttonGreenArrowAlt} alt='' />
                        <p className='text-lg text-black-go-bank'>Anterior</p>
                      </button>

                      <button type='submit' className={`flex h-[74px] w-full max-w-[195px] items-center justify-center gap-5 rounded-b-20 rounded-tl-10 rounded-tr-20 bg-green-go-bank transition-opacity hover:opacity-80 ${isSubmitting ? 'cursor-wait' : ''}`} disabled={isSubmitting}>
                        <p className='text-lg text-black-go-bank'>Enviar</p>
                        <Image className='rotate-45' src={buttonBlackArrow} alt='' />
                      </button>
                    </div>
                    {/*Anterior e Enviar*/}
                  </div>
                )}
                {/*Etapa Tres*/}
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
