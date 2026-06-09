import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>


			<Head>
				<link rel='icon' href='/favicon.png' type='image/png' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
				{/* Script Neurolead */}
				<script dangerouslySetInnerHTML={{ __html: `(function(a,b,c,d){try{var e=b.head||b.getElementsByTagName("head")[0];var f=b.createElement("script");f.setAttribute("src",c);f.setAttribute("charset","UTF-8");f.defer=true;a.neuroleadId=d;e.appendChild(f)}catch(g){}})(window,document,"https://cdn.leadster.com.br/neurolead/neurolead.min.js","Icqz8xOJhX9155YUb3VBepRk1")` }} />

				{/* Google Ads Remarketing Tag */}
				<script async src={`https://www.googletagmanager.com/gtag/js?id=AW-10967886770`}></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', 'AW-10967886770');
						`,
					}}
				/>



				{/* Google Analytics Global Site Tag (gtag.js) para UA-237367300-1 */}
				<script async src={`https://www.googletagmanager.com/gtag/js?id=UA-237367300-1`}></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'UA-237367300-1');
					`,
					}}
				/>
			</Head>
			<body className='overflow-x-hidden'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
