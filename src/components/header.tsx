import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { FaRegCircleXmark } from 'react-icons/fa6';

import close from '../../public/svgs/close.svg';
import headerLogo from '../../public/images/logo-gocapital-branco.png';
import magnifyingGlass from '../../public/svgs/magnifying-glass.svg';
import menu from '../../public/svgs/menu.svg';

import facebookMenu from '../../public/svgs/facebook-menu.svg';
import instagramMenu from '../../public/svgs/instagram-menu.svg';
import linkedinMenu from '../../public/svgs/linkedin-menu.svg';

import dowloadOnTheAppStore from '../../public/images/dowload-on-the-app-store.webp';
import getItOnGooglePlay from '../../public/images/get-it-on-google-play.webp';
import attention from '../../public/svgs/attention.svg';
import buttonGreenArrow from '../../public/svgs/button-green-arrow.svg';
import buttonWhiteArrow from '../../public/svgs/button-white-arrow.svg';
import mostSearchedTopics from '../../public/svgs/most-searched-topics.svg';
import star from '../../public/svgs/star.svg';
import xSearch from '../../public/svgs/x-search.svg';

interface TPost {
  _embedded: any;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  id: string;
  date: string;
}

interface IBlog {
  posts: TPost[];
}

type TPage = {
  path: string;
  title: string;
  description: string;
};

const pagesData = [
  {
    path: '/credito-descomplicado',
    title: 'Crédito Descomplicado',
    description: 'Conheça as linhas de crédito descomplicado na GoCapital para PJ. Pensadas para empresas, temos opções de crédito com taxas à partir de 1,5%. Consulte a disponibilidade para o seu CNPJ.',
  },
  {
    path: '/financiamentos',
    title: 'Financiamentos',
    description: 'Conheça as opções de financiamentos, refinanciamentos e crédito para aquisição de veículos e maquinários na GoCapital. Soluções customizadas para empresas em crescimento.',
  },
  {
    path: '/maquininhas-gopay',
    title: 'Maquininhas Go.Pag',
    description: 'Descubra as maquininhas Go.Pag exclusivas para PJ. Soluções de pagamento simples para impulsionar seu negócio. Adquira já e simplifique suas transações.',
  },
  {
    path: '/central-de-ajuda',
    title: 'Central De Ajuda',
    description: 'Encontre a resposta para as principais dúvidas e faça sua pergunta na Central de Ajuda GoCapital. TObtenha assistência precisa para suas necessidades financeiras.',
  },
  {
    path: '/condicoes-gerais-de-seguros',
    title: 'Condições Gerais de Seguros',
    description: 'Conheça as condições gerais de seguros para PJ na GoCapital. Proteja sua empresa com soluções personalizadas. Saiba mais e garanta a sua tranquilidade.',
  },
  {
    path: '/converse-com-o-gocapital',
    title: 'Converse com a GoCapital',
    description: 'Tire suas dúvidas e obtenha suporte personalizado e humanizado. Converse com a GoCapital para soluções financeiras feitas sob medida para você. Estamos aqui para ajudar!',
  },
  {
    path: '/documentos-juridicos',
    title: 'Documentos Jurídicos',
    description: '',
  },
  {
    path: '/politica-de-privacidade',
    title: 'Política de Privacidade',
    description: 'Leia nossa Política de Privacidade GoCapital. Comprometidos em proteger suas informações financeiras. Descubra como cuidamos da sua privacidade',
  },
  {
    path: '/seguros-e-consorcios',
    title: 'Seguros e Consorcios',
    description: 'Leia nossa Política de Privacidade GoCapital. Comprometidos em proteger suas informações financeiras. Descubra como cuidamos da sua privacidade',
  },
  {
    path: '/seja-um-parceiro',
    title: 'Seja um Parceiro',
    description: 'Conheça todas as vantagens de ser um parceiro da GoCapital! Aumente seu portfólio, faça com que o cliente tenha maior poder de compra e impulsione a sua receita.',
  },
  {
    path: '/sobre-o-gocapital',
    title: 'Sobre a GoCapital',
    description: 'Somos uma instituição financeira digital completa fundada em 2011 e pensando para oferecer as melhores soluções financeiras com condições pensadas para empresas e profissionais PJ.',
  },
  {
    path: '/termos-de-uso',
    title: 'Termos de Uso',
    description: 'Conheça os Termos de Uso GoCapital. Garantimos transparência e segurança em nossos serviços financeiros. Leia agora e contrate nossos produtos e soluções.',
  },
  {
    path: '/trabalhe-conosco',
    title: 'Trabalhe Conosco',
    description: 'Já pensou em fazer parte do movimento que está desburocratizando os produtos e serviços financeiros? Então vem ser GoCapital! Envie seu currículo e trabalhe conosco.',
  },
];

