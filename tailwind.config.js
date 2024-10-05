/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // fontFamily: {
    //   Montserrat: ['Montserrat', 'sans-serif'],
    //   Poppins: ['Poppins', 'sans-serif'],
    // },
    extend: {
      colors: {
        'principal-blue': '#003057',
        'dark-blue': '#002C4F',
        'secondary-blue': '#016797',
        'light-blue900': '#01A1DF',
        'light-blue800': '#7FD2F2',
        'light-blue200': '#D6EBFF',
        'bluish-white': '#EFF6FC',
        'light-gray500': '#5C6169',
        'light-gray250': '#A4A6AA',
        'light-gray225': '#C8C9CB',
        'light-gray200': '#ECEBEB',
        'light-gray50': '#F8F8F8',
        purple: '#BB4FED',
        green: '#41CD51',
        yellow: '#FFCC00',
        blue: '#00B4DD',
        red: '#FF4949',
      },
      spacing: {
        'screen-header': 'calc(100vh - 62px)',
        '272px': '17rem',
        '420px': '26.25rem',
        '464px': '29rem',
        '520px': '32.5rem',
        '530px': '33.125rem',
        '656px': '41rem',
        '718px': '44.875rem',
        '842px': '52.625rem',
        '920px': '57.5rem',
        '1248px': '78rem',
        '1440px': '90rem',
        '1664px': '104rem',
      },
      screens: {
        vsm: '610px',
        '1.5xl': '1440px',
      },
      // backgroundImage: {},
      // fontSize: {},
      // padding: {},
      // lineHeight: {},
      // gridTemplateColumns: {},
      boxShadow: {
        clean: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
        sla: '1px 2px 6px 2px rgba(100, 100, 111, 0.2);',
      },
      rotate: {
        270: '270deg',
      },
    },
  },
  plugins: [],
}
