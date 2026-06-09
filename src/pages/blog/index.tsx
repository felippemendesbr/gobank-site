import { CSSProperties, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import blogCardArrow from '../../../public/svgs/blog-card-arrow.svg';

import whiteArrowDropdownMenu from '../../../public/svgs/white-arrow-dropdown-menu.svg';
import blackArrowDropdownMenu from '../../../public/svgs/black-arrow-dropdown-menu.svg';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';

import { filterPostsWithFeaturedMedia } from '@/lib/wordpress';

const animation = { duration: 150000, easing: (t: number) => t };
const animationCategorias = { duration: 20000, easing: (t: number) => t };

export interface TPost {
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

export interface IBlog {
  posts: TPost[];
  postsDicasDeGestao: TPost[];
  postsNoticias: TPost[];
  postsSolucoesPareaeEmpreendedores: TPost[];
  postsFinancasParaNegocios: TPost[];
  postsTecnologia: TPost[];
  postsInvestimentos: TPost[];
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const postsFetch = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=100`);
  const postsArr = await postsFetch.json();
  const posts = filterPostsWithFeaturedMedia<TPost>(postsArr);

  const postsFetchDicasDeGestao = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=100&categories=4`);
  const postsArrDicasDeGestao = await postsFetchDicasDeGestao.json();
  const postsDicasDeGestao = filterPostsWithFeaturedMedia<TPost>(postsArrDicasDeGestao);

  const postsFetchNoticias = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=100&categories=5`);
  const postsArrNoticias = await postsFetchNoticias.json();
  const postsNoticias = filterPostsWithFeaturedMedia<TPost>(postsArrNoticias);

  const postsFetchSolucoesPareaeEmpreendedores = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=100&categories=6`);
  const postsArrSolucoesPareaeEmpreendedores = await postsFetchSolucoesPareaeEmpreendedores.json();
  const postsSolucoesPareaeEmpreendedores = filterPostsWithFeaturedMedia<TPost>(postsArrSolucoesPareaeEmpreendedores);

  const postsFetchFinancasParaNegocios = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=100&categories=7`);
  const postsArrFinancasParaNegocios = await postsFetchFinancasParaNegocios.json();
  const postsFinancasParaNegocios = filterPostsWithFeaturedMedia<TPost>(postsArrFinancasParaNegocios);

  const postsFetchTecnologia = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=100&categories=8`);
  const postsArrTecnologia = await postsFetchTecnologia.json();
  const postsTecnologia = filterPostsWithFeaturedMedia<TPost>(postsArrTecnologia);

  const postsFetchInvestimentos = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=100&categories=3`);
  const postsArrInvestimentos = await postsFetchInvestimentos.json();
  const postsInvestimentos = filterPostsWithFeaturedMedia<TPost>(postsArrInvestimentos);

  return {
    props: {
      posts,
      postsDicasDeGestao,
      postsNoticias,
      postsSolucoesPareaeEmpreendedores,
      postsFinancasParaNegocios,
      postsTecnologia,
      postsInvestimentos,
    },
    revalidate: 86400,
  };
};

export default function Blog({ posts, postsDicasDeGestao, postsNoticias, postsSolucoesPareaeEmpreendedores, postsFinancasParaNegocios, postsTecnologia, postsInvestimentos }: IBlog) {
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    drag: true,
    slides: { perView: 1, spacing: 20 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(s) {
      s.moveToIdx(2, true, animation);
      setLoaded(true);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  const [currentSlideCategorias, setCurrentSlideCategorias] = useState(0);
  const [loadedCategorias, setLoadedCategorias] = useState(false);
  const [sliderRefCategorias, instanceRefCategorias] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: true,
    slides: { perView: 6, spacing: 30 },
    slideChanged(slider) {
      setCurrentSlideCategorias(slider.track.details.rel);
    },
    created(s) {
      s.moveToIdx(5, true, animationCategorias);
      setLoadedCategorias(true);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animationCategorias);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animationCategorias);
    },
  });

  return (
    <>
      <Head>
        <title>Blog GoCapital - Conteúdo Financeiro Criado Especialmente para PJ</title>
        <meta name='description' content='Aqui no blog da GoCapital você encontra conteúdos criados especialmente para empresas e profissionais PJ. Confira nossas últimas atualizações!' />
        <meta name='keywords' content='Blog gobank' />
        <link rel='canonical' content='https://www.gobank.com.br/blog' />
        <meta property='og:title' content='Blog GoCapital - Conteúdo Financeiro Criado Especialmente para PJ' />
        <meta property='og:description' content='Aqui no blog da GoCapital você encontra conteúdos criados especialmente para empresas e profissionais PJ. Confira nossas últimas atualizações!' />
        {/*<meta property="og:image" content=""/>*/}
        <meta property='og:url' content='https://www.gobank.com.br/blog' />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Blog GoCapital - Conteúdo Financeiro Criado Especialmente para PJ' />
        <meta name='twitter:description' content='Aqui no blog da GoCapital você encontra conteúdos criados especialmente para empresas e profissionais PJ. Confira nossas últimas atualizações!' />
        {/*<meta name="twitter:image" content=""/>*/}
      </Head>

      <main className='blot_CTA'>
        <section className='flex flex-col items-center justify-center  overflow-hidden pb-32'>
          <div style={bgTransformStyle}></div>

          <div className='flex w-full max-w-[1185px] flex-col gap-5 px-5 py-5 lg:mb-16 lg:pt-32'>
            <div className='flex flex-col gap-5'>
              <h1 className='text-6xl font-light text-green-go-bank'>Conteúdos</h1>
              <p className='text-2xl text-white'>Aqui estão os conteúdos mais relevantes</p>
            </div>

            <div className='flex lg:hidden '>
              <div className='flex w-full flex-col gap-[30px] xl:flex-row'>
                {posts.length > 0 && (
                  <Link href={`/blog/${posts[0].slug}`} key={posts[0].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:h-[606px] xl:max-w-[585px]'>
                    <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[0]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[0].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='flex gap-5'>
                      <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]'></div>
                      <p className='relative z-10 text-xl	text-white'>{posts[0].title.rendered}</p>
                    </div>
                  </Link>
                )}

                <div className='flex flex-col gap-[30px]'>
                  <div className='flex flex-col gap-[30px] xl:flex-row'>
                    {posts.length > 1 && (
                      <Link href={`/blog/${posts[1].slug}`} key={posts[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[1]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[1].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]'></div>
                          <p className='relative z-10 text-xl	text-white'>{posts[1].title.rendered}</p>
                        </div>
                      </Link>
                    )}

                    {posts.length > 2 && (
                      <Link href={`/blog/${posts[2].slug}`} key={posts[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[2]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[2].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]'></div>
                          <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                        </div>
                      </Link>
                    )}
                  </div>
                  
                  {posts.length > 3 && (
                    <Link href={`/blog/${posts[3].slug}`} key={posts[3].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[3]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[3].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]'></div>
                        <p className='relative z-10 text-xl	text-white'>{posts[3].title.rendered}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='hidden lg:flex'>
            <div ref={sliderRef} className='keen-slider flex' style={{ maxWidth: 1860, minWidth: 1860 }}>
              <div style={{ maxWidth: 1860, minWidth: 1860 }} className='keen-slider__slide flex h-[640px] justify-center gap-8'>
                <div className='flex min-w-[305px] flex-col justify-center gap-8'>
                  {posts.length > 0 && (
                    <Link href={`/blog/${posts[0].slug}`} key={posts[0].id} className='relative flex h-[305px] min-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[0]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[0].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='relative z-10 flex justify-end'>
                        <Image quality={100} src={blogCardArrow} alt='Seta indicando que o card leva para outra página' />
                      </div>
                      <p className='relative z-10 text-xl text-white'>{posts[0].title.rendered}</p>
                    </Link>
                  )}

                  {posts.length > 1 && (
                    <Link href={`/blog/${posts[1].slug}`} key={posts[1].id} className='relative flex h-[305px] min-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[1]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[1].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='relative z-10 flex justify-end'>
                        <Image quality={100} src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                      </div>
                      <p className='relative z-10 text-xl text-white'>{posts[1].title.rendered}</p>
                    </Link>
                  )}
                </div>

                {posts.length > 2 && (
                  <Link href={`/blog/${posts[2].slug}`} key={posts[2].id} className='relative flex h-[640px] min-w-[640px] flex-col justify-between overflow-hidden rounded-b-74 rounded-tl-74 rounded-tr-37 p-10 transition-opacity hover:opacity-80'>
                    <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={640} height={640} src={posts[2]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[2].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='relative z-10 flex justify-end'>
                      <Image quality={100} src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                    </div>
                    <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                  </Link>
                )}

                <div className='flex w-[855px] flex-col gap-8'>
                  <div className='flex flex-row gap-8'>
                    {posts.length > 3 && (
                      <Link href={`/blog/${posts[3].slug}`} key={posts[3].id} className='relative flex h-[305px] max-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[3]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[3].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image quality={100} src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                      </Link>
                    )}

                    {posts.length > 4 && (
                      <Link href={`/blog/${posts[4].slug}`} key={posts[4].id} className='relative flex h-[305px] w-[518px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[4]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[4].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image quality={100} src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[4].title.rendered}</p>
                      </Link>
                    )}
                  </div>

                  <div className='flex flex-row gap-8'>
                    {posts.length > 5 && (
                      <Link href={`/blog/${posts[5].slug}`} key={posts[5].id} className='relative flex h-[305px] w-[518px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[5]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[5].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[5].title.rendered}</p>
                      </Link>
                    )}

                    {posts.length > 6 && (
                      <Link href={`/blog/${posts[6].slug}`} key={posts[6].id} className='relative flex h-[305px] w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[6]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[6].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[6].title.rendered}</p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ maxWidth: 1860, minWidth: 1860 }} className='keen-slider__slide flex h-[640px] justify-center gap-8'>
                <div className='flex min-w-[305px] flex-col justify-center gap-8'>
                  {posts.length > 0 && (
                    <Link href={`/blog/${posts[0].slug}`} key={posts[0].id} className='relative flex h-[305px] min-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                      <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[0]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[0].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='relative z-10 flex justify-end'>
                        <Image src={blogCardArrow} alt='Seta indicando que o card leva para outra página' />
                      </div>
                      <p className='relative z-10 text-xl text-white'>{posts[0].title.rendered}</p>
                    </Link>
                  )}

                  {posts.length > 1 && (
                    <Link href={`/blog/${posts[1].slug}`} key={posts[1].id} className='relative flex h-[305px] min-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                      <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[1]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[1].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='relative z-10 flex justify-end'>
                        <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                      </div>
                      <p className='relative z-10 text-xl text-white'>{posts[1].title.rendered}</p>
                    </Link>
                  )}
                </div>

                {posts.length > 2 && (
                  <Link href={`/blog/${posts[2].slug}`} key={posts[2].id} className='relative flex h-[640px] min-w-[640px] flex-col justify-between overflow-hidden rounded-b-74 rounded-tl-74 rounded-tr-37 p-10 transition-opacity hover:opacity-80'>
                    <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={640} height={640} src={posts[2]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[2].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='relative z-10 flex justify-end'>
                      <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                    </div>
                    <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                  </Link>
                )}

                <div className='flex w-[855px] flex-col gap-8'>
                  <div className='flex flex-row gap-8'>
                    {posts.length > 3 && (
                      <Link href={`/blog/${posts[3].slug}`} key={posts[3].id} className='relative flex h-[305px] max-w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[3]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[3].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                      </Link>
                    )}

                    {posts.length > 4 && (
                      <Link href={`/blog/${posts[4].slug}`} key={posts[4].id} className='relative flex h-[305px] w-[518px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[4]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[4].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[4].title.rendered}</p>
                      </Link>
                    )}
                  </div>

                  <div className='flex flex-row gap-8'>
                    {posts.length > 5 && (
                      <Link href={`/blog/${posts[5].slug}`} key={posts[5].id} className='relative flex h-[305px] w-[518px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[5]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[5].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[5].title.rendered}</p>
                      </Link>
                    )}

                    {posts.length > 6 && (
                      <Link href={`/blog/${posts[6].slug}`} key={posts[6].id} className='relative flex h-[305px] w-[305px] flex-col justify-between overflow-hidden rounded-b-42 rounded-tl-42 rounded-tr-21 p-5 transition-opacity hover:opacity-80'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[6]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[6].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='relative z-10 flex justify-end'>
                          <Image src={blogCardArrow} alt='Seta indicando que o carde leva para outra pagina' />
                        </div>
                        <p className='relative z-10 text-xl	text-white'>{posts[6].title.rendered}</p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='flex flex-col items-center justify-center overflow-hidden border-t-2 border-green-go-bank bg-white'>
          <div className='flex w-full max-w-[1185px] flex-col justify-between gap-5 px-5 py-5 lg:flex-row lg:py-16'>
            <h1 className='mb-	text-4xl text-black-go-bank'>Navegue por categoria</h1>

            {loadedCategorias && instanceRefCategorias.current && (
              <div className='flex gap-5'>
                <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRefCategorias.current?.prev()}>
                  <Image className='flex -rotate-90 group-hover:hidden' src={blackArrowDropdownMenu} alt='' />
                  <Image className='hidden rotate-90 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                </div>

                <div className='group flex h-[43px] w-[43px] items-center justify-center rounded-bl-5 rounded-br-10 rounded-tl-10 rounded-tr-10 transition-all hover:bg-green-go-bank' onClick={(e: any) => e.stopPropagation() || instanceRefCategorias.current?.next()}>
                  <Image className='flex rotate-90 group-hover:hidden' src={blackArrowDropdownMenu} alt='' />
                  <Image className='hidden -rotate-90 group-hover:flex' src={whiteArrowDropdownMenu} alt='' />
                </div>
              </div>
            )}
          </div>

          <div ref={sliderRefCategorias} className='keen-slider flex pb-5 lg:pb-28' style={{ maxWidth: 1920, minWidth: 1920 }}>
            {postsInvestimentos.length > 0 && (
              <Link href='#investimentos' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-investimentos bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#116EFA]'>•</div>
                  <p className='text-2xl text-white'>Investimentos</p>
                </div>
              </Link>
            )}

            {postsDicasDeGestao.length > 0 && (
              <Link href='#dicasDeGestao' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-dicas-de-gestao bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#00DB87]'>•</div>
                  <p className='text-2xl text-white'>Dicas de Gestão</p>
                </div>
              </Link>
            )}

            {postsNoticias.length > 0 && (
              <Link href='#noticias' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-noticias bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#F9B915]'>•</div>
                  <p className='text-2xl text-white'>Notícias</p>
                </div>
              </Link>
            )}

            {postsSolucoesPareaeEmpreendedores.length > 0 && (
              <Link href='#solucoesParaEmpreendedores' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-solucoes-para-empreendedores bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#9747FF]'>•</div>
                  <p className='text-2xl text-white'>Soluções para empreendedores</p>
                </div>
              </Link>
            )}

            {postsFinancasParaNegocios.length > 0 && (
              <Link href='#financasParaNegocios' className='keen-slider__slide flex  h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-financas-para-negocios bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#10E2DC]'>•</div>
                  <p className='text-2xl text-white'>Finanças para Negócios</p>
                </div>
              </Link>
            )}

            {postsTecnologia.length > 0 && (
              <Link href='#tecnologia' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-tecnologia bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#E110E2]'>•</div>
                  <p className='text-2xl text-white'>Tecnologia</p>
                </div>
              </Link>
            )}

            {/*--*/}

            {postsInvestimentos.length > 0 && (
              <Link href='#investimentos' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-investimentos bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#116EFA]'>•</div>
                  <p className='text-2xl text-white'>Investimentos</p>
                </div>
              </Link>
            )}

            {postsDicasDeGestao.length > 0 && (
              <Link href='#dicasDeGestao' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-dicas-de-gestao bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#00DB87]'>•</div>
                  <p className='text-2xl text-white'>Dicas de Gestão</p>
                </div>
              </Link>
            )}

            {postsNoticias.length > 0 && (
              <Link href='#noticias' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-noticias bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#F9B915]'>•</div>
                  <p className='text-2xl text-white'>Notícias</p>
                </div>
              </Link>
            )}

            {postsSolucoesPareaeEmpreendedores.length > 0 && (
              <Link href='#solucoesParaEmpreendedores' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-solucoes-para-empreendedores bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#9747FF]'>•</div>
                  <p className='text-2xl text-white'>Soluções para empreendedores</p>
                </div>
              </Link>
            )}

            {postsFinancasParaNegocios.length > 0 && (
              <Link href='#financasParaNegocios' className='keen-slider__slide flex  h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-financas-para-negocios bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#10E2DC]'>•</div>
                  <p className='text-2xl text-white'>Finanças para Negócios</p>
                </div>
              </Link>
            )}

            {postsTecnologia.length > 0 && (
              <Link href='#tecnologia' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-tecnologia bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#E110E2]'>•</div>
                  <p className='text-2xl text-white'>Tecnologia</p>
                </div>
              </Link>
            )}

            {/*--*/}

            {postsInvestimentos.length > 0 && (
              <Link href='#investimentos' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-investimentos bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#116EFA]'>•</div>
                  <p className='text-2xl text-white'>Investimentos</p>
                </div>
              </Link>
            )}

            {postsDicasDeGestao.length > 0 && (
              <Link href='#dicasDeGestao' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-dicas-de-gestao bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#00DB87]'>•</div>
                  <p className='text-2xl text-white'>Dicas de Gestão</p>
                </div>
              </Link>
            )}

            {postsNoticias.length > 0 && (
              <Link href='#noticias' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-noticias bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#F9B915]'>•</div>
                  <p className='text-2xl text-white'>Notícias</p>
                </div>
              </Link>
            )}

            {postsSolucoesPareaeEmpreendedores.length > 0 && (
              <Link href='#solucoesParaEmpreendedores' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-solucoes-para-empreendedores bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#9747FF]'>•</div>
                  <p className='text-2xl text-white'>Soluções para empreendedores</p>
                </div>
              </Link>
            )}

            {postsFinancasParaNegocios.length > 0 && (
              <Link href='#financasParaNegocios' className='keen-slider__slide flex  h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-financas-para-negocios bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#10E2DC]'>•</div>
                  <p className='text-2xl text-white'>Finanças para Negócios</p>
                </div>
              </Link>
            )}

            {postsTecnologia.length > 0 && (
              <Link href='#tecnologia' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-tecnologia bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#E110E2]'>•</div>
                  <p className='text-2xl text-white'>Tecnologia</p>
                </div>
              </Link>
            )}

            {/*--*/}

            {postsInvestimentos.length > 0 && (
              <Link href='#investimentos' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-investimentos bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#116EFA]'>•</div>
                  <p className='text-2xl text-white'>Investimentos</p>
                </div>
              </Link>
            )}

            {postsDicasDeGestao.length > 0 && (
              <Link href='#dicasDeGestao' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-dicas-de-gestao bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#00DB87]'>•</div>
                  <p className='text-2xl text-white'>Dicas de Gestão</p>
                </div>
              </Link>
            )}

            {postsNoticias.length > 0 && (
              <Link href='#noticias' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-noticias bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#F9B915]'>•</div>
                  <p className='text-2xl text-white'>Notícias</p>
                </div>
              </Link>
            )}

            {postsSolucoesPareaeEmpreendedores.length > 0 && (
              <Link href='#solucoesParaEmpreendedores' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-solucoes-para-empreendedores bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#9747FF]'>•</div>
                  <p className='text-2xl text-white'>Soluções para empreendedores</p>
                </div>
              </Link>
            )}

            {postsFinancasParaNegocios.length > 0 && (
              <Link href='#financasParaNegocios' className='keen-slider__slide flex  h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-financas-para-negocios bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#10E2DC]'>•</div>
                  <p className='text-2xl text-white'>Finanças para Negócios</p>
                </div>
              </Link>
            )}

            {postsTecnologia.length > 0 && (
              <Link href='#tecnologia' className='keen-slider__slide flex h-[472px] w-full max-w-[278px] items-end gap-2.5 bg-background-tecnologia bg-center bg-no-repeat p-10 transition-opacity hover:opacity-80'>
                <div className='flex gap-5'>
                  <div className='text-4xl leading-7 text-[#E110E2]'>•</div>
                  <p className='text-2xl text-white'>Tecnologia</p>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/*Recentes*/}
        <section id='recentes' className='flex flex-col items-center justify-center bg-gray-dark-go-bank px-5 py-5 xl:pb-28 xl:pt-14'>
          <div className='w-full max-w-[1185px]'>
            <div className="mb-14 w-full flex flex-row items-center justify-between">
              <h1 className='text-4xl text-white'>Recentes</h1>
              <Link href="/blog/todos" className="text-white">Ver todos</Link>
            </div>

            <div className='flex flex-col gap-[30px] xl:flex-row'>
              {posts.length > 0 && (
                <Link href={`/blog/${posts[0].slug}`} key={posts[0].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:h-[606px] xl:max-w-[585px]'>
                  <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[0]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[0].title.rendered} />
                  <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                  <div className='flex gap-5'>
                    {posts[0]._embedded?.['wp:term']?.[0]?.[0]?.id == 3 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]`} />}
                    {posts[0]._embedded?.['wp:term']?.[0]?.[0]?.id == 4 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]`} />}
                    {posts[0]._embedded?.['wp:term']?.[0]?.[0]?.id == 5 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]`} />}
                    {posts[0]._embedded?.['wp:term']?.[0]?.[0]?.id == 6 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]`} />}
                    {posts[0]._embedded?.['wp:term']?.[0]?.[0]?.id == 7 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]`} />}
                    {posts[0]._embedded?.['wp:term']?.[0]?.[0]?.id == 8 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]`} />}
                    <p className='relative z-10 text-xl	text-white'>{posts[0].title.rendered}</p>
                  </div>
                </Link>
              )}

              <div className='flex flex-col gap-[30px]'>
                <div className='flex flex-col gap-[30px] xl:flex-row'>
                  {posts.length > 1 && (
                    <Link href={`/blog/${posts[1].slug}`} key={posts[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[1]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[1].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        {posts[1]._embedded?.['wp:term']?.[0]?.[0]?.id == 3 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]`} />}
                        {posts[1]._embedded?.['wp:term']?.[0]?.[0]?.id == 4 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]`} />}
                        {posts[1]._embedded?.['wp:term']?.[0]?.[0]?.id == 5 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]`} />}
                        {posts[1]._embedded?.['wp:term']?.[0]?.[0]?.id == 6 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]`} />}
                        {posts[1]._embedded?.['wp:term']?.[0]?.[0]?.id == 7 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]`} />}
                        {posts[1]._embedded?.['wp:term']?.[0]?.[0]?.id == 8 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]`} />}
                        <p className='relative z-10 text-xl	text-white'>{posts[1].title.rendered}</p>
                      </div>
                    </Link>
                  )}

                  {posts.length > 2 && (
                    <Link href={`/blog/${posts[2].slug}`} key={posts[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[2]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[2].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        {posts[2]._embedded?.['wp:term']?.[0]?.[0]?.id == 3 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]`} />}
                        {posts[2]._embedded?.['wp:term']?.[0]?.[0]?.id == 4 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]`} />}
                        {posts[2]._embedded?.['wp:term']?.[0]?.[0]?.id == 5 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]`} />}
                        {posts[2]._embedded?.['wp:term']?.[0]?.[0]?.id == 6 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]`} />}
                        {posts[2]._embedded?.['wp:term']?.[0]?.[0]?.id == 7 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]`} />}
                        {posts[2]._embedded?.['wp:term']?.[0]?.[0]?.id == 8 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]`} />}
                        <p className='relative z-10 text-xl	text-white'>{posts[2].title.rendered}</p>
                      </div>
                    </Link>
                  )}
                </div>

                {posts.length > 3 && (
                  <Link href={`/blog/${posts[3].slug}`} key={posts[3].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                    <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={posts[3]._embedded['wp:featuredmedia']['0'].source_url} alt={posts[3].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='flex gap-5'>
                      {posts[3]._embedded?.['wp:term']?.[0]?.[0]?.id == 3 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]`} />}
                      {posts[3]._embedded?.['wp:term']?.[0]?.[0]?.id == 4 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]`} />}
                      {posts[3]._embedded?.['wp:term']?.[0]?.[0]?.id == 5 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]`} />}
                      {posts[3]._embedded?.['wp:term']?.[0]?.[0]?.id == 6 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]`} />}
                      {posts[3]._embedded?.['wp:term']?.[0]?.[0]?.id == 7 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]`} />}
                      {posts[3]._embedded?.['wp:term']?.[0]?.[0]?.id == 8 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]`} />}
                      <p className='relative z-10 text-xl	text-white'>{posts[3].title.rendered}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        {/*Recentes*/}

        {/*Dicas de gestao*/}
        {postsDicasDeGestao.length > 0 && (
          <section id='dicasDeGestao' className='flex flex-col items-center justify-center bg-white px-5 py-5 xl:pb-14 xl:pt-14'>
            <div className='w-full max-w-[1185px]'>
              <div className='flex gap-5'>
                <div className='flex h-[47px] min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]'></div>
                <h1 className='mb-14 text-4xl text-black-go-bank'>Dicas de gestão</h1>
              </div>

              <div className='flex flex-col gap-[30px] xl:flex-row'>
                {postsDicasDeGestao.length > 0 && (
                  <Link href={`/blog/${postsDicasDeGestao[0].slug}`} key={postsDicasDeGestao[0].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:h-[606px] xl:max-w-[585px]'>
                    <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsDicasDeGestao[0]._embedded['wp:featuredmedia']['0'].source_url} alt={postsDicasDeGestao[0].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='flex gap-5'>
                      <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]'></div>
                      <p className='relative z-10 text-xl	text-white'>{postsDicasDeGestao[0].title.rendered} teste</p>
                    </div>
                  </Link>
                )}

                <div className='flex flex-col gap-[30px]'>
                  <div className='flex flex-col gap-[30px] xl:flex-row'>
                    {postsDicasDeGestao.length > 1 && (
                      <Link href={`/blog/${postsDicasDeGestao[1].slug}`} key={postsDicasDeGestao[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsDicasDeGestao[1]._embedded['wp:featuredmedia']['0'].source_url} alt={postsDicasDeGestao[1].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsDicasDeGestao[1].title.rendered}</p>
                        </div>
                      </Link>
                    )}

                    {postsDicasDeGestao.length > 2 && (
                      <Link href={`/blog/${postsDicasDeGestao[2].slug}`} key={postsDicasDeGestao[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsDicasDeGestao[2]._embedded['wp:featuredmedia']['0'].source_url} alt={postsDicasDeGestao[2].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsDicasDeGestao[2].title.rendered}</p>
                        </div>
                      </Link>
                    )}
                  </div>

                  {postsDicasDeGestao.length > 3 && (
                    <Link href={`/blog/${postsDicasDeGestao[3].slug}`} key={postsDicasDeGestao[3].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsDicasDeGestao[3]._embedded['wp:featuredmedia']['0'].source_url} alt={postsDicasDeGestao[3].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]'></div>
                        <p className='relative z-10 text-xl	text-white'>{postsDicasDeGestao[3].title.rendered}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        {/*Dicas de gestao*/}

        {/*Notícias*/}
        {postsNoticias.length > 0 && (
          <section id='noticias' className='flex flex-col items-center justify-center bg-white px-5 pb-5 xl:pb-28'>
            <div className='w-full max-w-[1185px]'>
              <div className='flex gap-5'>
                <div className='flex h-[47px] min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]'></div>
                <h1 className='mb-14 text-4xl text-black-go-bank'>Notícias</h1>
              </div>

              <div className='flex flex-col gap-[30px] xl:flex-row'>
                {postsNoticias.length > 0 && (
                  <Link href={`/blog/${postsNoticias[0].slug}`} key={postsNoticias[0].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:h-[606px] xl:max-w-[585px]'>
                    <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsNoticias[0]._embedded['wp:featuredmedia']['0'].source_url} alt={postsNoticias[0].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='flex gap-5'>
                      <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]'></div>
                      <p className='relative z-10 text-xl	text-white'>{postsNoticias[0].title.rendered}</p>
                    </div>
                  </Link>
                )}

                <div className='flex flex-col gap-[30px]'>
                  <div className='flex flex-col gap-[30px] xl:flex-row'>
                    {postsNoticias.length > 1 && (
                      <Link href={`/blog/${postsNoticias[1].slug}`} key={postsNoticias[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsNoticias[1]._embedded['wp:featuredmedia']['0'].source_url} alt={postsNoticias[1].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsNoticias[1].title.rendered}</p>
                        </div>
                      </Link>
                    )}

                    {postsNoticias.length > 2 && (
                      <Link href={`/blog/${postsNoticias[2].slug}`} key={postsNoticias[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsNoticias[2]._embedded['wp:featuredmedia']['0'].source_url} alt={postsNoticias[2].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsNoticias[2].title.rendered}</p>
                        </div>
                      </Link>
                    )}
                  </div>

                  {postsNoticias.length > 3 && (
                    <Link href={`/blog/${postsNoticias[3].slug}`} key={postsNoticias[3].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsNoticias[3]._embedded['wp:featuredmedia']['0'].source_url} alt={postsNoticias[3].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]'></div>
                        <p className='relative z-10 text-xl	text-white'>{postsNoticias[3].title.rendered}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        {/*Notícias*/}

        {/*Soluções para empreendedores*/}
        {postsSolucoesPareaeEmpreendedores.length > 0 && (
          <section id='solucoesParaEmpreendedores' className='flex flex-col items-center justify-center bg-[#F0F0F0] px-5 py-5 xl:pb-14 xl:pt-14'>
            <div className='w-full max-w-[1185px]'>
              <div className='flex gap-5'>
                <div className='flex h-[47px] min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]'></div>
                <h1 className='mb-14 text-4xl text-black-go-bank'>Soluções para empreendedores</h1>
              </div>

              <div className='flex flex-col gap-[30px] xl:flex-row'>
                {postsSolucoesPareaeEmpreendedores.length > 0 && (
                  <Link href={`/blog/${postsSolucoesPareaeEmpreendedores[0].slug}`} key={postsSolucoesPareaeEmpreendedores[0].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:h-[606px] xl:max-w-[585px]'>
                    <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsSolucoesPareaeEmpreendedores[0]._embedded['wp:featuredmedia']['0'].source_url} alt={postsSolucoesPareaeEmpreendedores[0].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='flex gap-5'>
                      <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]'></div>
                      <p className='relative z-10 text-xl	text-white'>{postsSolucoesPareaeEmpreendedores[0].title.rendered}</p>
                    </div>
                  </Link>
                )}

                <div className='flex flex-col gap-[30px]'>
                  <div className='flex flex-col gap-[30px] xl:flex-row'>
                    {postsSolucoesPareaeEmpreendedores.length > 1 && (
                      <Link href={`/blog/${postsSolucoesPareaeEmpreendedores[1].slug}`} key={postsSolucoesPareaeEmpreendedores[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsSolucoesPareaeEmpreendedores[1]._embedded['wp:featuredmedia']['0'].source_url} alt={postsSolucoesPareaeEmpreendedores[1].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsSolucoesPareaeEmpreendedores[1].title.rendered}</p>
                        </div>
                      </Link>
                    )}

                    {postsSolucoesPareaeEmpreendedores.length > 2 && (
                      <Link href={`/blog/${postsSolucoesPareaeEmpreendedores[2].slug}`} key={postsSolucoesPareaeEmpreendedores[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsSolucoesPareaeEmpreendedores[2]._embedded['wp:featuredmedia']['0'].source_url} alt={postsSolucoesPareaeEmpreendedores[2].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsSolucoesPareaeEmpreendedores[2].title.rendered}</p>
                        </div>
                      </Link>
                    )}
                  </div>

                  {postsSolucoesPareaeEmpreendedores.length > 3 && (
                    <Link href={`/blog/${postsSolucoesPareaeEmpreendedores[3].slug}`} key={postsSolucoesPareaeEmpreendedores[3].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsSolucoesPareaeEmpreendedores[3]._embedded['wp:featuredmedia']['0'].source_url} alt={postsSolucoesPareaeEmpreendedores[3].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]'></div>
                        <p className='relative z-10 text-xl	text-white'>{postsSolucoesPareaeEmpreendedores[3].title.rendered}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        {/*Soluções para empreendedores*/}

        {/*Finanças para Negócios*/}
        {postsFinancasParaNegocios.length > 0 && (
          <section id='financasParaNegocios' className='flex flex-col items-center justify-center bg-[#F0F0F0] px-5 py-5 xl:py-28'>
            <div className='w-full max-w-[1185px]'>
              <div className='flex gap-5'>
                <div className='flex h-[47px] min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]'></div>
                <h1 className='mb-14 text-4xl text-black-go-bank'>Finanças para Negócios</h1>
              </div>

              <div className='flex flex-col gap-[30px] xl:flex-row'>
                {postsFinancasParaNegocios.length > 0 && (
                  <Link href={`/blog/${postsFinancasParaNegocios[0].slug}`} key={postsFinancasParaNegocios[0].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:h-[606px] xl:max-w-[585px]'>
                    <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsFinancasParaNegocios[0]._embedded['wp:featuredmedia']['0'].source_url} alt={postsFinancasParaNegocios[0].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='flex gap-5'>
                      <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]'></div>
                      <p className='relative z-10 text-xl	text-white'>{postsFinancasParaNegocios[0].title.rendered}</p>
                    </div>
                  </Link>
                )}

                <div className='flex flex-col gap-[30px]'>
                  <div className='flex flex-col gap-[30px] xl:flex-row'>
                    {postsFinancasParaNegocios.length > 1 && (
                      <Link href={`/blog/${postsFinancasParaNegocios[1].slug}`} key={postsFinancasParaNegocios[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsFinancasParaNegocios[1]._embedded['wp:featuredmedia']['0'].source_url} alt={postsFinancasParaNegocios[1].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsFinancasParaNegocios[1].title.rendered}</p>
                        </div>
                      </Link>
                    )}

                    {postsFinancasParaNegocios.length > 2 && (
                      <Link href={`/blog/${postsFinancasParaNegocios[2].slug}`} key={postsFinancasParaNegocios[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsFinancasParaNegocios[2]._embedded['wp:featuredmedia']['0'].source_url} alt={postsFinancasParaNegocios[2].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsFinancasParaNegocios[2].title.rendered}</p>
                        </div>
                      </Link>
                    )}
                  </div>

                  {postsFinancasParaNegocios.length > 3 && (
                    <Link href={`/blog/${postsFinancasParaNegocios[3].slug}`} key={postsFinancasParaNegocios[3].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsFinancasParaNegocios[3]._embedded['wp:featuredmedia']['0'].source_url} alt={postsFinancasParaNegocios[3].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]'></div>
                        <p className='relative z-10 text-xl	text-white'>{postsFinancasParaNegocios[3].title.rendered}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        {/*Finanças para Negócios*/}

        {/*Tecnologia*/}
        {postsTecnologia.length > 0 && (
          <section id='tecnologia' className='flex flex-col items-center justify-center bg-white px-5 py-5 xl:pb-14 xl:pt-14'>
            <div className='w-full max-w-[1185px]'>
              <div className='flex gap-5'>
                <div className='flex h-[47px] min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]'></div>
                <h1 className='mb-14 text-4xl text-black-go-bank'>Tecnologia</h1>
              </div>

              <div className='flex flex-col gap-[30px] xl:flex-row'>
                {postsTecnologia.length > 0 && (
                  <Link href={`/blog/${postsTecnologia[0].slug}`} key={postsTecnologia[0].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:h-[606px] xl:max-w-[585px]'>
                    <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsTecnologia[0]._embedded['wp:featuredmedia']['0'].source_url} alt={postsTecnologia[0].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='flex gap-5'>
                      <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]'></div>
                      <p className='relative z-10 text-xl	text-white'>{postsTecnologia[0].title.rendered}</p>
                    </div>
                  </Link>
                )}

                <div className='flex flex-col gap-[30px]'>
                  <div className='flex flex-col gap-[30px] xl:flex-row'>
                    {postsTecnologia.length > 1 && (
                      <Link href={`/blog/${postsTecnologia[1].slug}`} key={postsTecnologia[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsTecnologia[1]._embedded['wp:featuredmedia']['0'].source_url} alt={postsTecnologia[1].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsTecnologia[1].title.rendered}</p>
                        </div>
                      </Link>
                    )}

                    {postsTecnologia.length > 2 && (
                      <Link href={`/blog/${postsTecnologia[2].slug}`} key={postsTecnologia[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsTecnologia[2]._embedded['wp:featuredmedia']['0'].source_url} alt={postsTecnologia[2].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsTecnologia[2].title.rendered}</p>
                        </div>
                      </Link>
                    )}
                  </div>

                  {postsTecnologia.length > 3 && (
                    <Link href={`/blog/${postsTecnologia[3].slug}`} key={postsTecnologia[3].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsTecnologia[3]._embedded['wp:featuredmedia']['0'].source_url} alt={postsTecnologia[3].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]'></div>
                        <p className='relative z-10 text-xl	text-white'>{postsTecnologia[3].title.rendered}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        {/*Tecnologia*/}

        {/*Investimentos*/}
        {postsInvestimentos.length > 0 && (
          <section id='investimentos' className='flex flex-col items-center justify-center bg-white px-5 pb-5 xl:pb-28'>
            <div className='w-full max-w-[1185px]'>
              <div className='flex gap-5'>
                <div className='flex h-[47px] min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]'></div>
                <h1 className='mb-14 text-4xl text-black-go-bank'>Investimentos</h1>
              </div>

              <div className='flex flex-col gap-[30px] xl:flex-row'>
                {postsInvestimentos.length > 0 && (
                  <Link href={`/blog/${postsInvestimentos[0].slug}`} key={postsInvestimentos[0].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:h-[606px] xl:max-w-[585px]'>
                    <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsInvestimentos[0]._embedded['wp:featuredmedia']['0'].source_url} alt={postsInvestimentos[0].title.rendered} />
                    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='flex gap-5'>
                      <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]'></div>
                      <p className='relative z-10 text-xl	text-white'>{postsInvestimentos[0].title.rendered}</p>
                    </div>
                  </Link>
                )}

                <div className='flex flex-col gap-[30px]'>
                  <div className='flex flex-col gap-[30px] xl:flex-row'>
                    {postsInvestimentos.length > 1 && (
                      <Link href={`/blog/${postsInvestimentos[1].slug}`} key={postsInvestimentos[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsInvestimentos[1]._embedded['wp:featuredmedia']['0'].source_url} alt={postsInvestimentos[1].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsInvestimentos[1].title.rendered}</p>
                        </div>
                      </Link>
                    )}

                    {postsInvestimentos.length > 2 && (
                      <Link href={`/blog/${postsInvestimentos[2].slug}`} key={postsInvestimentos[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                        <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsInvestimentos[2]._embedded['wp:featuredmedia']['0'].source_url} alt={postsInvestimentos[2].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]'></div>
                          <p className='relative z-10 text-xl	text-white'>{postsInvestimentos[2].title.rendered}</p>
                        </div>
                      </Link>
                    )}
                  </div>

                  {postsInvestimentos.length > 3 && (
                    <Link href={`/blog/${postsInvestimentos[3].slug}`} key={postsInvestimentos[3].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                      <Image quality={100} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={1024} height={1024} src={postsInvestimentos[3]._embedded['wp:featuredmedia']['0'].source_url} alt={postsInvestimentos[3].title.rendered} />
                      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                      <div className='flex gap-5'>
                        <div className='relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]'></div>
                        <p className='relative z-10 text-xl	text-white'>{postsInvestimentos[3].title.rendered}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        {/*Investimentos*/}
      </main>
    </>
  );
}
