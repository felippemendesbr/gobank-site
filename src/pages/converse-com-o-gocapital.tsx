import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import greenSelectArrow from '../../public/svgs/green-select-arrow.svg';
import pin from '../../public/svgs/pin.svg';

import attention from '../../public/svgs/attention.svg';
import facebook from '../../public/svgs/facebook.svg';
import instagram from '../../public/svgs/instagram.svg';
import linkedin from '../../public/svgs/linkedin.svg';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

type FormData = {
  nomeDaEmpresa: string;
  cpfCnpj: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  whatsapp?: boolean;
  jaEClienteDoGoBank: string;
  sobreOQueDesejaFalarHoje: string;
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
  jaEClienteDoGoBank: Yup.string().required('Seleção obrigatória').oneOf(['Sim', 'Não'], 'Seleção obrigatória'),
  sobreOQueDesejaFalarHoje: Yup.string().required('Seleção obrigatória').oneOf(['Conta', 'Maquininhas Go.Pag', 'Crédito Facilitado', 'Seguros e Consórcios', 'Financiamentos', 'Parceria', 'Sugestão', 'Reclamação', 'Outros'], 'Seleção obrigatória'),
  mensagem: Yup.string(),
});
export default function ConverseComOGocapital() {
  // Recaptcha
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(true);
  const handleRecaptcha = (value: string | null) => {
    setRecaptchaValue(value);
    setIsRecaptchaValid(!!value);
  };

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
        sobreOQueDesejaFalarHoje: data.sobreOQueDesejaFalarHoje,
        mensagem: data.mensagem,
      };

      const form = new FormData();
      for (const field in emailBody) {
        // @ts-ignore
        form.append(field, emailBody[field]);
      }

      await axios
        .post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/109/feedback?_wpcf7_unit_tag=true`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          console.log(response);
          reset();
          router.push(`/agradecimento-converse-com-a-gocapital`);
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
        <title>Converse com a GoCapital: Facilidade Digital e Atendimento Humanizado</title>
        <meta name='description' content='Tire suas dúvidas e obtenha suporte personalizado e humanizado. Converse com a GoCapital para soluções financeiras feitas sob medida para você. Estamos aqui para ajudar!' />
        <meta name='keywords' content='Contato converse com a GoCapital' />
        <link rel='canonical' content='https://www.gobank.com.br/converse-com-o-gocapital' />
        <meta property='og:title' content='Converse com a GoCapital: Facilidade Digital e Atendimento Humanizado' />
        <meta property='og:description' content='Tire suas dúvidas e obtenha suporte personalizado e humanizado. Converse com a GoCapital para soluções financeiras feitas sob medida para você. Estamos aqui para ajudar!' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/converse-com-o-gocapital' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Converse com a GoCapital: Facilidade Digital e Atendimento Humanizado' />
        <meta name='twitter:description' content='Tire suas dúvidas e obtenha suporte personalizado e humanizado. Converse com a GoCapital para soluções financeiras feitas sob medida para você. Estamos aqui para ajudar!' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='converse-com-o-gocapital_CTA'>
        <section>
          <div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank'>
            <div style={bgTransformStyle}></div>

            <div className='flex w-full max-w-[1185px] flex-col gap-5 px-5 py-5 lg:flex-row xl:py-28 '>
              <div className='flex flex-col gap-5 lg:gap-14'>
                <h1 className='text-4xl text-white lg:text-6xl'>
                  <strong className='font-normal text-green-go-bank'>Entre em contato e</strong> converse com a GoCapital!
                </h1>

                <a href='tel:+551149634199' className='flex flex-col gap-3.5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-green-go-bank'>Telefone</p>
                  <p className='text-3xl text-white'>(11) 4963-4199</p>
                </a>

                <a href='mailto:sac@gocapital.com.br' className='flex flex-col gap-3.5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-green-go-bank'>SAC</p>
                  <p className='text-3xl text-white'>sac@gocapital.com.br</p>
                </a>

                <a href='mailto:ouvidoria@gocapital.com.br' className='flex flex-col gap-3.5 transition-opacity hover:opacity-80'>
                  <p className='text-2xl text-green-go-bank'>Ouvidoria</p>
                  <p className='text-3xl text-white'>ouvidoria@gocapital.com.br</p>
                </a>
              </div>

              <form id='form' onSubmit={handleSubmit(onSubmit)} className='flex w-full max-w-[1185px] flex-col p-5 xl:mb-32'>
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
                <div className='mb-8 w-full'>
                  <div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
                    <input {...register('email')} placeholder='E-mail:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.email && <p className='pt-1 text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='mb-8 w-full'>
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
                {/*E-mail e Telefone*/}

                {/*Já é cliente da GoCapital?*/}
                <div className='mb-8 w-full'>
                  <div className='relative flex w-full items-center gap-5 border-b-[1px]  border-white pb-5'>
                    <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                    <select {...register('jaEClienteDoGoBank')} className='z-1 relative w-full appearance-none bg-transparent text-lg text-white outline-0'>
                      <option disabled selected className='text-black-go-bank'>
                        Já é cliente da GoCapital?
                      </option>
                      <option value='Sim' className='text-black-go-bank'>
                        Sim
                      </option>
                      <option value='Não' className='text-black-go-bank'>
                        Não
                      </option>
                    </select>
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.jaEClienteDoGoBank && <p className='pt-1 text-red-500'>{errors.jaEClienteDoGoBank.message}</p>}
                </div>
                {/*Já é cliente da GoCapital?*/}

                {/*Sobre o que deseja falar hoje?*/}
                <div className='mb-8 w-full'>
                  <div className='relative flex w-full items-center gap-5 border-b-[1px]  border-white pb-5'>
                    <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                    <select {...register('sobreOQueDesejaFalarHoje')} className='z-1 relative w-full appearance-none bg-transparent text-lg text-white outline-0'>
                      <option disabled selected className='text-black-go-bank'>
                        Sobre o que deseja falar hoje?
                      </option>
                      <option value='Conta' className='text-black-go-bank'>
                        Conta
                      </option>
                      <option value='Maquininhas Go.Pag' className='text-black-go-bank'>
                        Maquininhas Go.Pag
                      </option>
                      <option value='Crédito Facilitado' className='text-black-go-bank'>
                        Crédito Facilitado
                      </option>
                      <option value='Seguros e Consórcios' className='text-black-go-bank'>
                        Seguros e Consórcios
                      </option>
                      <option value='Financiamentos' className='text-black-go-bank'>
                        Financiamentos
                      </option>
                      <option value='Parceria' className='text-black-go-bank'>
                        Parceria
                      </option>
                      <option value='Sugestão' className='text-black-go-bank'>
                        Sugestão
                      </option>
                      <option value='Reclamação' className='text-black-go-bank'>
                        Reclamação
                      </option>
                      <option value='Outro' className='text-black-go-bank'>
                        Outro
                      </option>
                    </select>
                    <p className='select-none text-lg text-green-go-bank'>*</p>
                  </div>
                  {errors.sobreOQueDesejaFalarHoje && <p className='pt-1 text-red-500'>{errors.sobreOQueDesejaFalarHoje.message}</p>}
                </div>
                {/*Sobre o que deseja falar hoje?*/}

                {/*Mensagem*/}
                <div className='mb-16 flex w-full gap-5 border-b-[1px] border-white pb-5'>
                  <textarea {...register('mensagem')} placeholder='Mensagem:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                </div>
                {/*Mensagem*/}

                {/*Botao*/}
                <div className='flex w-full flex-col justify-end gap-5 lg:flex-row'>
                  <div className='flex w-full flex-col justify-end gap-5'>
                    <ReCAPTCHA sitekey='6Lf1YjApAAAAAKk6PqhDNpsG3Avbl7BlsZlDAtP8' onChange={handleRecaptcha} />
                    {!isRecaptchaValid && <p className='text-red-500'>Por favor, preencha o reCAPTCHA.</p>}
                  </div>

                  <button className={`group relative flex w-full flex-row items-center justify-between rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[80px] xl:max-w-[550px] xl:px-12 ${isSubmitting ? 'cursor-wait' : ''}`} disabled={isSubmitting}>
                    <p>Enviar</p>
                    <Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
                  </button>
                </div>
                {/*Botao*/}
              </form>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-gray-dark-go-bank'>
          <div className='w-full max-w-[1185px] px-5 py-5 lg:py-20'>
            <h1 className='mb-20 text-6xl 	text-green-go-bank'>Unidades</h1>

            <div className='flex flex-col gap-24 lg:flex-row	'>
              <div className='flex flex-col'>
                <div className='mb-8 flex gap-6'>
                  <Image src={pin} alt='' />
                  <p className='text-3xl text-white'>Matriz Guarulhos/SP</p>
                </div>
                <p className='mb-5 text-lg text-white'>Av. Salgado Filho, 2120 - Térreo (Loja 20, Via Alameda) - Centro, Guarulhos - SP</p>
                <a href='tel:+551149634199' className='text-lg text-green-go-bank transition-opacity hover:opacity-80'>
                  Telefone: (11) 4963-4199
                </a>
              </div>

              <div className='flex flex-col'>
                <div className='mb-8 flex gap-6'>
                  <Image src={pin} alt='' />
                  <p className='text-3xl text-white'>Unidade Mogi das Cruzes/SP</p>
                </div>
                <p className='mb-5 text-lg text-white'>Ed. Loloya - Rua João Cardoso de Siqueira Primo, 55 - Loja 01 Vila Hélio - Mogi das Cruzes - SP</p>
                <a href='tel:+5511913572556' className='text-lg text-green-go-bank transition-opacity hover:opacity-80'>
                  Telefone: (11) 91357-2556
                </a>
              </div>

              <div className='flex flex-col'>
                <div className='mb-8 flex gap-6'>
                  <Image src={pin} alt='' />
                  <p className='text-3xl text-white'>Unidade Limeira/SP</p>
                </div>
                <p className='mb-5 text-lg text-white'>Rua Pedro Zaccaria, 495 - Jardim Santa Luiza - Limeira - SP</p>
                <a href='tel:+5535992496631' className='text-lg text-green-go-bank transition-opacity hover:opacity-80'>
                  Telefone: (11) 97874-3245
                </a>
              </div>
            </div>

            <div className='mt-24 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center lg:gap-8'>
              <p className='text-3xl text-white'>Redes Sociais</p>
              <div className='flex gap-4'>
                <a href='https://www.instagram.com/gobank.br/' target='_blank' className='transition-opacity hover:opacity-80'>
                  <Image src={instagram} alt='' />
                </a>
                <a href='https://www.facebook.com/gobank.br' target='_blank' className='transition-opacity hover:opacity-80'>
                  <Image src={facebook} alt='' />
                </a>
                <a href='https://br.linkedin.com/company/go-bank' target='_blank' className='transition-opacity hover:opacity-80'>
                  <Image src={linkedin} alt='' />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-white'>
          <div className='flex w-full max-w-[1185px] justify-center px-5 py-5 lg:py-12'>
            <div className='flex flex-col gap-5 lg:flex-row lg:gap-12'>
              <Image src={attention} alt='' />
              <div className='flex flex-col gap-1.5'>
                <h1 className='text-3xl text-black-go-bank'>Atenção</h1>
                <p className='max-w-[720px] text-lg text-black-go-bank'>Não pedimos pagamento antecipado para aprovação de empréstimos. Caso receba algum contato dessa natureza, recuse e por favor nos comunique em um dos canais acima.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
