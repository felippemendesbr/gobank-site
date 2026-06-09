import { useState, useEffect, CSSProperties } from 'react';

import downloadIcon from '../../public/svgs/download-icon.svg';
import Image from 'next/image';
import Head from 'next/head';

export default function TermosDeUso() {
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

  const scaleValue = 1 + scrollPercentage * 10; // Aumentar o valor 2 conforme necessário
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
  return (
    <>
      <Head>
        <title>Termos de Uso GoCapital - Conheça as Condições para Nossos Serviços Financeiros</title>
        <meta name='description' content='Conheça os Termos de Uso GoCapital. Garantimos transparência e segurança em nossos serviços financeiros. Leia agora e contrate nossos produtos e soluções.' />
        <meta name='keywords' content='Termos de Uso gobank' />
        <link rel='canonical' content='https://www.gobank.com.br/termos-de-uso' />
        <meta property='og:title' content='Termos de Uso GoCapital - Conheça as Condições para Nossos Serviços Financeiros' />
        <meta property='og:description' content='Conheça os Termos de Uso GoCapital. Garantimos transparência e segurança em nossos serviços financeiros. Leia agora e contrate nossos produtos e soluções.' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/termos-de-uso' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Termos de Uso GoCapital - Conheça as Condições para Nossos Serviços Financeiros' />
        <meta name='twitter:description' content='Conheça os Termos de Uso GoCapital. Garantimos transparência e segurança em nossos serviços financeiros. Leia agora e contrate nossos produtos e soluções.' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='termos-de-uso_CTA'>
        <section>
          <div className='flex items-center justify-center overflow-hidden'>
            <div style={bgTransformStyle}></div>
            <div className='flex w-full max-w-[1185px] px-5 py-28'>
              <h1 className='text-6xl text-green-go-bank'>Termos de uso</h1>
            </div>
          </div>

          <div className='flex items-center justify-center bg-gray-dark-go-bank'>
            <div className='flex w-full max-w-[1185px] flex-col gap-5 px-5 py-16'>
              <h2 className='text-2xl	text-green-go-bank'>1. DAS DEFINIÇÕES:</h2>
              <p className='text-lg text-white'>1.1. Instituição de Pagamento: PAGME INSTITUIÇÃO DE PAGAMENTO LTDA, Empresa Individual de Responsabilidade Limitada, com sede na Avenida Carlos Gomes, 328 – Bairro Auxiliadora, CEP 90480-001, PORTO ALEGRE / RS, inscrita no CNPJ/MF sob o nº. 34.471.744/0001-06.</p>
              <p className='text-lg text-white'>1.2. CLIENTE: é a pessoa física ou jurídica titular de Conta de Pagamento.</p>
              <p className='text-lg text-white'>1.3. Banco Liquidante: PAGME INSTITUIÇÃO DE PAGAMENTO LTDA, Empresa Individual de Responsabilidade Limitada, com sede na Avenida Carlos Gomes, 328 – Bairro Auxiliadora, CEP 90480-001, PORTO ALEGRE / RS, inscrita no CNPJ/MF sob o nº. 34.471.744/0001-06.</p>
              <p className='text-lg text-white'>1.4. White Label: Go Correspondente Bancário LTDA, instituição de direiro privado, com sede na Avenida Salgado Filho, 2120, loja 20 – Bairro Centro, CEP 07115-000, GUARULHOS / SP, inscrita no CNPJ/MF sob o nº. 22.672.498/0001-71.</p>
              <p className='text-lg text-white'>1.5. Conta de Pagamento: é conta de pagamento do tipo pré-paga de titularidade do CLIENTE e gerida por PAGME INSTITUIÇÃO DE PAGAMENTO LTDA, consistindo em conta escritural individualizada, associada ao CPF ou CNPJ do CLIENTE, destinada ao registro de valores em moeda corrente nacional previamente aportados pelo Cliente, ou terceiros, por meio de Carga ou Recarga.</p>
              <p className='text-lg text-white'>1.6. Carga ou Recarga: aporte de valores em moeda corrente nacional na Conta de Pagamento, mediante depósito via boleto ou transferência.</p>
              <p className='text-lg text-white'>1.7. Plataforma: aplicativo mobile compatível com sistemas iOS e Android, disponível nas lojas App Store e Google Play, que disponibiliza ao Cliente os serviços de internet banking oferecidos por GO CORRESPONDENTE BANCÁRIO LTDA.</p>
              <p className='text-lg text-white'>1.8. Serviços: são os serviços oferecidos por GO CORRESPONDENTE BANCÁRIO LTDA ao Cliente, quais sejam: a gestão da conta de pagamento pré-paga, a gestão das operações de pagamento, movimentações e transferência de valores, bem como a liquidação de boletos, impostos e contas de consumo.</p>
              <p className='text-lg text-white'>1.9. Política de Privacidade: são as normas aplicáveis a todos os Clientes, relativamente ao tratamento e utilização de Dados Pessoais fornecidos na Plataforma.</p>
              <p className='text-lg text-white'>1.10. Formulário de Abertura de Conta: é o formulário disponibilizado pela GO CORRESPONDENTE BANCÁRIO LTDA, devidamente preenchido pelo Cliente na Plataforma, para fins de adesão aos Termos de Uso e contratações de Serviços.</p>
              <p className='text-lg text-white'>1.11. Saldo: é o saldo disponível na Conta de Pagamento no início do dia acrescido de todos os valores creditados nessa Conta de Pagamento e subtraído de todos os valores debitados no mesmo dia. O saldo é apurado instantaneamente, sendo atualizado a cada operação.</p>
              <p className='text-lg text-white'>1.12. Saque: é operação em que o Cliente realiza a retirada do valor total ou parcial do Saldo disponível em sua Conta de Pagamento.</p>
              <p className='text-lg text-white'>1.13. Transação: são todas as operações de pagamento e recebimentos realizadas através da Plataforma.</p>
              <p className='text-lg text-white'>1.14. Transferência: é a operação de transferência de Saldo disponível na Conta de Pagamento do Cliente para outra Conta de Pagamento, de titularidade do Cliente ou de terceiros; ou para conta bancária/conta de pagamento de titularidade do Cliente ou de terceiros, mantida em instituição financeira ou em outra instituição de pagamento no Brasil.</p>

              <h3 className='text-2xl	text-green-go-bank'>2. DA ADESÃO:</h3>
              <p className='text-lg text-white'>2.1. Ao aderir este Termo de Uso, o CLIENTE declara que leu, compreendeu e concordou com todas as condições aqui estabelecidas e com a Política de Privacidade adotada prevista na Cláusula 10.</p>
              <p className='text-lg text-white'>2.2. Com a adesão, a GO CORRESPONDENTE BANCÁRIO LTDA, por meio destes Termos de Uso, concede ao CLIENTE uma licença pessoal, limitada, temporária, revogável, não exclusiva e intransferível de uso da Plataforma, durante o período de manutenção da sua Conta de Pagamento, sem cobrança de remuneração de qualquer natureza por este licenciamento.</p>
              <p className='text-lg text-white'>2.2.1. Sem prejuízo da disposição constante na cláusula 2.2, ficará a cargo do CLIENTE o pagamento de todas as custas e taxas adicionais que não digam respeito ao licenciamento da Plataforma, dentre elas, aquelas relativas às operações por ele realizadas por intermédio da Plataforma, ou ainda aquelas decorrentes dos serviços de assistência e manutenção prestados pela GO CORRESPONDENTE BANCÁRIO LTDA, nos termos da proposta comercial apresentada ao CLIENTE.</p>
              <p className='text-lg text-white'>2.3. Em caso de dúvidas, por favor, contate a GO CORRESPONDENTE BANCÁRIO LTDA por meio dos seus canais de atendimento informados na Plataforma, ou encaminhe e-mail para <a href="mailto:contato@gocapital.com.br">contato@gocapital.com.br.</a></p>

              <h4 className='text-2xl	text-green-go-bank'>3. DAS DECLARAÇÕES</h4>
              <p className='text-lg text-white'>3.1. O CLIENTE declara que somente poderá fazer uso dos Serviços com a adesão ao inteiro teor deste Termos de Uso e da Política de Privacidade.</p>
              <p className='text-lg text-white'>3.2. O CLIENTE declara que utilizará a Conta de Pagamento apenas para fins lícitos, reconhecendo que é responsável, com exclusividade, pela utilização que dela fizer, eximindo a GO CORRESPONDENTE BANCÁRIO LTDA de qualquer responsabilidade por danos ou prejuízos causados a terceiros decorrentes do uso da Conta de Pagamento, da Plataforma e dos Serviços</p>
              <p className='text-lg text-white'>3.3. O CLIENTE declara ter aceito a Política de Privacidade, compreendendo que nela consta a forma pela qual a GO CORRESPONDENTE BANCÁRIO LTDA realiza o tratamento de seus dados, fornecendo e permitindo de forma consciente e voluntária que a GO CORRESPONDENTE BANCÁRIO LTDA acesse seus dados como nome, foto, endereço, endereço de e-mail, número de telefone, número de CPF, número de RG, informações de pagamento, transações financeiras, informações sobre o pagamento de eventuais operações de crédito contratadas junto à Plataforma, dentre outras informações (“Dados Pessoais”), podendo inclusive consultá-la a qualquer momento pelo endereço eletrônico <a href="mailto:contato@gocapital.com.br">contato@gocapital.com.br</a>.</p>

              <h4 className='text-2xl	text-green-go-bank'>4. DO CADASTRO:</h4>
              <p className='text-lg text-white'>4.1. O CLIENTE está ciente que para realizar a abertura de Conta de Pagamento em nome de pessoa física ou de pessoa jurídica que represente, é necessário ser pessoa física plenamente capaz, com mais de 18 (dezoito) anos de idade, e ter plenos poderes para celebrar contratos e realizar operações financeiras em seu nome ou em nome da pessoa jurídica que representa.</p>
              <p className='text-lg text-white'>4.2. Após o preenchimento do Formulário de Abertura de Conta e do envio dos documentos solicitados pela GO CORRESPONDENTE BANCÁRIO LTDA por e-mail para a realização do cadastro do CLIENTE, este poderá, a exclusivo critério de GO CORRESPONDENTE BANCÁRIO LTDA ter acesso a Conta de Pagamento associada ao seu CPF ou CNPJ.</p>
              <p className='text-lg text-white'>4.3. O acesso a Conta de Pagamento e a utilização da Plataforma estão condicionados à realização de cadastro, devendo o CLIENTE de forma voluntária fornecer seus Dados Pessoais na Plataforma. Com isso, a GO CORRESPONDENTE BANCÁRIO LTDA realizará o tratamento dos Dados Pessoais do CLIENTE de acordo com a sua Política de Privacidade.</p>
              <p className='text-lg text-white'>4.4. A GO CORRESPONDENTE BANCÁRIO LTDA tomará todas as providências e medidas cabíveis para manter o acesso a Plataforma disponível, entretanto o CLIENTE tem ciência de que poderão ocorrer eventuais falhas sistêmicas que podem ocasionar a indisponibilidade temporária da Plataforma.</p>
              <p className='text-lg text-white'>4.5. O CLIENTE tem ciência de que deverá utilizar a Plataforma única e exclusivamente para os fins previstos nestes Termos de Uso.</p>
              <p className='text-lg text-white'>4.6. O CLIENTE será responsável pela veracidade, validade e precisão dos Dados Pessoais fornecidos, competindo-lhe, ainda, os manter sempre atualizados.</p>
              <p className='text-lg text-white'>4.7. Para que a GO CORRESPONDENTE BANCÁRIO LTDA possa prestar os seus serviços, os CLIENTES que sejam Pessoas Físicas fornecerão e, por meio da aceitação deste instrumento, permitirão o tratamento de todos os dados pessoais abaixo especificados:</p>
              <ul className='flex flex-col gap-5 pl-5 text-lg text-white'>
                <li>(i) RG;</li>
                <li>(ii) CPF;</li>
                <li>(iii) Selfie;</li>
                <li>(iv) Selfie com documento de identificação;</li>
                <li>(v) Comprovante de Residência;</li>
                <li>(vi) Ficha cadastral; e,</li>
                <li>(vii) Termos de Uso.</li>
              </ul>
              <p className='text-lg text-white'>4.8. Para que a GO CORRESPONDENTE BANCÁRIO LTDA possa prestar os seus serviços, os CLIENTES que sejam Pessoas Jurídicas fornecerão e, por meio da aceitação deste instrumento, permitirão o tratamento de todos os dados abaixo especificados:</p>
              <ul className='flex flex-col gap-5 pl-5 text-lg text-white'>
                <li>(i) Ato constitutivo;</li>
                <li>(ii) Documentos de identificação dos sócios, tais como:</li>
                <li className='pl-5'>(ii.i) RG;</li>
                <li className='pl-5'>(ii.ii) CPF;</li>
                <li className='pl-5'>(ii.iii) Selfie;</li>
                <li className='pl-5'>(ii.iv) Selfie com documento de identificação;</li>
                <li className='pl-5'>(ii.v) Comprovante de Residência;</li>
                <li className='pl-5'>(ii.vi) Ficha cadastral; e,</li>
                <li className='pl-5'>(ii.vii) Termos de Uso.</li>
                <li>(iii) Balanço contábil.</li>
              </ul>
              <p className='text-lg text-white'>4.9. Através da aceitação deste instrumento, o CLIENTE toma conhecimento que o funcionamento da Plataforma e de suas funcionalidades estão condicionados a um convênio firmado com o Banco Pagme, o qual tem como finalidade possibilitar a conexão entre a Plataforma às APIs do Banco Pagme. Deste modo, todas as movimentações dos recursos alocados pelos CLIENTES em suas respectivas contas de pagamento realizadas por meio da Plataforma estarão integradas à conta de pagamento de titularidade da GO CORRESPONDENTE BANCÁRIO LTDA junto ao Banco Pagme.</p>
              <p className='pl-5 text-lg text-white'>4.9.1. A instituição que promoverá a liquidação dos valores movimentados nas respectivas contas de pagamento dos CLIENTES junto ao sistema financeiro nacional será o Banco Pagme.</p>
              <p className='pl-5 text-lg text-white'>4.9.2. Por força disto, o CLIENTE permitirá o compartilhamento de todos os dados acima especificados, sejam eles considerados legalmente pessoais ou não, com o Banco Topázio, para que seja possível a prestação dos serviços por parte da GO CORRESPONDENTE BANCÁRIO LTDA</p>
              <p className='pl-5 text-lg text-white'>4.9.3. Caso o Banco Topázio venha a requerer da GO CORRESPONDENTE BANCÁRIO LTDA qualquer informação adicional sobre algum CLIENTE e/ou esclarecimentos sobre alguma movimentação em sua respectiva conta, a GO CORRESPONDENTE BANCÁRIO LTDA irá solicitar esclarecimentos junto ao CLIENTE, de modo que a utilização da PLATAFORMA ficará condicionada ao envio de tais informações adicionais.</p>
              <p className='pl-5 text-lg text-white'>4.9.4. O processamento e liquidação da movimentação na respectiva conta do CLIENTE ficarão suspensos até que as informações e/ou documentos adicionais sejam remetidos pelo CLIENTE à GO CORRESPONDENTE BANCÁRIO LTDA para que esta possa reportar ao Banco Topázio.</p>
              <p className='text-lg text-white'>4.10. Através do cadastro dos CLIENTES, a GO CORRESPONDENTE BANCÁRIO LTDA adotará as medidas pertinentes, a fim de adimplir com os procedimentos de prevenção à lavagem de dinheiro, nos termos da Lei nº 9.613 de 1998. Com a finalidade de estabelecer uma padronização no procedimento de cadastro do(s) CLIENTE(S), a GO CORRESPONDENTE BANCÁRIO LTDA, em conformidade com as regulamentações vigentes, realiza a:</p>
              <ul className='flex flex-col gap-5 pl-5 text-lg text-white'>
                <li>(i) coleta da documentação necessária para cadastramento;</li>
                <li>(ii) análise da documentação coletada;</li>
                <li>(iii) análise da veracidade das informações declaradas; e,</li>
                <li>(iv) verificação do atendimento à regulamentação em vigor.</li>
              </ul>
              <p className='pl-5 text-lg text-white'>4.10.1. O CLIENTE entende, com base no procedimento de cadastro realizado pela GO CORRESPONDENTE BANCÁRIO LTDA, esta poderá, na hipótese de suspeita de crime de lavagem de dinheiro, comunicar às autoridades competentes sobre as operações ou propostas de operação que, na forma da legislação vigente, caracterizam indício de lavagem de dinheiro.</p>
              <p className='pl-5 text-lg text-white'>4.10.2. Por meio da disponibilização dos dados acima especificados, o CLIENTE toma conhecimento de que a GO CORRESPONDENTE BANCÁRIO LTDA no estrito cumprimento de suas obrigações legais, irá compartilhá-los, juntamente com o teor de cada movimentação realizada em sua respectiva conta de pagamento, com o Banco Topázio e, consequentemente, com o Banco Central e as demais autoridades competentes.</p>
              <p className='text-lg text-white'>4.11. O CLIENTE a qualquer tempo poderá requisitar a retificação ou exclusão dos seus dados, o término do eventual tratamento dos seus dados pessoais, ou ainda a interrupção do compartilhamento dos dados acima referidos, entretanto, qualquer uma destas ações acarretará na inviabilização da prestação dos serviços disponibilizados pela GO CORRESPONDENTE BANCÁRIO LTDA, sendo que ela está legalmente autorizada a conservar os dados coletados, dentro das hipóteses previstas em lei.</p>
              <p className='pl-5 text-lg text-white'>4.11.1. Nos termos do artigo 16 da Lei 13.709 de 2019, após o término do tratamento dos dados do CLIENTE, a GO CORRESPONDENTE BANCÁRIO LTDA poderá promover a sua conservação, a fim de cumprir com as suas obrigações legais perante as autoridades competentes.</p>

              <h5 className='text-2xl	text-green-go-bank'>5. DAS CONDIÇÕES GERAIS DE USO:</h5>
              <p className='text-lg text-white'>5.1. O CLIENTE tem o dever de observar a legislação brasileira aplicável às operações de que for participante, garantindo que não realizará operações ilícitas, contrárias à moral ou aos bons costumes, ou que saiba ou deva saber que são nulas ou anuláveis.</p>
              <p className='text-lg text-white'>5.2. O CLIENTE acessará a sua Conta de Pagamento, através da Plataforma, mediante login e senha a serem criadas pelo CLIENTE, na Plataforma, no momento do cadastro, sendo tais dados pessoais e intransferíveis. O CLIENTE se compromete a não utilizar o login e/ou senha de terceiros, nem permitir que um terceiro utilize seu login e/ou senha.</p>
              <p className='text-lg text-white'>5.3. As movimentações e Transações realizadas na Plataforma necessitarão de autorização expressa do CLIENTE, esta que se dará através do uso de sua senha.</p>
              <p className='text-lg text-white'>5.4. O CLIENTE concorda em manter sob sua guarda e sigilo sua senha, de forma que a GO CORRESPONDENTE BANCÁRIO LTDA não será, em nenhuma hipótese, responsável por quaisquer prejuízos causados ao CLIENTE, ou a quaisquer terceiros, pela divulgação e utilização indevida desta. O CLIENTE ainda se compromete a notificar imediatamente a GO CORRESPONDENTE BANCÁRIO LTDA, através da Plataforma, acerca de qualquer uso não autorizado na sua Conta de Pagamento, assim como do acesso ou de tentativas de acesso por terceiros não autorizados. A GO CORRESPONDENTE BANCÁRIO LTDA reserva-se no direito de bloquear a senha do CLIENTE caso sejam verificadas movimentações atípicas de sua Conta de Pagamento.</p>
              <p className='text-lg text-white'>5.5. A GO CORRESPONDENTE BANCÁRIO LTDA poderá, a seu exclusivo critério, na abertura e/ou durante a manutenção da Conta de Pagamento, por questões de atualização cadastral a ser realizada anualmente, exigir dados, documentos e declarações que entenda necessários à perfeita identificação, qualificação e conhecimento do CLIENTE, em especial, mas não se limitando, as informações necessárias à prevenção e ao combate à lavagem de dinheiro e ao financiamento do terrorismo, à identificação e ao relacionamento das pessoas politicamente expostas. A recusa do CLIENTE no fornecimento de dados, informações, documentos e ou declarações solicitadas pela GO CORRESPONDENTE BANCÁRIO LTDA poderá, a exclusivo critério desta, ensejar a não abertura da Conta de Pagamento, a não realização das movimentações e Transações e/ou o encerramento da Conta de Pagamento, nos termos deste instrumento.</p>
              <p className='text-lg text-white'>5.6. A Conta de Pagamento é única e intransferível, de modo que é possível efetuar apenas um cadastro por CPF ou CNPJ.</p>
              <p className='text-lg text-white'>5.7. Não será possível realizar depósitos na Conta de Pagamento mediante cheques. O Depósito em moeda corrente, será possível através de redes de autoatendimento.</p>
              <p className='text-lg text-white'>5.8. Todas as movimentações e Transações realizadas na Plataforma estão sujeitas à análise antifraude, deste modo, poderá a GO CORRESPONDENTE BANCÁRIO LTDA bloquear a Conta de Pagamento do CLIENTE, caso haja qualquer suspeita de inconsistências cadastrais, crimes financeiros, operações fora de seu padrão de uso, utilização indevida que desrespeite qualquer condição presente nestes Termos de Uso e as Políticas de Privacidade, bem como na legislação vigente aplicável. Nesses casos, a Conta de Pagamento somente será desbloqueada após o esclarecimento e regularização da situação que motivou o bloqueio.</p>
              <p className='text-lg text-white'>5.9. A verificação de documentos e/ou consulta de bases de dados pela GO CORRESPONDENTE BANCÁRIO LTDA não confere ao CLIENTE atestado de regularidade para qualquer finalidade nem o exime do cumprimento das obrigações previstas nestes Termos de Uso.</p>
              <p className='text-lg text-white'>5.10. As movimentações e Transações na Conta de Pagamento serão realizadas somente em moeda corrente brasileira.</p>
              <p className='text-lg text-white'>5.11. O saldo, as informações, Transações e os comprovantes da Conta de Pagamento do CLIENTE, estarão disponíveis na Plataforma.</p>
              <p className='text-lg text-white'>5.12. O CLIENTE poderá requerer a transferência do Saldo de sua Conta de Pagamento a qualquer momento, na Plataforma. Uma vez solicitada a transferência, seu pedido não poderá ser cancelado ou alterado.</p>
              <p className='text-lg text-white'>5.13. Caso o Saldo da Conta de Pagamento esteja bloqueado por qualquer motivo, a transferência requerida pelo CLIENTE somente será efetuada após a liberação do bloqueio.</p>
              <p className='text-lg text-white'>5.14. Em havendo lançamentos a débito na Conta de Pagamento, incluindo, mas sem limitação, pagamento de títulos em cobrança bancária e tarifas, programados para a mesma data da transferência requerida, esta somente será efetuada após a efetiva cobrança e liquidação dos referidos lançamentos a débito na Conta de Pagamento.</p>
              <p className='text-lg text-white'>5.15. O CLIENTE não receberá qualquer tipo de correção, atualização ou juros sobre os valores mantidos em sua Conta de Pagamento.</p>
              <p className='text-lg text-white'>5.16. Caso o CLIENTE identifique eventuais diferenças de valores em qualquer transação ou transferência de recursos de terceiros para sua Conta de Pagamento, deverá informar a GO CORRESPONDENTE BANCÁRIO LTDA no prazo de 15 (quinze) dias úteis a contar da data da realização da operação. Após esse prazo, entende-se que o valor creditado ou debitado na Conta de Pagamento será considerado correto.</p>

              <h5 className='text-2xl	text-green-go-bank'>6. DAS TARIFAS:</h5>
              <p className='text-lg text-white'>6.1. O CLIENTE declara que está ciente e que concorda que a GO CORRESPONDENTE BANCÁRIO LTDA poderá cobrar tarifas para prestação dos seus serviços, mediante débito na sua Conta de Pagamento, as quais estarão disponíveis para consulta na Plataforma.</p>
              <p className='text-lg text-white'>6.2. A GO CORRESPONDENTE BANCÁRIO LTDA reserva-se no direito de alterar as tarifas praticadas a qualquer momento, desde que o CLIENTE seja previamente avisado através da Plataforma, e que tenha a opção de encerrar a sua Conta de Pagamento, caso não concorde com as alterações.</p>
              <p className='text-lg text-white'>6.3. As tarifas que não sejam fixadas em percentual serão atualizadas anualmente ou na menor periodicidade permitida pela legislação aplicável, com base na variação positiva do IGP-M/FGV para o período.</p>
              <p className='text-lg text-white'>6.4. A GO CORRESPONDENTE BANCÁRIO LTDA poderá, a qualquer tempo, mediante comunicação prévia ao CLIENTE, esta que pode se dar através da Plataforma ou do endereço de e-mail informado no cadastro, criar, alterar ou excluir cobranças dos Serviços ora oferecidos, ainda que inicialmente tenham sido ofertados de forma gratuita e deverá, ainda, de forma clara, indicar qual o preço vigente dos serviços, facultando ao CLIENTE opção de encerrar os Serviços, caso não concorde com as alterações.</p>

              <h6 className='text-2xl	text-green-go-bank'>7. DO PROCEDIMENTO DE SEGURANÇA:</h6>
              <p className='text-lg text-white'>7.1. A GO CORRESPONDENTE BANCÁRIO LTDA não tem qualquer responsabilidade com relação aos logins e senhas criados, alterados e utilizados pelo CLIENTE na Plataforma.</p>
              <p className='text-lg text-white'>7.2. O CLIENTE deverá manter seus dados cadastrais sempre atualizados para que a GO CORRESPONDENTE BANCÁRIO LTDA possa realizar procedimentos de segurança necessários à prestação dos serviços. A GO CORRESPONDENTE BANCÁRIO LTDA poderá solicitar confirmações a fim de garantir a legitimidade do acessoa Plataforma.</p>
              <p className='text-lg text-white'>7.3. O CLIENTE obriga-se a cumprir e, quando aplicável, fazer com que seus colaboradores, prestadores de serviço e terceiros contratados cumpram todos os requerimentos de segurança da informação divulgados pela GO CORRESPONDENTE BANCÁRIO LTDA, sempre conforme versão mais atualizada disponível, bem como informar imediatamente a ocorrência de qualquer furto, roubo e/ou perda de seu celular com acesso a Conta de Pagamento, através dos canais de atendimento, para que a GO CORRESPONDENTE BANCÁRIO LTDA providencie a revogação do acesso a respectiva Conta de Pagamento.</p>
              <p className='text-lg text-white'>7.4. O CLIENTE obriga-se a cumprir todas as regras sobre prevenção e combate aos crimes de lavagem de dinheiro, de terrorismo e seu financiamento, entre outros, a ocultação de bens especificados pela Lei nº 9.613/1998 e pelo Conselho de Controle de Atividades Financeiras, além de outras legislações e regulamentações aplicáveis às hipóteses, bem como a colaborar de forma efetiva com as autoridades, órgãos de regulação e/ou de fiscalização, no fornecimento de dados e/ou informações, quando legalmente admitidos, inclusive, mas sem limitação, no que tange à prevenção e combate aos crimes de lavagem de dinheiro e ocultação de bens e aos crimes contra crianças e adolescentes, adotando todas as medidas necessárias de sua responsabilidade para coibir tais ilícitos.</p>
              <p className='text-lg text-white'>7.5. O CLIENTE declara e garante que não pratica ou praticará quaisquer atos que sejam tidos como lavagem de dinheiro ou ocultação de bens, direitos ou valores.</p>
              <p className='text-lg text-white'>7.6. O CLIENTE deverá informar a GO CORRESPONDENTE BANCÁRIO LTDA imediatamente sobre qualquer situação que possa estar relacionada à lavagem de dinheiro e/ou ao financiamento do terrorismo e que possa afetar a GO CORRESPONDENTE BANCÁRIO LTDA direta ou indiretamente.</p>
              <p className='text-lg text-white'>7.7. A GO CORRESPONDENTE BANCÁRIO LTDA pode, sem aviso prévio e conforme seu critério, negar o processamento de transações e, ainda, efetuar o bloqueio preventivo da Conta de Pagamento do CLIENTE até a conclusão de avaliação das supostas irregularidades, nas seguintes situações: a) Indícios de fraude, de qualquer outro ato ilegal ou de descumprimento ou desvirtuamento da legislação ou regulamentação aplicável ou destes Termos de Uso; b) Transações em desacordo com o perfil de utilização da Conta de Pagamento pelo CLIENTE; c) Transações que não respeitem os limites mínimo e máximo admitidos, conforme definidos pela [NOME DA EMPRESA] e informados ao CLIENTE; d) Dificuldade na confirmação dos dados do CLIENTE; e) Caso o CPF ou CNPJ do CLIENTE esteja cancelado, pendente de regularização ou suspenso perante a Receita Federal do Brasil.</p>

              <p className='text-2xl text-green-go-bank'>8. DAS INFORMAÇÕES CONFIDENCIAIS:</p>
              <p className='text-lg text-white'>8.1. Com a realização do cadastro pela GO CORRESPONDENTE BANCÁRIO LTDA, o CLIENTE concorda com a Política de Privacidade, concedendo à GO CORRESPONDENTE BANCÁRIO LTDA autorização para o tratamento dos seus Dados Pessoais, de acordo com as regras constantes destes Termos de Uso e da Política de Privacidade.</p>
              <p className='text-lg text-white'>8.2. A GO CORRESPONDENTE BANCÁRIO LTDA cumprirá com a legislação e regulamentos vigentes aplicáveis ao envio de informações sobre transações e operações realizadas em conformidade com estes Termos de Uso.</p>
              <p className='text-lg text-white'>8.3. Ressalvado o quanto disposto na Política de Privacidade, e sem prejuízo das demais cláusulas e condições destes Termos de Uso, cada uma das partes se obriga a manter em absoluto sigilo e confidencialidade todas as informações, dados ou especificações a que tiver acesso ou que porventura venha a conhecer ou ter ciência relativamente às transações, às contas e aos demais Clientes da GO CORRESPONDENTE BANCÁRIO LTDA, utilizando tais informações exclusivamente para os fins destes Termos de Uso.</p>
              <p className='text-lg text-white'>
                8.4. Nada obstante as obrigações de sigilo aqui previstas, ao aderir a estes Termos de Uso, o CLIENTE expressamente concorda e autoriza a GO CORRESPONDENTE BANCÁRIO LTDA a, sem qualquer ônus: a) Prestar às autoridades competentes, todas as informações que forem solicitadas com relação ao CLIENTE e às operações por ele executadas sob estes Termos. A GO CORRESPONDENTE BANCÁRIO LTDA poderá, ainda, comunicar ao Conselho de Controle de Atividades Financeiras – COAF, as transações que possam estar configuradas no disposto na Lei nº 9.613/1998 e demais normas relativas à lavagem de dinheiro, incluindo as normas e políticas internas da GO CORRESPONDENTE BANCÁRIO LTDA nesse sentido. A GO CORRESPONDENTE BANCÁRIO LTDA poderá, também, enviar os dados do CLIENTE ao Banco Central do Brasil por meio do Cadastro de Clientes do Sistema Financeiro Nacional – CCS; b) Compartilhar informações cadastrais a seu respeito com todas as instituições participantes do mercado de meios de
                pagamento, observada a legislação aplicável; c) Extrair e utilizar quaisquer dados públicos, informações de terceiros (como instituições financeiras) e/ou dados do CLIENTE disponibilizados em qualquer rede social e similares; d) Utilizar comercialmente seus dados cadastrais, bem como quaisquer dados coletados pela GO CORRESPONDENTE BANCÁRIO LTDA, para envio ao CLIENTE de mensagens e materiais de caráter informativo relativas aos Serviços, assim como mensagens e materiais de natureza comercial e publicitária, com ofertas da GO CORRESPONDENTE BANCÁRIO LTDA e/ou de seus parceiros comerciais.
              </p>
              <p className='text-lg text-white'>8.5. As obrigações de sigilo e privacidade das informações se manterão válidas inclusive após o término destes Termos de Uso por qualquer motivo.</p>

              <p className='text-2xl text-green-go-bank'>9. DO PRAZO E RESCISÃO:</p>
              <p className='text-lg text-white'>9.1. Estes Termos de Uso permanecerão válidos por prazo indeterminado a partir do aceite do CLIENTE, podendo ser rescindidos, unilateralmente, por qualquer das partes, a qualquer tempo, sem qualquer ônus.</p>
              <p className='text-lg text-white'>9.2. O encerramento da Conta de Pagamento está condicionado ao resgate total dos recursos.</p>
              <p className='text-lg text-white'>9.3. O CLIENTE poderá solicitar o encerramento de sua Conta de Pagamento através da Plataforma, devendo, para tanto, realizar o resgate total dos recursos de forma anterior à solicitação.</p>
              <p className='text-lg text-white'>9.4. A GO CORRESPONDENTE BANCÁRIO LTDA poderá encerrar a Conta de Pagamento do Cliente mediante simples notificação por meio da Plataforma, com 30 (trinta) dias de antecedência, devendo o CLIENTE enviar seus dados bancários para a devolução dos recursos depositados, deduzidos eventuais tarifas devidas pelo CLIENTE a GO CORRESPONDENTE BANCÁRIO LTDA.</p>
              <p className='text-lg text-white'>
                9.5. A GO CORRESPONDENTE BANCÁRIO LTDA poderá encerrar a Conta de Pagamento do Cliente, independentemente de notificação, interpelação judicial ou extrajudicial, na hipótese de: a) falência, recuperação extrajudicial ou insolvência de qualquer das partes, decretada ou requerida; b) caso o CLIENTE deixe de cumprir qualquer das cláusulas dispostas em qualquer dos documentos que compõem estes Termos de Uso ou na Política de Privacidade; d) se o CLIENTE praticar ou tentar praticar quaisquer atos com a finalidade de realizar transações consideradas ilegítimas, ilícitas, fraudulentas ou que pretendam burlar estes Termos de Uso, bem como quaisquer regras ou requisitos operacionais ou de segurança da [NOME DA EMPRESA]. Nesse caso, o CLIENTE será, ainda, responsável por eventuais perdas e danos incorridos pela [NOME DA EMPRESA] e/ou terceiros; e) se qualquer das informações prestadas pelo CLIENTE não corresponderem com a verdade ou não forem atualizadas nos prazos previstos
                nestes Termos de Uso; e, f) caso a Conta de Pagamento permaneça sem saldo por período superior a 180 (cento e oitenta) dias.
              </p>

              <p className='text-2xl text-green-go-bank'>10. DA POLÍTICA DE PRIVACIDADE E DO TRATAMENTO DE DADOS:</p>
              <p className='text-lg text-white'>10.1. Conforme previsto na Lei 13.709 de 2019, por meio do presente instrumento, os CLIENTES dão seu consentimento para que a GO CORRESPONDENTE BANCÁRIO LTDA promova ao tratamento dos seus dados, nos termos e na forma prevista nestes Termos de Uso.</p>
              <p className='pl-5 text-lg text-white'>10.1.1. O respectivo aceite será dado por meio do clique no botão “Li e aceito os Termos de Uso e a Política de Privacidade”, no primeiro acesso do CLIENTE à Plataforma, ou ainda por meio do aceite do documento encaminhado ao respectivo e-mail do CLIENTE.</p>
              <p className='text-lg text-white'>10.2. O CLIENTE que seja titular de dados pessoais poderá solicitar a revogação do seu consentimento a qualquer tempo, mediante solicitação à GO CORRESPONDENTE BANCÁRIO LTDA que por sua vez promoverá a sua definitiva exclusão, exceto nos casos em que lhe seja facultada a conservação dos dados pessoais para cumprimento das suas obrigações legais.</p>
              <p className='text-lg text-white'>10.3. O CLIENTE reconhece ser o único e exclusivo responsável pelo seu cadastro na Plataforma e, consequentemente, pela veracidade dos dados fornecidos à GO CORRESPONDENTE BANCÁRIO LTDA, isentando está de quaisquer responsabilidades, bem como se responsabilizando por eventuais danos decorrentes da inexatidão e/ou desatualização dos referidos dados.</p>
              <p className='text-lg text-white'>10.4. É facultado à GO CORRESPONDENTE BANCÁRIO LTDA a possibilidade de realizar as buscas que julgar necessárias para apuração de eventuais dados incorretos, inverídicos ou desatualizados.</p>
              <p className='pl-5 text-lg text-white'>10.4.1. Caso a GO CORRESPONDENTE BANCÁRIO LTDA, ao checar a veracidade dos dados do CLIENTE, constate a existência de dados incorretos, inverídicos e/ou desatualizados, ou, ainda, caso o CLIENTE se furte ou se negue a informar os dados requeridos, a GO CORRESPONDENTE BANCÁRIO LTDA poderá suspender temporária ou definitivamente o seu acesso à Plataforma, sem prejuízo de adotar as medidas administrativas e judiciais cabíveis à espécie.</p>
              <p className='text-lg text-white'>10.5. Sem prejuízo dos CLIENTES informarem os seus dados diretamente à GO CORRESPONDENTE BANCÁRIO LTDA ela poderá ainda coletar suas informações por meio das formas especificadas nas cláusulas abaixo</p>
              <p className='pl-5 text-lg text-white'>10.5.1. Por meio do presente instrumento o CLIENTE dá a sua expressa autorização e inequívoco consentimento para que a GO CORRESPONDENTE BANCÁRIO LTDA promova a coleta dos seus dados através da sua atividade na PLATAFORMA, esta compreendida como:</p>
              <ul className='flex flex-col gap-5 pl-10 text-lg text-white'>
                <li>(i) As movimentações financeiras e/ou transações, pagamentos realizados na Plataforma;</li>
                <li>(ii) Os dados de acesso obtidos pelos dispositivos utilizados pelo CLIENTE para acessar a Plataforma, incluindo especificações do dispositivo (marca, versão do sistema operacional e modelo do aparelho), geolocalização, endereço IP, data e tempo médio de acesso; e,</li>
                <li>(iii) Os dados de acesso coletados por cookies e tecnologias semelhantes, para entendimento de como o CLIENTE interage na Plataforma.</li>
              </ul>
              <p className='pl-5 text-lg text-white'>10.5.2. Por meio do presente instrumento o CLIENTE dá a sua expressa autorização e inequívoco consentimento para que a GO CORRESPONDENTE BANCÁRIO LTDA promova a coleta dos seus dados através de informações fornecidas por terceiros, estas compreendidas como:</p>
              <ul className='flex flex-col gap-5 pl-10 text-lg text-white'>
                <li>(i) Informações coletadas de bureaus de informação, para validar dados informados por Usuários; e,</li>
                <li>(ii) Os dados estatísticos de comportamento do CLIENTE na Plataforma, estes fornecidos por sistemas de análises de dados.</li>
              </ul>
              <p className='text-lg text-white'>10.6. Todas as informações recebidas pela GO CORRESPONDENTE BANCÁRIO LTDA serão armazenadas em ambiente seguro, em sua própria base de dados.</p>
              <p className='text-lg text-white'>10.7. A coleta e o tratamento dos dados pela GO CORRESPONDENTE BANCÁRIO LTDA visam:</p>
              <ul className='flex flex-col gap-5 pl-10 text-lg text-white'>
                <li>(i) realizar a gestão da conta de pagamento do CLIENTE;</li>
                <li>(ii) realizar a gestão das operações de pagamento;</li>
                <li>(iii) realizar as movimentações e as transferências de valores;</li>
                <li>(iv) realizar análise estatística;</li>
                <li>(v) desenvolver e aprimorar os produtos e serviços ofertados;</li>
                <li>(vi) identificar as necessidades específicas de cada CLIENTE e, assim, ofertar produtos personalizados, através de campanhas voltadas para cada perfil de CLIENTE;</li>
                <li>(vii) aumentar a segurança das transações, tornando possível a atuação em tempo real em caso de movimentações suspeitas; e</li>
                <li>(viii) permitir a comunicação entre os CLIENTES e a GO CORRESPONDENTE BANCÁRIO LTDA.</li>
              </ul>
              <p className='text-lg text-white'>10.8. Os dados fornecidos pelos clientes só serão acessados por profissionais autorizados vinculados à GO CORRESPONDENTE BANCÁRIO LTDA, sendo vedado o seu compartilhamento com terceiros em desacordo com este instrumento.</p>
              <p className='text-lg text-white'>10.9. O Usuário poderá, a qualquer tempo, por meio dos canais de comunicação mantidos com a GO CORRESPONDENTE BANCÁRIO LTDA, editar e/ou atualizar os dados fornecidos.</p>
              <p className='text-lg text-white'>10.10. Por meio deste instrumento, a GO CORRESPONDENTE BANCÁRIO LTDA se compromete a adotar todas as medidas técnicas e administrativas aptas a proteger os dados pessoais dos CLIENTES, visando, ainda, preservar a segurança de seus sistemas na guarda de tais dados, entre eles a observância às diretrizes sobre padrões de segurança estabelecidas no Decreto nº 8.771/2016, tais como:</p>
              <ul className='flex flex-col gap-5 pl-5 text-lg text-white'>
                <li>(i) Utilização de métodos padrões de mercado para criptografar e anonimizar os dados coletados, além de demais formas padrão de encriptação, para garantir sua inviolabilidade;</li>
                <li>(ii) Emprego de softwares de alta tecnologia para proteção contra o acesso não autorizado à Plataforma, sendo estes considerados ambientes controlados e de segurança;</li>
                <li>(iii) Disponibilização de acesso a locais de armazenamento de dados pessoais apenas a pessoas previamente autorizadas, comprometidas ao sigilo de tais dados, inclusive mediante a assinatura de termo de confidencialidade;</li>
                <li>(iv) Aplicação de mecanismos de autenticação de acesso aos registros capazes de individualizar o responsável pelo tratamento e acesso dos dados coletados em decorrência da utilização da Plataforma; e,</li>
                <li>(v) Manutenção do inventário indicando momento, duração, identidade do funcionário ou do responsável pelo acesso e o arquivo objeto, com base nos registros de conexão e de acesso a aplicações, conforme determinado no artigo 13 do Decreto nº 8.771/2016.</li>
              </ul>
              <p className='text-lg text-white'>10.11. A GO CORRESPONDENTE BANCÁRIO LTDA poderá compartilhar com terceiros os dados coletados dos CLIENTES nas seguintes hipóteses:</p>
              <ul className='flex flex-col gap-5 pl-5 text-lg text-white'>
                <li>(i) Quando necessário às atividades comerciais da GO CORRESPONDENTE BANCÁRIO LTDA, imprescindíveis para a prestação dos seus serviços;</li>
                <li>(ii) Para melhorar a experiência do CLIENTE com os produtos e serviços oferecidos pela GO CORRESPONDENTE BANCÁRIO LTDA;</li>
                <li>(iii) Para, nos casos de conflitos de interesse, resguardar a própria GO CORRESPONDENTE BANCÁRIO LTDA, inclusive no âmbito de demandas judiciais e administrativas;</li>
                <li>(iv) Em caso de transações e alterações societárias envolvendo a GO CORRESPONDENTE BANCÁRIO LTDA, hipótese em que a transferência dos dados será necessária para a continuidade dos serviços ofertados por meio da Plataforma; e/ou,</li>
                <li>(v) Mediante ordem judicial ou por requerimento de autoridades administrativas que detenham competência legal para sua requisição.</li>
              </ul>
              <p className='pl-5 text-lg text-white'>10.11.1. Em todos os casos de compartilhamento acima especificados, a GO CORRESPONDENTE BANCÁRIO LTDA adotará as medidas cabíveis para guardar o sigilo e a privacidade de seus CLIENTES.</p>
              <p className='text-lg text-white'>10.12. Em respeito ao sigilo bancário dos CLIENTES, a GO CORRESPONDENTE BANCÁRIO LTDA não compartilhará informações bancárias de seus CLIENTES, salvo quando por determinação legal ou judicial.</p>
              <p className='text-lg text-white'>10.13. São hipóteses de exclusão dos dados e das informações coletadas pela GO CORRESPONDENTE BANCÁRIO LTDA dos seus clientes:</p>
              <ul className='flex flex-col gap-5 pl-5 text-lg text-white'>
                <li>(i) Quando a finalidade para a qual o dado foi coletado seja alcançada ou quando os dados deixarem de ser necessários ou pertinentes para o alcance desta finalidade, nos termos deste instrumento;</li>
                <li>(ii) Quando ocorrer a revogação do consentimento pelo CLIENTE; ou,</li>
                <li>(iii) Mediante determinação de autoridade competente.</li>
              </ul>
              <p className='pl-5 text-lg text-white'>10.13.1. A exclusão dos dados do CLIENTE, em quaisquer uma das hipóteses acima elencadas, acarretará na impossibilidade de continuidade da prestação dos serviços por parte da GO CORRESPONDENTE BANCÁRIO LTDA, sem que qualquer indenização seja devida ao CLIENTE.</p>
              <p className='text-lg text-white'>10.14. São direito dos CLIENTES no âmbito do tratamento dos seus dados pela GO CORRESPONDENTE BANCÁRIO LTDA:</p>
              <ul className='flex flex-col gap-5 pl-5 text-lg text-white'>
                <li>(i) A confirmação da existência de tratamento dos seus dados pessoais;</li>
                <li>(ii) O acesso aos seus dados coletados pela GO CORRESPONDENTE BANCÁRIO LTDA através do uso, pelo CLIENTE, da Plataforma;</li>
                <li>(iii) A correção de seus dados, caso estes estejam incompletos, inexatos ou desatualizados;</li>
                <li>(iv) A anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a legislação brasileira aplicável;</li>
                <li>(v) A portabilidade de seus dados pessoais, para si ou para terceiro, mediante requisição expressa feita pelo CLIENTE;</li>
                <li>(vi) A eliminação dos dados pessoais tratados com o seu consentimento, desde que respeitado o prazo mínimo de armazenamento de informações determinado pela legislação brasileira;</li>
                <li>(v) A obtenção de informações sobre entidades públicas ou privadas com as quais a GO CORRESPONDENTE BANCÁRIO LTDA compartilhou seus dados; e,</li>
                <li>(vi) Informações sobre a possibilidade de não fornecer o seu consentimento em relação ao tratamento de seus dados pessoais, bem como de ser informado sobre suas consequências, em caso de negativa.</li>
              </ul>

              <p className='text-2xl text-green-go-bank'>11. DA PROPRIEDADE INTELECTUAL</p>
              <p className='text-lg text-white'>11.1. Todo o material, patentes, marcas, registros, nomes, privilégios, criações, imagens, códigos de programação e todos os direitos conexos e relacionados com a Plataforma e desenvolvidos pela GO CORRESPONDENTE BANCÁRIO LTDA, são e permanecerão de única e exclusiva propriedade da GO CORRESPONDENTE BANCÁRIO LTDA, concordando o CLIENTE em não praticar ato ou fato que, por qualquer modo, prejudique os direitos previstos nesta cláusula e tampouco reivindicar qualquer direito ou privilégio sobre os mesmos.</p>

              <p className='text-2xl text-green-go-bank'>12. DAS HIPÓTESES DE ISENÇÃO DE RESPONSABILIDADE</p>
              <p className='text-lg text-white'>12.1. Além das isenções de responsabilidade indicadas acima, o CLIENTE toma ciência de que a GO CORRESPONDENTE BANCÁRIO LTDA não será responsável:</p>
              <ul className='flex flex-col gap-5 pl-5 text-lg text-white'>
                <li>(i) Por toda e qualquer indisponibilidade, erro ou falha apresentados na Plataforma, bem como por qualquer defraudação de utilidade que o CLIENTE possa ter atribuído à Plataforma pela dificuldade de acesso;</li>
                <li>(ii) Por erros ou eventuais inconsistências na transmissão de dados, pela qualidade ou disponibilidade da conexão de Internet, que impeçam a adequada utilização da Plataforma;</li>
                <li>(iii) Pela presença de vírus ou demais elementos nocivos na Plataforma, capazes de causar alterações em seus sistemas informáticos (software e hardware) ou em documentos eletrônicos armazenados em seus sistemas informáticos, eximindo-se a GO CORRESPONDENTE BANCÁRIO LTDA de qualquer responsabilidade por eventuais danos e prejuízos decorrentes de quaisquer elementos nocivos inseridos por terceiros;</li>
                <li>(iv) Pelos danos e prejuízos de toda natureza decorrentes do conhecimento que terceiros não autorizados possam ter de quaisquer dados fornecidos pela Plataforma, em decorrência de falha exclusivamente relacionada ao CLIENTE ou a terceiros que fujam de qualquer controle razoável da GO CORRESPONDENTE BANCÁRIO LTDA; e</li>
                <li>(v) Por quaisquer dados e/ou informações inverídicas, desatualizadas ou inexatas, fornecidas pelo CLIENTE quando da realização de seu cadastro na Plataforma</li>
              </ul>

              <p className='text-2xl text-green-go-bank'>13. DAS SANÇÕES</p>
              <p className='text-lg text-white'>13.1. Sem prejuízo de outras medidas cabíveis, a GO CORRESPONDENTE BANCÁRIO LTDA poderá, a seu exclusivo critério, suspender, temporária ou definitivamente, o acesso do CLIENTE à Plataforma se:</p>
              <ul className='flex flex-col gap-5 pl-5 text-lg text-white'>
                <li>(i) O CLIENTE descumprir quaisquer das disposições constantes nestes Termos e/ou nas disposições dos contratos e documentos que regulam o seu relacionamento com a GO CORRESPONDENTE BANCÁRIO LTDA;</li>
                <li>(ii) A GO CORRESPONDENTE BANCÁRIO LTDA possuir suspeitas de que o CLIENTE pratica ou praticou atos fraudulentos ou ilegais; e,</li>
                <li>(iii) Caso não seja possível a verificação da identidade do CLIENTE, ou se os dados e informações fornecidos por ele estiverem incorretos.</li>
              </ul>

              <p className='text-2xl text-green-go-bank'>14. DAS DISPOSIÇÕES GERAIS:</p>
              <p className='text-lg text-white'>14.1. A GO CORRESPONDENTE BANCÁRIO LTDA poderá, a seu exclusivo critério, a qualquer tempo e sem necessidade de comunicação prévia ao CLIENTE, encerrar, modificar ou suspender, total ou parcialmente, o acesso do CLIENTE à Plataforma, quando referido acesso ou cadastro violar as condições estabelecidas nestes Termos de Uso e/ou na Política de Privacidade.</p>
              <p className='text-lg text-white'>14.2. A GO CORRESPONDENTE BANCÁRIO LTDA poderá, a qualquer tempo, incluir, excluir ou alterar estes Termos de Uso a seu exclusivo critério, sendo que, quaisquer alterações realizadas deverão ser informadas por meio de comunicado na Plataforma com prazo de antecedência de 05 (cinco) dias, ou, mediante notificação, por e-mail, no mesmo prazo de antecedência ao CLIENTE. Ocorrendo a alteração, o CLIENTE poderá encerrar sua Conta de Pagamento, sem aplicação de quaisquer multas.</p>
              <p className='text-lg text-white'>14.3. A GO CORRESPONDENTE BANCÁRIO LTDA poderá ampliar a utilização da Conta de Pagamento, agregando novos serviços e produtos, ou interromper o fornecimento de determinado Produto ou Serviço, a qualquer tempo.</p>
              <p className='text-lg text-white'>14.4. O CLIENTE declara que todas as informações fornecidas no momento da abertura de sua Conta de Pagamento e de sua ativação são verídicas, especialmente aquelas concernentes aos países onde detém residência fiscal, além do Brasil. O CLIENTE manterá a GO CORRESPONDENTE BANCÁRIO LTDA sempre informada a respeito de quaisquer alterações nos seus dados cadastrais, inclusive na ocorrência da obtenção de cidadania em outros países.</p>
              <p className='text-lg text-white'>14.5. Caso qualquer disposição destes Termos de Uso venha a ser considerada ilegal, nula ou inexequível por qualquer razão, as disposições restantes não serão afetadas, permanecendo válidas e aplicáveis na máxima extensão possível.</p>
              <p className='text-lg text-white'>14.6. Caso a GO CORRESPONDENTE BANCÁRIO LTDA venha a sofrer ou suportar qualquer perda e/ou prejuízo por culpa ou dolo do CLIENTE, ficará este obrigado a ressarci-la de tais valores, incluindo, mas sem se limitar a despesas relacionadas a custas administrativas e/ou judiciais, taxas, emolumentos e honorários advocatícios, penalidades e multas que venham a ser aplicadas à GO CORRESPONDENTE BANCÁRIO LTDA, devidamente atualizados de acordo com a variação do IGP-M/FGV ou índice que vier a substitui-lo.</p>
              <p className='text-lg text-white'>14.7. Estes Termos de Uso serão regidos e interpretados de acordo com as Leis da República Federativa do Brasil, ficando eleito o foro da Comarca de Porto Alegre/RS como competente para dirimir quaisquer questões oriundas destes Termos, com exclusão de qualquer outro, por mais privilegiado que seja.</p>
            </div>
          </div>

          <div className='flex items-center justify-center bg-gray-dark-go-bank'>
            <div className='flex w-full max-w-[1185px] flex-col gap-5 px-5 py-16'>
              <p className='text-4xl text-white'>Arquivo para dowload em PDF</p>
              <a href='/docs/termos-de-uso.pdf' className='flex items-center gap-5 transition-opacity hover:opacity-80'>
                <p className='text-lg text-green-go-bank'>Clique aqui para baixar nosso Termos de Uso</p>
                <Image src={downloadIcon} alt='Icone de download' />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
