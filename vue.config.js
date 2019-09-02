

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true,
    proxy: {
      '/': {
        target: '',
        changeOrigin: true
      }
    }
  }
};