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

import image from '../../public/images/image-financiamentos.webp';

import DropdownSeguroFinanciamento from '@/components/dropdown-seguro-financiamento';
import Head from 'next/head';
import greenSelectArrow from '../../public/svgs/green-select-arrow.svg';

type FormData = {
  nomeDaEmpresa: string;
  cpfCnpj: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  whatsapp?: boolean;
  tipoDeFinanciamento: string;
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
  tipoDeFinanciamento: Yup.string().required('Selecione o tipo de financiamento').oneOf(['Financiamento de Equipamentos / Maquinários', 'Financiamento de Veículos', 'Refinanciamento de Veículos', 'Refinanciamento Imobiliário'], 'Selecione o tipo de financiamento'),
  cidadeEUF: Yup.string().required('Cidade e UF é obrigatório'),
  mensagem: Yup.string(),
});

export default function Financiamentos() {
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
    register,
    handleSubmit,
    setValue,
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
        tipoDeFinanciamento: data.tipoDeFinanciamento,
        mensagem: data.mensagem,
      };

      const form = new FormData();
      for (const field in emailBody) {
        // @ts-ignore
        form.append(field, emailBody[field]);
      }

      await axios
        .post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/32/feedback?_wpcf7_unit_tag=true`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          console.log(response);
          reset();
          router.push(`/agradecimento-financiamentos`);
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
        <title>Financiamentos e Refinanciamentos para PJ na GoCapital </title>
        <meta name='description' content='Conheça as opções de financiamentos, refinanciamentos e crédito para aquisição de veículos e maquinários na GoCapital. Soluções customizadas para empresas em crescimento.' />
        <meta name='keywords' content='Financiamentos e Refinanciamentos para PJ' />
        <link rel='canonical' content='https://www.gobank.com.br/financiamentos' />
        <meta property='og:title' content='Financiamentos e Refinanciamentos para PJ na GoCapital ' />
        <meta property='og:description' content='Conheça as opções de financiamentos, refinanciamentos e crédito para aquisição de veículos e maquinários na GoCapital. Soluções customizadas para empresas em crescimento.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/financiamentos' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Financiamentos e Refinanciamentos para PJ na GoCapital ' />
        <meta name='twitter:description' content='Conheça as opções de financiamentos, refinanciamentos e crédito para aquisição de veículos e maquinários na GoCapital. Soluções customizadas para empresas em crescimento.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='financiamentos_CTA'>
        <section>
          <div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank'>
            <div style={bgTransformStyle}></div>

            <div className='flex w-full max-w-[1185px] items-center gap-5 px-5 py-5 xl:pt-28'>
              <div className='flex flex-col'>
                <h1 className='mb-9 text-4xl text-green-go-bank lg:text-6xl'>Financiamentos</h1>
                <p className='mb-16 w-full max-w-[660px] text-2xl text-white'>Conheça nossa solução para o financiamento de bens, refinanciamentos e expansão da capacidade produtiva da sua empresa. O seu próximo passo começa aqui!</p>
                <Link href='#form' className='group relative flex max-w-[464px] flex-row items-center justify-between rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 bg-green-go-bank p-5 text-2xl transition-all hover:opacity-80 lg:hover:max-w-[508px] xl:h-[80px] xl:px-12'>
                  <p>Quero falar com especialista</p>
                  <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                </Link>
              </div>

              <Image className='hidden w-1/2 rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 lg:flex' src={image} alt='Image' />
            </div>

            <form id='form' onSubmit={handleSubmit(onSubmit)} className='flex w-full max-w-[1185px] flex-col p-5 xl:mb-32 xl:pt-36'>
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
              </div>
              {/*E-mail e Telefone*/}

              {/*Cidade*/}
              <div className='mb-8 flex flex-col gap-8 xl:flex-row'>
                <div className='w-full'>
                  <div className='relative flex w-full items-center gap-5 border-b-[1px]  border-white pb-5'>
                    <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                    <select {...register('tipoDeFinanciamento')} className='z-1 relative w-full appearance-none bg-transparent text-lg text-white outline-0'>
                      <option disabled selected className='text-black-go-bank'>
                        Tipo de financiamento:
                      </option>
                      <option value='Financiamento de Equipamentos / Maquinários' className='text-black-go-bank'>
                        Financiamento de Equipamentos / Maquinários
                      </option>
                      <option value='Financiamento de Veículos' className='text-black-go-bank'>
                        Financiamento de Veículos
                      </option>
                      <option value='Refinanciamento de Veículos' className='text-black-go-bank'>
                        Refinanciamento de Veículos
                      </option>
                      <option value='Refinanciamento Imobiliário' className='text-black-go-bank'>
                        Refinanciamento Imobiliário
                      </option>
                    </select>
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.tipoDeFinanciamento && <p className='pt-1 text-red-500'>{errors.tipoDeFinanciamento.message}</p>}
                </div>

                <div className='w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input {...register('cidadeEUF')} placeholder='Cidade/UF:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.cidadeEUF && <p className='pt-1 text-red-500'>{errors.cidadeEUF.message}</p>}
                </div>
              </div>
              {/*Cidade*/}

              <div className='mb-8 flex w-full gap-5 border-b-[1px] border-white pb-5'>
                <textarea {...register('mensagem')} placeholder='Mensagem:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
              </div>

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

        <section className='flex items-center justify-center bg-white'>
          <div className='flex w-full max-w-[1185px] flex-col px-5 py-5 xl:py-28'>
            <h1 className='pb-5 text-center text-4xl text-black-go-bank xl:pb-24 xl:text-6xl'>
              <strong className='font-normal text-green-go-bank'>Conheça todos os serviços</strong> disponíveis para você e para sua empresa.
            </h1>

            <div className='flex flex-col gap-5'>
              <DropdownSeguroFinanciamento title='Financiamento de Equipamentos / Maquinários' textButton='Quero falar com especialista' hrefButton='#form'>
                <p>Nós sabemos que a aquisição de uma nova máquina ou equipamento pode significar a introdução de um novo produto ou processo, fazendo com que seu negócio cresça ainda mais.</p>
                <p>Se está na hora de dar aquele upgrade no seu negócio com a aquisição de novos equipamentos, conte com a GoCapital para te auxiliar.</p>
              </DropdownSeguroFinanciamento>

              <DropdownSeguroFinanciamento title='Financiamento de Veículos' textButton='Quero falar com especialista' hrefButton='#form'>
                <p>Precisando de um carro? Conte com a modalidade de crédito especializada em financiamento de automóveis usados da GoCapital!</p>
                <p>Para veículos leves e pesados com até 19 anos de uso, o parcelamento pode ser feito em até 48 meses. Pessoas físicas e jurídicas podem financiar até 70% do valor do veículo, de acordo com a avaliação de crédito.</p>
              </DropdownSeguroFinanciamento>

              <DropdownSeguroFinanciamento title='Refinanciamento de Veículos' textButton='Quero falar com especialista' hrefButton='#form'>
                <p>Se você está precisando de um dinheiro extra, seja para investir em um negócio, quitar uma dívida ou destinar a qualquer outra necessidade, refinanciar seu veículo pode ser uma solução bastante atrativa para este momento.</p>
              </DropdownSeguroFinanciamento>

              <DropdownSeguroFinanciamento title='Refinanciamento Imobiliário' textButton='Quero falar com especialista' hrefButton='#form'>
                <p>Se você está pensando em ampliar a empresa, aproveitar uma oportunidade de negócios, temos a solução que você precisa!</p>
                <p>Como você pode aproveitar as condições especiais para o empréstimo com garantia de imóvel: </p>
                <ul className='list-disc pl-5'>
                  <li>Trocar as dívidas pesadas por uma opção mais barata.</li>
                  <li>Começar a empreender ou deixar o seu negócio com as contas em dia.</li>
                  <li>Ser o próprio chefe, abrindo uma franquia.</li>
                  <li>Construir ou reformar.</li>
                  <li>Tirar do papel aquele projeto que há tempos está na gaveta.</li>
                </ul>
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
