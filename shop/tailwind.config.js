function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1780px',
      '4xl': '2160px', // only need to control product grid mode in ultra 4k device
    },
    extend: {
      backgroundImage: {
        'hero-desktop': 'url("/hero-bg-desktop.png")',
        'hero-mobile': 'url("/hero-bg-mobile.png")',
      },
      colors: {
        brand: {
          DEFAULT: '#24b47e',
          dark: '#00997B',
        },
        light: {
          DEFAULT: '#ffffff',
          base: '#646464',
          100: '#f9f9f9',
          200: '#f2f2f2',
          300: '#ededed',
          400: '#e6e6e6',
          500: '#dadada',
          600: '#d2d2d2',
          800: '#bcbcbc',
          900: '#a8a8a8',
        },
        dark: {
          DEFAULT: '#000000',
          base: '#a5a5a5',
          100: '#181818',
          200: '#212121',
          250: '#252525',
          300: '#2a2a2a',
          350: '#2b2b2b',
          400: '#323232',
          450: '#2e2e2e',
          500: '#3e3e3e',
          600: '#4a4a4a',
          700: '#6e6e6e',
          800: '#808080',
          850: '#989898',
          900: '#999999',
          950: '#2b2b2b',
        },
        hero_input: '#096140',
        warning: '#e66767',
        wishlist_price: '#ffffff1a',
        rating: '#FFCF23',
        online: '#55A99D',
        gradient: '#007665',
        'border-50': withOpacity('--color-border-50'),
        'border-100': withOpacity('--color-border-100'),
        'border-200': withOpacity('--color-border-200'),
        'border-base': withOpacity('--color-border-base'),
      },
      boxShadow: {
        card: '0px 0px 6px rgba(79, 95, 120, 0.1)',
        dropdown: '0px 10px 32px rgba(46, 57, 72, 0.2)',
        'bottom-nav': '0 -2px 3px rgba(0, 0, 0, 0.08)',
        'feed-card': '6.92px 6.92px 3.4px rgba(71, 71, 71, 0.25)',
        'feed-cardimage': '5.21px 6.08px 8px rgba(0, 0, 0, 0.25)',
        'trade-submit-light': '4px 7px 0px rgba(24,24,24,1)',
        'trade-submit-dark': '4px 7px 0px rgba(230,230,230,1)',
      },
      fontSize: {
        '10px': '.625rem',
        '13px': '13px',
        '15px': '15px',
        '18px': '18px',
        '22px': '22px',
      },
      fontFamily: {
        body: ["'Inter', sans-serif"],
        poppins: ["'Poppins', 'Inter', sans-serif"],
        quicksand: ["'Quicksand', 'Poppins', sans-serif"],
        raleway: ["'Raleway', 'Poppins', sans-serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
