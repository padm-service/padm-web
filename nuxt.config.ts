// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  css: ['~/assets/css/main.css'],
  pages: true,
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
    // preference: 'light',
    storage: 'localStorage',
    classSuffix: '',
  },

  compatibilityDate: '2025-01-12',
})