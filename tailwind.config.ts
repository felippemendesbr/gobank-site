import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '-40px -36px 0px 0px #00AB6B',
      },
      colors: {
        'black-go-bank': '#242424',
        'green-go-bank': '#00DB87',
        'gray-very-light-go-bank': '#585858',
        'gray-light-go-bank': '#3A3A3A',
        'gray-dark-go-bank': '#1F1F1F',
        'gray-medium-go-bank': '#151515',
        'grayish-white-go-bank': '#D9D9D9',
        'turquoise-go-bank': '#00AFAA',
        'lavender-go-bank': '#626CB2',
      },
      borderWidth: {
        '1': '1px',
      },
      borderRadius: {
        '5': '5px',
        '10': '10px',
        '15': '15px',
        '20': '20px',
        '21': '21px',
        '25': '25px',
        '30': '30px',
        '37': '37px',
        '42': '42px',
        '40': '40px',
        '50': '50px',
        '74': '74px',
      },

      backgroundImage: {
        background: "url('/images/background.webp')",
        'background-por-que-escolher-go-bank': "url('/images/background-por-que-escolher-go-bank.webp')",
        'background-por-que-escolher-go-bank-form': "url('/images/background-por-que-escolher-go-bank-form.webp')",

        'background-investimentos': "url('/images/blog/investimentos.webp')",
        'background-dicas-de-gestao': "url('/images/blog/dicas-de-gestao.webp')",
        'background-financas-para-negocios': "url('/images/blog/financas-para-negocios.webp')",
        'background-noticias': "url('/images/blog/noticias.webp')",
        'background-solucoes-para-empreendedores': "url('/images/blog/solucoes-para-empreendedores.webp')",
        'background-tecnologia': "url('/images/blog/tecnologia.webp')",
        'background-slider-home': "url('/images/background-slider-home.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