// Hook Posts
const usePosts = (searchQuery: any) => {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=2`;
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: 'Ocorreu um erro desconhecido' });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery]);

  return { posts, loading, error };
};

const defaultSuggestionPages = pagesData.slice(0, 3);

// Use Mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 991);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
};

export default function Header() {
  const [modalAberto, setModalAberto] = useState(false);
  const [menuState, setMenuState] = useState('menuClosed');
  const [searchState, setSearchState] = useState('searchClosed');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState<TPage[]>(defaultSuggestionPages);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { posts, loading, error } = usePosts(searchQuery);

  const isMobile = useIsMobile();

  useEffect(() => {
    setIsPageLoading(false);
  }, [posts, filteredPages]);

  useEffect(() => {
    const modalFechado = localStorage.getItem('modalFechado');
    if (!modalFechado) {
      setModalAberto(true);
    }
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = searchQuery;
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchState === 'searchClosed') {
      setFilteredPages(defaultSuggestionPages.slice(0, isMobile ? 3 : 3));
    }
  }, [searchState, isMobile]);

  useEffect(() => {
    const matchedPages = searchQuery ? pagesData.filter((page) => page.title.toLowerCase().includes(searchQuery.toLowerCase()) || page.description.toLowerCase().includes(searchQuery.toLowerCase())) : defaultSuggestionPages;

    setFilteredPages(matchedPages.slice(0, isMobile ? 3 : 3));
  }, [searchQuery, isMobile, defaultSuggestionPages]);

  const fecharModal = () => {
    localStorage.setItem('modalFechado', 'true');
    setModalAberto(false);
  };

  function toggleMenu() {
    setMenuState((currentState) => {
      if (currentState === 'menuClosed') {
        setSearchState('searchClosed');
        return 'menuOpen';
      } else {
        return 'menuClosed';
      }
    });
  }

  function closeMenu() {
    setMenuState('menuClosed');
  }

  function toggleSearch() {
    setSearchState((currentState) => {
      if (currentState === 'searchClosed') {
        setMenuState('menuClosed');
        return 'searchOpen';
      } else {
        return 'searchClosed';
      }
    });
  }

  function closeSearch() {
    setSearchState('searchClosed');
    setSearchQuery('');
    setMenuState('menuClosed');
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  }

  const handleSearchChange = (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredPages(defaultSuggestionPages);
    } else {
      const matchedPages = pagesData.filter((page) => page.title.toLowerCase().includes(query.toLowerCase()) || page.description.toLowerCase().includes(query.toLowerCase()));
      setFilteredPages(matchedPages.slice(0, isMobile ? 3 : 3));
    }
  };

  function handleTopicClick(topic: string) {
    if (searchInputRef.current) {
      searchInputRef.current.value = topic;
    }
    setSearchQuery(topic);

    const matchedPages = pagesData.filter((page) => page.title.toLowerCase().includes(topic.toLowerCase()) || page.description.toLowerCase().includes(topic.toLowerCase()));
    setFilteredPages(matchedPages.slice(0, isMobile ? 3 : 3));
  }

  return (
    <>
      <div className='flex h-[127px] w-full bg-black' />
      <header className={`fixed left-0 right-0 top-0 z-[100000000] flex flex-col items-center border-t-2 border-green-go-bank bg-black/80 backdrop-blur-lg ${searchState === 'searchOpen' && 'h-full'} ${menuState === 'menuOpen' && 'h-full'}`}>
        <div className='flex w-full max-w-[1185px] flex-row justify-between  gap-5 px-5 py-5 lg:gap-14 lg:py-8 '>
          <div className={`jusitfy-between flex flex-row items-center gap-5 lg:items-start lg:gap-14 ${searchState !== 'searchOpen' ? 'lg:w-[400px]' : 'w-full'}`}>
            <button onClick={toggleMenu} className='topo_menu flex cursor-pointer items-center justify-center gap-4 transition-opacity hover:opacity-80 lg:pb-5'>
              {menuState === 'menuOpen' ? <Image src={close} alt='Icone do menu' /> : <Image src={menu} alt='Icone do menu' className='topo_menu' />}
              <span className='hidden text-lg font-medium text-green-go-bank lg:flex topo_menu'>Menu</span>
            </button>
            {menuState !== 'menuOpen' && (
              <>
                {searchState !== 'searchOpen' ? (
                  <button onClick={toggleSearch} className='topo_busca flex h-[50px] cursor-pointer items-center justify-center gap-8 border-white transition-opacity hover:opacity-80 lg:border-b-1 lg:pb-5'>
                    <span className='hidden text-lg font-medium text-white lg:flex topo_busca'>Busca</span>
                    <Image src={magnifyingGlass} alt='Icone de uma Lupa' className='topo_busca' />
                  </button>
                ) : (
                  <div className='group flex w-full items-center justify-between border-b-1 border-white pb-5 '>
                    <input
                      onChange={handleSearchChange}
                      value={searchQuery}
                      placeholder='O que você procura hoje?'
                      className='w-full bg-transparent text-sm text-white outline-0 placeholder:text-white focus:border-green-go-bank	focus:text-green-go-bank lg:text-lg topo_busca'
                    />
                    <button className='h-[26px] w-full max-w-[26px] topo_busca' onClick={closeSearch}>
                      <Image src={xSearch} alt='' />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <Link className='topo_logo flex items-center justify-center' href='/'>
            <Image className={`topo_logo max-w-[100px] lg:max-w-[180px] ${searchState === 'searchOpen' && 'hidden lg:flex'}`} src={headerLogo} alt='Logo da GoCapital' />
          </Link>
          {searchState !== 'searchOpen' && (
            <div className='flex flex-col items-end gap-2 lg:h-[63px] lg:w-[400px] lg:flex-row lg:gap-6'>
              <a href='https://portal.gobank.net.br/' target='_blank' className='topo_acesse_gopay flex w-full items-center justify-center rounded-bl-30 rounded-br-30 rounded-tl-30 rounded-tr-15 border-1 border-turquoise-go-bank bg-turquoise-go-bank p-1 text-lg font-light text-white transition-colors hover:border-turquoise-go-bank hover:bg-turquoise-go-bank hover:text-white lg:h-[63px] lg:w-[179px] lg:border-green-go-bank lg:bg-transparent lg:p-0 lg:font-medium lg:text-green-go-bank'>
                <span className='hidden lg:flex topo_acesse_gopay text-base'>Acesse Go.Pag</span>
                <span className='flex lg:hidden topo_acesse_gopay text-base'>Go.Pag</span>
              </a>
              <Link href='https://web-gobank.pagme.app/' target='_blank' className='topo_acesse_conta flex w-full items-center justify-center rounded-bl-30 rounded-br-30 rounded-tl-15 rounded-tr-30 border-1 border-lavender-go-bank bg-lavender-go-bank px-3 py-1 text-lg font-light text-white transition-colors hover:border-lavender-go-bank hover:bg-lavender-go-bank hover:text-white lg:h-[63px] lg:w-[196px] lg:border-green-go-bank lg:bg-transparent lg:p-0 lg:font-medium lg:text-green-go-bank'>
                <span className='hidden lg:flex topo_acesse_conta text-base'>Acesse sua conta Pagme</span>
                <span className='flex lg:hidden topo_acesse_conta text-base'>Conta Pagme</span>
              </Link>
            </div>
          )}
        </div>
        {menuState === 'menuOpen' && (
          <div className='flex h-full w-full max-w-[1185px] flex-col justify-between gap-5 overflow-x-scroll px-5 pb-56 lg:overflow-x-visible'>
            <div className='flex w-full gap-5 lg:gap-20 lg:border-t-1 lg:border-white lg:pt-16'>
              <div className='flex flex-col gap-6'>
                <p className='text-lg font-light text-white	lg:text-2xl'>Soluções Financeiras</p>
                <ul className='flex flex-col gap-2.5 lg:gap-4'>
                  <li>
                    <Link onClick={closeMenu} className='header_produtos_abra_sua_conta text-xs	font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/abra-sua-conta'>
                      <p className='header_produtos_abra_sua_conta'>Abra sua Conta</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className=' text-xs	font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/credito-descomplicado'>
                      <p className='header_produtos_credito_simule'>Crédito Descomplicado</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className=' text-xs font-light	text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/maquininhas-go-pag'>
                      <p className='header_maquininhas'>Maquininha Go.Pag</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className=' text-xs font-light	text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/seguros-e-consorcios'>
                      <p className='header_seguros_e_consorcios'>Seguros e Consórcios</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className=' text-xs font-light	text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/condicoes-gerais-de-seguros'>
                      <p className='header_condicoes_gerais_de_seguro'>Condições Gerais de Seguro</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className='header_financiamentos text-xs	font-light text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/financiamentos'>
                      <p className='header_financiamentos'>Financiamentos</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className='header_seja_um_parceiro text-xs font-light	text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/seja-um-parceiro'>
                      <p className='header_seja_um_parceiro'>Seja um Parceiro</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='flex flex-col gap-6'>
                <p className='text-lg font-light text-white	lg:text-2xl'>Central de Relacionamento</p>
                <ul className='flex flex-col gap-2.5 lg:gap-4'>
                  <li>
                    <Link onClick={closeMenu} className='header_converse_com_o_gobank text-xs font-light	text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/converse-com-o-gocapital'>
                      <p className='header_converse_com_o_gobank'>Converse com a GoCapital</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className='header_central_de_ajuda text-xs font-light	text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/central-de-ajuda'>
                      <p className='header_central_de_ajuda'>Central de Ajuda</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className='header_trabalhe_conosco text-xs font-light	text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/trabalhe-conosco'>
                      <p className='header_trabalhe_conosco'>Trabalhe Conosco</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className='header_termo_de_uso text-xs font-light	text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/termos-de-uso'>
                      <p className='header_termo_de_uso'>Termo de Uso</p>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={closeMenu} className='header_politica_de_privacidade text-xs font-light	text-grayish-white-go-bank transition-opacity hover:opacity-80 lg:text-lg' href='/politica-de-privacidade'>
                      <p className='header_politica_de_privacidade'>Política de Privacidade</p>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className='hidden flex-col gap-5 lg:flex'>
                <a href='https://portal.gobank.net.br/' onClick={closeMenu} target='_blank' className='header_gopay group flex items-center gap-4 transition-opacity hover:opacity-80'>
                  <p className='text-lg font-light text-white	lg:text-2xl header_gopay'>Go Pag</p>
                  <Image className='transition-transform group-hover:rotate-45 header_gopay' src={buttonWhiteArrow} alt='Icone de uma seta' />
                </a>

                <Link href='/blog' onClick={closeMenu} className='header_conteudo group flex items-center gap-4 transition-opacity hover:opacity-80'>
                  <p className='text-lg font-light text-white	lg:text-2xl header_conteudo'>Conteúdo</p>
                  <Image className='transition-transform group-hover:rotate-45 header_conteudo' src={buttonWhiteArrow} alt='Icone de uma seta' />
                </Link>

                <Link href='/sobre-o-gocapital' onClick={closeMenu} className='header_sobre_o_gobank group flex items-center gap-4 transition-opacity hover:opacity-80'>
                  <p className='text-lg font-light text-white	lg:text-2xl header_sobre_o_gobank'>Sobre a GoCapital</p>
                  <Image className='transition-transform group-hover:rotate-45 header_sobre_o_gobank' src={buttonWhiteArrow} alt='Icone de uma seta' />
                </Link>

                <div className='flex flex-col gap-5'>
                  <p className='text-lg font-light text-white	lg:text-2xl'>Baixe o App</p>
                  <div className='flex gap-4'>
                    <a href='https://apps.apple.com/br/app/go-bank/id1565213260' target='_blank' className='header_apple transition-opacity hover:opacity-80'>
                      <Image width={214} src={dowloadOnTheAppStore} alt='Imagem de um botão da App Store' className='header_apple' />
                    </a>
                    <a href='https://play.google.com/store/apps/details?id=br.com.fourbank.gobank' target='_blank' className='header_google transition-opacity hover:opacity-80'>
                      <Image width={214} src={getItOnGooglePlay} alt='Imagem de um botão do Google Play' className='header_google' />
                    </a>
                  </div>
                </div>

                <div className='flex flex-col gap-5'>
                  <p className='text-lg font-light text-white	lg:text-2xl'>Siga-nos nas Redes Sociais</p>
                  <div className='flex gap-2.5'>
                    <a href='https://www.instagram.com/gobank.br/' target='_blank'>
                      <Image src={instagramMenu} alt='' />
                    </a>
                    <a href='https://www.facebook.com/gobank.br' target='_blank'>
                      <Image src={facebookMenu} alt='' />
                    </a>
                    <a href='https://br.linkedin.com/company/go-bank' target='_blank'>
                      <Image src={linkedinMenu} alt='' />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-5 lg:hidden'>
              <a href='https://portal.gobank.net.br/' onClick={closeMenu} target='_blank' className='group flex items-center gap-4 transition-opacity hover:opacity-80'>
                <p className='text-lg font-light text-white	lg:text-2xl'>Go Pag</p>
                <Image className='transition-transform group-hover:rotate-45' src={buttonWhiteArrow} alt='Icone de uma seta' />
              </a>

              <Link href='/blog' onClick={closeMenu} className='group flex items-center gap-4 transition-opacity hover:opacity-80'>
                <p className='text-lg font-light text-white	lg:text-2xl'>Conteúdo</p>
                <Image className='transition-transform group-hover:rotate-45' src={buttonWhiteArrow} alt='Icone de uma seta' />
              </Link>

              <Link href='/sobre-o-gocapital' onClick={closeMenu} className='group flex items-center gap-4 transition-opacity hover:opacity-80'>
                <p className='text-lg font-light text-white	lg:text-2xl'>Sobre a GoCapital</p>
                <Image className='transition-transform group-hover:rotate-45' src={buttonWhiteArrow} alt='Icone de uma seta' />
              </Link>

              <div className='flex flex-col gap-5'>
                <p className='text-lg font-light text-white	lg:text-2xl'>Baixe o App</p>
                <div className='flex gap-4'>
                  <a href='https://apps.apple.com/br/app/go-bank/id1565213260' target='_blank' className='cta_produtos_apple transition-opacity hover:opacity-80'>
                    <Image width={214} src={dowloadOnTheAppStore} alt='Imagem de um botão da App Store' />
                  </a>
                  <a href='https://play.google.com/store/apps/details?id=br.com.fourbank.gobank' target='_blank' className='cta_produtos_google transition-opacity hover:opacity-80'>
                    <Image width={214} src={getItOnGooglePlay} alt='Imagem de um botão do Google Play' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {searchState === 'searchOpen' && (
          <div className='flex h-full w-full max-w-[1185px] flex-col gap-5 overflow-x-scroll px-5 pt-5 lg:overflow-x-visible'>
            <div>
              {/*Estatico*/}
              {searchQuery === '' && (
                <div>
                  {/*Sugestoes para voce*/}
                  <div className='flex flex-col gap-6'>
                    <div className='flex gap-4'>
                      <Image src={star} alt='' />
                      <p className='text-xl text-green-go-bank'>Sugestões para você</p>
                    </div>
                    <div className='flex flex-col justify-between gap-5 lg:flex-row'>
                      {filteredPages.map((page, index) => (
                        <Link key={index} className='text-xl text-white transition-all hover:opacity-80' href={page.path}>
                          <div className='flex justify-between'>
                            <p className='text-base font-light lg:text-xl'>{page.title}</p>
                            <Image src={buttonWhiteArrow} alt='' />
                          </div>
                          <p className='text-xs font-light lg:text-base'>{page.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/*Encontramos os seguintes resultados para a sua busca*/}
              {searchQuery && filteredPages.length > 0 && (
                <div className='flex flex-col gap-6'>
                  <div className='flex gap-4'>
                    <p className='text-xl text-green-go-bank'>Encontramos os seguintes resultados para a sua busca</p>
                  </div>
                  <div className='flex flex-col justify-between gap-5 lg:flex-row'>
                    {filteredPages.map((page) => (
                      <Link onClick={closeSearch} key={page.path} className='text-xl text-white transition-all hover:opacity-80' href={page.path}>
                        <div className='flex justify-between'>
                          <p className='text-base	font-light lg:text-xl'>{page.title}</p>
                          <Image src={buttonWhiteArrow} alt='' />
                        </div>
                        <p className='text-xs font-light lg:text-base'>{page.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/*Blog*/}
              {!loading && posts.length > 0 && (
                <div className={`mb-5 flex flex-col gap-6 pt-5 ${filteredPages.length === 0 ? 'lg:mb-5 lg:pt-5' : 'lg:mb-16 lg:pt-16'}`}>
                  <div className='flex w-full items-center gap-4'>
                    <Image src={mostSearchedTopics} alt='' />
                    <p className='text-xl text-green-go-bank'>Blog</p>
                    <hr className='w-full bg-green-go-bank opacity-50' />
                    <Link onClick={closeSearch} href='/blog' className='whitespace-nowrap text-base text-green-go-bank transition-all hover:opacity-80 lg:text-lg'>
                      Ver tudo
                    </Link>
                  </div>
                  <div className='flex flex-col justify-between gap-5 lg:flex-row'>
                    {!loading &&
                      posts.map((post) => (
                        <div key={post.id} className='flex gap-8 text-xl text-white lg:w-[50%]'>
                          <div className='h-[75px] w-full max-w-[75px] overflow-hidden rounded-bl-20 rounded-br-20 rounded-tl-20 lg:h-[125px] lg:max-w-[125px]'>
                            <Image width={1125} height={1125} src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.title.rendered} className='h-full w-full object-cover' />
                          </div>
                          <div className='flex flex-col justify-between'>
                            <p className='text-xs font-light lg:text-xl'>{post.title.rendered}</p>
                            <Link className='group flex gap-3.5' href={post.slug}>
                              <p className='text-xs text-green-go-bank lg:text-xl'>Saiba mais</p>
                              <Image className='w-[15px] transition-all group-hover:rotate-45 lg:w-auto' src={buttonGreenArrow} alt='' />
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {searchQuery && filteredPages.length === 0 && posts.length === 0 && !loading && (
                <div className='text-2xl text-white'>
                  <p>Nenhum resultado encontrado para sua busca.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      {modalAberto && (
        <section className='fixed bottom-0 left-0 right-0 z-[100000000] flex  items-center justify-center border-[1px] border-black-go-bank bg-white lg:left-auto lg:top-auto lg:max-w-[25%] lg:rounded-tl-30'>
          <div className='absolute right-0 top-0 m-2 cursor-pointer' onClick={fecharModal}>
            <FaRegCircleXmark />
          </div>
          <div className='flex w-full max-w-[1185px] justify-center p-5'>
            <div className='flex flex-col gap-5 lg:flex-row'>
              <Image src={attention} alt='' />
              <div className='flex flex-col gap-1.5'>
                <h1 className='text-lg text-black-go-bank'>Atenção</h1>
                <p className='max-w-[720px] text-sm text-black-go-bank'>Não pedimos pagamento antecipado para aprovação de empréstimos. Caso receba algum contato dessa natureza, recuse e por favor nos comunique em um dos canais acima.</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
