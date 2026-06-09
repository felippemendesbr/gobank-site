import { useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

import buttonWhiteArrow from '../../public/svgs/button-white-arrow.svg';
import footerLogo from '../../public/images/logo-gocapital-branco.png';

import dowloadOnTheAppStore from '../../public/images/dowload-on-the-app-store.webp';
import getItOnGooglePlay from '../../public/images/get-it-on-google-play.webp';

type FormData = {
	email: string;
};

const validationSchema = Yup.object().shape({
	email: Yup.string().email().required('E-mail é obrigatório'),
});

export default function Footer() {
	// React Hook Form
	const router = useRouter();
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		mode: 'onSubmit',
		resolver: yupResolver(validationSchema),
	});

	const [emailSuccessfullySent, setEmailSuccessfullySent] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function onSubmit(data: FormData) {
		setIsLoading(true);

		const emailBody = {
			email: data.email,
		};

		const form = new FormData();
		for (const field in emailBody) {
			// @ts-ignore
			form.append(field, emailBody[field]);
		}

		await axios
			.post(`https://admin.gobank.com.br//wp-json/contact-form-7/v1/contact-forms/148/feedback?_wpcf7_unit_tag=true`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
			.then((response) => {
				console.log(response);
				reset();
				setIsSubmitted(true);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}
	// React Hook Form

	return (
		<footer className='rolagem_footer relative z-20 flex items-center justify-center bg-black-go-bank lg:bg-black'>
			<div className='flex w-full max-w-[1185px] flex-col items-center justify-between px-5 pb-5 pt-5 lg:pt-28'>
				<div className='flex w-full items-center justify-between pb-5 lg:pb-20'>
					<div className='flex w-full flex-col gap-5 lg:w-[474px]'>
						<p className='text-lg font-light text-white lg:text-2xl'>Assine nossa newsletter</p>
						{!isSubmitted && (
							<form onSubmit={handleSubmit(onSubmit)} className='flex gap-5 border-b-1 border-white pb-5'>
								<div className='flex w-full'>
									<input {...register('email')} className='footer_newsletter w-full bg-transparent text-white outline-0 placeholder:text-white' placeholder='Digite seu melhor e-mail' />
									<button className={`footer_newsletter transition-transform hover:rotate-45 ${isLoading ? 'cursor-wait' : ''}`} disabled={isLoading}>
										<Image src={buttonWhiteArrow} alt='Icone de uma seta footer_newsletter' />
									</button>
								</div>
							</form>
						)}
						{errors.email && <p className='pt-1 text-red-500'>{errors.email.message}</p>}
						{isSubmitted && <p className='rounded-lg bg-green-800 px-5 py-1 text-white'>Inscrição no newsletter feita com sucesso!</p>}
					</div>

					<Link href='/' className='hidden transition-opacity hover:opacity-80 lg:flex'>
						<Image className='w-full max-w-[434px]' src={footerLogo} alt='Logo da GoCapital' />
					</Link>
				</div>

				<div className='my-11 flex w-full flex-col gap-5 lg:hidden'>
					<Link href='/sobre-o-gocapital' className='footer_gobank group flex items-center gap-4 transition-opacity hover:opacity-80'>
						<p className='text-lg font-light text-white lg:text-2xl footer_gobank'>Sobre a GoCapital</p>
						<Image className='transition-transform group-hover:rotate-45 footer_gobank' src={buttonWhiteArrow} alt='Icone de uma seta' />
					</Link>

					<Link href='/blog' className='footer_conteudo group flex items-center gap-4 transition-opacity hover:opacity-80'>
						<p className='text-lg font-light text-white lg:text-2xl footer_conteudo'>Conteúdo</p>
						<Image className='transition-transform group-hover:rotate-45 footer_conteudo' src={buttonWhiteArrow} alt='Icone de uma seta' />
					</Link>

					<Link href='/converse-com-o-gocapital' className='footer_informacoes group flex items-center gap-4 transition-opacity hover:opacity-80'>
						<p className='text-lg font-light text-white lg:text-2xl footer_informacoes'>Informações</p>
						<Image className='transition-transform group-hover:rotate-45 footer_informacoes' src={buttonWhiteArrow} alt='Icone de uma seta' />
					</Link>

					<div className='flex flex-col gap-8 lg:gap-14'>
						<p className='text-lg font-light text-white lg:text-2xl'>Baixe o app</p>
						<div className='flex flex-row gap-4'>
							<a href='https://apps.apple.com/br/app/go-bank/id1565213260' target='_blank' className='footer_apple transition-opacity hover:opacity-80'>
								<Image width={214} src={dowloadOnTheAppStore} alt='Imagem de um botão da App Store' className='footer_apple' />
							</a>
							<a href='https://play.google.com/store/apps/details?id=br.com.fourbank.gobank' target='_blank' className='footer_google transition-opacity hover:opacity-80'>
								<Image width={214} src={getItOnGooglePlay} alt='Imagem de um botão do Google Play' className='footer_google' />
							</a>
						</div>
					</div>
				</div>

				<div className='borderb-1 hidden w-full flex-col justify-between gap-5  border-white pb-5 lg:flex lg:flex-row lg:pb-16'>
					<div className='flex flex-col gap-5 lg:gap-14'>
						<Link href='/sobre-o-gocapital' className='footer_gobank group flex items-center gap-4 transition-opacity hover:opacity-80'>
							<p className='text-2xl font-light text-white footer_gobank'>Sobre a GoCapital</p>
							<Image className='transition-transform group-hover:rotate-45 footer_gobank' src={buttonWhiteArrow} alt='Icone de uma seta' />
						</Link>

						<div className='flex flex-col gap-5 lg:gap-6'>
							<p className='b text-2xl font-light text-white'>Central de Atendimento</p>
							<ul className='flex flex-col gap-4'>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_converse_com_o_gobank' href='/converse-com-o-gocapital'>
										Converse com a GoCapital
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_central_de_ajuda' href='/central-de-ajuda'>
										Central de Ajuda
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_trabalhe_conosco' href='/trabalhe-conosco'>
										Trabalhe Conosco
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_termo_de_uso' href='/termos-de-uso'>
										Termo de Uso
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_politica_de_privacidade' href='/politica-de-privacidade'>
										Política de Privacidade
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className='flex flex-col gap-5 lg:gap-14'>
						<Link href='/blog' className='footer_conteudo group flex items-center gap-4 transition-opacity hover:opacity-80'>
							<p className='text-2xl font-light text-white footer_conteudo'>Conteúdo</p>
							<Image className='transition-transform group-hover:rotate-45 footer_conteudo' src={buttonWhiteArrow} alt='Icone de uma seta' />
						</Link>

						<div className='flex flex-col gap-5 lg:gap-6'>
							<p className='b text-2xl font-light text-white'>Soluções Financeiras</p>
							<ul className='flex flex-col gap-4'>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_abra_sua_conta' href='/abra-sua-conta'>
										<p>Abra sua Conta</p>
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_credito_descomplicado' href='/credito-descomplicado'>
										<p className='footer_credito_descomplicado'>Crédito Descomplicado</p>
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_maquininha_gobank' href='/maquininhas-go-pag'>
										<p className='footer_maquininha_gobank'>Maquininha Go.Pag</p>
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_seguros_e_consorcios' href='/seguros-e-consorcios'>
										<p className='footer_seguros_e_consorcios'>Seguros e Consórcios</p>
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_condicoes_gerais_de_seguro' href='/condicoes-gerais-de-seguros'>
										<p className='footer_condicoes_gerais_de_seguro'>Condições Gerais de Seguro</p>
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_financiamentos' href='/financiamentos'>
										<p className='footer_financiamentos'>Financiamentos</p>
									</Link>
								</li>
								<li>
									<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_seja_um_parceiro' href='/seja-um-parceiro'>
										Seja um Parceiro
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className='flex flex-col gap-5 lg:gap-14'>
						<p className='text-2xl font-light text-white'>Baixe o app</p>

						<div className='flex flex-col gap-4'>
							<a href='https://apps.apple.com/br/app/go-bank/id1565213260' target='_blank' className='footer_apple transition-opacity hover:opacity-80'>
								<Image width={214} src={dowloadOnTheAppStore} alt='Imagem de um botão da App Store' />
							</a>
							<a href='https://play.google.com/store/apps/details?id=br.com.fourbank.gobank' target='_blank' className='footer_google transition-opacity hover:opacity-80'>
								<Image width={214} src={getItOnGooglePlay} alt='Imagem de um botão do Google Play' />
							</a>
						</div>
					</div>

					<div className='flex flex-col gap-5 lg:gap-14'>
						<Link href='/converse-com-o-gocapital' className='footer_informacoes group flex items-center gap-4 transition-opacity hover:opacity-80'>
							<p className='text-2xl font-light text-white footer_informacoes'>Informações</p>
							<Image className='transition-transform group-hover:rotate-45 footer_informacoes' src={buttonWhiteArrow} alt='Icone de uma seta' />
						</Link>
					</div>
				</div>

				<div className='mb-12 flex w-full flex-row gap-5 lg:hidden'>
					<div className='flex flex-col gap-5 lg:gap-6'>
						<p className='text-lg font-light text-white lg:text-2xl'>Central de Atendimento</p>
						<ul className='flex flex-col gap-4'>
							<li>
								<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_converse_com_o_gobank' href='/converse-com-o-gocapital'>
									<p className='footer_converse_com_o_gobank'>Converse com a GoCapital</p>
								</Link>
							</li>
							<li>
								<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_central_de_ajuda' href='/central-de-ajuda'>
									<p className='footer_central_de_ajuda'>Central de Ajuda</p>
								</Link>
							</li>
							<li>
								<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_trabalhe_conosco' href='/trabalhe-conosco'>
									<p className='footer_trabalhe_conosco'>Trabalhe Conosco</p>
								</Link>
							</li>
							<li>
								<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_termo_de_uso' href='/termos-de-uso'>
									<p className='footer_termo_de_uso'>Termo de Uso</p>
								</Link>
							</li>
							<li>
								<Link className='text-lg font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 footer_politica_de_privacidade' href='/politica-de-privacidade'>
									<p className='footer_politica_de_privacidade'>Política de Privacidade</p>
								</Link>
							</li>
						</ul>
					</div>

					<div className='flex flex-col gap-5 lg:gap-6'>
						<p className='text-lg font-light text-white lg:text-2xl'>Soluções Financeiras</p>
						<ul className='flex flex-col gap-4'>
							<li>
								<Link className='text-base font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg footer_abra_sua_conta' href='/abra-sua-conta'>
									<p className='footer_abra_sua_conta'>Abra sua Conta</p>
								</Link>
							</li>
							<li>
								<Link className='text-base font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg footer_credito_descomplicado' href='/credito-descomplicado'>
									<p className='footer_credito_descomplicado'>Crédito Descomplicado</p>
								</Link>
							</li>
							<li>
								<Link className='text-base font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg footer_maquininha_gopay' href='/maquininhas-go-pag'>
									<p className='footer_maquininha_gopay'>Maquininha Go.Pag</p>
								</Link>
							</li>
							<li>
								<Link className='text-base font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg footer_seguros_e_consorcios' href='/seguros-e-consorcios'>
									<p className='footer_seguros_e_consorcios'>Seguros e Consórcios</p>
								</Link>
							</li>
							<li>
								<Link className='text-base font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg footer_condicoes-gerais_de_seguro' href='/condicoes-gerais-de-seguros'>
									<p className='footer_condicoes-gerais_de_seguro'>Condições Gerais de Seguro</p>
								</Link>
							</li>
							<li>
								<Link className='text-base font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg footer_financiamentos' href='/financiamentos'>
									<p className='footer_financiamentos'>Financiamentos</p>
								</Link>
							</li>
							<li>
								<Link className='text-base font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg footer_seja_um_parceiro' href='/seja-um-parceiro'>
									<p className='footer_seja_um_parceiro'>Seja um Parceiro</p>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<Link href='/' className='flex transition-opacity hover:opacity-80 lg:hidden'>
					<Image className='w-full max-w-[434px]' src={footerLogo} alt='Logo da GoCapital' />
				</Link>

				<div className='grid xl:grid-cols-2 w-full py-5 lg:border-t-1 lg:border-white lg:py-8 gap-10'>
					<p className='text-white'>Atuamos como correspondente bancário nos termos da resolução 3.954, de 24 de fevereiro de 2011 do Banco Central do Brasil.</p>
					<p className='text-white xl:text-right'>Copyright - 2023 - GoCapital - Todos os direitos reservados </p>
				</div>
			</div>
		</footer>
	);
}
