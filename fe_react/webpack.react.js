'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//Packages for styles
const precss = require('precss');
const postcss_sorting = require('postcss-sorting');
const stylefmt = require('stylefmt');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const postcssNestedAncestors = require('postcss-nested-ancestors');

let extractCSS = new ExtractTextPlugin('[name].css');
let isDev = () => {
  return NODE_ENV === 'development';
};

let entry = [__dirname + '/index.js'];

if(isDev()) {
  entry.unshift('webpack-hot-middleware/client');
}

module.exports = {
  entry,
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].bundle.js'
  },
  watch: isDev(),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(process.cwd(), '/fe_react')
      },
      {
        test: /.css$/,
        loaders: [extractCSS.extract('style-loader', `css-loader?${isDev()? '-': ''}minimize!postcss-loader`)],
      },
      {
        test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
        loader: 'url-loader?limit=100000&name=[name].[ext]'
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        loaders: [
          'url-loader?limit=100000&name=./[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },
  postcss: () => {
    return [
      postcssNestedAncestors,
      precss,
      postcssFocus(),
      cssnext({
        browsers: ['last 5 versions', 'IE > 10'],
      }),
      postcssReporter({
        clearMessages: true,
      }),
      postcss_sorting,
      stylefmt
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd()
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true
    }),
    new webpack.DefinePlugin({
      isDevEnv: JSON.stringify(isDev())
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'base.html'),
      filename: 'index.html'
    }),
    extractCSS
  ],
  debug: isDev(),
  devtool: isDev() ? 'cheap-module-source-map' : null,
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  externals: {
    jsdom: 'window'
  },
  node: {
    fs: 'empty',
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};