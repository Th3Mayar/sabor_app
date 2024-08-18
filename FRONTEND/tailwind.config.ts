import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Colors to use in the app
        background: '#FFFFFF',
        mainContent: '#D9D9D9',
        buttonPrimary: '#EF6C00',
        buttonSecondary: '#FFA000',
        dropdownButton: '#888888',
        contentBackground: '#F6F4F4',
        buttonVariant: '#282866',
        buttonSuccess: '#49B555',
        buttonDanger: '#FA3636',
        textVariant1: '#AEADAD',
        textVariant2: '#797C82',
        textPrimary: '#000000',
        alertSuccessBg: '#4E8D7C',
        alertSuccessEffect: '#045762',
        alertErrorBg: '#F64B3C',
        alertErrorEffect: '#C81912',
        alertInfoBg: '#3282B8',
        alertInfoEffect: '#0F4C75',
        alertWarningBg: '#EF8D32',
        alertWarningEffect: '#CC561E',
        shadow: '#000000',
        listOption: '#F7941D',
        listOptionEffect: '#464646',
        orderSuccessBg: '#49B555',
        tableCellBg: '#E6E7E9',
        stateOptionBg: '#4BB356',
        tableActionBg: '#333333',
        buttonVariantSecondary: '#F4D221',
        textVariant3: '#344767',
        textVariant4: '#040000',
        stateVariant: '#A9A696',
        buttonVariantTertiary: '#152C70',

        // Dark mode colors
        'dark-background': '#1A202C',
        'dark-mainContent': '#2D3748',
        'dark-buttonPrimary': '#DD6B20',
        'dark-buttonSecondary': '#ED8936',
        'dark-dropdownButton': '#A0AEC0',
        'dark-contentBackground': '#2C303A',
        'dark-textPrimary': '#E2E8F0',
        'dark-alertSuccessBg': '#38A169',
        'dark-alertErrorBg': '#E53E3E',
        'dark-alertInfoBg': '#3182CE',
        'dark-alertWarningBg': '#DD6B20',
        'dark-shadow': '#2D3748',
      },
      gradientButton: {
        'button-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
