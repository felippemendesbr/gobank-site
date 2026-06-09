import Image from 'next/image';

import instagram from '../../public/svgs/instagram.svg';
import facebook from '../../public/svgs/facebook.svg';
import linkedin from '../../public/svgs/linkedin.svg';

export default function AgradecimentoAbraSuaConta() {
  return (
    <section className='agradecimento-abra-sua-conta_CTA flex flex-col items-center justify-center bg-background bg-center'>
      <div className='flex w-full max-w-[1185px] flex-col gap-5 px-5 pb-56 pt-32'>
        <h1 className='text-6xl font-light text-green-go-bank'>Parabéns!</h1>
        <p className='text-4xl text-white'>Você acaba de dar o 1º passo para dar um GO no seu negócio!</p>
        <p className='text-lg text-white'>Em breve, um especialista do nosso time entrará em contato para dar continuidade no seu atendimento.</p>
        <p className='text-lg text-white'>Até lá, acompanhe nossas novidades nas redes sociais:</p>
        <div className='flex gap-5'>
          <a href='https://www.instagram.com/gobank.br/' target='_blank' className='cursor-pointer transition-opacity hover:opacity-80'>
            <Image src={instagram} alt='' />
          </a>
          <a href='https://www.facebook.com/gobank.br' target='_blank' className='cursor-pointer transition-opacity hover:opacity-80'>
            <Image src={facebook} alt='' />
          </a>
          <a href='https://br.linkedin.com/company/go-bank' target='_blank' className='cursor-pointer transition-opacity hover:opacity-80'>
            <Image src={linkedin} alt='' />
          </a>
        </div>
      </div>
    </section>
  );
}
