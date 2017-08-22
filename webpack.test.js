var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                include: [
                    path.resolve(__dirname, 'src/ts'),
                    path.resolve(__dirname, 'test')
                ],
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                use: "source-map-loader"
            },
            {
                enforce: 'post',
                test: /\.ts$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    'node_modules'
                ]
            }
        ]
    },
    stats: "verbose",
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: null, // if no value is provided the sourcemap is inlined
            test: /\.(ts|js)($|\?)/i // process .js and .ts files only
        })
    ],
    resolve: {
        extensions: [".ts", ".js"],
    }
};