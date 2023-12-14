const path = require('path')
const defaultSettings = require('./src/settings.js')

const name = defaultSettings.title || 'vue Admin Template' // page title

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基本url
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  // 靜態資源(js、css、img)的目錄
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  // 開發伺服器設定
  devServer: {
    port: 9527,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理伺服器設置
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 後端api位置
        changeOrigin: true, // 允許更改origin,解決跨域問題
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // Webpack 配置
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: (config) => {
    // 移除預加載和預取
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    config.plugins.delete('prefetch')

    // 圖片.Svg檔案 的加載
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()

    config
        .when(process.env.NODE_ENV !== 'development',
            config => {
              config
                  .plugin('ScriptExtHtmlWebpackPlugin')
                  .after('html')
                  .use('script-ext-html-webpack-plugin', [{
                    inline: /runtime\..*\.js$/
                  }])
                  .end()
              config
                  .optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                  libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial'
                  },
                  elementUI: {
                    name: 'chunk-elementUI',
                    priority: 20,
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                  },
                  commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'), // can customize your rules
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                  }
                }
              })
              config.optimization.runtimeChunk('single')
            }
        )
  },
}