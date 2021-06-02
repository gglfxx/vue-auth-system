const path = require('path')
const port = process.env.port || process.env.npm_config_port || 9231
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/variable.scss";' // 引入全局变量
      }

    }

  },
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    port: port,
    overlay: {
      warnings: false,
      errors: true
    }
    // https: false, // 是否使用https协议
    // hotOnly: false, // 是否开启热更新
    /* proxy: {
      '/api': {
        target: 'http://localhost:18082', // API服务器的地址
        ws: true, // 代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: { // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/webApi': ''
        }
      }
    } */
  }
}
