// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@pinia-plugin-persistedstate/nuxt',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],
  tailwindcss: {
    cssPath: ['~/assets/scss/tailwind.scss', { injectPosition: 'first' }],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  colorMode: {
    storage: 'cookie',
    classSuffix: '',
  },

})