const bodyParser = require('body-parser')
const session = require('express-session')
const config = require('./config/')
const WebfontPlugin = require('webpack-webfont').default
const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  dev: process.env.NODE_ENV !== 'production',
  head: {
    title: 'annbouje',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ann bouje !' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    '@/assets/css/main.scss',
    '@/assets/css/responsive.scss'
  ],

  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/apollo',
    [
      '@nuxtjs/axios',
      {
        requestInterceptor: (config, { store }) => {
          if (store.state.token && store.state.user) {
            config.headers['Authorization'] = `Bearer ${store.state.user.token}`
            config.withCredentials = true
          }
          return config
        },
        baseURL: config.apiUrl,
        browserBaseURL: config.browserApiUrl
      }
    ]
  ],
  apollo: {
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Basic', // optional, default: 'Bearer'
    connectToDevTools: true,
    // required
    clientConfigs: {
      default: {
        // required  
        httpEndpoint: config.apolloUrl,
        websocketsOnly: false // Optional
      }
    }
  },
  vuetify: {
    // Vuetify options
    theme: {
      primary: '#1976D2',
      secondary: '#424242',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
    }
  },
  router: {
    middleware: 'i18n'
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extractCSS: {
      allChunks: true
    },
    extend (config, ctx) {
      // config.resolve.alias['~queries'] = path.join(
      //   this.options.srcDir,
      //   'queries'
      // )
      config.module.rules.splice(0, 0, {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './node_modules/vue2-google-maps'),
          path.resolve(__dirname, './node_modules/vuetify-google-autocomplete/lib')
        ],
        loader: 'babel-loader'
      })
      // if (!ctx.isClient) {
      //   // This instructs Webpack to include `vue2-google-maps`'s Vue files
      //   // for server-side rendering
      //   config.externals.splice(0, 0, function (context, request, callback) {
      //     if (/^vue2-google-maps($|\/)/.test(request)) {
      //       callback(null, false)
      //     } else {
      //       callback()
      //     }
      //   })
      // }
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      new WebfontPlugin({
        files: path.resolve(__dirname, './fixtures/svg-icons/**/*.svg'),
        css: true,
        template: 'scss',
        fontName: 'cs-font',
        cssTemplateFontPath: '~/assets/css/fonts/',
        dest: {
          fontsDir: path.resolve(__dirname, './assets/css/fonts'),
          stylesDir: path.resolve(__dirname, './assets/css/fonts')
        }
      })
    ],
    vendor: ['axios', 'vue-i18n']
  },
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ],
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/format',
    '~/plugins/GmapMap',
    '~/plugins/vuetifyDateTimePicker',
    '~/plugins/googleAutoComplete'
  ],
  generate: {
    routes: [
      '/', '/login', '/register', '/annonces/create',
      '/fr', '/fr/login', '/fr/register', '/fr/annonces/create'
    ]
  }
}
