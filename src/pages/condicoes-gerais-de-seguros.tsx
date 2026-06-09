import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';
import greenSelectArrow from '../../public/svgs/green-select-arrow.svg';
import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';

import Dropdown from '@/components/dropdown';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

import Head from 'next/head';

type FormData = {
  nomeDaEmpresa: string;
  cpfCnpj: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  whatsapp?: boolean;
  tipodeDeSeguro: string;
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
  nomeCompleto: Yup.string().required('Nome do completo é obrigatório'),
  email: Yup.string().email('Por favor, insira um endereço de e-mail válido').required('E-mail é obrigatório'),
  telefone: Yup.string()
    .required('Telefone é obrigatório')
    .matches(/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/, 'Telefone inválido'),
  whatsapp: Yup.boolean(),
  tipodeDeSeguro: Yup.string().required('Selecione o tipo de seguro').oneOf(['Seguro patrimonial empresarial', 'Seguro de vida empresarial', 'Seguro de automóvel e frota', 'Seguro D&O (Directors & Officers)', 'Seguro Saúde', 'Seguro Residencial', 'Consórcio de automóvel', 'Consórcio de imóvel', 'Assistências GoHelp'], 'Selecione o tipo de seguro'),
  cidadeEUF: Yup.string().required('Cidade e UF é obrigatório'),
  mensagem: Yup.string(),
});

