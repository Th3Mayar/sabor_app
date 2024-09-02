const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  safelist: ["dark"],
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Add fonts to the project on tailwind.config.js
        poppins: ["Poppins", "cursive"],
      },
      colors: {
        // Light mode colors
        background: "#FFFFFF",
        mainContent: "#F0F4F8", // Light grayish blue
        buttonPrimary: "#EF6C00", // Original vibrant orange
        buttonSecondary: "#FFA000", // Original bright yellow-orange
        dropdownButton: "#00BCD4", // Cyan
        contentBackground: "#FAFAFA", // Very light gray
        buttonVariant: "#5C6BC0", // Indigo
        buttonSuccess: "#4CAF50", // Green
        buttonDanger: "#F44336", // Red
        textVariant1: "#78909C", // Cool gray
        textVariant2: "#546E7A", // Slate gray
        textPrimary: "#212121", // Almost black
        alertSuccessBg: "#388E3C", // Deep green
        alertSuccessEffect: "#2E7D32", // Slightly darker green
        alertErrorBg: "#D32F2F", // Dark red
        alertErrorEffect: "#C62828", // Even darker red
        alertInfoBg: "#1976D2", // Blue
        alertInfoEffect: "#1565C0", // Darker blue
        alertWarningBg: "#FBC02D", // Yellow
        alertWarningEffect: "#F9A825", // Darker yellow
        shadow: "#424242", // Dark gray
        listOption: "#FF9800", // Orange
        listOptionEffect: "#FEA33B", // Darker orange
        orderSuccessBg: "#43A047", // Strong green
        tableCellBg: "#E0E0E0", // Light gray
        stateOptionBg: "#388E3C", // Green
        tableActionBg: "#455A64", // Blue-gray
        buttonVariantSecondary: "#FFEB3B", // Bright yellow
        textVariant3: "#303F9F", // Indigo
        textVariant4: "#212121", // Almost black
        stateVariant: "#8E24AA", // Purple
        buttonVariantTertiary: "#0288D1", // Light blue
        contentButton: "#F5F5F5", // Off white

        // Dark mode colors
        "dark-background": "#121212", // Dark gray
        "dark-background/50": "rgba(18, 18, 18, 0.5)", // Dark gray with 50% opacity
        "dark-background/70": "rgba(18, 18, 18, 0.7)", // Dark gray with 70% opacity
        "dark-mainContent": "#1C1C1C", // Very dark gray
        "dark-buttonPrimary": "#DD6B20", // Soft orange
        "dark-buttonSecondary": "#ED8936", // Yellow-orange
        "dark-dropdownButton": "#26C6DA", // Cyan
        "dark-contentBackground": "#212121", // Darker gray
        "dark-textPrimary": "#E0E0E0", // Light gray
        "dark-alertSuccessBg": "#43A047", // Green
        "dark-alertErrorBg": "#EF5350", // Soft red
        "dark-alertInfoBg": "#42A5F5", // Light blue
        "dark-alertWarningBg": "#FFA726", // Light orange
        "dark-shadow": "#000000", // Black
        "dark-skeleton": "#2A2A2A", // Lighter gray for skeleton loaders in dark mode
        "dark-listOption": "#FFA726", // Light orange
        "dark-listOptionEffect": "#FFB74D", // Darker orange
        "dark-orderSuccessBg": "#43A047", // Green
        "dark-tableCellBg": "#424242", // Dark gray
        "dark-stateOptionBg": "#43A047", // Green
        "dark-tableActionBg": "#455A64", // Blue-gray
        "dark-buttonVariantSecondary": "#FFEB3B", // Bright yellow
        "dark-textVariant3": "#303F9F", // Indigo
        "dark-textVariant4": "#E0E0E0", // Light gray
        "dark-stateVariant": "#8E24AA", // Purple
        "dark-buttonVariantTertiary": "#0288D1", // Light blue
        "dark-contentButton": "#2A2A2A", // Darker gray for buttons in dark mode
        "dark-mainContent/50": "rgb(103 102 102)", // Darker main content with 50% opacity
        
        // Additional color mappings for CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
      gradientButton: {
        "button-gradient":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [animate],
};
