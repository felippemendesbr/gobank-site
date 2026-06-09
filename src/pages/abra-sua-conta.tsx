import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';

import capitalDeGiro from '../../public/svgs/capital-de-giro.svg';
import goPayMaquininha from '../../public/svgs/go-pay-maquininha.svg';
import descontoDeDuplocatas from '../../public/svgs/desconto-de-duplocatas.svg';
import atendimentoHumanizado from '../../public/svgs/atendimento-humanizado.svg';

import contaEscrowUm from '../../public/svgs/conta-escrow-um.svg';
import contaEscrowDois from '../../public/svgs/conta-escrow-dois.svg';
import contaEscrowTres from '../../public/svgs/conta-escrow-tres.svg';
import contaEscrowQuatro from '../../public/svgs/conta-escrow-quatro.svg';
import contaEscrowCinco from '../../public/svgs/conta-escrow-cinco.svg';
import contaEscrowSeis from '../../public/svgs/conta-escrow-seis.svg';
import contaEscrowSete from '../../public/svgs/conta-escrow-sete.svg';

import image from '../../public/images/image-abra-sua-conta.webp';

import dowloadOnTheAppStore from '../../public/images/dowload-on-the-app-store.webp';
import getItOnGooglePlay from '../../public/images/get-it-on-google-play.webp';
import greenSelectArrow from '../../public/svgs/green-select-arrow.svg';
import { useRouter } from 'next/router';
import Head from 'next/head';

type FormData = {
	nomeDaEmpresa: string;
	cpfCnpj: string;
	nomeCompleto: string;
	telefone: string;
	whatsapp?: boolean;
	email: string;
	tipoDeConta: string;
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
	telefone: Yup.string()
		.required('Telefone é obrigatório')
		.matches(/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/, 'Telefone inválido'),
	whatsapp: Yup.boolean(),
	email: Yup.string().email('Por favor, insira um endereço de e-mail válido').required('E-mail é obrigatório'),
	tipoDeConta: Yup.string().required('Selecione o tipo de conta').oneOf(['Conta Escrow', 'Conta Digital', 'Nenhum tipo de conta'], 'Selecione o tipo de conta'), // Yup.string().notRequired().transform((value) => (value === null ? undefined : value)), // 
});

