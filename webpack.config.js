'use strict';

var webpack = require('webpack');
var path = require('path');
const prod = process.argv.indexOf('-p') !== -1;
const watch = process.argv.indexOf('-watch') !== -1;


var ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractSass = new ExtractTextPlugin({
    filename: (!prod) ? '[name].css' : '[name].min.css',
    disable: (!prod)
});


/**
 * Compile TypeScript files
 */

module.exports = [{
    name: "ts",
    cache: false,
    entry: {
        'amt-rating': './src/ts/amt-rating.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: (!prod) ? '[name].js' : '[name].min.js',
        libraryTarget: 'umd',
        library: 'Askmethat',
        umdNamedDefine: true

    },
    watch: watch,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    devtool: (prod) ? "" : 'source-map',
    plugins: [
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: 'ts-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,

        },
        {
            enforce: 'pre',
            test: /\.ts$/,
            use: "source-map-loader"
        }, {
            enforce: 'pre',
            test: /\.js$/,
            loader: "source-map-loader"
        }
        ],

    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"],
        modules: ['./src', './node_modules']
    }
},
{
    name: "scss",
    cache: true,
    devtool: "eval-source-map",
    entry: {
        "amt-rating": "./src/sass/amt-rating.scss",
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: (!prod) ? '[name].css' : '[name].min.css'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: (prod) ? true : true,
                        sourceMap: (prod) ? false : true
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: (prod) ? false : true
                    }
                }
                ],
                // use style-loader in development
                //fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass,
    ],
    resolve: {
        extensions: ['js', '.scss', '.css'],
        modules: ['./src/scss', './node_modules']
    }
}];