// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", '@vee-validate/nuxt', '@nuxtjs/color-mode'],
  plugins: [{ src: "~/plugins/darkMode.ts", mode: "client" }],
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  css: ["~/assets/css/tailwind.css"],
  image: {
    provider: "ipx",
    ipx: {},
  },
  typescript: {
    strict: false,
  },
  // colorMode: {
  //   classSuffix: '',
  //   preference: 'system', // default value of $colorMode.preference
  //   fallback: 'light', // fallback value if not system preference found
  //   hid: 'nuxt-color-mode-script',
  //   globalName: '__NUXT_COLOR_MODE__',
  //   componentName: 'ColorScheme',
  //   classPrefix: '',
  //   storageKey: 'nuxt-color-mode'
  // }
});
