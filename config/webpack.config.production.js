// Base Webpack configuration.
//
// Not using ES6 syntax here because this file
// is not processed with Babel on server side.
// See `./rendering-service/index.js` for more info.
/* eslint-disable global-require */

const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const Visualizer = require('webpack-visualizer-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

const projectFolder = path.resolve(__dirname, '..')

module.exports = {
  // Resolve all relative paths from the project root folder
  mode: 'production',
  // devtool: 'source-map',
  bail: true,
  context: projectFolder,
  entry: './src/index.js',
  output: {
    // Filesystem path for static files
    path: path.resolve(projectFolder, 'build'),

    // Network path for static files
    publicPath: '/',

    // Specifies the name of each output entry file
    filename: 'static/js/[name].[chunkhash:8].js',

    // Specifies the name of each (non-entry) chunk file
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
  },

  module: {
    rules: [
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

  // Plugins will be added to this array by extending configurations.
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      REDUX_DEVTOOLS: false
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ReactLoadablePlugin({
      filename: 'build/react-loadable.json'
    })
    // new Visualizer()
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
