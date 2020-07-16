import { APIConfig } from './api';

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ApiConfig = require('./api').APIConfig;
const ENDPOINTS = require('./api').ENDPOINTS;

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
        integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href: '//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        integrity: 'sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN',
        crossorigin: 'anonymous'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuelidate', ssr: true },
    '~/plugins/api.client'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/sentry-module
    '@nuxtjs/sentry',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: ApiConfig.baseURL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      common: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
  },
  sentry: {
    dsn: 'https://9deff4f573d246abaeeb59ad044eb8d2@o419949.ingest.sentry.io/5337246', // Enter your project's DSN here
    config: {}, // Additional config
  },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, {isDev, isClient}) {
      if(isDev && isClient) {
        config.plugins = [...config.plugins, new WebpackBuildNotifierPlugin()]
      }
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: ENDPOINTS.USER.SIGN_IN, method: 'post', propertyName: 'access_token' },
          user: { url: ENDPOINTS.USER.PROFILE, method: 'get', propertyName: false }
        },
      }
    }
  }
}
