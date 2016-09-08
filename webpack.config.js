'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';
const webpack = require('webpack');

let isDev = () => {return NODE_ENV === 'dev'};

module.exports = {
    entry: './src/index',
    output: {
        filename: 'dist/build.js'
    },
    watch: isDev(),
    watchOptions: {
        aggregateTimeout: 100
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loaders: ['eslint']
        }],
        loaders: [
            {
                test: /\.js$/,
                loader: "babel?cacheDirectory"
            },
            {
                test : /\.css$/,
                loader: 'style!css!'
            }
        ]
    },
    devtool: isDev() ? 'cheap-module-source-map' : null,
    debug: isDev(),
    plugins: [
        new webpack.DefinePlugin({
            isDevEnv: JSON.stringify(isDev())
        })
    ]
};