export default function CondicoesGeraisDeSeguros() {
  // Recaptcha
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(true);
  const handleRecaptcha = (value: string | null) => {
    setRecaptchaValue(value);
    setIsRecaptchaValid(!!value);
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
        tipodeDeSeguro: data.tipodeDeSeguro,
        cidadeEUF: data.cidadeEUF,
        mensagem: data.mensagem,
      };

      const form = new FormData();
      for (const field in emailBody) {
        // @ts-ignore
        form.append(field, emailBody[field]);
      }

      await axios
        .post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/35/feedback?_wpcf7_unit_tag=true`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          console.log(response);
          reset();
          router.push(`/agradecimento-condicoes-gerais-de-seguros`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsRecaptchaValid(false);
    }
  }

  // React Hook Form

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
        <title>Condições Gerais de Seguros na GoCapital - Proteção Sob Medida</title>
        <meta name='description' content='Conheça as condições gerais de seguros para PJ na GoCapital. Proteja sua empresa com soluções personalizadas. Saiba mais e garanta a sua tranquilidade.' />
        <meta name='keywords' content='Condições Gerais de Seguros para PJ' />
        <link rel='canonical' content='https://www.gobank.com.br/seguros-e-consorcios' />
        <meta property='og:title' content='Condições Gerais de Seguros na GoCapital - Proteção Sob Medida' />
        <meta property='og:description' content='Conheça as condições gerais de seguros para PJ na GoCapital. Proteja sua empresa com soluções personalizadas. Saiba mais e garanta a sua tranquilidade.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/seguros-e-consorcios' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Condições Gerais de Seguros na GoCapital - Proteção Sob Medida' />
        <meta name='twitter:description' content='Conheça as condições gerais de seguros para PJ na GoCapital. Proteja sua empresa com soluções personalizadas. Saiba mais e garanta a sua tranquilidade.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='condicoes-gerais-de-seguros_CTA'>
        <section>
          <div className='flex items-center justify-center '>
            <div style={bgTransformStyle}></div>

            <div className='flex w-full max-w-[1185px] flex-col gap-24 px-5 py-5 lg:py-28'>
              <h1 className='text-6xl	text-green-go-bank'>Condições Gerais de Seguros</h1>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center bg-gray-dark-go-bank pb-5 lg:pb-28'>
            <div className='flex w-full max-w-[1185px] flex-col gap-9 px-5 py-16'>
              <Dropdown title='Seguro patrimonial empresarial' imageSrc={whiteArrowDropdownMenu}>
                <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                  <h2 className='text-3xl text-green-go-bank'>Seguro patrimonial empresarial</h2>

                  <p className='text-lg text-white'>O seguro patrimonial é uma modalidade de seguro voltada para proteger as empresas contra os riscos e imprevistos que podem afetar suas atividades. Esse tipo de seguro é aplicável a empresas de diferentes setores e tamanhos que desejam proteger seu patrimônio contra eventos como incêndios, roubos, danos elétricos, entre outros. A contratação do seguro patrimonial é essencial para garantir a segurança financeira e a continuidade das operações em caso de eventos adversos.</p>

                  <p className='text-2xl text-white'>Vantagens</p>
                  <p className='text-lg text-white'>1. Micro e pequenas empresas: Essas empresas muitas vezes possuem recursos limitados para lidar com imprevistos, como incêndios, roubos ou danos elétricos. O seguro empresarial oferece proteção financeira e auxilia na recuperação dessas empresas. Por exemplo, um pequeno comércio que sofre um roubo pode contar com o seguro para cobrir os prejuízos e evitar maiores impactos em suas finanças.</p>
                  <p className='text-lg text-white'>2. Empresas de médio porte: Essas empresas geralmente possuem um patrimônio maior e estão expostas a riscos mais complexos. O seguro empresarial oferece coberturas abrangentes, como responsabilidade civil e perda de lucros, que podem ser essenciais para a continuidade dos negócios.</p>
                  <p className='text-lg text-white'>3. Grandes corporações: Essas empresas possuem um patrimônio significativo e estão expostas a riscos complexos e de grande magnitude. O seguro empresarial oferece coberturas personalizadas e específicas para cada setor de atuação. Por exemplo, uma empresa de energia que sofre um dano em sua infraestrutura pode contar com o seguro para cobrir os custos de reparo e minimizar os impactos financeiros.</p>

                  <p className='text-2xl text-white'>Alguns exemplos de coberturas</p>
                  <p className='text-lg text-white'>1. Proteção contra riscos e imprevistos: O seguro patrimonial oferece proteção financeira às empresas em caso de eventos inesperados que possam causar danos ao seu patrimônio. Por exemplo, se um incêndio ocorrer nas instalações da empresa, o seguro patrimonial cobrirá os danos causados, permitindo que a empresa se recupere mais rapidamente e minimize as perdas financeiras.</p>
                  <p className='text-lg text-white'>2. Cobertura abrangente: As condições gerais do seguro patrimonial estabelecem as coberturas oferecidas pelo seguro. Essas coberturas podem incluir danos materiais, responsabilidade civil, perda de lucros, entre outras. Por exemplo, se um cliente sofrer um acidente nas dependências da empresa e entrar com uma ação judicial, o seguro patrimonial pode cobrir as despesas legais e indenizações.</p>
                  <p className='text-lg text-white'>Ao estabelecer as regras e os direitos e deveres de ambas as partes, o seguro patrimonial oferece cobertura abrangente contra riscos e imprevistos, proporcionando tranquilidade aos empresários. Portanto, é essencial que as empresas considerem a contratação de um seguro patrimonial como parte de sua estratégia de gestão de riscos, independentemente do tamanho ou setor de atuação. Dessa forma, poderão proteger seu patrimônio e garantir a continuidade de suas operações.</p>
                </div>
              </Dropdown>

              <Dropdown title='Seguro de vida empresarial' imageSrc={whiteArrowDropdownMenu}>
                <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                  <h2 className='text-3xl text-green-go-bank'>Seguro de vida empresarial</h2>

                  <p className='text-lg text-white'>O seguro de vida empresarial é uma modalidade de seguro voltada para proteger os colaboradores de uma empresa, oferecendo cobertura em caso de morte, invalidez ou doenças graves.</p>
                  <p className='text-lg text-white'>Esse tipo de seguro é aplicável a empresas de diferentes setores e tamanhos que desejam oferecer uma proteção adicional aos seus colaboradores. A contratação do seguro de vida empresarial é essencial para garantir a segurança financeira dos colaboradores e demonstrar o compromisso da empresa com o bem-estar de sua equipe.</p>

                  <p className='text-2xl text-white'>Vantagens</p>
                  <p className='text-lg text-white'>1. Proteção financeira para os colaboradores: O seguro de vida empresarial oferece uma proteção financeira aos colaboradores e suas famílias em caso de eventos adversos, como morte ou invalidez. Essa cobertura pode incluir o pagamento de um capital segurado ou uma renda mensal, garantindo que os beneficiários tenham suporte financeiro em momentos difíceis. Por exemplo, se um colaborador falecer, o seguro de vida empresarial pode garantir que sua família tenha recursos para lidar com despesas como funeral, dívidas e manutenção do padrão de vida.</p>
                  <p className='text-lg text-white'>2. Atração e retenção de talentos: A oferta de um seguro de vida empresarial pode ser um diferencial importante na atração e retenção de talentos. Os colaboradores valorizam benefícios que vão além do salário, e o seguro de vida empresarial demonstra o cuidado da empresa com o bem-estar de sua equipe. Isso pode contribuir para a motivação e satisfação dos colaboradores, além de fortalecer a imagem da empresa no mercado. Por exemplo, um profissional qualificado pode optar por trabalhar em uma empresa que oferece um seguro de vida empresarial, pois isso traz segurança para ele e sua família.</p>
                  <p className='text-lg text-white'>3. Benefícios fiscais para a empresa: A contratação do seguro de vida empresarial também pode trazer benefícios fiscais para a empresa. Em alguns países, as contribuições feitas pela empresa para o seguro de vida dos colaboradores podem ser dedutíveis do imposto de renda. Isso representa uma economia financeira para a empresa, além de ser um investimento na segurança e bem-estar de sua equipe.</p>
                  <p className='text-lg text-white'>É fundamental para qualquer empresa garantir a segurança dos seus colaboradores, desta forma também garantindo a proteção de seu patrimônio. Toda e qualquer empresa deve considerar a contratação deste seguro como parte de sua estratégia de benefícios e valorização dos colaboradores, em alguns segmentos o seguro de vida é obrigatório por lei.</p>
                </div>
              </Dropdown>

              <Dropdown title='Seguro de automóvel e frota' imageSrc={whiteArrowDropdownMenu}>
                <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                  <h2 className='text-3xl text-green-go-bank'>Seguro de automóvel e frota</h2>

                  <p className='text-lg text-white'>O seguro de automóvel ou frota é uma modalidade de seguro que visa proteger os veículos contra riscos e imprevistos, oferecendo cobertura em caso de acidentes, roubos, danos materiais, danos a terceiros, entre outros.</p>
                  <p className='text-lg text-white'>As condições gerais do seguro de automóvel ou frota estabelecem as regras e os direitos e deveres tanto da seguradora quanto do proprietário pessoa física ou jurídica do veículo. </p>
                  <p className='text-lg text-white'>Esse tipo de seguro é destinado a proprietários de veículos de diferentes tipos e categorias que desejam proteger seu patrimônio e garantir a segurança financeira em caso de eventos adversos. A contratação do seguro de automóvel é essencial para garantir a proteção do veículo, dos seus ocupantes, de terceiros e a tranquilidade do proprietário.</p>
                  <p className='text-2xl text-white'>Vantagens:</p>
                  <p className='text-lg text-white'>1. Proteção contra acidentes e danos: O seguro de automóvel oferece proteção financeira em caso de acidentes de trânsito, colisões, danos materiais e outros eventos que possam afetar o veículo. Por exemplo, se o veículo sofrer uma colisão, o seguro de automóvel cobrirá os custos de reparo, minimizando o impacto financeiro para o proprietário.</p>
                  <p className='text-lg text-white'>2. Cobertura contra roubos e furtos: O seguro de automóvel também oferece cobertura contra roubos e furtos do veículo. Caso o veículo seja roubado ou furtado, o seguro irá indenizar o proprietário de acordo com as condições estabelecidas no contrato. Por exemplo, se o veículo for roubado e não for recuperado, o seguro de automóvel irá reembolsar o valor do veículo ao proprietário.</p>
                  <p className='text-lg text-white'>3. Aplicável a diferentes tipos de veículos: O seguro de automóvel é destinado a proprietários de diferentes tipos de veículos, como carros de passeio, motocicletas, caminhões, entre outros. Independentemente do tipo de veículo, é importante contratar um seguro de automóvel.</p>
                  <p className='text-lg text-white'>Dessa forma, o proprietário, seja de um veículo particular ou de uma frota, poderá desfrutar de maior tranquilidade ao utilizar seus veículos e minimizar os impactos financeiros em caso de imprevistos.</p>
                </div>
              </Dropdown>

              <Dropdown title='Seguro D&O (Directors & Officers)' imageSrc={whiteArrowDropdownMenu}>
                <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                  <h2 className='text-3xl text-green-go-bank'>Seguro D&O (Directors & Officers)</h2>

                  <p className='text-lg text-white'>O seguro D&O (Directors and Officers) é uma modalidade de seguro voltada para proteger os diretores, administradores e executivos de uma empresa contra reclamações e processos judiciais relacionados às suas decisões e atos de gestão, destacando a importância dessa modalidade de seguro para os líderes empresariais de diferentes setores e tamanhos de empresas que desejam proteger seu patrimônio pessoal e garantir a segurança financeira em caso de reclamações ou processos judiciais relacionados às suas funções de gestão.</p>
                  <p className='text-2xl text-white'>Vantagens</p>

                  <p className='text-lg text-white'>1. Proteção contra reclamações e processos judiciais: O seguro D&O oferece proteção financeira aos diretores, administradores e executivos em caso de reclamações ou processos judiciais relacionados às suas decisões e atos de gestão. Por exemplo, se um acionista ou investidor entrar com uma ação judicial contra um diretor, alegando má gestão financeira, o seguro D&O cobrirá as despesas legais e possíveis indenizações.</p>
                  <p className='text-lg text-white'>2. Cobertura abrangente: As condições gerais do seguro D&O estabelecem as coberturas oferecidas pelo seguro. Essas coberturas podem incluir despesas legais, indenizações, custos de defesa, entre outros. Por exemplo, se um diretor for acusado de negligência na tomada de decisões estratégicas, o seguro D&O irá cobrir as despesas legais e possíveis indenizações decorrentes desse processo.</p>
                  <p className='text-lg text-white'>3. Aplicável a diferentes setores e tamanhos de empresas: O seguro D&O é destinado a líderes empresariais de diferentes setores e tamanhos de empresas. Desde pequenas empresas familiares até grandes corporações, todos os líderes empresariais podem se beneficiar dessa modalidade de seguro.</p>
                  <p className='text-lg text-white'>Portanto, é essencial que qualquer gestor considere a contratação de um seguro D&O como parte de sua estratégia de proteção e segurança financeira. Dessa forma, poderá desempenhar suas funções com maior tranquilidade e minimizar os riscos financeiros em caso de reclamações ou processos judiciais.</p>
                </div>
              </Dropdown>

              <Dropdown title='Seguro Saúde' imageSrc={whiteArrowDropdownMenu}>
                <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                  <h2 className='text-3xl text-green-go-bank'>Seguro Saúde</h2>

                  <p className='text-lg text-white'>O seguro saúde é uma modalidade que visa garantir assistência médica e hospitalar aos segurados em caso de necessidade. As condições gerais desse tipo de seguro são estabelecidas pelas seguradoras, com o intuito de definir as coberturas, exclusões e demais aspectos relacionados à contratação.</p>

                  <p className='text-2xl text-white'>Vantagens</p>

                  <p className='text-lg text-white'>1. Coberturas e benefícios: As condições gerais de seguro saúde estabelecem as coberturas e benefícios oferecidos aos segurados. Essas coberturas podem incluir consultas médicas, exames laboratoriais, internações hospitalares, cirurgias, medicamentos, entre outros. Por exemplo, uma pessoa que contrata um seguro saúde pode ter acesso a uma ampla rede de médicos e hospitais conveniados, o que facilita o acesso aos serviços de saúde de qualidade.</p>
                  <p className='text-lg text-white'>2. Exclusões e limitações: Além das coberturas, as condições gerais de um seguro saúde também estabelecem algumas exclusões e limitações. Essas exclusões podem variar de acordo com a seguradora, mas geralmente incluem tratamentos estéticos, doenças preexistentes, procedimentos experimentais, entre outros. Por exemplo, uma pessoa que possui uma condição de saúde preexistentes pode ter essa condição excluída da cobertura do seguro saúde.</p>
                  <p className='text-lg text-white'>3. Público-alvo: O seguro saúde se destina a diferentes públicos, como indivíduos, famílias e empresas. Para indivíduos e famílias, o seguro saúde oferece a tranquilidade de contar com assistência médica de qualidade, sem se preocupar com altos custos. Já para as empresas, o seguro saúde é uma forma de atrair e reter talentos, oferecendo um benefício importante aos colaboradores. Por exemplo, uma empresa pode oferecer um plano de seguro saúde como parte do pacote de benefícios aos seus funcionários.</p>
                </div>
              </Dropdown>

              <Dropdown title='Seguro Residencial' imageSrc={whiteArrowDropdownMenu}>
                <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                  <h2 className='text-3xl text-green-go-bank'>Seguro Residencial</h2>

                  <p className='text-lg text-white'>O seguro residencial é uma modalidade de proteção financeira que visa garantir a segurança e a tranquilidade dos proprietários de imóveis. As condições gerais desse tipo de seguro são estabelecidas pelas seguradoras, com o intuito de definir as coberturas, exclusões e demais aspectos relacionados à contratação. </p>

                  <p className='text-2xl text-white'>Vantagens</p>

                  <p className='text-lg text-white'> 1. Coberturas e benefícios: As condições gerais de seguro residencial estabelecem as coberturas e benefícios oferecidos aos segurados. Essas coberturas podem incluir danos causados por incêndio, explosão, roubo, vendaval, entre outros. Além disso, o seguro residencial também pode oferecer assistência 24 horas, como chaveiro, encanador e eletricista. Por exemplo, uma pessoa que contrata um seguro residencial pode ter a garantia de que, em caso de um incêndio, terá o suporte financeiro para reparar os danos causados à sua residência.</p>
                  <p className='text-lg text-white'>2. Exclusões e limitações: Assim como em outros tipos de seguro, as condições gerais do seguro residencial também estabelecem as exclusões e limitações. Essas exclusões podem variar de acordo com a seguradora, mas geralmente incluem danos causados por negligência do segurado, guerra, atos terroristas, entre outros. Por exemplo, se um segurado deixar a porta de sua residência aberta e ocorrer um roubo, esse evento pode ser excluído da cobertura do seguro residencial.</p>
                  <p className='text-lg text-white'>3. Público-alvo: O seguro residencial se destina a diferentes públicos, como proprietários de imóveis, inquilinos e condomínios. Para os proprietários de imóveis, o seguro residencial oferece a tranquilidade de contar com proteção financeira em caso de danos à sua propriedade. Para os inquilinos, o seguro residencial é uma forma de proteger seus bens pessoais e responsabilidade civil. Por exemplo, se um inquilino causar um incêndio acidentalmente, o seguro residencial pode cobrir os danos causados ao imóvel e a terceiros.</p>
                  <p className='text-lg text-white'>Ao estabelecer as coberturas, exclusões e demais aspectos relacionados ao seguro residencial, as seguradoras proporcionam aos segurados a tranquilidade de contar com a reparação financeira em caso de danos à sua residência. Seja para proprietários de imóveis, inquilinos ou condomínios, o seguro residencial se destina a todos que buscam proteger seu patrimônio e garantir a segurança de sua moradia.</p>
                </div>
              </Dropdown>

              <Dropdown title='Consórcio de automóvel' imageSrc={whiteArrowDropdownMenu}>
                <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                  <h2 className='text-3xl text-green-go-bank'>Consórcio de automóvel</h2>

                  <p className='text-lg text-white'>O consórcio de automóvel é uma modalidade de compra parcelada que permite aos participantes adquirirem um veículo por meio de um sistema de autofinanciamento. As condições gerais desse tipo de consórcio são estabelecidas pelas administradoras, com o intuito de definir as regras, prazos, taxas e demais aspectos relacionados à contratação. </p>

                  <p className='text-2xl text-white'>Vantagens</p>

                  <p className='text-lg text-white'>1. Prazos e parcelas: As condições gerais de consórcio de automóvel estabelecem os prazos e parcelas para a aquisição do veículo. Geralmente, o consórcio possui um prazo determinado, no qual os participantes pagam mensalmente suas parcelas. A cada mês ocorre a contemplação, que pode ser por meio de sorteio ou lance. Por exemplo, uma pessoa que participa de um consórcio de automóvel pode ter um prazo de 60 ou até de 80 meses para pagar suas parcelas e ser contemplada com a carta de crédito a qualquer momento até o final desse período.</p>
                  <p className='text-lg text-white'>2. Taxas e custos: Além dos prazos e parcelas, as condições gerais também estabelecem as taxas e custos envolvidos em cada plano. Esses custos podem incluir taxa de administração, fundo de reserva e seguro.</p>
                  <p className='text-lg text-white'>3. Público-alvo: O consórcio de automóvel se destina a diferentes públicos, como pessoas que desejam adquirir um veículo sem pagar juros, planejam a compra a longo prazo e têm disciplina financeira para pagar as parcelas mensais. Além disso, o consórcio também é uma opção para quem não possui recursos para dar uma entrada em um financiamento tradicional. Por exemplo, uma pessoa que não tem condições de dar uma entrada em um financiamento pode optar pelo consórcio de automóvel como forma de adquirir o veículo desejado. Outra opção que é muito utilizada, como alternativa de investimento para quem não tem interesse em adquirir um veículo, mas quer poupar dinheiro.</p>
                  <p className='text-lg text-white'>Ao estabelecer os prazos, parcelas, taxas e demais aspectos relacionados ao consórcio de automóvel, as administradoras proporcionam aos participantes a oportunidade de adquirir um veículo de forma planejada e sem pagar juros. Seja para pessoas que desejam evitar financiamentos tradicionais, poupar dinheiro, planejar a compra a longo prazo ou não possuem recursos para dar uma entrada, o consórcio de automóveis é o produto ideal para todos que buscam uma alternativa de aquisição mais acessível e controlada financeiramente.</p>
                </div>
              </Dropdown>

              <Dropdown title='Consórcio de imóvel' imageSrc={whiteArrowDropdownMenu}>
                <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                  <h2 className='text-3xl text-green-go-bank'>Consórcio de imóvel</h2>

                  <p className='text-lg text-white'>O consórcio de imóvel é uma modalidade de compra parcelada que permite aos participantes adquirirem um imóvel por meio de um sistema de autofinanciamento. As condições gerais desse tipo de consórcio são estabelecidas pelas administradoras, com o intuito de definir as regras, prazos, taxas e demais aspectos relacionados à contratação. </p>

                  <p className='text-2xl text-white'>Vantagens</p>

                  <p className='text-lg text-white'>1. Prazos e parcelas: As condições gerais de consórcio de imóvel estabelecem os prazos e parcelas para a aquisição do imóvel. A cada mês ocorre a contemplação, que pode ser por meio de sorteio ou lance. Por exemplo, uma pessoa que participa de um consórcio de imóvel pode ter um prazo de até 200 meses para pagar suas parcelas e ser contemplada com a carta de crédito a qualquer momento até o final desse período.</p>
                  <p className='text-lg text-white'>2. Taxas e custos: Além dos prazos e parcelas, as condições gerais também estabelecem as taxas e custos envolvidos no consórcio de imóvel. Esses custos podem incluir taxa de administração, fundo de reserva e seguro. É importante que os participantes estejam cientes desses valores para evitar surpresas ao longo do processo. Por exemplo, uma pessoa que adere a um consórcio de imóvel deve estar ciente da taxa de administração e do valor do fundo de reserva que serão cobrados mensalmente.</p>
                  <p className='text-lg text-white'>3. Público-alvo: O consórcio de imóvel se destina a diferentes públicos, como pessoas que desejam adquirir um imóvel sem pagar juros, planejam a compra a longo prazo e têm disciplina financeira para pagar as parcelas mensais. Além disso, o consórcio também é uma opção para quem não possui recursos para dar uma entrada em um financiamento tradicional. Por exemplo, uma pessoa que não tem condições de dar uma entrada em um financiamento pode optar pelo consórcio de imóvel como forma de adquirir o imóvel desejado com condições muito mais acessíveis.</p>
                  <p className='text-lg text-white'>Ao estabelecer os prazos, parcelas, taxas e demais aspectos relacionados ao consórcio de imóvel, as administradoras proporcionam aos participantes a oportunidade de adquirir um imóvel de forma planejada e sem juros. Seja para pessoas que desejam evitar financiamentos tradicionais, planejam a compra a longo prazo ou não possuem recursos para dar uma entrada, o consórcio de imóvel se destina a todos que buscam uma alternativa de aquisição de imóvel mais acessível e controlada financeiramente, tornando-se uma opção cada vez mais relevante, também, para novos investidores imobiliários.</p>
                </div>
              </Dropdown>

              <Dropdown title='Assistências GoHelp' imageSrc={whiteArrowDropdownMenu}>
                <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                  <h2 className='text-3xl text-green-go-bank'>Assistências GoHelp</h2>

                  <p className='text-lg text-white'>A assistência GoHelp é uma modalidade de seguro que permite aos beneficiários contarem com apoio em momentos delicados da vida. Destina-se a qualquer pessoa, física ou jurídica.</p>

                  <p className='text-2xl text-white'>Coberturas</p>

                  <p className='text-lg text-white'>Assistência funeral completa:</p>

                  <ul className='list-disc pl-5 text-lg text-white'>
                    <li>Atendimento social: A prestadora, que após conferir as informações, comunicará a funerária credenciada ou autorizada no município para ser providenciado tudo que for necessário para a execução do funeral;</li>
                    <li>Transporte de familiar para liberação de corpo: No caso de falecimento do Segurado fora de seu município de residência e havendo a necessidade de um membro da família para liberação do corpo, a Prestadora fornecerá um meio de transporte mais apropriado, a seu critério;</li>
                    <li>Funeral completo: Urna, higienização básica, ornamentação do corpo, coroa de flores, véu, paramentos, velas, carro fúnebre, registro em cartório, livro de presença, locação de sala para velório.</li>
                    <li>Cremação;</li>
                    <li>Sepultamento.</li>
                  </ul>

                  <p className='text-lg text-white'>Assistência residencial com troca de peças:</p>

                  <ul className='list-disc pl-5 text-lg text-white'>
                    <li>Chaveiro: Envio de chaveiro para confecção de chave em caso de perda, quebra de chaves na fechadura, roubo ou furto de chaves;</li>
                    <li>Encanador: Envio de encanador para resolver problemas de vazamentos em tubulações aparentes ou solucionar problemas que possam acarretar risco de alagamento na residência;</li>
                    <li>Eletricista: Envio de eletricista para realizar reparos necessários para o restabelecimento da energia elétrica ou para solucionar problemas elétricos;</li>
                    <li>Conserto de eletrodomésticos: Pagamento do custo de mão de obra e peças na ocorrência de defeito técnico com o eletrodoméstico ou eletroeletrônico da linha branca (Fogão, Cooktop, Forno elétrico, Micro-ondas, Refrigerador (Geladeira), Freezer, Lavadora de Louças, Lavadora de Roupas, Lava e Seca, Tanquinho e Secadora de Roupas);</li>
                  </ul>

                  <p className='text-lg text-white'>Indenização por morte acidental:</p>

                  <ul className='list-disc pl-5 text-lg text-white'>
                    <li>R$ 10.000,00 de indenização em caso de morte acidental do segurado principal;</li>
                  </ul>

                  <p className='text-lg text-white'>Sorteio:</p>

                  <ul className='list-disc pl-5 text-lg text-white'>
                    <li>Concorre a um sorteio de R$ 20.000,00 mensalmente.</li>
                  </ul>
                </div>
              </Dropdown>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex w-full max-w-[1185px] flex-col px-5'>
              {/*Nome da Empresa e CPF/CNPJ*/}
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
              {/*Nome da Empresa e CPF/CNPJ*/}

              {/*Nome completo*/}
              <div className='mb-8 w-full'>
                <div className='flex w-full gap-5 border-b-[1px] border-white pb-5 '>
                  <input {...register('nomeCompleto')} placeholder='Nome completo:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
                  <p className='select-none text-lg text-green-go-bank'>*</p>
                </div>
                {errors.nomeCompleto && <p className='pt-1 text-red-500'>{errors.nomeCompleto.message}</p>}
              </div>
              {/*Nome completo*/}

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
                <div className='w-full'>
                  <div className='relative flex w-full items-center gap-5 border-b-[1px]  border-white pb-5'>
                    <Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
                    <select {...register('tipodeDeSeguro')} className='z-1 relative w-full appearance-none bg-transparent text-lg text-white outline-0'>
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
                  {errors.tipodeDeSeguro && <p className='pt-1 text-red-500'>{errors.tipodeDeSeguro.message}</p>}
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
              {/*Mensagem e botao*/}

              {/*Mensagem e botao*/}
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
      </main>
    </>
  );
}
