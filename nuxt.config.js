const bodyParser = require('body-parser')
const session = require('express-session')
const config = require('./config/server')

module.exports = {
  /*
  ** Headers of the page
  */
  dev: false,
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
    '@/assets/css/main.scss'
  ],

  modules: [
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
  router: {
    middleware: 'i18n'
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
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
  plugins: ['~/plugins/i18n.js'],
  generate: {
    routes: [
      '/', '/login', '/register', '/annonces/create',
      '/fr', '/fr/login', '/fr/register', '/fr/annonces/create'
    ]
  }
}