export default function AbraSuaConta() {
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
				telefone: data.telefone,
				whatsapp: data.whatsapp,
				email: data.email,
				tipoDeConta: data.tipoDeConta,
			};

			const form = new FormData();
			for (const field in emailBody) {
				// @ts-ignore
				form.append(field, emailBody[field]);
			}

			await axios
				.post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/31/feedback?_wpcf7_unit_tag=true`, form, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((response) => {
					reset();
					router.push(`/agradecimento-abra-sua-conta`);
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



	useEffect(() => {
		const button = document.querySelector('.cta_produtos_abra_sua_conta');
		const target = document.querySelector('#form');
		const header = document.querySelector('header');

		if (button && target && header) {
		button.addEventListener('click', (e) => {
			e.preventDefault();

			const headerHeight = header.offsetHeight;
			const targetPosition = target.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = targetPosition - headerHeight;

			window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
			});
		});
		}

		return () => {
		if (button) button.removeEventListener('click', () => {});
		};
	}, []);

	return (
		<>
			<Head>
				<title>Abra Sua Conta na GoCapital! - Conta Digital e Escrow Para PJ</title>
				<meta name='description' content='Abra sua conta digital ou escrow na GoCapital para Pessoa Jurídica (PJ) e tenha uma conta completa para sua empresa. PIX, Depósitos, Pagamentos, Antecipação de Recebíveis e muito +' />
				<meta name='keywords' content='abra sua conta gobank' />
				<link rel='canonical' content='https://www.gobank.com.br/abra-sua-conta' />
				<meta property='og:title' content='Abra Sua Conta na GoCapital! - Conta Digital e Escrow Para PJ' />
				<meta property='og:description' content='Abra sua conta digital ou escrow na GoCapital para Pessoa Jurídica (PJ) e tenha uma conta completa para sua empresa. PIX, Depósitos, Pagamentos, Antecipação de Recebíveis e muito +' />
				{/*<meta property="og:image" content=""/>*/}
				<meta property='og:url' content='https://www.gobank.com.br/abra-sua-conta' />
				<meta property='og:type' content='article' />
				<meta name='twitter:card' content='summary' />
				<meta name='twitter:title' content='Abra Sua Conta na GoCapital! - Conta Digital e Escrow Para PJ' />
				<meta name='twitter:description' content='Abra sua conta digital ou escrow na GoCapital para Pessoa Jurídica (PJ) e tenha uma conta completa para sua empresa. PIX, Depósitos, Pagamentos, Antecipação de Recebíveis e muito +' />
				{/*<meta name="twitter:image" content=""/>*/}
			</Head>
			<main className='abra-sua-coonta_CTA'>
				<section>
					<div className='flex flex-col items-center justify-center overflow-hidden border-b-2 border-green-go-bank'>
						<div style={bgTransformStyle}></div>

						<div className='flex w-full max-w-[1185px] items-center gap-5 px-5 py-5 xl:py-28'>
							<div className='flex flex-col gap-9'>
								<h1 className='text-4xl font-light text-green-go-bank lg:text-6xl'>
									Sua conta <strong className='font-light text-white'>GoCapital</strong>
								</h1>
								<p className='w-full max-w-[660px] text-2xl font-light text-white'>Abra a sua conta na instituição financeira digital ideal para micros, pequenas e médias empresas. </p>
								<p className='w-full max-w-[660px] text-2xl font-light text-white'>Faça transações bancárias à distância com segurança, benefícios e funcionalidades que trazem mais praticidade no seu controle financeiro.</p>
							</div>
							<Image className='hidden w-1/2 rounded-bl-15 rounded-br-30 rounded-tl-30 rounded-tr-30 lg:flex' src={image} alt='Image' />
						</div>

						<div className='flex w-full max-w-[1185px] flex-col gap-16 px-5'>
							<h1 className='text-4xl text-white'>
								Conta <strong className='font-normal text-green-go-bank'>Digital</strong>
							</h1>

							<div className='flex flex-col justify-between gap-5 lg:flex-row'>
								<div className='flex flex-col items-center gap-5 lg:max-w-[150px] lg:gap-12'>
									<Image src={contaEscrowUm} alt='' />
									<p className='text-center text-white'>Disponível para pessoa jurídica (PJ)</p>
								</div>

								<div className='flex flex-col items-center gap-5 lg:max-w-[150px] lg:gap-12'>
									<Image src={contaEscrowDois} alt='' />
									<p className='text-center text-white'>Venda e receba com boletos de registro imediato</p>
								</div>

								<div className='flex flex-col items-center gap-5 lg:max-w-[150px] lg:gap-12'>
									<Image src={contaEscrowTres} alt='' />
									<p className='text-center text-white'>Consulte movimentações (saldos, extratos e lançamentos)</p>
								</div>

								<div className='flex flex-col items-center gap-5 lg:max-w-[150px] lg:gap-12'>
									<Image src={contaEscrowQuatro} alt='' />
									<p className='text-center text-white'>Transações via PIX e TED</p>
								</div>

								<div className='flex flex-col items-center gap-5 lg:max-w-[150px] lg:gap-12'>
									<Image src={contaEscrowCinco} alt='' />
									<p className='text-center text-white'>Plataformas WEB e mobile 100% digitais</p>
								</div>

								<div className='flex flex-col items-center gap-5 lg:max-w-[150px] lg:gap-12'>
									<Image src={contaEscrowSeis} alt='' />
									<p className='text-center text-white'>Saque em caixas eletrônicos</p>
								</div>
							</div>

							<div className='flex w-full justify-center'>
								<Link href='#form' className='cta_produtos_abra_sua_conta group relative flex w-full flex-row items-center justify-between rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[80px] xl:max-w-[585px] xl:px-12'>
									<p>Abra sua conta com um especialista</p>
									<Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
								</Link>
							</div>

							<div className='flex flex-col items-center justify-center gap-4 lg:flex-row'>
								<a href='https://apps.apple.com/br/app/go-bank/id1565213260' target='_blank' className='transition-opacity hover:opacity-80 cta_produtos_apple'>
									<Image width={253} src={dowloadOnTheAppStore} alt='Imagem de um botão da App Store' />
								</a>
								<a href='https://play.google.com/store/apps/details?id=br.com.fourbank.gobank' target='_blank' className='transition-opacity hover:opacity-80 cta_produtos_google'>
									<Image width={253} src={getItOnGooglePlay} alt='Imagem de um botão do Google Play' />
								</a>
							</div>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} id="form" className='mt-5 flex w-full max-w-[1185px] flex-col p-5 lg:mt-36 xl:mb-24'>
							{/*Nome da Empresa e CNPJ*/}
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
							{/*Nome da Empresa e CNPJ*/}

							{/*Nome completo e telefone*/}
							<div className='mb-8 flex flex-col gap-8 xl:flex-row'>
								<div className='w-full'>
									<div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
										<input {...register('nomeCompleto')} placeholder='Nome completo:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
										<p className='select-none text-lg text-green-go-bank'>*</p>
									</div>
									{errors.nomeCompleto && <p className='pt-1 text-red-500'>{errors.nomeCompleto.message}</p>}
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
							{/*Nome do responsavel e Telefone*/}

							<div className='mb-8 flex flex-col gap-8 xl:flex-row'>
								<div className='w-full'>
									<div className='flex w-full gap-5 border-b-[1px] border-white pb-5'>
										<input {...register('email')} placeholder='E-mail:' className='w-full bg-transparent text-lg text-white outline-0 placeholder:text-white' />
										<p className='select-none text-lg text-green-go-bank'>*</p>
									</div>
									{errors.email && <p className='pt-1 text-red-500'>{errors.email.message}</p>}
								</div>

								<div className='w-full hidden'>
									<div className='relative flex w-full items-center gap-5 border-b-[1px]  border-white pb-5'>
										<Image src={greenSelectArrow} alt='' className='absolute right-6 h-[100%]' />
										
										<select {...register('tipoDeConta')} className='z-1 relative w-full appearance-none bg-transparent text-lg text-white outline-0'>
											<option disabled className='text-black-go-bank'>
												Tipo de conta:
											</option>
											<option value="Nenhum tipo de conta" className='text-black-go-bank' selected>
												Nenhum tipo de conta
											</option>
											<option value='Conta Escrow' className='text-black-go-bank'>
												Conta Escrow
											</option>
											<option value='Conta Digital' className='text-black-go-bank'>
												Conta Digital
											</option>
										</select>
										<p className='select-none text-lg text-green-go-bank'>*</p>
									</div>
									{errors.tipoDeConta && <p className='pt-1 text-red-500'>{errors.tipoDeConta.message}</p>}
								</div>
							</div>

							{/*Botao*/}
							<div className='flex w-full flex-col justify-center gap-5 xl:flex-row'>
								<div className='flex w-full flex-col justify-end gap-5'>
									<ReCAPTCHA sitekey='6Lf1YjApAAAAAKk6PqhDNpsG3Avbl7BlsZlDAtP8' onChange={handleRecaptcha} />
									{!isRecaptchaValid && <p className='text-red-500'>Por favor, preencha o reCAPTCHA.</p>}
								</div>

								<button className={`group relative flex w-full flex-row items-center justify-between rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 bg-green-go-bank p-5 text-2xl transition-opacity hover:opacity-80 xl:h-[80px] xl:max-w-[550px] xl:px-12 ${isSubmitting ? 'cursor-wait' : ''}`} disabled={isSubmitting}>
									<p>Receber contato do seu gerente.</p>
									<Image className='transition-all group-hover:rotate-45' src={buttonBlackArrow} alt='Icone de download' />
								</button>
							</div>
							{/*Botao*/}
						</form>
					</div>
				</section>



				<section className='flex items-center justify-center bg-[#D9D9D9]'>
					<div className='flex w-full max-w-[1185px] flex-col flex-wrap justify-center gap-10 px-5 py-5 lg:flex-row lg:py-28'>
						<div className='flex  flex-col gap-5 rounded-bl-25 rounded-br-50 rounded-tl-50 rounded-tr-50 bg-white p-5 lg:max-w-[250px] lg:gap-11'>
							<div className='flex flex-col justify-between gap-5'>
								<Image src={capitalDeGiro} alt='' />
								<p className='text-2xl text-black-go-bank'>
									Capital <strong className='font-normal text-green-go-bank'>de Giro</strong>
								</p>
							</div>
							<p className='text-sm text-black-go-bank'>Fuja da burocracia dos bancos tradicionais com uma linha especial de crédito com condições atraentes e descomplicadas para a sua empresa.</p>
						</div>

						<div className='flex  flex-col gap-5 rounded-bl-25 rounded-br-50 rounded-tl-50 rounded-tr-50 bg-[#F0F0F0] p-5 lg:max-w-[250px] lg:gap-11'>
							<div className='flex flex-col justify-between gap-5'>
								<Image src={goPayMaquininha} alt='' />
								<p className='text-2xl text-green-go-bank'>
									Go.Pag <strong className='font-normal text-black-go-bank'>Maquininha</strong>
								</p>
							</div>
							<p className='text-sm text-black-go-bank'>Não importa o tamanho do seu negócio, temos uma maquininha Go.Pag perfeita para a sua empresa. Aceitamos as principais bandeiras.</p>
						</div>

						<div className='flex  flex-col gap-5 rounded-bl-25 rounded-br-50 rounded-tl-50 rounded-tr-50 bg-[#00DB87] p-5 lg:max-w-[250px] lg:gap-11'>
							<div className='flex flex-col justify-between gap-5'>
								<Image src={descontoDeDuplocatas} alt='' />
								<p className='text-2xl text-white'>
									Desconto de <strong className='font-normal text-black-go-bank'>duplicatas</strong>
								</p>
							</div>
							<p className='text-sm text-black-go-bank'>Serviço ágil de antecipação de recebíveis para que você possa transformar em dinheiro, em curto prazo, as vendas realizadas pela sua empresa.</p>
						</div>

						<div className='flex flex-col gap-5 rounded-bl-25 rounded-br-50 rounded-tl-50 rounded-tr-50 bg-[#242424] p-5 lg:max-w-[250px] lg:gap-11'>
							<div className='flex flex-col justify-between gap-5'>
								<Image src={atendimentoHumanizado} alt='' />
								<p className='text-2xl text-green-go-bank'>
									Atendimento <strong className='font-normal text-white'>humanizado</strong>
								</p>
							</div>
							<p className='text-sm text-white'>Mais do que uma instituição financeira, a GoCapital é parceiro da sua empresa e oferecemos as melhores vantagens de uma instituição financeira digital com atendimento humano e confiável para você.</p>
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
