import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - Corner',
    // title: 'Corner',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/White-Noise-Site/favicon.svg' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSSCSS
   */
  css: ['~/assets/scss/main.scss'],

  /*
   Mixin css
  */
  styleResources: {
    scss: './assets/scss/utils/mixin.scss'
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios.js'],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: 'localhost:3000'
  },
  proxy: {
    changeOrigin: true
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    terser: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    },

    analyze: true,

    minimize: true,

    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000
      }
    },
    maxChunkSize: 30000,
    postcss: {
      plugins: {},
      preset: {
        autoprefixer: {
          /* 参考 https://github.com/browserslist/browserslist#queries */
          overrideBrowserslist: ['defaults', 'ie >= 9', '> 5%', 'last 2 versions']
        }
      }
    },
    extend(config, ctx) {}
  },
  router: {
    // base: 'White-Noise/site-dist/'
    // base: '/'
    // base: '../../'
    base: '/White-Noise-Site/'
    // base:'/'
  }
}
