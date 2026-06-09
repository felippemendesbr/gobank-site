import { CSSProperties, useEffect, useState } from 'react';
import Image from 'next/image';

import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import clip from '../../public/svgs/clip.svg';

import imagem from '../../public/images/image-trabalhe-conosco.webp';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

import DropdownTrabalheConosco from '@/components/dropdown-trabalhe-conosco';
import { useRouter } from 'next/router';
import greenSelectArrow from '../../public/svgs/green-select-arrow.svg';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';

type FormData = {
  nomeCompleto: string;
  email: string;
  telefone: string;
  whatsapp?: boolean;
  estado: string;
  cidade: string;
  areaDeInteresse: string;
  curriculo: File | null; // Altere para aceitar File ou null
};

export interface TVagas {
  _embedded: any;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    botao: string;
  };
  id: string;
}

export interface IVagas {
  vagas: TVagas[];
}

type Estado = {
  id: number;
  nome: string;
  sigla: string;
};

type Cidade = {
  id: number;
  nome: string;
};

interface FileInfo {
  name: string;
  type: string;
  size: string;
}

const validationSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required('Nome Completo é obrigatório'),
  email: Yup.string().email('Por favor, insira um endereço de e-mail válido').required('E-mail é obrigatório'),
  telefone: Yup.string()
    .required('Telefone é obrigatório')
    .matches(/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/, 'Telefone inválido'),
  whatsapp: Yup.boolean(),
  estado: Yup.string().required('Selecione o estado e a cidade'),
  cidade: Yup.string().required('Selecione o estado e a cidade'),
  areaDeInteresse: Yup.string().required('Seleção obrigatória').oneOf(['Administrativo', 'Comercial', 'Suporte', 'TI', 'Marketing', 'RH', 'Outra'], 'Seleção obrigatória'),
  curriculo: Yup.mixed()
    .required('Currículo é obrigatório')
    .test('fileSize', 'O arquivo é muito grande (máximo de 5MB)', (value) => {
      if (value && value instanceof File) {
        return value.size <= 5242880; // 5MB
      }
      return true;
    }),
});

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const fetchVagas = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/vagas?_embed=true&per_page=100`);
  const vagas = await fetchVagas.json();

  return {
    props: {
      vagas,
    },
    revalidate: 86400,
  };
};

export default function TrabalheConosco({ vagas }: IVagas) {
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
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onSubmit',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {
      curriculo: null,
    },
  });

  const [emailSuccessfullySent, setEmailSuccessfullySent] = useState(false);

  async function onSubmit(data: FormData) {
    if (recaptchaValue) {
      const emailBody = {
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
        estado: data.estado,
        cidade: data.cidade,
        areaDeInteresse: data.areaDeInteresse,
      };

      const form = new FormData();
      for (const field in emailBody) {
        // @ts-ignore
        form.append(field, emailBody[field]);
      }

      if (curriculoFile) {
        form.append('curriculo', curriculoFile);
      }

      await axios
        .post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/135/feedback?_wpcf7_unit_tag=true`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          console.log(response);
          reset();
          router.push(`/agradecimento-trabalhe-conosco`);
        })
        .catch((error) => {
          console.log(error);
        });
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

  // Curriculo
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [curriculoFile, setCurriculoFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    setFileInfo(
      file
        ? {
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024).toFixed(2)} KB`,
          }
        : null
    );
    setCurriculoFile(file); // Atualizando o estado com o arquivo selecionado
    setValue('curriculo', file, { shouldValidate: true });
  };
  // Curriculo

  return (
    <>
      <Head>
        <title>Vem Ser GoCapital! Trabalhe Conosco e Faça Parte Do Nosso Time</title>
        <meta name='description' content='Já pensou em fazer parte do movimento que está desburocratizando os produtos e serviços financeiros? Então vem ser GoCapital! Envie seu currículo e trabalhe conosco.' />
        <meta name='keywords' content='Trabalhe Conosco gobank' />
        <link rel='canonical' content='https://www.gobank.com.br/trabalhe-conosco' />
        <meta property='og:title' content='Vem Ser GoCapital! Trabalhe Conosco e Faça Parte Do Nosso Time' />
        <meta property='og:description' content='Já pensou em fazer parte do movimento que está desburocratizando os produtos e serviços financeiros? Então vem ser GoCapital! Envie seu currículo e trabalhe conosco.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/trabalhe-conosco' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Vem Ser GoCapital! Trabalhe Conosco e Faça Parte Do Nosso Time' />
        <meta name='twitter:description' content='Já pensou em fazer parte do movimento que está desburocratizando os produtos e serviços financeiros? Então vem ser GoCapital! Envie seu currículo e trabalhe conosco.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='trabalhe-conosco_CTA'>
        <section>
          <div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank bg-black'>
            <div style={bgTransformStyle}></div>

            <div className='flex w-full max-w-[1185px] flex-col gap-10 px-5 py-5 lg:flex-row lg:gap-5 xl:py-28'>
              <div className='flex w-full flex-col'>
                <h1 className='mb-14 text-6xl text-white'>
                  Trabalhe
                  <br /> <strong className='font-normal text-green-go-bank'>Conosco</strong>
                </h1>
                <p className='mb-5 w-full text-lg text-white lg:max-w-[600px]'>A GoCapital nasceu em 2011 com o objetivo de desburocratizar os produtos e serviços financeiros, com o apoio de um time dedicado e humanizado.</p>
                <p className='mb-5 w-full text-lg text-white lg:max-w-[600px]'>E se você quer abraçar esse desafio e crescer em um ambiente acolhedor, em constante evolução, nós queremos te conhecer! </p>
                <p className='w-full text-lg text-white lg:max-w-[600px]'>Cadastre-se em nosso banco de talentos e seja um Go.Capiter!</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col lg:max-w-[535px] xl:mb-32'>
                {/*Nome completo*/}
                <div className='mb-8 w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input {...register('nomeCompleto')} placeholder='Nome Completo:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.nomeCompleto && <p className='pt-1 text-red-500'>{errors.nomeCompleto.message}</p>}
                </div>
                {/*Nome completo*/}

                {/*E-mail*/}
                <div className='mb-8 w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input {...register('email')} placeholder='E-mail:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.email && <p className='pt-1 text-red-500'>{errors.email.message}</p>}
                </div>
                {/*E-mail*/}

                {/*Telefone*/}
                <div className='mb-8 w-full'>
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
                {/* Telefone*/}

                {/*Estado e Cidade*/}
                <div className='mb-8 flex w-full flex-col'>
                  <div className='flex w-full gap-5'>
                    <div className='flex w-full flex-col'>
                      <div className='relative flex w-full items-center gap-5 border-b-[1px]  border-white pb-5'>
                        <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                        <select {...register('estado')} onChange={handleEstadoChange} className='z-1 relative w-full appearance-none bg-transparent text-lg text-white outline-0'>
                          <option className='text-black-go-bank' disabled selected>
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
                      <div className='relative flex w-full items-center gap-5 border-b-[1px]  border-white pb-5'>
                        <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                        <select {...register('cidade')} disabled={!estadoSelecionado} className='z-1 relative w-full appearance-none bg-transparent text-lg text-white outline-0'>
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
                {/*Estado e Cidade*/}

                {/*Area de Interesse*/}
                <div className='mb-8 w-full'>
                  <div className='relative flex w-full items-center gap-5 border-b-[1px]  border-white pb-5'>
                    <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                    <select {...register('areaDeInteresse')} className='z-1 relative w-full appearance-none bg-transparent text-lg text-white outline-0'>
                      <option disabled selected className='text-white'>
                        Área de Interesse:
                      </option>
                      <option value='Administrativo' className='text-black-go-bank'>
                        Administrativo
                      </option>
                      <option value='Comercial' className='text-black-go-bank'>
                        Comercial
                      </option>
                      <option value='Suporte' className='text-black-go-bank'>
                        Suporte
                      </option>
                      <option value='TI' className='text-black-go-bank'>
                        TI
                      </option>
                      <option value='Marketing' className='text-black-go-bank'>
                        Marketing
                      </option>
                      <option value='RH' className='text-black-go-bank'>
                        RH
                      </option>
                      <option value='Outro' className='text-black-go-bank'>
                        Outro
                      </option>
                    </select>
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.areaDeInteresse && <p className='pt-1 text-red-500'>{errors.areaDeInteresse.message}</p>}
                </div>
                {/*Area de Interesse*/}

                {/* Anexar currículo */}
                <div className='mb-8 flex flex-col gap-5'>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-5'>
                      <Image src={clip} alt='Ícone de um clipe' />
                      <label htmlFor='curriculo' className='cursor-pointer text-lg text-white'>
                        {fileInfo ? `${fileInfo.name} (${fileInfo.type}, ${fileInfo.size})` : 'Anexar currículo'}
                      </label>
                      <input type='file' id='curriculo' {...register('curriculo')} onChange={handleFileChange} className='hidden' />
                    </div>
                    {errors.curriculo && <p className='pt-1 text-red-500'>{errors.curriculo.message}</p>}
                  </div>
                </div>
                {/* Anexar currículo */}

                <div className='mb-8 flex w-full flex-col justify-end gap-5'>
                  <ReCAPTCHA sitekey='6Lf1YjApAAAAAKk6PqhDNpsG3Avbl7BlsZlDAtP8' onChange={handleRecaptcha} />
                  {!isRecaptchaValid && <p className='text-red-500'>Por favor, preencha o reCAPTCHA.</p>}
                </div>

                {/*Botao*/}
                <div className='mb-8 flex w-full flex-col justify-end gap-5 lg:flex-row'>
                  <button className={`relative flex w-full flex-row items-center justify-between rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[80px] xl:max-w-[550px] xl:px-12 ${isSubmitting ? 'cursor-wait' : ''}`} disabled={isSubmitting}>
                    <p>Quero ser um Go.Capiter!</p>
                    <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                  </button>
                </div>
                {/*Botao*/}
              </form>
            </div>
          </div>
        </section>

        <section className='relative flex items-center justify-center bg-white xl:pt-32'>
          <Image src={imagem} alt='' className='absolute -top-[200px] hidden h-[354px] w-full max-w-[1200px] rounded-30 object-cover xl:flex' />
          <div className='flex w-full max-w-[1185px] flex-col px-5 py-5 xl:py-28'>
            <h1 className='mb-16	text-4xl font-light'>
              Vagas <strong className='font-normal'>disponíveis</strong>
            </h1>
            <div className='flex flex-col gap-7'>
              {vagas.map(
                (vaga) =>
                  vaga && (
                    <DropdownTrabalheConosco key={vaga.id} title={vaga.title && vaga.title.rendered ? vaga.title.rendered : 'Título Indisponível'} hrefButton={vaga.acf && vaga.acf.botao ? vaga.acf.botao : '#'}>
                      {vaga.content && vaga.content.rendered && <div dangerouslySetInnerHTML={{ __html: vaga.content.rendered }} />}
                    </DropdownTrabalheConosco>
                  )
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
