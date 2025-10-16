// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/image',
    '@unocss/nuxt',
    '@nuxtjs/google-fonts',
    '@element-plus/nuxt',
  ],

  googleFonts: {
    display: 'swap',
    download: false,
    families: {
      'Noto Sans TC': true,
    },
  },

  image: {
    provider: 'ipx',
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: 75, // 設定品質
        },
      },
    },
  },

  i18n: {
    locales: [
      { code: 'zh-TW', file: 'tw.json', name: '繁體中文' },
      { code: 'en-US', file: 'en.json', name: 'English' },
    ],
    lazy: true,
    langDir: 'language/',
    defaultLocale: 'zh-TW',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      fallbackLocale: 'zh-TW',
    },
  },

  imports: {
    dirs: [
      // 掃描 composables 目錄頂層
      'composables',
      // 掃描深度一層的特定檔案
      'composables/*/index.{ts,js,mjs,mts}',
      // 掃描整個 composables 目錄下的檔案
      'composables/**',
      // utils
      'utils/*/index.{ts,js,mjs,mts}',
    ],
  },

  unocss: {
    nuxtLayers: true,
  },

  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },

  postcss: {
    plugins: {
      '@unocss/postcss': {},
      'postcss-preset-env': {
        stage: 1,
        features: {
          'nesting-rules': true,
        },
      },
      'postcss-nested': {},
      'postcss-pxtorem': {
        // 更正插件名稱
        rootValue: 16,
        propList: ['*'],
        exclude: /node_modules/i,
      },
      autoprefixer: {
        overrideBrowserslist: ['last 2 versions', '> 1%'],
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: `${process.env.NUXT_PUBLIC_API_BASE as string}/api`, // 這裡是接口地址
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  css: ['~/assets/css/style.scss'],
})
