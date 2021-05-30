module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 4200,
    proxy: 'http://localhost:8081/',
  }
}
