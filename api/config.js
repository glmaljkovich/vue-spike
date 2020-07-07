export default {
  production: {
    host: 'medicalsupplies-back.herokuapp.com',
    port: null,
    https: true,
    baseURL: 'https://medicalsupplies-back.herokuapp.com'
  },
  development: {
    host: 'localhost',
    port: '5000',
    https: false,
    baseURL: 'http://localhost:5000'
  }
}
