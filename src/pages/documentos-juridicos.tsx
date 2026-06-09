import Image from 'next/image';
import downloadIcon from '../../public/svgs/download-icon.svg';
import whiteArrowDropdownMenu from '../../public/svgs/white-arrow-dropdown-menu.svg';

import Dropdown from '@/components/dropdown';

export default function DocumentosJuridicos() {
  return (
    <main className='documentos-juridicos_CTA'>
      <section>
        <div className='flex items-center justify-center bg-background bg-center'>
          <div className='flex w-full max-w-[1185px] px-5 py-28'>
            <h1 className='text-6xl	text-green-go-bank'>Documentos Jurídicos</h1>
          </div>
        </div>

        <div className='flex items-center justify-center bg-gray-dark-go-bank'>
          <div className='flex w-full max-w-[1185px] flex-col gap-9 px-5 py-16'>
            <Dropdown title='Política de Privacidade' imageSrc={whiteArrowDropdownMenu}>
              <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                <h2 className='text-3xl text-green-go-bank'>Termos de uso</h2>

                <p className='text-2xl text-white'>A. Introdução</p>
                <p className='text-lg text-white'>1. A privacidade dos visitantes do nosso site e aplicativo é muito importante para nós, e estamos comprometidos em protegê-la. Esta política explica o que faremos com suas informações pessoais.</p>
                <p className='text-lg text-white'>2. Consentir com o uso de cookies de acordo com os termos desta política quando você acessa nosso site e aplicativo pela primeira vez nos permite usar cookies toda vez que você acessa nosso site e aplicativo.</p>

                <p className='text-2xl text-white'>B. Coleta de informações pessoais</p>
                <p className='text-lg text-white'>1. Os seguintes tipos de informações pessoais podem ser coletados, armazenados e usados:</p>
                <p className='text-lg text-white'>2. informações sobre o seu computador, incluindo seu endereço IP, localização geográfica, tipo e versão do navegador e sistema operacional;</p>
                <p className='text-lg text-white'>3. informações sobre suas visitas e uso deste site e aplicativo, incluindo fonte de referência, duração da visita, visualizações de página e caminhos de navegação no site e aplicativo;</p>
                <p className='text-lg text-white'>4. informações, como seu endereço de e-mail, que você digita quando se registra em nosso site e aplicativo;</p>
                <p className='text-lg text-white'>5. informações que você digita ao criar um perfil em nosso site e aplicativo – por exemplo, seu nome, fotos de perfil, sexo, data de nascimento, status de relacionamento, informações educacionais e de emprego;</p>
                <p className='text-lg text-white'>6. informações, como seu nome e endereço de e-mail, que você digita para configurar assinaturas de nossos e-mails e/ou newsletters;</p>
                <p className='text-lg text-white'>7. informações que você digita durante o uso dos serviços em nosso site e aplicativo;</p>
                <p className='text-lg text-white'>8. informações geradas ao usar nosso site e aplicativo, incluindo quando, com que frequência e em que circunstâncias você o utiliza;</p>
                <p className='text-lg text-white'>9. informações relacionadas a tudo o que você compra, serviços que usa ou transações que realiza através do nosso site e aplicativo, incluindo nome, endereço, número de telefone, endereço de e-mail e dados do cartão de crédito;</p>
                <p className='text-lg text-white'>10. informações que você publica em nosso site e aplicativo com a intenção de publicá-las na internet, incluindo seu nome de usuário, fotos de perfil e o conteúdo de suas publicações;</p>
                <p className='text-lg text-white'>11. informações contidas em quaisquer comunicações que você nos envia por e-mail ou através de nosso site e aplicativo, incluindo o conteúdo;</p>
                <p className='text-lg text-white'>12. qualquer outra informação pessoal que você nos enviar.</p>
                <p className='text-lg text-white'>13. Antes de nos divulgar informações pessoais de outra pessoa, você deve obter o consentimento dessa pessoa para a divulgação e o processamento dessas informações pessoais de acordo com esta política.</p>

                <p className='text-2xl text-white'>C. Uso de suas informações pessoais</p>
                <p className='text-lg text-white'>As informações pessoais que nos são enviadas por meio de nosso site e aplicativo serão usadas para os fins especificados nesta política ou nas páginas relevantes do site. Podemos usar suas informações pessoais para o seguinte:</p>
                <p className='text-lg text-white'>1. atribuir-lhe um limite de crédito, taxa, prazos mínimo e máximo para operações de empréstimos de acordo com nossa política de crédito.</p>
                <p className='text-lg text-white'>2. encaminhar seus dados cadastrais informados para instituições financeiras parceiras (das quais somos correspondentes bancários), que por sua vez, irá emitir o contrato de empréstimo (Cédula de Crédito Bancário).</p>
                <p className='text-lg text-white'>3. administrar nosso site, aplicativo e nossos negócios;</p>
                <p className='text-lg text-white'>4. personalizar nosso site e aplicativo para você;</p>
                <p className='text-lg text-white'>5. possibilitar o uso dos serviços disponíveis em nosso site e aplicativo;</p>
                <p className='text-lg text-white'>6. enviar produtos adquiridos através do nosso site e aplicativo;</p>
                <p className='text-lg text-white'></p>
              </div>
            </Dropdown>

            <Dropdown title='LGPD' imageSrc={whiteArrowDropdownMenu}>
              <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                <h2 className='text-3xl text-green-go-bank'>Termos de uso</h2>

                <p className='text-2xl text-white'>A. Introdução</p>
                <p className='text-lg text-white'>1. A privacidade dos visitantes do nosso site e aplicativo é muito importante para nós, e estamos comprometidos em protegê-la. Esta política explica o que faremos com suas informações pessoais.</p>
                <p className='text-lg text-white'>2. Consentir com o uso de cookies de acordo com os termos desta política quando você acessa nosso site e aplicativo pela primeira vez nos permite usar cookies toda vez que você acessa nosso site e aplicativo.</p>

                <p className='text-2xl text-white'>B. Coleta de informações pessoais</p>
                <p className='text-lg text-white'>1. Os seguintes tipos de informações pessoais podem ser coletados, armazenados e usados:</p>
                <p className='text-lg text-white'>2. informações sobre o seu computador, incluindo seu endereço IP, localização geográfica, tipo e versão do navegador e sistema operacional;</p>
                <p className='text-lg text-white'>3. informações sobre suas visitas e uso deste site e aplicativo, incluindo fonte de referência, duração da visita, visualizações de página e caminhos de navegação no site e aplicativo;</p>
                <p className='text-lg text-white'>4. informações, como seu endereço de e-mail, que você digita quando se registra em nosso site e aplicativo;</p>
                <p className='text-lg text-white'>5. informações que você digita ao criar um perfil em nosso site e aplicativo – por exemplo, seu nome, fotos de perfil, sexo, data de nascimento, status de relacionamento, informações educacionais e de emprego;</p>
                <p className='text-lg text-white'>6. informações, como seu nome e endereço de e-mail, que você digita para configurar assinaturas de nossos e-mails e/ou newsletters;</p>
                <p className='text-lg text-white'>7. informações que você digita durante o uso dos serviços em nosso site e aplicativo;</p>
                <p className='text-lg text-white'>8. informações geradas ao usar nosso site e aplicativo, incluindo quando, com que frequência e em que circunstâncias você o utiliza;</p>
                <p className='text-lg text-white'>9. informações relacionadas a tudo o que você compra, serviços que usa ou transações que realiza através do nosso site e aplicativo, incluindo nome, endereço, número de telefone, endereço de e-mail e dados do cartão de crédito;</p>
                <p className='text-lg text-white'>10. informações que você publica em nosso site e aplicativo com a intenção de publicá-las na internet, incluindo seu nome de usuário, fotos de perfil e o conteúdo de suas publicações;</p>
                <p className='text-lg text-white'>11. informações contidas em quaisquer comunicações que você nos envia por e-mail ou através de nosso site e aplicativo, incluindo o conteúdo;</p>
                <p className='text-lg text-white'>12. qualquer outra informação pessoal que você nos enviar.</p>
                <p className='text-lg text-white'>13. Antes de nos divulgar informações pessoais de outra pessoa, você deve obter o consentimento dessa pessoa para a divulgação e o processamento dessas informações pessoais de acordo com esta política.</p>

                <p className='text-2xl text-white'>C. Uso de suas informações pessoais</p>
                <p className='text-lg text-white'>As informações pessoais que nos são enviadas por meio de nosso site e aplicativo serão usadas para os fins especificados nesta política ou nas páginas relevantes do site. Podemos usar suas informações pessoais para o seguinte:</p>
                <p className='text-lg text-white'>1. atribuir-lhe um limite de crédito, taxa, prazos mínimo e máximo para operações de empréstimos de acordo com nossa política de crédito.</p>
                <p className='text-lg text-white'>2. encaminhar seus dados cadastrais informados para instituições financeiras parceiras (das quais somos correspondentes bancários), que por sua vez, irá emitir o contrato de empréstimo (Cédula de Crédito Bancário).</p>
                <p className='text-lg text-white'>3. administrar nosso site, aplicativo e nossos negócios;</p>
                <p className='text-lg text-white'>4. personalizar nosso site e aplicativo para você;</p>
                <p className='text-lg text-white'>5. possibilitar o uso dos serviços disponíveis em nosso site e aplicativo;</p>
                <p className='text-lg text-white'>6. enviar produtos adquiridos através do nosso site e aplicativo;</p>
                <p className='text-lg text-white'></p>
              </div>
            </Dropdown>

            <Dropdown title='Apólices de seguros' imageSrc={whiteArrowDropdownMenu}>
              <div className='scrollbar flex h-[500px] flex-col gap-5 overflow-auto pr-20'>
                <h2 className='text-3xl text-green-go-bank'>Termos de uso</h2>

                <p className='text-2xl text-white'>A. Introdução</p>
                <p className='text-lg text-white'>1. A privacidade dos visitantes do nosso site e aplicativo é muito importante para nós, e estamos comprometidos em protegê-la. Esta política explica o que faremos com suas informações pessoais.</p>
                <p className='text-lg text-white'>2. Consentir com o uso de cookies de acordo com os termos desta política quando você acessa nosso site e aplicativo pela primeira vez nos permite usar cookies toda vez que você acessa nosso site e aplicativo.</p>

                <p className='text-2xl text-white'>B. Coleta de informações pessoais</p>
                <p className='text-lg text-white'>1. Os seguintes tipos de informações pessoais podem ser coletados, armazenados e usados:</p>
                <p className='text-lg text-white'>2. informações sobre o seu computador, incluindo seu endereço IP, localização geográfica, tipo e versão do navegador e sistema operacional;</p>
                <p className='text-lg text-white'>3. informações sobre suas visitas e uso deste site e aplicativo, incluindo fonte de referência, duração da visita, visualizações de página e caminhos de navegação no site e aplicativo;</p>
                <p className='text-lg text-white'>4. informações, como seu endereço de e-mail, que você digita quando se registra em nosso site e aplicativo;</p>
                <p className='text-lg text-white'>5. informações que você digita ao criar um perfil em nosso site e aplicativo – por exemplo, seu nome, fotos de perfil, sexo, data de nascimento, status de relacionamento, informações educacionais e de emprego;</p>
                <p className='text-lg text-white'>6. informações, como seu nome e endereço de e-mail, que você digita para configurar assinaturas de nossos e-mails e/ou newsletters;</p>
                <p className='text-lg text-white'>7. informações que você digita durante o uso dos serviços em nosso site e aplicativo;</p>
                <p className='text-lg text-white'>8. informações geradas ao usar nosso site e aplicativo, incluindo quando, com que frequência e em que circunstâncias você o utiliza;</p>
                <p className='text-lg text-white'>9. informações relacionadas a tudo o que você compra, serviços que usa ou transações que realiza através do nosso site e aplicativo, incluindo nome, endereço, número de telefone, endereço de e-mail e dados do cartão de crédito;</p>
                <p className='text-lg text-white'>10. informações que você publica em nosso site e aplicativo com a intenção de publicá-las na internet, incluindo seu nome de usuário, fotos de perfil e o conteúdo de suas publicações;</p>
                <p className='text-lg text-white'>11. informações contidas em quaisquer comunicações que você nos envia por e-mail ou através de nosso site e aplicativo, incluindo o conteúdo;</p>
                <p className='text-lg text-white'>12. qualquer outra informação pessoal que você nos enviar.</p>
                <p className='text-lg text-white'>13. Antes de nos divulgar informações pessoais de outra pessoa, você deve obter o consentimento dessa pessoa para a divulgação e o processamento dessas informações pessoais de acordo com esta política.</p>

                <p className='text-2xl text-white'>C. Uso de suas informações pessoais</p>
                <p className='text-lg text-white'>As informações pessoais que nos são enviadas por meio de nosso site e aplicativo serão usadas para os fins especificados nesta política ou nas páginas relevantes do site. Podemos usar suas informações pessoais para o seguinte:</p>
                <p className='text-lg text-white'>1. atribuir-lhe um limite de crédito, taxa, prazos mínimo e máximo para operações de empréstimos de acordo com nossa política de crédito.</p>
                <p className='text-lg text-white'>2. encaminhar seus dados cadastrais informados para instituições financeiras parceiras (das quais somos correspondentes bancários), que por sua vez, irá emitir o contrato de empréstimo (Cédula de Crédito Bancário).</p>
                <p className='text-lg text-white'>3. administrar nosso site, aplicativo e nossos negócios;</p>
                <p className='text-lg text-white'>4. personalizar nosso site e aplicativo para você;</p>
                <p className='text-lg text-white'>5. possibilitar o uso dos serviços disponíveis em nosso site e aplicativo;</p>
                <p className='text-lg text-white'>6. enviar produtos adquiridos através do nosso site e aplicativo;</p>
                <p className='text-lg text-white'></p>
              </div>
            </Dropdown>
          </div>
        </div>

        <div className='flex items-center justify-center bg-gray-dark-go-bank'>
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
  );
}
