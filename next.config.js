const path = require('path')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')

module.exports = withSass(withTypescript({
  cssModules: true,
  webpack(config, options) {
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerPlugin({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }))
    }

    config.resolve.plugins = [new TsConfigPathsPlugin()]

    return config
  },
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]__[hash:base64:5]'
  },
  sassLoaderOptions: {
    includePaths: [ 'src/static/styles' ]
  }
}))
