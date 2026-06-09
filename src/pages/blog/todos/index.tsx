import { useEffect, useState } from "react";

import Head from "next/head"
import Image from "next/image";
import Link from "next/link";

import { CSSProperties } from "react";

export async function getStaticProps() {
  try {
    const res = await fetch(
      //  'http://localhost:3000/api/posts?per_page=8&page=1'
      "https://www.gobank.com.br/api/posts?per_page=8&page=1"
    );
    const posts = await res.json();
    return {
      props: {
        initialPosts: Array.isArray(posts) ? posts : [],
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error(err);
    return {
      props: { initialPosts: [] },
    };
  }
}

export default function VerTodos({ initialPosts }: any){
    
    const [posts, setPosts] = useState(initialPosts || []);
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
        backgroundColor: '#000',
        backgroundImage: `url(/images/background.webp)`,
        backgroundSize: 'cover',
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '101%',
        height: '101%',
        zIndex: -1,
    };

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); 

    const posts_per_page = 8;

    const loadMore = async () => {
        setLoading(true);
        const nextPage = page + 1;

        const res = await fetch(
            //`https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed&per_page=${posts_per_page + 1}&page=${nextPage}`
            //`/api/posts?per_page=${posts_per_page}&page=${nextPage}`
            //`http://localhost:3000/api/posts?per_page=${posts_per_page}&page=${nextPage}`
            `https://www.gobank.com.br/api/posts?per_page=${posts_per_page}&page=${nextPage}`
        );
        const fetchedPosts = await res.json();

        // console.log(fetchedPosts);

        if (fetchedPosts.length >= posts_per_page) {
            setPosts([...posts, ...fetchedPosts.slice(0, posts_per_page)]);
            setHasMore(true);
        } else {
            setPosts([...posts, ...fetchedPosts]);
            setHasMore(false);
        }

        setPage(nextPage);
        setLoading(false);
    };

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
                <section className='flex flex-col items-center justify-center  overflow-hidden pb-16'>
                    <div style={bgTransformStyle}></div>

                    <div className='flex w-full max-w-[1185px] flex-col gap-5 px-5 py-5 lg:mb-16 lg:pt-16'>
                        <div className='flex flex-col gap-5'>
                        <h1 className='text-6xl font-light text-green-go-bank'>Blog</h1>
                        <p className='text-2xl text-white'>Veja todo o nosso conteúdo</p>
                        </div>
                    </div>
                </section>

                <section className="listagem-noticias  bg-white">
                    <div className="w-full max-w-[1185px] pt-12 pb-5 m-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {posts && posts.length > 0 && posts.map((post:any) => {
                                const featuredImage =
                                    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                                return (
                                    <article
                                    key={post.id}
                                    className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
                                    >
                                    {/* Imagem destacada */}
                                    {featuredImage && (
                                        <Image
                                        src={featuredImage}
                                        alt={post.title.rendered}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover"
                                        />
                                    )}

                                    <div className="p-4 flex-1 flex flex-col">
                                        {/* Título */}
                                        <h2
                                        className="text-lg font-semibold mb-2 line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />

                                        {/* Excerpt */}
                                        <div
                                        className="text-sm text-gray-600 mb-4 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        />

                                        {/* Link */}
                                        <Link
                                        href={`/blog/${post.slug}`}
                                        className="mt-auto text-green-600 font-medium hover:underline hover:text-green-700"
                                        >
                                        Ler mais ?
                                        </Link>
                                    </div>
                                    </article>
                                );
                                })}
                        </div>

                        {hasMore ? (
                            <div className="mt-10 mb-10 text-center">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                            >
                                {loading ? "Carregando..." : "Ver mais notícias"}
                            </button>
                            </div>
                        ) : (
                            <p className="text-center mt-10 mb-10">
                                Você carregou todas as notícias publicadas.
                            </p>
                        )}

                    </div>
                </section>
            </main>
        </>
    )
}
