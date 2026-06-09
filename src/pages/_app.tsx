import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import Header from '@/components/header';
import Footer from '@/components/footer';

import { Outfit } from 'next/font/google';

import Head from 'next/head';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={outfit.className}>
			<Head><title>GoCapital</title></Head>
			<Header />
			<Component {...pageProps} />
			<GoogleTagManager gtmId="GTM-536LWDJ" />
			<GoogleAnalytics gaId="G-43W2WYML5H" />
			<GoogleAnalytics gaId="G-RW8C7CH5X9" />
			<Footer />
		</div>
	);
}
