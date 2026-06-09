import { CSSProperties, useEffect, useState } from 'react';

import Image from 'next/image';
import downloadIcon from '../../public/svgs/download-icon.svg';
import Head from 'next/head';

export default function PoliticaDePrivacidade() {
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
        <title>Política de Privacidade GoCapital - Conheça Nossas Políticas</title>
        <meta name='description' content='Leia nossa Política de Privacidade GoCapital. Comprometidos em proteger suas informações financeiras. Descubra como cuidamos da sua privacidade' />
        <meta name='keywords' content='Política de Privacidade gobank' />
        <link rel='canonical' content='https://www.gobank.com.br/politica-de-privacidade' />
        <meta property='og:title' content='Política de Privacidade GoCapital - Conheça Nossas Políticas' />
        <meta property='og:description' content='Leia nossa Política de Privacidade GoCapital. Comprometidos em proteger suas informações financeiras. Descubra como cuidamos da sua privacidade' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/politica-de-privacidade' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Política de Privacidade GoCapital - Conheça Nossas Políticas' />
        <meta name='twitter:description' content='Leia nossa Política de Privacidade GoCapital. Comprometidos em proteger suas informações financeiras. Descubra como cuidamos da sua privacidade' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>
      <main className='politica-de-privacidade_CTA'>
        <section>
          <div className='flex items-center justify-center overflow-hidden'>
            <div style={bgTransformStyle}></div>
            <div className='flex w-full max-w-[1185px] px-5 py-28'>
              <h1 className='text-6xl	text-green-go-bank'>Política de Privacidade</h1>
            </div>
          </div>

          <div className='flex items-center justify-center bg-gray-dark-go-bank'>
            <div className='flex w-full max-w-[1185px] flex-col gap-5 px-5 py-16'>
              <h2 className='text-2xl	text-green-go-bank'>A. INTRODUÇÃO</h2>
              <p className='text-lg text-white'>A privacidade dos visitantes do nosso site e aplicativo é muito importante para nós, e estamos comprometidos em protegê-la. Esta política explica o que faremos com suas informações pessoais.</p>
              <p className='text-lg text-white'>Consentir com o uso de cookies de acordo com os termos desta política quando você acessa nosso site e aplicativo pela primeira vez nos permite usar cookies toda vez que você acessa nosso site e aplicativo.</p>

              <h3 className='text-2xl	text-green-go-bank'>B. COLETA DE INFORMAÇÕES PESSOAIS</h3>
              <p className='text-lg text-white'>Os seguintes tipos de informações pessoais podem ser coletados, armazenados e usados:</p>
              <p className='text-lg text-white'>1. informações sobre o seu computador, incluindo seu endereço IP, localização geográfica, tipo e versão do navegador e sistema operacional;</p>
              <p className='text-lg text-white'>2. informações sobre suas visitas e uso deste site e aplicativo, incluindo fonte de referência, duração da visita, visualizações de página e caminhos de navegação no site e aplicativo;</p>
              <p className='text-lg text-white'>3. informações, como seu endereço de e-mail, que você digita quando se registra em nosso site e aplicativo;</p>
              <p className='text-lg text-white'>4. informações que você digita ao criar um perfil em nosso site e aplicativo – por exemplo, seu nome, fotos de perfil, sexo, data de nascimento, status de relacionamento, informações educacionais e de emprego;</p>
              <p className='text-lg text-white'>5. informações, como seu nome e endereço de e-mail, que você digita para configurar assinaturas de nossos e-mails e/ou newsletters;</p>
              <p className='text-lg text-white'>6. informações que você digita durante o uso dos serviços em nosso site e aplicativo;</p>
              <p className='text-lg text-white'>7. informações geradas ao usar nosso site e aplicativo, incluindo quando, com que frequência e em que circunstâncias você o utiliza;</p>
              <p className='text-lg text-white'>8. informações relacionadas a tudo o que você compra, serviços que usa ou transações que realiza através do nosso site e aplicativo, incluindo nome, endereço, número de telefone, endereço de e-mail e dados do cartão de crédito;</p>
              <p className='text-lg text-white'>9. informações que você publica em nosso site e aplicativo com a intenção de publicá-las na internet, incluindo seu nome de usuário, fotos de perfil e o conteúdo de suas publicações;</p>
              <p className='text-lg text-white'>10. informações contidas em quaisquer comunicações que você nos envia por e-mail ou através de nosso site e aplicativo, incluindo o conteúdo;</p>
              <p className='text-lg text-white'>11. qualquer outra informação pessoal que você nos enviar.</p>
              <p className='text-lg text-white'>Antes de nos divulgar informações pessoais de outra pessoa, você deve obter o consentimento dessa pessoa para a divulgação e o processamento dessas informações pessoais de acordo com esta política.</p>

              <h4 className='text-2xl	text-green-go-bank'>C. USO DE SUAS INFORMAÇÕES PESSOAIS</h4>
              <p className='text-lg text-white'>As informações pessoais que nos são enviadas por meio de nosso site e aplicativo serão usadas para os fins especificados nesta política ou nas páginas relevantes do site. Podemos usar suas informações pessoais para o seguinte:</p>
              <p className='text-lg text-white'>1. atribuir-lhe um limite de crédito, taxa, prazos mínimo e máximo para operações de empréstimos de acordo com nossa política de crédito.</p>
              <p className='text-lg text-white'>2. encaminhar seus dados cadastrais informados para instituições financeiras parceiras (das quais somos correspondentes bancários), que por sua vez, irá emitir o contrato de empréstimo (Cédula de Crédito Bancário).</p>
              <p className='text-lg text-white'>3. administrar nosso site, aplicativo e nossos negócios;</p>
              <p className='text-lg text-white'>4. personalizar nosso site e aplicativo para você;</p>
              <p className='text-lg text-white'>5. possibilitar o uso dos serviços disponíveis em nosso site e aplicativo;</p>
              <p className='text-lg text-white'>6. enviar produtos adquiridos através do nosso site e aplicativo;</p>
              <p className='text-lg text-white'>7. prestar serviços adquiridos através do nosso site e aplicativo;</p>
              <p className='text-lg text-white'>8. enviar extratos, faturas e lembretes de pagamento, bem como coletar seus pagamentos;</p>
              <p className='text-lg text-white'>9. enviar comunicações comerciais que não sejam de marketing;</p>
              <p className='text-lg text-white'>10. enviar notificações por e-mail solicitadas especificamente por você;</p>
              <p className='text-lg text-white'>11. enviar nossa newsletter por e-mail, caso você a tenha solicitado (você pode nos informar a qualquer momento se não quiser mais receber a newsletter);</p>
              <p className='text-lg text-white'>12. enviar comunicações de marketing relacionadas aos nossos negócios ou aos negócios de terceiros cuidadosamente selecionados que acreditamos ser do seu interesse, por correio ou, onde você especificamente concordou com isso, por e-mail ou tecnologia semelhante (você pode nos informar a qualquer momento se não quiser mais receber comunicações de marketing);</p>
              <p className='text-lg text-white'>13. fornecer a terceiros informações estatísticas sobre nossos usuários (mas esses terceiros não poderão identificar nenhum usuário individual a partir dessas informações);</p>
              <p className='text-lg text-white'>14. lidar com perguntas e reclamações feitas por você ou sobre você em relação ao nosso site e aplicativo;</p>
              <p className='text-lg text-white'>15. manter nosso site e aplicativo seguros evitando fraudes;</p>
              <p className='text-lg text-white'>16. verificar a conformidade com os termos e condições que regem o uso do nosso site e aplicativo (incluindo o monitoramento de mensagens privadas enviadas por meio do serviço de mensagens privadas do nosso site e aplicativo); e</p>
              <p className='text-lg text-white'>17. imagens: As imagens (fotos e selfies) podem ser utilizadas para validação de identidade, prevenção a fraudes e personalização do perfil do usuário. O acesso a essas imagens será solicitado de forma clara e com seu consentimento.</p>
              <p className='text-lg text-white'>18. câmera: Utilizamos tecnologias como reconhecimento facial e sistemas antifraude, em conformidade com a LGPD (Lei Geral de Proteção de Dados), garantindo a proteção e o uso responsável das suas informações.</p>
              <p className='text-lg text-white'>19. não compartilhamos dados com terceiros, exceto quando necessário para a prestação de serviços ou por obrigação legal.</p>
              <p className='text-lg text-white'>20. outros usos.</p>
              <p className='text-lg text-white'>Se você enviar informações pessoais para publicação em nosso site e aplicativo, publicaremos e usaremos essas informações de acordo com a licença que você nos concedeu.</p>
              <p className='text-lg text-white'>Sem seu consentimento expresso, não forneceremos suas informações pessoais a terceiros para fins de marketing direto por parte deles ou de terceiros.</p>

              <h5 className='text-2xl	text-green-go-bank'>D. DIVULGAÇÃO DE INFORMAÇÕES PESSOAIS</h5>
              <p className='text-lg text-white'>Podemos divulgar suas informações pessoais a qualquer um de nossos funcionários, executivos, seguradoras, consultores profissionais, agentes, fornecedores ou subcontratados conforme razoavelmente necessário para os fins estabelecidos nesta política.</p>
              <p className='text-lg text-white'>Podemos divulgar suas informações pessoais a qualquer membro de nosso grupo de empresas (isso significa nossas subsidiárias, nossa holding e todas as suas subsidiárias) conforme razoavelmente necessário para os fins estabelecidos nesta política.</p>
              <p className='text-lg text-white'>Podemos divulgar suas informações pessoais:</p>
              <p className='text-lg text-white'>1. na medida em que somos obrigados a fazê-lo por lei;</p>
              <p className='text-lg text-white'>2. em relação a qualquer processo judicial em andamento ou potencial;</p>
              <p className='text-lg text-white'>3. para estabelecer, exercer ou defender nossos direitos legais (incluindo fornecer informações a terceiros para fins de prevenção de fraudes e redução do risco de crédito);</p>
              <p className='text-lg text-white'>4. ao comprador (ou comprador em potencial) de qualquer negócio ou ativo que estejamos vendendo (ou contemplando vender);</p>
              <p className='text-lg text-white'>5. e a qualquer pessoa que acreditemos razoavelmente que possa solicitar a um tribunal ou outra autoridade competente a divulgação dessas informações pessoais, quando, em nossa opinião razoável, for provável que tal tribunal ou autoridade ordene a divulgação dessas informações pessoais.</p>
              <p className='text-lg text-white'>Exceto conforme estabelecido nesta política, não forneceremos suas informações pessoais a terceiros.</p>

              <h6 className='text-2xl	text-green-go-bank'>E. RETENÇÃO DE INFORMAÇÕES PESSOAIS</h6>
              <p className='text-lg text-white'>1. Esta seção E define nossas políticas e procedimentos de retenção de dados, projetados para ajudar a garantir o cumprimento de nossas obrigações legais em relação à retenção e exclusão de informações pessoais.</p>
              <p className='text-lg text-white'>2. Exceto por sua expressa solicitação de exclusão, as informações pessoais que processamos para qualquer propósito ou propósitos deverão ser mantidas por tempo indeterminado para que possamos estabelecer, estudar e aprimorar nossa política de crédito.</p>
              <p className='text-lg text-white'>3. Não obstante as outras disposições desta seção E, reteremos documentos (incluindo documentos eletrônicos) que contenham dados pessoais:</p>
              <p className='pl-5 text-lg text-white'>1. na medida em que somos obrigados a fazê-lo por lei;</p>
              <p className='pl-5 text-lg text-white'>2. se acreditarmos que os documentos podem ser relevantes para qualquer processo judicial em andamento ou potencial; e</p>
              <p className='pl-5 text-lg text-white'>3. para estabelecer, exercer ou defender nossos direitos legais (incluindo fornecer informações a terceiros para fins de prevenção de fraudes e redução do risco de crédito).</p>

              <p className='text-2xl	text-green-go-bank'>F. SEGURANÇA DE SUAS INFORMAÇÕES PESSOAIS</p>
              <p className='text-lg text-white'>1. Tomaremos as devidas precauções técnicas e organizacionais para evitar a perda, mau uso ou alteração de suas informações pessoais.</p>
              <p className='text-lg text-white'>2. Armazenaremos todas as suas informações pessoais fornecidas em nossos servidores seguros (protegidos por senha e firewall).</p>
              <p className='text-lg text-white'>3. Todas as transações financeiras eletrônicas realizadas através do nosso site serão protegidas por tecnologia de criptografia.</p>
              <p className='text-lg text-white'>4. Você reconhece que a transmissão de informações pela internet é inerentemente insegura e que não podemos garantir a segurança dos dados enviados pela internet.</p>
              <p className='text-lg text-white'>5. Você é responsável por manter em sigilo a senha usada para acessar nosso site e aplicativo; não solicitaremos sua senha (exceto quando você fizer login em nosso site e aplicativo).</p>

              <p className='text-2xl	text-green-go-bank'>G. ALTERAÇÕES</p>
              <p className='text-lg text-white'>Podemos atualizar esta política periodicamente, através da publicação de uma nova versão em nosso site e aplicativo. Você deve verificar esta página ocasionalmente para garantir que compreende quaisquer alterações nesta política. Podemos notificá-lo sobre alterações nesta política por e-mail ou através do sistema de mensagens privadas em nosso site.</p>

              <p className='text-2xl	text-green-go-bank'>H. SEUS DIREITOS</p>
              <p className='text-lg text-white'>Você pode nos instruir a fornecer qualquer informação pessoal que detenhamos sobre você; o fornecimento dessas informações estará sujeito ao fornecimento de evidência apropriada de sua identidade por meio eletrônico ao seu endereço de e-mail cadastrado. Podemos reter as informações pessoais solicitadas na extensão permitida por lei. Você pode nos instruir a qualquer momento para não processar suas informações pessoais para fins de marketing. Na prática, você geralmente concordará expressamente com antecedência com o uso de suas informações pessoais para fins de marketing, ou ofereceremos a oportunidade de não permitir o uso de suas informações pessoais para fins de marketing.</p>

              <p className='text-2xl	text-green-go-bank'>I. SITES DE TERCEIROS</p>
              <p className='text-lg text-white'>Nosso site inclui links para e detalhes de sites de terceiros. Não temos controle sobre e não somos responsáveis pelas políticas e práticas de privacidade de terceiros.</p>

              <p className='text-2xl	text-green-go-bank'>J. ATUALIZAÇÃO DE INFORMAÇÕES</p>
              <p className='text-lg text-white'>Informe-nos se as informações pessoais que mantemos sobre você precisam ser corrigidas ou atualizadas.</p>

              <p className='text-2xl	text-green-go-bank'>K. COOKIES</p>
              <p className='text-lg text-white'>Nosso site e aplicativo usam cookies. Um cookie é um arquivo que contém um identificador (uma sequência de letras e números) que é enviado por um servidor da web para um navegador e armazenado pelo navegador. O identificador é então enviado de volta ao servidor toda vez que o navegador solicita uma página do servidor. Os cookies podem ser cookies “persistentes” ou cookies “de sessão”: um cookie persistente será armazenado por um navegador e permanecerá válido até a data de vencimento definida, a menos que seja excluído pelo usuário antes da data de vencimento; um cookie de sessão, por outro lado, expirará no final da sessão do usuário, quando o navegador for fechado. Os cookies normalmente não contêm nenhuma informação que identifique pessoalmente um usuário, mas as informações pessoais que armazenamos sobre você podem estar vinculadas às informações armazenadas e obtidas a partir de cookies.</p>
              <p className='text-lg text-white'>A maioria dos navegadores permite que você se recuse a aceitar cookies – por exemplo:</p>
              <p className='text-lg text-white'>1. no Internet Explorer (versão 10), você pode bloquear cookies usando as configurações disponíveis de cancelamento de manipulação de cookies clicando em “Ferramentas”, “Opções da Internet” “Privacidade” e “Avançado”;</p>
              <p className='text-lg text-white'>2. no Firefox (versão 24), você pode bloquear todos os cookies clicando em “Ferramentas”, “Opções”, “Privacidade”, selecionando “Usar configurações personalizadas para o histórico” no menu suspenso e desmarcando “Aceitar cookies de sites” ;</p>
              <p className='text-lg text-white'>3. e no Chrome (versão 29), você pode bloquear todos os cookies acessando o menu “Personalizar e controlar” e clicando em “Configurações”, “Avançado” e “Configurações do site” e, em seguida, selecionando “Bloquear cookies de terceiros” na seção “Cookies e dados do site”.</p>
              <p className='text-lg text-white'>O bloqueio de todos os cookies causará um impacto negativo na usabilidade de muitos sites e aplicativos. Se você bloquear os cookies, não poderá usar todos os recursos em nosso site e aplicativo. Você pode excluir os cookies que já estão armazenados no seu computador – por exemplo:</p>
              <p className='text-lg text-white'>1. no Internet Explorer (versão 10), você deve excluir os arquivos de cookies manualmente (confira instruções para fazê-lo em http://support.microsoft.com/kb/278835 );</p>
              <p className='text-lg text-white'>2. no Firefox (versão 24), você pode excluir os cookies clicando em “Ferramentas”, “Opções”, “Privacidade”, selecionando “Usar configurações personalizadas para o histórico”, clicando em “Mostrar cookies” e, então, em “Remover todos os cookies”;</p>
              <p className='text-lg text-white'>3. e no Chrome (versão 29), você pode excluir todos os cookies acessando o menu “Personalizar e controlar” e clicando em “Configurações”, “Avançado”, “Limpar dados de navegação” e, em seguida, selecionando “Excluir cookies e outros dados de sites e plugins” antes de clicar em “Limpar dados de navegação”.</p>
              <p className='text-lg text-white'>4. A exclusão de cookies causará um impacto negativo na usabilidade de muitos sites e aplicativos.</p>
            </div>
          </div>

          <div className='hidden items-center justify-center bg-gray-dark-go-bank'>
            <div className='flex w-full max-w-[1185px] flex-col gap-5 px-5 py-16'>
              <p className='text-4xl text-white'>Arquivo para dowload em PDF</p>
              <a className='flex items-center gap-5 transition-opacity hover:opacity-80'>
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
