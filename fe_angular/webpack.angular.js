'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// packages for typescript
const ForkCheckerPlugin  = require('awesome-typescript-loader').ForkCheckerPlugin;

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

module.exports = {
  entry: {
    'polyfills': __dirname + '/polyfills.ts',
    'vendor': __dirname + '/vendor.ts',
    'app': __dirname + '/main.ts'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].bundle.js'
  },
  watch: isDev(),
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
      },
      {
        test: /.css$/,
        loaders: [
          'to-string-loader',
          extractCSS.extract('style-loader', `css-loader?${isDev()? '-': ''}minimize!postcss-loader`)
        ],
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
        browsers: ['last 10 versions', 'IE > 10'],
      }),
      postcssReporter({
        clearMessages: true,
      }),
      postcss_sorting,
      stylefmt
    ]
  },
  debug: isDev(),
  devtool: isDev() ? 'cheap-module-source-map' : null,
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd()
    }),
    new ForkCheckerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      isDevEnv: JSON.stringify(isDev())
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'base.html'),
      filename: 'index.html'
    }),
    extractCSS,
    new CopyWebpackPlugin([
      {from: __dirname + '/imgs'}
    ])
  ],
  devServer: {
    port: 3000
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