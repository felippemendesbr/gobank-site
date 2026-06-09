import { CSSProperties, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';

import { filterPostsWithFeaturedMedia, getFeaturedMediaUrl, getPrimaryCategory } from '@/lib/wordpress';

type TPost = {
  excerpt?: {
    rendered: string;
  };
  slug?: string | undefined;
  id?: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified: string;
  _embedded: any;
};

interface ISlug {
  currentPost: TPost[];
  relatedPosts: TPost[];
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const postSlug = params?.slug;

  const postFetch = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&slug=${postSlug}`);
  const postsArr = await postFetch.json();

  if (!Array.isArray(postsArr) || !postsArr.length) {
    return { notFound: true };
  }

  const currentPost = postsArr[0];
  const categoryId = getPrimaryCategory(currentPost)?.id;

  let relatedPosts: TPost[] = [];

  if (categoryId) {
    const allPostsFetch = await fetch(
      `https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&categories=${categoryId}&per_page=100`,
    );
    const allPostsArr = await allPostsFetch.json();

    if (Array.isArray(allPostsArr)) {
      relatedPosts = filterPostsWithFeaturedMedia<TPost>(
        allPostsArr.filter((post: { id: unknown }) => post.id !== currentPost.id),
      );
    }
  }

  return {
    props: {
      currentPost: [currentPost],
      relatedPosts,
    },
    revalidate: 86400,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPostsFetch = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true`);
  const totalPosts = await totalPostsFetch.headers.get('x-wp-total');

  const postsFetch = await fetch(`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=${totalPosts}`);
  const postsArr = await postsFetch.json();

  const paths = await postsArr.map((post: any) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export default function Slug({ currentPost, relatedPosts }: ISlug) {
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
      {currentPost.map((post) => {
        const category = getPrimaryCategory(post);

        return (
        <>
          <Head>
            <title>{post.title.rendered}</title>
            {/*<meta name="description" content=""/>*/}
            {/*<meta name="keywords" content=""/>*/}
            <link rel='canonical' content='https://www.gobank.com.br/blog' />
            <meta property='og:title' content={`${post.title.rendered}`} />
            {/*<meta property="og:description" content=""/>*/}
            {/*<meta property="og:image" content=""/>*/}
            <meta property='og:url' content='https://www.gobank.com.br/blog' />
            <meta property='og:type' content='article' />
            <meta name='twitter:card' content='summary' />
            <meta name='twitter:title' content={`${post.title.rendered}`} />
            {/*<meta name="twitter:description" content=""/>*/}
            {/*<meta name="twitter:image" content=""/>*/}
          </Head>
          <main key={post.id} className={`${post.title.rendered}__CTA`}>
            <section>
              <div className='relative z-10 flex flex-col items-center justify-center'>
                <div className='w-full'>
                  <div style={bgTransformStyle}></div>
                  <div className='bg-gradiente-post flex w-full items-center justify-center'>
                    <div className='mb-14 flex items-center justify-center overflow-hidden rounded-bl-50 rounded-br-25 lg:h-[465px] lg:w-[1207px]'>
                      <Image className='' width={1207} height={465} src={getFeaturedMediaUrl(post)} alt={post.title.rendered} />
                    </div>
                  </div>
                </div>
              </div>

              <div className='relative z-10 flex flex-col items-center justify-center bg-[#1F1F1F]'>
                <div className='z-1 relative z-10 flex w-full max-w-[1185px] flex-col px-5 pb-28'>
                  <div className='mb-16 flex gap-5'>
                    {category?.id == 3 && <span className={`text-2xl text-[#116EFA]`}>•</span>}
                    {category?.id == 4 && <span className={`text-2xl text-[#00DB87]`}>•</span>}
                    {category?.id == 5 && <span className={`text-2xl text-[#F9B915]`}>•</span>}
                    {category?.id == 6 && <span className={`text-2xl text-[#9747FF]`}>•</span>}
                    {category?.id == 7 && <span className={`text-2xl text-[#10E2DC]`}>•</span>}
                    {category?.id == 8 && <span className={`text-2xl text-[#E110E2]`}>•</span>}
                    {category?.name && <span className='text-2xl text-white'>{category.name}</span>}
                  </div>
                  <h1 className='mb-8 text-5xl text-white lg:text-6xl'>{post.title.rendered}</h1>
                  <p className='mb-20 hidden text-4xl text-[#838383]'>Lorem ipsum dolor sit amet, consectetur a elit. Dolor sit amet, consectetur a elit.</p>
                  <div className='post-content-rendered text-white' dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>
              </div>
            </section>
            {relatedPosts && relatedPosts.length > 0 && (
              <section className='relative z-10 flex items-center justify-center border-t-2 border-green-go-bank bg-white'>
                <div className='flex w-full max-w-[1185px] flex-col px-5 py-5 lg:py-20'>
                  <h1 className='mb-14 text-4xl text-black-go-bank'>Posts Relacionados</h1>

                  <div className='flex flex-col gap-5 lg:flex-row'>
                    {relatedPosts.length > 0 && (
                      <Link href={`/blog/${relatedPosts[0].slug}`} key={relatedPosts[0].id} className='relative flex h-[288px] w-full  flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[585px]'>
                        <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={getFeaturedMediaUrl(relatedPosts[0])} alt={relatedPosts[0].title.rendered} />
                        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                        <div className='flex gap-5'>
                          {category?.id == 3 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]`} />}
                          {category?.id == 4 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]`} />}
                          {category?.id == 5 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]`} />}
                          {category?.id == 6 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]`} />}
                          {category?.id == 7 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]`} />}
                          {category?.id == 8 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]`} />} <p className='relative z-10 text-xl	text-white'>{relatedPosts[0].title.rendered}</p>
                        </div>
                      </Link>
                    )}
                    <div className='flex flex-col gap-5 lg:flex-row'>
                      {relatedPosts.length > 1 && (
                        <Link href={`/blog/${relatedPosts[1].slug}`} key={relatedPosts[1].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                          <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={getFeaturedMediaUrl(relatedPosts[1])} alt={relatedPosts[1].title.rendered} />
                          <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                          <div className='flex gap-5'>
                            {category?.id == 3 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]`} />}
                            {category?.id == 4 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]`} />}
                            {category?.id == 5 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]`} />}
                            {category?.id == 6 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]`} />}
                            {category?.id == 7 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]`} />}
                            {category?.id == 8 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]`} />} <p className='relative z-10 text-lg	text-white'>{relatedPosts[1].title.rendered}</p>
                          </div>
                        </Link>
                      )}

                      {relatedPosts.length > 2 && (
                        <Link href={`/blog/${relatedPosts[2].slug}`} key={relatedPosts[2].id} className='relative flex h-[288px] w-full flex-col justify-end overflow-hidden rounded-bl-42 rounded-br-21 rounded-tl-42 rounded-tr-42 p-8 transition-opacity hover:opacity-80 xl:max-w-[278px]'>
                          <Image className='absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover' width={305} height={305} src={getFeaturedMediaUrl(relatedPosts[2])} alt={relatedPosts[2].title.rendered} />
                          <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent'></div>
                          <div className='flex gap-5'>
                            {category?.id == 3 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#116EFA]`} />}
                            {category?.id == 4 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#00DB87]`} />}
                            {category?.id == 5 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#F9B915]`} />}
                            {category?.id == 6 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#9747FF]`} />}
                            {category?.id == 7 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#10E2DC]`} />}
                            {category?.id == 8 && <span className={`relative z-10 flex h-full min-w-[8px] max-w-[8px] rounded-lg bg-[#E110E2]`} />}
                            <p className='relative z-10 text-lg	text-white'>{relatedPosts[2].title.rendered}</p>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </>
        );
      })}
    </>
  );
}
