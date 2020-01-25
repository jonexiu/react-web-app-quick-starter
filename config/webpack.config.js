// Base Webpack configuration.
//
// Not using ES6 syntax here because this file
// is not processed with Babel on server side.
// See `./rendering-service/index.js` for more info.

/* eslint-disable global-require */

require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const clearConsole = require('react-dev-utils/clearConsole')
// const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin')

const projectFolder = path.resolve(__dirname, '..')

const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  // Resolve all relative paths from the project root folder
  mode: 'development',
  context: projectFolder,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    // Filesystem path for static files
    path: path.resolve(projectFolder, 'build/assets'),

    // Network path for static files
    publicPath: '/',

    // Specifies the name of each output entry file
    filename: '[name].[hash].js',

    // Specifies the name of each (non-entry) chunk file
    chunkFilename: '[name].[hash].js'
  },
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true
            }
          }
        ],
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },

  // Hides "Entrypoint size exeeds the recommened limit (250kB)" warnings.
  // https://github.com/webpack/webpack/issues/3486
  performance: {
    hints: false
  },

  // Plugins will be added to this array by extending configurations.
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      REDUX_DEVTOOLS: false
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
    // new ReactLoadablePlugin({
    //   filename: 'build/react-loadable.json'
    // })
  ],
  devServer: {
    // quiet: true,
    compress: true,
    // host: '192.168.50.45',
    // host: '192.168.188.45',
    host: 'localhost',
    port: process.env.APP_PORT,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errorDetails: false,
      publicPath: false
    },
    before() {
      clearConsole()
    }
  }
}
