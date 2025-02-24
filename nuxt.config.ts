// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  devServer: {
    host: '0.0.0.0',
    port: 5000
  },
  css: ['~/assets/css/main.css',
    'highlight.js/styles/github.css', // 默认亮色主题
    'highlight.js/styles/github-dark.css' // 暗黑模式主题
  ],
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
  runtimeConfig: {
    public: {
      apiBase: process.env.PUBLIC_ORIGIN,
    }
  },
  compatibilityDate: '2025-01-12',
})