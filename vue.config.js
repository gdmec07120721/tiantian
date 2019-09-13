

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
      '/manager': {
        target: 'http://120.78.14.252',
        changeOrigin: true
      },
      '/news': {
        target: 'http://120.78.14.252',
        changeOrigin: true
      },
      '/images': {
        target: 'http://120.78.14.252',
        changeOrigin: true
      },
      '/user': {
        target: 'http://120.78.14.252',
        changeOrigin: true
      },
      'http://www.tiantiantui.top': {
        target: 'http://120.78.14.252',
        changeOrigin: true,
        pathRewrite: {
          '^http://www.tiantiantui.top': ''
        }
      }
    }
  }
};