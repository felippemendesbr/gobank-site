import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import DropdownFAQ from '@/components/dropdown-faq';

import dowloadOnTheAppStore from '../../public/images/dowload-on-the-app-store.webp';
import getItOnGooglePlay from '../../public/images/get-it-on-google-play.webp';
import buttonBlackArrow from '../../public/svgs/button-black-arrow.svg';
import faqSearchMagnifyingGlass from '../../public/svgs/faq-search-magnifying-glass.svg';
import Head from 'next/head';

export default function CentralDeAjuda() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const contentDivs = document.querySelectorAll('.jsSearchFAQ');
      let resultsFound = false;

      contentDivs.forEach((div) => {
        const textContent = div.textContent || '';

        const normalizedContent = textContent
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();

        const normalizedSearchTerm = searchTerm
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();

        if (normalizedContent.includes(normalizedSearchTerm)) {
          div.classList.remove('hidden');
          div.classList.add('block');
          resultsFound = true;
        } else {
          div.classList.remove('block');
          div.classList.add('hidden');
        }
      });

      setNoResults(!resultsFound);
    };
    toggleVisibility();
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <Head>
        <title>Central de Ajuda GoCapital - Tire Suas Dúvidas Com Nosso FAQ</title>
        <meta name='description' content='Encontre a resposta para as principais dúvidas e faça sua pergunta na Central de Ajuda GoCapital. TObtenha assistência precisa para suas necessidades financeiras.' />
        <meta name='keywords' content='Central de Ajuda gobank' />
        <link rel='canonical' content='https://www.gobank.com.br/central-de-ajuda' />
        <meta property='og:title' content='Central de Ajuda GoCapital - Tire Suas Dúvidas Com Nosso FAQ' />
        <meta property='og:description' content='Encontre a resposta para as principais dúvidas e faça sua pergunta na Central de Ajuda GoCapital. TObtenha assistência precisa para suas necessidades financeiras.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/central-de-ajuda' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Central de Ajuda GoCapital - Tire Suas Dúvidas Com Nosso FAQ' />
        <meta name='twitter:description' content='Encontre a resposta para as principais dúvidas e faça sua pergunta na Central de Ajuda GoCapital. TObtenha assistência precisa para suas necessidades financeiras.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='central-de-ajuda_CTA'>
        <section>
          <div className='flex items-center justify-center bg-gray-dark-go-bank'>
            <div className='flex w-full max-w-[1185px] flex-col justify-between gap-5 px-5 py-5 lg:flex-row lg:py-28'>
              <h1 className='text-6xl	text-green-go-bank'>FAQ</h1>
              <div className='flex w-full max-w-[892px] justify-between gap-5 border-b-[1px]'>
                <input className='w-full bg-transparent text-2xl text-white outline-0 transition-colors hover:text-green-go-bank lg:text-4xl' type='text' placeholder='Buscar por palavra-chave' value={searchTerm} onChange={handleChange} />
                <Image src={faqSearchMagnifyingGlass} alt='Lupa' />
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center bg-gray-dark-go-bank'>
            <div className='flex w-full max-w-[1185px] flex-col gap-9 px-5 py-5 lg:py-16'>
              {noResults && <p className='text-3xl text-white'>Nenhum resultado encontrado, tente outra palavra-chave.</p>}

              <div className=' hidden flex-wrap gap-5 xl:flex'>
                <div className='flex max-w-[49%] flex-col gap-5'>
                  <DropdownFAQ title='1. A GoCapital é uma instituição financeira digital?' textButton='Saiba mais sobre a GoCapital' hrefButton='/quem-somos'>
                    <p className='text-lg text-white'>Sim. A GoCapital é uma instituição financeira digital com atendimento humanizado. Oferecemos serviços bancários on-line e conta com agências físicas para atender seus clientes sempre que necessário.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='3. Quais são os produtos oferecidos pela GoCapital?'>
                    <p className='text-lg text-white'>Oferecemos os seguintes produtos:</p>
                    <ul className='flex flex-col gap-5 text-lg text-white'>
                      <li className='flex flex-col items-start gap-5'>
                        <p className='font-bold'>Conta digital</p>
                        <p>Abra sua conta corrente totalmente on-line, que permite realizar transações bancárias, pagamentos, transferências e receber salários.</p>
                        <Link href='/banco-digital' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                          <span>Saiba mais.</span>
                          <Image src={buttonBlackArrow} alt='Seta do botão' />
                        </Link>
                      </li>

                      <li className='flex flex-col items-start gap-5'>
                        <p className='font-bold'>Conta Escrow</p>
                        <p>Abra sua conta de custódia utilizada para transações seguras entre compradores e vendedores, garantindo a entrega do produto ou serviço.</p>
                        <Link href='/banco-digital' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                          <span>Saiba mais.</span>
                          <Image src={buttonBlackArrow} alt='Seta do botão' />
                        </Link>
                      </li>

                      <li className='flex flex-col items-start gap-5'>
                        <p className='font-bold'>Go.Pag - Maquininha para cartão</p>
                        <p>Conheça nossa solução para aceitar pagamentos com cartão de crédito e débito, facilitando as vendas para empreendedores.</p>
                        <Link href='/go-pag' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                          <span>Saiba mais.</span>
                          <Image src={buttonBlackArrow} alt='Seta do botão' />
                        </Link>
                      </li>

                      <li className='flex flex-col items-start gap-5'>
                        <p className='font-bold'>Consórcios</p>
                        <p>Conheça essa modalidade de crédito para adquirir bens, como carros e imóveis. Temos parcelas mensais acessíveis, sorteios e lances para antecipação da carta de crédito.</p>
                        <Link href='/consorcio' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                          <span>Saiba mais.</span>
                          <Image src={buttonBlackArrow} alt='Seta do botão' />
                        </Link>
                      </li>

                      <li className='flex flex-col items-start gap-5'>
                        <p className='font-bold'>Seguros</p>
                        <p>Oferecemos diversos tipos de seguros, como seguro de vida, seguro patrimonial, seguro de automóveis, seguro saúde, e muito mais.</p>
                        <Link href='/' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                          <span>Saiba mais.</span>
                          <Image src={buttonBlackArrow} alt='Seta do botão' />
                        </Link>
                      </li>

                      <li className='flex flex-col items-start gap-5'>
                        <p className='font-bold'>Crédito facilitado</p>
                        <p>Conheça nossas linhas de crédito destinadas a empresas que precisam de recursos para investir, expandir e transformar o seu negócio.</p>
                        <Link href='/credito-facilitado' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                          <span>Saiba mais.</span>
                          <Image src={buttonBlackArrow} alt='Seta do botão' />
                        </Link>
                      </li>

                      <li className='flex flex-col items-start gap-5'>
                        <p className='font-bold'>Financiamentos</p>
                        <p>Na GoCapital temos opções de financiamento para aquisição de veículos, imóveis e outros bens.</p>
                        <Link href='/financiamentos' className='cta_produtos_financiamentos_simule flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                          <span>Saiba mais.</span>
                          <Image src={buttonBlackArrow} alt='Seta do botão' />
                        </Link>
                      </li>
                    </ul>
                  </DropdownFAQ>
                  <DropdownFAQ title='5. Quais são as vantagens da conta digital GoCapital?' hrefButton='/abra-sua-conta' textButton='Saiba mais sobre a conta digital.'>
                    <p className='text-lg text-white'>As vantagens da conta digital GoCapital incluem:</p>
                    <ul className='list-inside list-disc text-white'>
                      <li>Facilidade de acesso aos serviços bancários, sem a necessidade de deslocamento até uma agência física.</li>
                      <li>Menores taxas e tarifas em comparação com bancos tradicionais.</li>
                      <li>Transações bancárias rápidas e seguras.</li>
                      <li>Possibilidade de realizar pagamentos e transferências em qualquer lugar.</li>
                    </ul>
                  </DropdownFAQ>
                  <DropdownFAQ title='7. Quais são os requisitos para adquirir a maquininha para cartão Go.Pag da GoCapital?' hrefButton='/maquininhas' textButton='Saiba mais sobre as maquininhas Go.Pag'>
                    <p className='text-lg text-white'>As maquininhas de cartão Go.Pag são soluções criadas especialmente para você que tem uma empresa registrada e deseja aceitar pagamentos em crédito, débito e PIX QR Code.</p>
                    <p className='text-lg text-white'>Será necessário fornecer informações sobre o negócio, como CNPJ, faturamento médio mensal, entre outros.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='9. Quais são os tipos de seguros oferecidos pela GoCapital?' hrefButton='/condicoes-gerais-de-seguros' textButton='Saiba mais sobre os seguros GoCapital'>
                    <p className='text-lg text-white'>Oferecemos diversos tipos de seguros, como seguro de vida, seguro residencial, seguro patrimonial, seguro de automóveis, seguro de viagem, seguro de saúde, entre outros. </p>
                    <p className='text-lg text-white'>Cada tipo de seguro possui coberturas específicas que podem ser personalizadas de acordo com as suas necessidades.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='11. Quais são as opções de financiamento oferecidas?' hrefButton='/financiamentos' textButton='Saiba mais sobre os financiamentos oferecidos pela GoCapital'>
                    <p className='text-lg text-white'>Oferecemos opções de financiamento para aquisição de veículos, imóveis, maquinários e outros bens. O cliente pode escolher o prazo e o valor das parcelas de acordo com sua capacidade de pagamento.</p>
                    <p className='text-lg text-white'>É necessário fornecer informações sobre o bem desejado e passar por uma análise de crédito para aprovação do financiamento.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='13. Qual é o valor máximo que posso solicitar de crédito para capital de giro?' hrefButton='/financiamentos' textButton='Saiba mais sobre nossas opções de crédito para capital de giro'>
                    <p className='text-lg text-white'>O valor máximo de crédito para capital de giro depende da análise de crédito realizada. Geralmente, o valor é determinado com base no faturamento da empresa e na capacidade de pagamento.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='15. Quanto tempo leva para obter a aprovação do crédito para empreendedor?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                    <p className='text-lg text-white'>O tempo de aprovação varia de acordo com a complexidade da análise de crédito. Para solicitações simples, é possível que a aprovação ocorra em poucas horas.</p>
                    <p className='text-lg text-white'>Já para casos mais complexos, onde é necessária a avaliação de outros documentos, o prazo para esse processo pode ser estendido para dias ou semanas.</p>
                    <p className='text-lg text-white'>Mas não se preocupe, temos uma equipe de gerentes preparados para prestar suporte, tirar dúvidas e fornecer atualizações frequentemente.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='17. Posso obter um crédito para empreendedor mesmo se minha empresa estiver com restrições no CPF ou CNPJ?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                    <p className='text-lg text-white'>Empresas com restrições no CPF ou CNPJ podem ter mais dificuldade em obter crédito, mas ainda existem opções disponíveis.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='19. Posso utilizar o crédito para empreendedor para qualquer finalidade?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                    <p className='text-lg text-white'>Em geral, o crédito para empreendedor pode ser utilizado para diversas finalidades, como investimentos em equipamentos, estoque, expansão do negócio, pagamento de dívidas, entre outros. </p>
                    <p className='text-lg text-white'>No entanto, é importante verificar as restrições e condições específicas de cada modalidade de crédito.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='21. Quais são as opções de crédito para empreendedores com baixo faturamento ou empresas iniciantes?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                    <p className='text-lg text-white'>Para empresas com baixo faturamento ou em estágio inicial, pode ser mais desafiador obter crédito.</p>
                    <p className='text-lg text-white'>No entanto, existem opções como microcrédito, linhas de crédito específicas para startups e programas de incentivo governamentais que podem ser explorados.</p>
                    <p className='text-lg text-white'>É importante pesquisar e buscar orientação para encontrar a melhor opção para o seu negócio.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='23. O que é o crédito PRONAMPE?' hrefButton='/credito-facilitado' textButton='Conheça as linhas de crédito disponíveis na GoCapital'>
                    <p className='text-lg text-white'>O Programa Nacional de Apoio às Microempresas e Empresas de Pequeno Porte (PRONAMPE) é uma iniciativa do governo brasileiro criada em 2020 com o objetivo de oferecer crédito para microempresas e empresas de pequeno porte durante a pandemia de COVID-19.</p>
                    <p className='text-lg text-white'>O PRONAMPE é voltado para empresas que possuem receita bruta anual de até R$ 4,8 milhões. Ele oferece empréstimos com condições especiais, como taxas de juros reduzidas e prazos de pagamento mais longos, para auxiliar essas empresas a enfrentarem as dificuldades econômicas causadas pela crise que se perpetua ao longo do tempo.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='25. Qual o telefone fixo da GoCapital?'>
                    <p className='text-lg text-white'>
                      Para atendimento ligue <a href='tel:+551149634199'>(11) 4963-4199</a> e fale com a nossa equipe.
                    </p>
                  </DropdownFAQ>
                  <DropdownFAQ title='27. Qual o endereço da matriz da GoCapital?'>
                    <p className='text-lg text-white'>Nossa matriz está localizada em Guarulhos, na Avenida Salgado Filho, 2120 - Loja 20 Térreo - Centro - Guarulhos/SP.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='29. Estou com dificuldade para realizar uma operação. O que devo fazer?'>
                    <p className='text-lg text-white'>
                      Em caso de qualquer dificuldade ou instabilidade do sistema, entre em contato com nosso time de suporte através do e-mail <a href='mailto:suporte@gocapital.com.br'>suporte@gocapital.com.br</a> ou através do telefone <a href='tel:+5511950397790'>(11) 95039-7790</a>.
                    </p>
                  </DropdownFAQ>
                  <DropdownFAQ title='31. A GoCapital está disponível em quais regiões?'>
                    <p className='text-lg text-white'>A GoCapital tem uma cobertura nacional e todas as nossas soluções podem ser contratadas remotamente de onde você estiver no Brasil inteiro.</p>
                    <p className='text-lg text-white'>Mas, se quiser falar conosco presencialmente, temos agências localizadas em Guarulhos, Mogi das Cruzes, Limeira e Taubaté.</p>
                  </DropdownFAQ>
                </div>

                <div className='flex max-w-[49%] flex-col gap-5'>
                  <DropdownFAQ title='2. A GoCapital é uma fintech?' textButton='Conheça todas as nossas soluções' hrefButton='/sobre-o-gocapital'>
                    <p className='text-lg text-white'>Sim. Além de uma instituição financeira digital, a GoCapital também é uma fintech. Isso significa que unimos nossa expertise na área de finanças à tecnologia para oferecer serviços financeiros de forma inovadora, ágil e eficiente.</p>
                    <p className='text-lg text-white'>Temos um modelo de negócio diferenciado, com foco na experiência do usuário, redução de burocracia e custos do processo de tomada de crédito, além do atendimento humano dedicado com maior transparência.</p>
                  </DropdownFAQ>

                  <DropdownFAQ title='4. Como faço para abrir uma conta na GoCapital?' hrefButton='/abra-sua-conta' textButton='Conheça nossas modalidades de conta.'>
                    <p className='text-lg font-bold text-white'>Como abrir uma conta digital:</p>
                    <p className='text-lg text-white'>Para abrir uma conta digital na GoCapital, você pode:</p>
                    <ul className='list-inside list-disc text-white'>
                      <li>Entre em contato através dos nossos canais de atendimento e envie uma solicitação.</li>
                      <li>Vá até uma das nossas agências físicas onde nossos gerentes irão te atender.</li>
                      <li>Baixe o app da GoCapital* e abra sua conta pelo celular.</li>
                    </ul>
                    <div className='flex gap-4'>
                      <a className='transition-opacity hover:opacity-80'>
                        <Image src={dowloadOnTheAppStore} alt='Imagem de um botão da App Store' />
                      </a>
                      <a className='transition-opacity hover:opacity-80'>
                        <Image src={getItOnGooglePlay} alt='Imagem de um botão do Google Play' />
                      </a>
                    </div>
                    <p className='text-lg text-white'>*Opção de abertura exclusiva para contas da modalidade digital.</p>
                    <p className='text-lg font-bold text-white'>Como abrir uma conta Escrow:</p>
                    <p className='text-lg text-white'>No momento, a abertura de contas da modalidade Escrow é exclusivamente feita via preenchimento de formulário ou em nossas agências físicas.</p>
                    <p className='text-lg text-white'>É necessário entrar em contato conosco através dos nossos canais de atendimento e fornecer informações sobre sua empresa, como faturamento, tempo de atividade, entre outros. </p>
                    <p className='text-lg text-white'>Nossa equipe analisará a solicitação e entrará em contato para dar continuidade ao processo.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='6. Como funciona a conta Escrow GoCapital?' hrefButton='/abra-sua-conta' textButton='Saiba mais sobre a conta Escrow'>
                    <p className='text-lg text-white'>A conta Escrow GoCapital funciona como uma conta de custódia, onde o valor de uma transação é depositado pelo comprador.</p>
                    <p className='text-lg text-white'>Esse valor fica retido até que o vendedor cumpra com as condições acordadas, garantindo a segurança da transação para ambas as partes.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='8. Como funciona o consórcio GoCapital?' hrefButton='/consorcio' textButton='Saiba mais sobre o consórcio GoCapital'>
                    <p className='text-lg text-white'>No consórcio, um grupo de pessoas se reúne para adquirir um bem em comum. Cada participante paga uma parcela mensal e, por meio de sorteios ou lances, é definido quem receberá o crédito para a compra do bem. </p>
                    <p className='text-lg text-white'>O consórcio é uma modalidade de crédito para adquirir bens de forma planejada sem valores de entrada e sem o pagamento de juros.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='10. Como solicitar uma linha de crédito para a GoCapital?' hrefButton='/condicoes-gerais-de-seguros' textButton='Saiba mais sobre a linha de crédito GoCapital'>
                    <p className='text-lg text-white'>Para solicitar um crédito com a GoCapital é necessário entrar em contato conosco através dos nossos canais de atendimento e fornecer informações sobre sua empresa, como faturamento, tempo de atividade, necessidade de crédito, entre outros.</p>
                    <p className='text-lg text-white'>Nossa equipe analisará a solicitação e entrará em contato para dar continuidade ao processo.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='12. Quais são os requisitos para obter um crédito para empreendedor?' hrefButton='/credito-facilitado' textButton='Saiba mais sobre nossas opções de crédito facilitado'>
                    <p className='text-lg text-white'>Os requisitos podem variar de acordo com o banco ou instituição financeira, mas geralmente incluem:</p>
                    <ul className='list-inside list-disc text-white'>
                      <li>Ter um CNPJ ativo com pelo menos 2 anos em atividade;</li>
                      <li>Comprovar faturamento mínimo;</li>
                      <li>Apresentar documentos como balanço patrimonial;</li>
                      <li>Demonstrativo de resultados;</li>
                      <li>Entre outros.</li>
                    </ul>
                  </DropdownFAQ>
                  <DropdownFAQ title='14. Quais são as taxas de juros aplicadas no crédito para empreendedor?' hrefButton='/credito' textButton='Faça uma simulação de crédito'>
                    <p className='text-lg text-white'>As taxas de juros podem variar de acordo com o perfil de crédito da empresa e o valor solicitado. É importante sanar todas as dúvidas em relação às taxas oferecidas nas diversas modalidades de tomada de crédito.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='16. Quais são as garantias exigidas para obter um crédito para empreendedor?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                    <p className='text-lg text-white'>As garantias exigidas podem variar, mas geralmente incluem garantias reais, como imóveis ou veículos, ou garantias pessoais, como avalistas ou fianças.</p>
                    <p className='text-lg text-white'>A exigência de garantias depende do valor do crédito e do perfil de risco da empresa.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='18. Qual é o prazo de pagamento do crédito para empreendedor?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                    <p className='text-lg text-white'>O prazo de pagamento pode variar de acordo com o valor do crédito e a capacidade de pagamento da empresa.</p>
                    <p className='text-lg text-white'>Geralmente, os prazos podem variar de meses a anos, dependendo do acordo estabelecido entre a empresa e o banco.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='20. O que acontece se eu não conseguir pagar as parcelas do crédito para empreendedor?' hrefButton='/contato' textButton='Converse com o nosso time de relacionamento'>
                    <p className='text-lg text-white'>Caso haja dificuldades em pagar as parcelas do crédito, é importante entrar em contato com seu gerente de relacionamento o mais rápido possível.</p>
                    <p className='text-lg text-white'>Em alguns casos, é possível renegociar as condições de pagamento ou buscar alternativas para evitar a inadimplência.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='22. Quais são os tipos de créditos oferecidos para empresas?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                    <p className='text-lg text-white'>Alguns dos principais são:</p>
                    <ul className='list-inside list-disc text-white'>
                      <li>
                        <strong>Crédito para capital de giro:</strong> É um tipo de crédito destinado a suprir as necessidades de caixa da empresa, como pagamento de fornecedores, salários, despesas operacionais, entre outros.
                      </li>
                      <li>
                        <strong>Financiamento de investimentos:</strong> São linhas de crédito voltadas para investimentos em expansão, modernização, compra de equipamentos, ampliação de instalações, entre outros.
                      </li>
                      <li>
                        <strong>Crédito para exportação:</strong> É um tipo de crédito voltado para empresas que desejam exportar seus produtos. Pode incluir financiamento de exportações, pré-embarque e pós-embarque.
                      </li>
                      <li>
                        <strong>Microcrédito:</strong> É um tipo de crédito voltado para microempreendedores individuais (MEIs) e pequenos negócios. Geralmente, são valores menores e com condições mais flexíveis.
                      </li>
                      <li>
                        <strong>Crédito para inovação:</strong> São linhas de crédito específicas para empresas que desenvolvem projetos de pesquisa, desenvolvimento e inovação. Podem incluir financiamento para aquisição de tecnologia, patentes, entre outros.
                      </li>
                      <li>
                        <strong>Crédito para agronegócio:</strong> São linhas de crédito voltadas para empresas do setor agrícola, pecuário e agroindustrial. Podem incluir financiamento para compra de máquinas, insumos, investimentos em infraestrutura, entre outros.
                      </li>
                      <li>
                        <strong>Crédito para franquias:</strong> São linhas de crédito específicas para empresas que desejam abrir uma franquia. Podem incluir financiamento para taxa de franquia, investimentos iniciais, capital de giro, entre outros.
                      </li>
                      <li>
                        <strong>Crédito para energia renovável:</strong> São linhas de crédito voltadas para empresas que desejam investir em projetos de energia renovável, como solar, eólica, biomassa, entre outros.
                      </li>
                      <li>
                        <strong>Crédito para exportação:</strong> São linhas de crédito voltadas para empresas que desejam exportar seus produtos. Pode incluir financiamento de exportações, pré-embarque e pós-embarque.
                      </li>
                      <li>
                        <strong>Crédito para setores específicos:</strong> Alguns setores possuem linhas de crédito específicas, como o setor de turismo, construção civil, tecnologia, entre outros. Essas linhas podem oferecer condições diferenciadas de acordo com as necessidades do setor.
                      </li>
                    </ul>
                    <p className='text-lg text-white'>É importante ressaltar que as opções de crédito podem variar de acordo com a instituição financeira e as políticas de crédito vigentes.</p>
                    <p className='text-lg text-white'>É recomendado conversar diretamente com seu gerente de relacionamento e verificar os produtos disponíveis para encontrar a melhor opção para as necessidades da sua empresa.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='24. Quais são as principais características do crédito PRONAMPE?' hrefButton='/credito-facilitado' textButton='Conheça as linhas de crédito disponíveis na GoCapital'>
                    <ul className='list-inside list-disc text-white'>
                      <li>
                        <strong>Limite de crédito:</strong> O valor máximo do empréstimo é de até 30% da receita bruta anual da empresa.
                      </li>
                      <li>
                        <strong>Taxa de juros:</strong> A taxa de juros é definida anualmente pelo Conselho Monetário Nacional (CMN), sendo ela limitada a 6% ao ano. Também pode ser acrescida da taxa SELIC (atualmente em 2% ao ano).
                      </li>
                      <li>
                        <strong>Prazo de pagamento:</strong> O prazo para pagamento do empréstimo é de até 48 meses, com carência de até 11 meses para começar a pagar as parcelas.
                      </li>
                      <li>
                        <strong>Participação da GoCapital:</strong> Os empréstimos do PRONAMPE são concedidos pela GoCapital, que é responsável pela análise de crédito e liberação dos recursos.
                      </li>
                    </ul>
                    <p className='text-lg text-white'>É importante ressaltar que o PRONAMPE é uma medida temporária e está sujeita a alterações e prazos definidos pelo governo. As empresas interessadas em obter o crédito devem entrar em contato conosco para verificar a disponibilidade e as condições específicas do momento.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='26. Qual o número do WhatsApp da GoCapital?'>
                    <p className='text-lg text-white'>
                      Para atendimento pelo WhatsApp para dúvidas sobre linhas de crédito e dúvidas sobre abertura de conta chame{' '}
                      <a href='http://wa.me/5511946875258' target='_blank'>
                        (11) 94687-5258
                      </a>
                      . Ou, para correntistas <a href='http://wa.me/5511950397790' target='_blank'></a>(11) 95039-7790.
                    </p>
                  </DropdownFAQ>
                  <DropdownFAQ title='28. A GoCapital possui agências físicas em outras localidades além de Guarulhos?'>
                    <p className='text-lg text-white'>Sim. Fale com nossa equipe e consulte a agência física mais próxima de você. Atualmente temos agências localizadas em Guarulhos, Mogi das Cruzes, Limeira e Taubaté.</p>
                  </DropdownFAQ>
                  <DropdownFAQ title='30. Estão me ligando em nome da GoCapital pedindo meus dados para abertura de conta e oferecendo crédito mediante pagamento antecipado. É prática comum da GoCapital?'>
                    <p className='text-lg text-white'>Não. A GoCapital não solicita pagamento antecipado para nenhuma operação.</p>
                    <p className='text-lg text-white'>Em caso de suspeita de golpe ou fraude, não realize qualquer pagamento, entre em contato conosco através do telefone (11) 95039-7790 e esclareça todas as suas dúvidas diretamente com nosso time de suporte.</p>
                  </DropdownFAQ>
                </div>
              </div>

              <div className=' flex flex-wrap gap-5 xl:hidden'>
                <DropdownFAQ title='1. A GoCapital é uma instituição financeira digital?' textButton='Saiba mais sobre a GoCapital' hrefButton='/quem-somos'>
                  <p className='text-lg text-white'>Sim. A GoCapital é uma instituição financeira digital com atendimento humanizado. Oferecemos serviços bancários on-line e conta com agências físicas para atender seus clientes sempre que necessário.</p>
                </DropdownFAQ>

                <DropdownFAQ title='2. A GoCapital é uma fintech?' textButton='Conheça todas as nossas soluções' hrefButton='solucoes-financeiras'>
                  <p className='text-lg text-white'>Sim. Além de uma instituição financeira digital, a GoCapital também é uma fintech. Isso significa que unimos nossa expertise na área de finanças à tecnologia para oferecer serviços financeiros de forma inovadora, ágil e eficiente.</p>
                  <p className='text-lg text-white'>Temos um modelo de negócio diferenciado, com foco na experiência do usuário, redução de burocracia e custos do processo de tomada de crédito, além do atendimento humano dedicado com maior transparência.</p>
                </DropdownFAQ>

                <DropdownFAQ title='3. Quais são os produtos oferecidos pela GoCapital?'>
                  <p className='text-lg text-white'>Oferecemos os seguintes produtos:</p>
                  <ul className='flex flex-col gap-5 text-lg text-white'>
                    <li className='flex flex-col items-start gap-5'>
                      <p className='font-bold'>Conta digital</p>
                      <p>Abra sua conta corrente totalmente on-line, que permite realizar transações bancárias, pagamentos, transferências e receber salários.</p>
                      <Link href='/banco-digital' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                        <span>Saiba mais.</span>
                        <Image src={buttonBlackArrow} alt='Seta do botão' />
                      </Link>
                    </li>

                    <li className='flex flex-col items-start gap-5'>
                      <p className='font-bold'>Conta Escrow</p>
                      <p>Abra sua conta de custódia utilizada para transações seguras entre compradores e vendedores, garantindo a entrega do produto ou serviço.</p>
                      <Link href='/banco-digital' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                        <span>Saiba mais.</span>
                        <Image src={buttonBlackArrow} alt='Seta do botão' />
                      </Link>
                    </li>

                    <li className='flex flex-col items-start gap-5'>
                      <p className='font-bold'>Go.Pag - Maquininha para cartão</p>
                      <p>Conheça nossa solução para aceitar pagamentos com cartão de crédito e débito, facilitando as vendas para empreendedores.</p>
                      <Link href='/go-pag' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                        <span>Saiba mais.</span>
                        <Image src={buttonBlackArrow} alt='Seta do botão' />
                      </Link>
                    </li>

                    <li className='flex flex-col items-start gap-5'>
                      <p className='font-bold'>Consórcios</p>
                      <p>Conheça essa modalidade de crédito para adquirir bens, como carros e imóveis. Temos parcelas mensais acessíveis, sorteios e lances para antecipação da carta de crédito.</p>
                      <Link href='/consorcio' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                        <span>Saiba mais.</span>
                        <Image src={buttonBlackArrow} alt='Seta do botão' />
                      </Link>
                    </li>

                    <li className='flex flex-col items-start gap-5'>
                      <p className='font-bold'>Seguros</p>
                      <p>Oferecemos diversos tipos de seguros, como seguro de vida, seguro patrimonial, seguro de automóveis, seguro saúde, e muito mais.</p>
                      <Link href='/' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                        <span>Saiba mais.</span>
                        <Image src={buttonBlackArrow} alt='Seta do botão' />
                      </Link>
                    </li>

                    <li className='flex flex-col items-start gap-5'>
                      <p className='font-bold'>Crédito facilitado</p>
                      <p>Conheça nossas linhas de crédito destinadas a empresas que precisam de recursos para investir, expandir e transformar o seu negócio.</p>
                      <Link href='/credito-facilitado' className='flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                        <span>Saiba mais.</span>
                        <Image src={buttonBlackArrow} alt='Seta do botão' />
                      </Link>
                    </li>

                    <li className='flex flex-col items-start gap-5'>
                      <p className='font-bold'>Financiamentos</p>
                      <p>Na GoCapital temos opções de financiamento para aquisição de veículos, imóveis e outros bens.</p>
                      <Link href='/financiamentos' className='cta_produtos_financiamentos_simule flex items-center justify-center rounded-bl-10 rounded-br-21 rounded-tl-21 rounded-tr-21 bg-green-go-bank px-9 py-5 text-lg text-black transition-opacity hover:opacity-80'>
                        <span>Saiba mais.</span>
                        <Image src={buttonBlackArrow} alt='Seta do botão' />
                      </Link>
                    </li>
                  </ul>
                </DropdownFAQ>

                <DropdownFAQ title='4. Como faço para abrir uma conta na GoCapital?' hrefButton='/abra-sua-conta' textButton='Conheça nossas modalidades de conta.'>
                  <p className='text-lg font-bold text-white'>Como abrir uma conta digital:</p>
                  <p className='text-lg text-white'>Para abrir uma conta digital na GoCapital, você pode:</p>
                  <ul className='list-inside list-disc text-white'>
                    <li>Entre em contato através dos nossos canais de atendimento e envie uma solicitação.</li>
                    <li>Vá até uma das nossas agências físicas onde nossos gerentes irão te atender.</li>
                    <li>Baixe o app da GoCapital* e abra sua conta pelo celular.</li>
                  </ul>
                  <div className='flex gap-4'>
                    <a className='transition-opacity hover:opacity-80'>
                      <Image src={dowloadOnTheAppStore} alt='Imagem de um botão da App Store' />
                    </a>
                    <a className='transition-opacity hover:opacity-80'>
                      <Image src={getItOnGooglePlay} alt='Imagem de um botão do Google Play' />
                    </a>
                  </div>
                  <p className='text-lg text-white'>*Opção de abertura exclusiva para contas da modalidade digital.</p>
                  <p className='text-lg font-bold text-white'>Como abrir uma conta Escrow:</p>
                  <p className='text-lg text-white'>No momento abertura de contas da modalidade Escrow é feita exclusivamente feita via preenchimento de formulário ou em nossas agências físicas.</p>
                  <p className='text-lg text-white'>É necessário entrar em contato conosco através dos nossos canais de atendimento e fornecer informações sobre sua empresa, como faturamento, tempo de atividade, entre outros. </p>
                  <p className='text-lg text-white'>Nossa equipe analisará a solicitação e entrará em contato para dar continuidade ao processo.</p>
                </DropdownFAQ>

                <DropdownFAQ title='5. Quais são as vantagens da conta digital GoCapital?' hrefButton='/abra-sua-conta' textButton='Saiba mais sobre a conta digital.'>
                  <p className='text-lg text-white'>As vantagens da conta digital GoCapital incluem:</p>
                  <ul className='list-inside list-disc text-white'>
                    <li>Facilidade de acesso aos serviços bancários, sem a necessidade de deslocamento até uma agência física.</li>
                    <li>Menores taxas e tarifas em comparação com bancos tradicionais.</li>
                    <li>Transações bancárias rápidas e seguras.</li>
                    <li>Possibilidade de realizar pagamentos e transferências em qualquer lugar.</li>
                  </ul>
                </DropdownFAQ>

                <DropdownFAQ title='6. Como funciona a conta Escrow GoCapital?' hrefButton='/abra-sua-conta' textButton='Saiba mais sobre a conta escrow.'>
                  <p className='text-lg text-white'>A conta Escrow GoCapital funciona como uma conta de custódia, onde o valor de uma transação é depositado pelo comprador.</p>
                  <p className='text-lg text-white'>Esse valor fica retido até que o vendedor cumpra com as condições acordadas, garantindo a segurança da transação para ambas as partes.</p>
                </DropdownFAQ>

                <DropdownFAQ title='7. Quais são os requisitos para adquirir a maquininha para cartão Go.Pag da GoCapital?' hrefButton='/maquininhas' textButton='Saiba mais sobre as maquininhas Go.Pag'>
                  <p className='text-lg text-white'>As maquininhas de cartão Go.Pag são soluções criadas especialmente para você que tem uma empresa registrada e deseja aceitar pagamentos em crédito, débito e PIX QR Code.</p>
                  <p className='text-lg text-white'>Será necessário fornecer informações sobre o negócio, como CNPJ, faturamento médio mensal, entre outros.</p>
                </DropdownFAQ>

                <DropdownFAQ title='8. Como funciona o consórcio GoCapital?' hrefButton='/consorcio' textButton='Saiba mais sobre as maquininhas Go.Pag'>
                  <p className='text-lg text-white'>No consórcio, um grupo de pessoas se reúne para adquirir um bem em comum. Cada participante paga uma parcela mensal e, por meio de sorteios ou lances, é definido quem receberá o crédito para a compra do bem. </p>
                  <p className='text-lg text-white'>O consórcio é uma modalidade de crédito para adquirir bens de forma planejada sem valores de entrada e sem o pagamento de juros.</p>
                </DropdownFAQ>

                <DropdownFAQ title='9. Quais são os tipos de seguros oferecidos pela GoCapital?' hrefButton='/condicoes-gerais-de-seguros' textButton='Saiba mais sobre os seguros GoCapital'>
                  <p className='text-lg text-white'>Oferecemos diversos tipos de seguros, como seguro de vida, seguro residencial, seguro patrimonial, seguro de automóveis, seguro de viagem, seguro de saúde, entre outros. </p>
                  <p className='text-lg text-white'>Cada tipo de seguro possui coberturas específicas, que podem ser personalizadas de acordo com as suas necessidades.</p>
                </DropdownFAQ>

                <DropdownFAQ title='10. Como solicitar uma linha de crédito para a GoCapital?' hrefButton='/condicoes-gerais-de-seguros' textButton='Saiba mais sobre os seguros GoCapital'>
                  <p className='text-lg text-white'>Para solicitar um crédito com a GoCapital é necessário entrar em contato conosco através dos nossos canais de atendimento e fornecer informações sobre sua empresa, como faturamento, tempo de atividade, necessidade de crédito, entre outros.</p>
                  <p className='text-lg text-white'>Nossa equipe analisará a solicitação e entrará em contato para dar continuidade ao processo.</p>
                </DropdownFAQ>

                <DropdownFAQ title='11. Quais são as opções de financiamento oferecidas?' hrefButton='/financiamentos' textButton='Saiba mais sobre os financiamentos oferecidos pela GoCapital'>
                  <p className='text-lg text-white'>Oferecemos opções de financiamento para aquisição de veículos, imóveis, maquinários e outros bens. O cliente pode escolher o prazo e o valor das parcelas de acordo com sua capacidade de pagamento.</p>
                  <p className='text-lg text-white'>É necessário fornecer informações sobre o bem desejado e passar por uma análise de crédito para aprovação do financiamento.</p>
                </DropdownFAQ>

                <DropdownFAQ title='12. Quais são os requisitos para obter um crédito para empreendedor?' hrefButton='/credito-facilitado' textButton='Saiba mais sobre nossas opções de crédito facilitado'>
                  <p className='text-lg text-white'>Os requisitos podem variar de acordo com o banco ou instituição financeira, mas geralmente incluem:</p>
                  <ul className='list-inside list-disc text-white'>
                    <li>Ter um CNPJ ativo com pelo menos 2 anos em atividade;</li>
                    <li>Comprovar faturamento mínimo;</li>
                    <li>Apresentar documentos como balanço patrimonial;</li>
                    <li>Demonstrativo de resultados;</li>
                    <li>Entre outros.</li>
                  </ul>
                </DropdownFAQ>

                <DropdownFAQ title='13. Qual é o valor máximo que posso solicitar de crédito para capital de giro?' hrefButton='/financiamentos' textButton='Saiba mais sobre nossas opções de crédito para capital de giro'>
                  <p className='text-lg text-white'>O valor máximo de crédito para capital de giro depende da análise de crédito realizada. Geralmente, o valor é determinado com base no faturamento da empresa e na capacidade de pagamento.</p>
                </DropdownFAQ>

                <DropdownFAQ title='14. Quais são as taxas de juros aplicadas no crédito para empreendedor?' hrefButton='/credito' textButton='Faça uma simulação de crédito'>
                  <p className='text-lg text-white'>As taxas de juros podem variar de acordo com o perfil de crédito da empresa e o valor solicitado. É importante sanar todas as dúvidas em relação às taxas oferecidas nas diversas modalidades de tomada de crédito.</p>
                </DropdownFAQ>

                <DropdownFAQ title='15. Quanto tempo leva para obter a aprovação do crédito para empreendedor?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                  <p className='text-lg text-white'>O tempo de aprovação varia de acordo com a complexidade da análise de crédito. Para solicitações simples, é possível que a aprovação ocorra em poucas horas.</p>
                  <p className='text-lg text-white'>Já para casos mais complexos, onde é necessária a avaliação de outro documentos, o prazo para esse processo pode ser estendido para dias ou semanas.</p>
                  <p className='text-lg text-white'>Mas não se preocupe, temos uma equipe de gerentes preparados para prestar suporte, tirar dúvidas e fornecer atualizações frequentemente.</p>
                </DropdownFAQ>

                <DropdownFAQ title='16. Quais são as garantias exigidas para obter um crédito para empreendedor?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                  <p className='text-lg text-white'>As garantias exigidas podem variar, mas geralmente incluem garantias reais, como imóveis ou veículos, ou garantias pessoais, como avalistas ou fianças.</p>
                  <p className='text-lg text-white'>A exigência de garantias depende do valor do crédito e do perfil de risco da empresa.</p>
                </DropdownFAQ>

                <DropdownFAQ title='17. Posso obter um crédito para empreendedor mesmo se minha empresa estiver com restrições no CPF ou CNPJ?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                  <p className='text-lg text-white'>Empresas com restrições no CPF ou CNPJ podem ter mais dificuldade em obter crédito, mas ainda existem opções disponíveis.</p>
                </DropdownFAQ>

                <DropdownFAQ title='18. Qual é o prazo de pagamento do crédito para empreendedor?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                  <p className='text-lg text-white'>O prazo de pagamento pode variar de acordo com o valor do crédito e a capacidade de pagamento da empresa.</p>
                  <p className='text-lg text-white'>Geralmente, os prazos podem variar de meses a anos, dependendo do acordo estabelecido entre a empresa e o banco.</p>
                </DropdownFAQ>

                <DropdownFAQ title='19. Posso utilizar o crédito para empreendedor para qualquer finalidade?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                  <p className='text-lg text-white'>Em geral, o crédito para empreendedor pode ser utilizado para diversas finalidades, como investimentos em equipamentos, estoque, expansão do negócio, pagamento de dívidas, entre outros. </p>
                  <p className='text-lg text-white'>No entanto, é importante verificar as restrições e condições específicas de cada modalidade de crédito.</p>
                </DropdownFAQ>

                <DropdownFAQ title='20. O que acontece se eu não conseguir pagar as parcelas do crédito para empreendedor?' hrefButton='/contato' textButton='Converse com o nosso time de relacionamento'>
                  <p className='text-lg text-white'>Caso haja dificuldades em pagar as parcelas do crédito, é importante entrar em contato com seu gerente de relacionamento o mais rápido possível.</p>
                  <p className='text-lg text-white'>Em alguns casos, é possível renegociar as condições de pagamento ou buscar alternativas para evitar a inadimplência.</p>
                </DropdownFAQ>

                <DropdownFAQ title='21. Quais são as opções de crédito para empreendedores com baixo faturamento ou empresas iniciantes?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                  <p className='text-lg text-white'>Para empresas com baixo faturamento ou em estágio inicial, pode ser mais desafiador obter crédito.</p>
                  <p className='text-lg text-white'>No entanto, existem opções como microcrédito, linhas de crédito específicas para startups e programas de incentivo governamentais que podem ser explorados.</p>
                  <p className='text-lg text-white'>É importante pesquisar e buscar orientação para encontrar a melhor opção para o seu negócio.</p>
                </DropdownFAQ>

                <DropdownFAQ title='22. Quais são os tipos de créditos oferecidos para empresas?' hrefButton='/credito' textButton='Saiba mais sobre nosso crédito para PJ'>
                  <p className='text-lg text-white'>Alguns dos principais são:</p>
                  <ul className='list-inside list-disc text-white'>
                    <li>
                      <strong>Crédito para capital de giro:</strong> É um tipo de crédito destinado a suprir as necessidades de caixa da empresa, como pagamento de fornecedores, salários, despesas operacionais, entre outros.
                    </li>
                    <li>
                      <strong>Financiamento de investimentos:</strong> São linhas de crédito voltadas para investimentos em expansão, modernização, compra de equipamentos, ampliação de instalações, entre outros.
                    </li>
                    <li>
                      <strong>Crédito para exportação:</strong> É um tipo de crédito voltado para empresas que desejam exportar seus produtos. Pode incluir financiamento de exportações, pré-embarque e pós-embarque.
                    </li>
                    <li>
                      <strong>Microcrédito:</strong> É um tipo de crédito voltado para microempreendedores individuais (MEIs) e pequenos negócios. Geralmente, são valores menores e com condições mais flexíveis.
                    </li>
                    <li>
                      <strong>Crédito para inovação:</strong> São linhas de crédito específicas para empresas que desenvolvem projetos de pesquisa, desenvolvimento e inovação. Podem incluir financiamento para aquisição de tecnologia, patentes, entre outros.
                    </li>
                    <li>
                      <strong>Crédito para agronegócio:</strong> São linhas de crédito voltadas para empresas do setor agrícola, pecuário e agroindustrial. Podem incluir financiamento para compra de máquinas, insumos, investimentos em infraestrutura, entre outros.
                    </li>
                    <li>
                      <strong>Crédito para franquias:</strong> São linhas de crédito específicas para empresas que desejam abrir uma franquia. Podem incluir financiamento para taxa de franquia, investimentos iniciais, capital de giro, entre outros.
                    </li>
                    <li>
                      <strong>Crédito para energia renovável:</strong> São linhas de crédito voltadas para empresas que desejam investir em projetos de energia renovável, como solar, eólica, biomassa, entre outros.
                    </li>
                    <li>
                      <strong>Crédito para exportação:</strong> São linhas de crédito voltadas para empresas que desejam exportar seus produtos. Pode incluir financiamento de exportações, pré-embarque e pós-embarque.
                    </li>
                    <li>
                      <strong>Crédito para setores específicos:</strong> Alguns setores possuem linhas de crédito específicas, como o setor de turismo, construção civil, tecnologia, entre outros. Essas linhas podem oferecer condições diferenciadas de acordo com as necessidades do setor.
                    </li>
                  </ul>
                  <p className='text-lg text-white'>É importante ressaltar que as opções de crédito podem variar de acordo com a instituição financeira e as políticas de crédito vigentes.</p>
                  <p className='text-lg text-white'>É recomendado conversar diretamente com seu gerente de relacionamento e verificar os produtos disponíveis para encontrar a melhor opção para as necessidades da sua empresa.</p>
                </DropdownFAQ>

                <DropdownFAQ title='23. O que é o crédito PRONAMPE?' hrefButton='/credito-facilitado' textButton='Conheça as linhas de crédito disponíveis na GoCapital'>
                  <p className='text-lg text-white'>O Programa Nacional de Apoio às Microempresas e Empresas de Pequeno Porte (PRONAMPE) é uma iniciativa do governo brasileiro criada em 2020 com o objetivo de oferecer crédito para microempresas e empresas de pequeno porte durante a pandemia de COVID-19.</p>
                  <p className='text-lg text-white'>O PRONAMPE é voltado para empresas que possuem receita bruta anual de até R$ 4,8 milhões. Ele oferece empréstimos com condições especiais, como taxas de juros reduzidas e prazos de pagamento mais longos, para auxiliar essas empresas a enfrentarem as dificuldades econômicas causadas pela crise que se perpetua ao longo do tempo.</p>
                </DropdownFAQ>

                <DropdownFAQ title='24. Quais são as principais características do crédito PRONAMPE?' hrefButton='/credito-facilitado' textButton='Conheça as linhas de crédito disponíveis na GoCapital'>
                  <ul className='list-inside list-disc text-white'>
                    <li>
                      <strong>Limite de crédito:</strong> O valor máximo do empréstimo é de até 30% da receita bruta anual da empresa.
                    </li>
                    <li>
                      <strong>Taxa de juros:</strong> A taxa de juros é definida anualmente pelo Conselho Monetário Nacional (CMN), sendo ela limitada a 6% ao ano. Também pode ser acrescida da taxa SELIC (atualmente em 2% ao ano).
                    </li>
                    <li>
                      <strong>Prazo de pagamento: O prazo para pagamento do empréstimo é de até 48 meses, com carência de até 11 meses para começar a pagar as parcelas.</strong>
                    </li>
                    <li>
                      <strong>Participação da GoCapital: Os empréstimos do PRONAMPE são concedidos pela GoCapital, que é responsável pela análise de crédito e liberação dos recursos.</strong>
                    </li>
                  </ul>
                  <p className='text-lg text-white'>É importante ressaltar que o PRONAMPE é uma medida temporária e está sujeito a alterações e prazos definidos pelo governo. As empresas interessadas em obter o crédito devem entrar em contato conosco para verificar a disponibilidade e as condições específicas do momento.</p>
                </DropdownFAQ>

                <DropdownFAQ title='25. Qual o telefone fixo da GoCapital?'>
                  <p className='text-lg text-white'>
                    Para atendimento ligue <a href='tel:+551149634199'>(11) 4963-4199</a> e fale com a nossa equipe.
                  </p>
                </DropdownFAQ>

                <DropdownFAQ title='26. Qual o número do Whatsapp da GoCapital?'>
                  <p className='text-lg text-white'>
                    Para atendimento pelo Whatsapp para dúvidas sobre linhas de crédito e dúvidas sobre abertura de conta chame{' '}
                    <a href='http://wa.me/5511946875258' target='_blank'>
                      (11) 94687-5258
                    </a>
                    . Ou, para correntistas <a href='http://wa.me/5511950397790' target='_blank'></a>(11) 95039-7790.
                  </p>
                </DropdownFAQ>

                <DropdownFAQ title='27. Qual o endereço da matriz da GoCapital?'>
                  <p className='text-lg text-white'>Nossa matriz está localizada em Guarulhos, na Avenida Salgado Filho, 2120 - Loja 20 Térreo - Centro - Guarulhos/SP.</p>
                </DropdownFAQ>

                <DropdownFAQ title='28. A GoCapital possui agências físicas em outras localidades além de Guarulhos?'>
                  <p className='text-lg text-white'>Sim. Fale com nossa equipe e consulte a agência física mais próxima de você. Atualmente temos agências em Guarulhos (matriz), Poços de Caldas e Mogi das Cruzes.</p>
                </DropdownFAQ>

                <DropdownFAQ title='29. Estou com dificuldade para realizar uma operação. O que devo fazer?'>
                  <p className='text-lg text-white'>
                    Em caso de qualquer dificuldade ou instabilidade do sistema, entre em contato com nosso time de suporte através do e-mail <a href='mailto:suporte@gocapital.com.br'>suporte@gocapital.com.br</a> ou através do telefone <a href='tel:+5511950397790'>(11) 95039-7790</a>.
                  </p>
                </DropdownFAQ>

                <DropdownFAQ title='30. Estão me ligando em nome da GoCapital pedindo meus dados para abertura de conta e oferecendo crédito mediante pagamento antecipado. É prática comum da GoCapital?'>
                  <p className='text-lg text-white'>Não. A GoCapital não solicita pagamento antecipado para nenhuma operação.</p>
                  <p className='text-lg text-white'>Em caso de suspeita de golpe ou fraude, não realize qualquer pagamento, entre em contato conosco através do telefone (11) 95039-7790 e esclareça todas as suas dúvidas diretamente com nosso time de suporte.</p>
                </DropdownFAQ>

                <DropdownFAQ title='31. A GoCapital está disponível em quais regiões?'>
                  <p className='text-lg text-white'>A GoCapital tem uma cobertura nacional e todas as nossas soluções podem ser contratadas remotamente de onde você estiver no Brasil inteiro.</p>
                  <p className='text-lg text-white'>Mas, se quiser falar conosco presencialmente, temos três agências localizadas em Guarulhos (SP), Mogi das Cruzes (SP) e Poços de Caldas (MG).</p>
                </DropdownFAQ>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
