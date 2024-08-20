import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Colors to use in the app
        background: '#FFFFFF',
        mainContent: '#F0F4F8', // Light grayish blue
        buttonPrimary: '#EF6C00', // Original vibrant orange
        buttonSecondary: '#FFA000', // Original bright yellow-orange
        dropdownButton: '#00BCD4', // Cyan
        contentBackground: '#FAFAFA', // Very light gray
        buttonVariant: '#5C6BC0', // Indigo
        buttonSuccess: '#4CAF50', // Green
        buttonDanger: '#F44336', // Red
        textVariant1: '#78909C', // Cool gray
        textVariant2: '#546E7A', // Slate gray
        textPrimary: '#212121', // Almost black
        alertSuccessBg: '#388E3C', // Deep green
        alertSuccessEffect: '#2E7D32', // Slightly darker green
        alertErrorBg: '#D32F2F', // Dark red
        alertErrorEffect: '#C62828', // Even darker red
        alertInfoBg: '#1976D2', // Blue
        alertInfoEffect: '#1565C0', // Darker blue
        alertWarningBg: '#FBC02D', // Yellow
        alertWarningEffect: '#F9A825', // Darker yellow
        shadow: '#424242', // Dark gray
        listOption: '#FF9800', // Orange
        listOptionEffect: '#FEA33B', // Dark gray
        orderSuccessBg: '#43A047', // Strong green
        tableCellBg: '#E0E0E0', // Light gray
        stateOptionBg: '#388E3C', // Green
        tableActionBg: '#455A64', // Blue-gray
        buttonVariantSecondary: '#FFEB3B', // Bright yellow
        textVariant3: '#303F9F', // Indigo
        textVariant4: '#212121', // Almost black
        stateVariant: '#8E24AA', // Purple
        buttonVariantTertiary: '#0288D1', // Light blue
        contentButton: '#F5F5F5', // Off white

        // Dark mode colors
        'dark-background': '#121212', // Dark gray
        'dark-background/50': 'rgba(18, 18, 18, 0.5)', // Dark gray with 50% opacity
        'dark-background/70': 'rgba(18, 18, 18, 0.7)', // Dark gray with 70% opacity
        'dark-mainContent': '#1C1C1C', // Very dark gray
        'dark-buttonPrimary': '#DD6B20', // Soft orange
        'dark-buttonSecondary': '#ED8936', // Yellow-orange
        'dark-dropdownButton': '#26C6DA', // Cyan
        'dark-contentBackground': '#212121', // Darker gray
        'dark-textPrimary': '#E0E0E0', // Light gray
        'dark-alertSuccessBg': '#43A047', // Green
        'dark-alertErrorBg': '#EF5350', // Soft red
        'dark-alertInfoBg': '#42A5F5', // Light blue
        'dark-alertWarningBg': '#FFA726', // Light orange
        'dark-shadow': '#000000', // Black
      },
      gradientButton: {
        'button-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
