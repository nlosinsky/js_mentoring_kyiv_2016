'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Packages for styles
const precss = require('precss');
const postcss_sorting = require('postcss-sorting');
const stylelint = require('stylelint');
const stylefmt = require('stylefmt');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const postcssNestedAncestors = require('postcss-nested-ancestors');

let extractCSS = new ExtractTextPlugin('[name].css');
let isDev = () => {
  return NODE_ENV === 'development';
};

module.exports = {
  entry: [
    path.join(process.cwd(), 'src/index.js')
  ],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  watch: isDev(),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        cacheDirectory: true
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract('style-loader', `css-loader?${isDev()? '-': ''}minimize!postcss-loader`),
        cacheDirectory: true
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
        loader: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader?limit=10000',
        exclude: /node_modules/
      }
    ]
  },
  postcss: () => {
    return [
      postcssNestedAncestors,
      precss,
      postcssFocus(),
      cssnext({
        browsers: ['last 2 versions', 'IE > 10'],
      }),
      postcssReporter({
        clearMessages: true,
      }),
      postcss_sorting,
      stylefmt,
      stylelint
    ];
  },
  debug: isDev(),
  devtool: isDev() ? 'cheap-module-source-map' : null,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      isDevEnv: JSON.stringify(isDev())
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './base.html',
      filename: path.join(process.cwd(), 'index.html')
    }),
    extractCSS
  ],
  devServer: {
    port: 3000
  },
  externals: {
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  }
};