import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Image from 'next/image';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import greenSelectArrow from '../../public/svgs/green-select-arrow.svg';

import image from '../../public/images/image-seguros.webp';

import DropdownSeguroFinanciamento from '@/components/dropdown-seguro-financiamento';
import Head from 'next/head';

type FormData = {
  nomeDaEmpresa: string;
  cpfCnpj: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  whatsapp?: boolean;
  tipoDeSeguro: string;
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
  tipoDeSeguro: Yup.string().required('Selecione o tipo de seguro').oneOf(['Seguro patrimonial empresarial', 'Seguro de vida empresarial', 'Seguro de automóvel e frota', 'Seguro D&O (Directors & Officers)', 'Seguro Saúde', 'Seguro Residencial', 'Consórcio de automóvel', 'Consórcio de imóvel', 'Assistências GoHelp'], 'Selecione o tipo de seguro'),
  cidadeEUF: Yup.string().required('Cidade e UF é obrigatório'),
  mensagem: Yup.string(),
});

export default function SegurosEConsorcios() {
  // Recaptcha
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(true);
  const handleRecaptcha = (value: string | null) => {
    setRecaptchaValue(value);
    setIsRecaptchaValid(!!value);
  };

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
        tipoDeSeguro: data.tipoDeSeguro,
        cidadeEUF: data.cidadeEUF,
        mensagem: data.mensagem,
      };

      const form = new FormData();
      for (const field in emailBody) {
        // @ts-ignore
        form.append(field, emailBody[field]);
      }

      await axios
        .post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/33/feedback?_wpcf7_unit_tag=true`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          console.log(response);
          reset();
          router.push(`/agradecimento-seguros-e-consorcios`);
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
        <title>Seguros e Consórcios para PJ - Proteja Seu Negócio com GoCapital</title>
        <meta name='description' content='Proteja seu negócio com seguros e consórcios personalizados para PJ. Garanta mais segurança financeira para você e para sua empresa. Conheça as opções na GoCapital.' />
        <meta name='keywords' content='Seguros e Consórcios para PJ' />
        <link rel='canonical' content='https://www.gobank.com.br/seguros-e-consorcios' />
        <meta property='og:title' content='Seguros e Consórcios para PJ - Proteja Seu Negócio com GoCapital' />
        <meta property='og:description' content='Proteja seu negócio com seguros e consórcios personalizados para PJ. Garanta mais segurança financeira para você e para sua empresa. Conheça as opções na GoCapital.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/seguros-e-consorcios' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Seguros e Consórcios para PJ - Proteja Seu Negócio com GoCapital' />
        <meta name='twitter:description' content='Proteja seu negócio com seguros e consórcios personalizados para PJ. Garanta mais segurança financeira para você e para sua empresa. Conheça as opções na GoCapital.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='seguros-e-consorcios_CTA'>
        <section>
          <div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank'>
            <div style={bgTransformStyle}></div>
            <div className='flex w-full max-w-[1185px] items-center gap-5 px-5 pt-5 xl:pt-28'>
              <div className='flex flex-col'>
                <h1 className='mb-5 text-6xl text-green-go-bank'>Seguros e Consórcios</h1>
                <p className='mb-8 w-full max-w-[660px] text-xl text-white'>Aqui você encontra soluções para sua proteção, da sua família e da sua empresa. Consórcios, planos de saúde e seguros em um só lugar: o que você precisa está na GoCapital!</p>
                <Link href='/condicoes-gerais-de-seguros' className='group relative flex max-w-[550px] flex-row items-center justify-between rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 bg-green-go-bank p-5 text-2xl transition-all hover:opacity-80 lg:hover:max-w-[594px] xl:h-[110px] xl:px-12'>
                  <p className='lg:max-w-[410px]'>Conheça todos os produtos disponíveis para você e para sua empresa.</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                </Link>
              </div>

              <Image className='hidden w-1/2 rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 lg:flex' src={image} alt='Image' />
            </div>

            <form id='form' onSubmit={handleSubmit(onSubmit)} className='mb-24 flex w-full max-w-[1185px] flex-col px-5 pt-5 xl:pt-36'>
              {/*Nome da Empresa e CPF/CNPJ*/}
              <div className='mb-8 flex flex-col gap-8 xl:flex-row'>
                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input maxLength={18} value={inputValue} onChange={handleChange} placeholder='CPF/CNPJ:' className='w-full bg-transparent text-lg text-white outline-0  placeholder:text-white ' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.cpfCnpj && <p className='pt-1 text-red-500'>{errors.cpfCnpj.message}</p>}
                </div>

                {documentoTipo === 'CNPJ' && (
                  <div className='w-full'>
                    <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                      <input {...register('nomeDaEmpresa')} placeholder='Nome da empresa:' className='w-full bg-transparent text-lg text-white outline-0  placeholder:text-white ' />
                      <p className='select-none text-lg text-green-go-bank'>*</p>
                    </div>
                    {errors.nomeDaEmpresa && <p className='pt-1 text-red-500'>{errors.nomeDaEmpresa.message}</p>}
                  </div>
                )}
              </div>
              {/*Nome da Empresa e CPF/CNPJ*/}

              {/*Nome do responsavel*/}
              <div className='mb-8 w-full'>
                <div className='flex w-full gap-5 border-b-[1px] border-white pb-5 '>
                  <input {...register('nomeCompleto')} placeholder='Nome completo:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                  <p className='select-none text-lg text-green-go-bank'>*</p>
                </div>
                {errors.nomeCompleto && <p className='pt-1 text-red-500'>{errors.nomeCompleto.message}</p>}
              </div>
              {/*Nome do responsavel*/}

              {/*E-mail e Telefone*/}
              <div className='mb-8 flex flex-col gap-8 xl:flex-row'>
                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input {...register('email')} placeholder='E-mail:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.email && <p className='pt-1 text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <Controller name='telefone' control={control} render={({ field: { onChange, value } }) => <input value={value || ''} onChange={(e) => onChange(formatTelefone(e.target.value))} placeholder='Telefone:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />} />
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
              </div>
              {/*E-mail e Telefone*/}

              {/*Tipo de seguro e cidade*/}
              <div className='mb-8 flex flex-col gap-8 xl:flex-row'>
                <div className='mb-5 w-full'>
                  <div className='relative flex w-full items-center gap-5 border-b-[1px]  border-white pb-5'>
                    <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                    <select {...register('tipoDeSeguro')} className='z-1 relative w-full appearance-none bg-transparent text-lg text-white outline-0'>
                      <option disabled selected className='text-black-go-bank'>
                        Tipo de seguro:
                      </option>
                      <option value='Seguro patrimonial empresarial' className='text-black-go-bank'>
                        Seguro patrimonial empresarial
                      </option>
                      <option value='Seguro de vida empresarial' className='text-black-go-bank'>
                        Seguro de vida empresarial
                      </option>
                      <option value='Seguro de automóvel e frota' className='text-black-go-bank'>
                        Seguro de automóvel e frota
                      </option>
                      <option value='Seguro D&O (Directors & Officers)' className='text-black-go-bank'>
                        Seguro D&O (Directors & Officers)
                      </option>
                      <option value='Seguro Saúde' className='text-black-go-bank'>
                        Seguro Saúde
                      </option>
                      <option value='Seguro Residencial' className='text-black-go-bank'>
                        Seguro Residencial
                      </option>
                      <option value='Consórcio de automóvel' className='text-black-go-bank'>
                        Consórcio de automóvel
                      </option>
                      <option value='Consórcio de imóvel' className='text-black-go-bank'>
                        Consórcio de imóvel
                      </option>
                      <option value='Assistências GoHelp' className='text-black-go-bank'>
                        Assistências GoHelp
                      </option>
                    </select>
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.tipoDeSeguro && <p className='pt-1 text-red-500'>{errors.tipoDeSeguro.message}</p>}
                </div>

                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input {...register('cidadeEUF')} placeholder='Cidade/UF:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.cidadeEUF && <p className='pt-1 text-red-500'>{errors.cidadeEUF.message}</p>}
                </div>
              </div>
              {/*Tipo de seguro e cidade*/}

              {/*Mensagem e botao*/}
              <div className='mb-8 flex flex-col gap-8 xl:flex-row'>
                <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                  <textarea {...register('mensagem')} placeholder='Mensagem:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                </div>
              </div>

              <div className='flex flex-col gap-8 xl:flex-row'>
                <div className='flex w-full flex-col justify-end gap-5'>
                  <ReCAPTCHA sitekey='6Lf1YjApAAAAAKk6PqhDNpsG3Avbl7BlsZlDAtP8' onChange={handleRecaptcha} />
                  {!isRecaptchaValid && <p className='text-red-500'>Por favor, preencha o reCAPTCHA.</p>}
                </div>

                <div className='flex w-full justify-end gap-5'>
                  <button className={`group relative flex w-full flex-row items-center justify-between rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[80px] xl:max-w-[550px] xl:px-12 ${isSubmitting ? 'cursor-wait' : ''}`} disabled={isSubmitting}>
                    <p>Quero receber uma cotação!</p>
                    <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                  </button>
                </div>
              </div>
              {/*Mensagem e botao*/}
            </form>
          </div>
        </section>

        <section className='flex items-center justify-center bg-white'>
          <div className='flex w-full max-w-[1185px] flex-col px-5 py-5 xl:py-28'>
            <h1 className='pb-5 text-center text-4xl text-black-go-bank xl:pb-24 xl:text-6xl'>
              <strong className='font-normal text-green-go-bank'>Conheça todos os serviços</strong> disponíveis para você e para sua empresa.
            </h1>

            <div className='flex flex-col gap-5'>
              <DropdownSeguroFinanciamento title='Consórcios' textButton='Quero receber uma cotação!' hrefButton='#form'>
                <p>Você sabia que o consórcio é uma das formas mais vantajosas e planejadas de conquistar seu imóvel, automóvel ou outros bens? Saiba mais sobre essa solução com condições flexíveis, sem juros, sem entrada e com a credibilidade de grandes administradoras.</p>
              </DropdownSeguroFinanciamento>

              <DropdownSeguroFinanciamento title='Seguro Auto e Frota' textButton='Quero receber uma cotação! ' hrefButton='#form'>
                <p>Nós sabemos que o seguro de automóveis deixou de ser uma opção e se tornou uma necessidade. Com o nosso seguro auto ou seguro frota você tem a tranquilidade de contar com as coberturas em caso de furto, roubo, prejuízos de acidentes de trânsito e pode assegurar proteção a terceiros em caso de colisões ou vítimas, além das assistências disponíveis 24h.</p>
              </DropdownSeguroFinanciamento>

              <DropdownSeguroFinanciamento title='Seguro Residencial ou Seguro Patrimonial' textButton='Quero receber uma cotação! ' hrefButton='#form'>
                <p>Essa solução é ideal para proteger o seu patrimônio contra diversos imprevistos. Conte com coberturas, benefícios e serviços, seja para sua residência da cidade, do campo ou do litoral, ou para a proteção da sua empresa. Garanta mais segurança e tranquilidade para você e sua família.</p>
              </DropdownSeguroFinanciamento>

              <DropdownSeguroFinanciamento title='Seguro de Vida' textButton='Quero receber uma cotação! ' hrefButton='#form'>
                <p>Garanta a proteção que você, sua família ou seus colaboradores precisam em momentos difíceis. O nosso seguro de vida oferece proteção financeira em casos de situações críticas e inesperadas, como acometimento por doenças graves, invalidez permanente, acidentes ou, até mesmo, amparo dos beneficiários em caso de falecimento.</p>
              </DropdownSeguroFinanciamento>

              <DropdownSeguroFinanciamento title='Planos de Saúde' textButton='Quero receber uma cotação! ' hrefButton='#form'>
                <p>Receba uma cotação de planos de saúde empresarial que atendam as necessidades da sua empresa com o melhor custo-benefício. Contamos com diversas opções de redes credenciadas e coberturas, como:</p>
                <ul>
                  <li>Cobertura regional</li>
                  <li>Cobertura nacional</li>
                  <li>Cobertura nacional e internacional</li>
                </ul>
              </DropdownSeguroFinanciamento>

              <DropdownSeguroFinanciamento title='Assistências GoHelp' textButton='Quero receber uma cotação! ' hrefButton='#form'>
                <p>A assistência GoHelp é uma modalidade de seguro que permite aos beneficiários contarem com apoio em momentos delicados da vida. Destina-se a qualquer pessoa, física ou jurídica.</p>
                <p className='text-2xl text-white'>Coberturas</p>
                <p>Assistência funeral completa:</p>
                <ul className='list-disc pl-5'>
                  <li>Incluindo pais, sogros e filhos.</li>
                </ul>
                <p>Assistência residencial:</p>
                <ul className='list-disc pl-5'>
                  <li>Chaveiro</li>
                  <li>Encanador</li>
                  <li>Eletricista</li>
                  <li></li>
                  <li>Conserto de eletrodomésticos da linha branca (Fogão, Cooktop, Forno elétrico, Micro-ondas, Refrigerador (Geladeira), Freezer, Lavadora de Louças, Lavadora de Roupas, Lava e Seca, Tanquinho e Secadora de Roupas) incluindo troca de peças.</li>
                </ul>
                <p>Indenização por morte acidental:</p>
                <ul className='list-disc pl-5'>
                  <li>R$ 10.000,00 de indenização em caso de morte acidental do segurado principal;</li>
                </ul>
                <p>Sorteio:</p>
                <ul className='list-disc pl-5'>
                  <li>Concorre a um sorteio de R$ 20.000,00 mensalmente pela loteria federal</li>
                </ul>
              </DropdownSeguroFinanciamento>

              <DropdownSeguroFinanciamento hrefButton='#form' title='Não encontrou a solução que procurava? Entre em contato conosco e receba uma lista completa com todos os produtos e serviços que oferecemos!' textButton='Quero informações sobre outro serviço!'>
                <p></p>
              </DropdownSeguroFinanciamento>
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
