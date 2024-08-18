// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  plugins: [{ src: "~/plugins/darkMode.ts", mode: "client" }],
  css: ["~/assets/css/tailwind.css"],
  image: {
    provider: "ipx",
    ipx: {},
  },
  typescript: {
    strict: false,
  },
});
