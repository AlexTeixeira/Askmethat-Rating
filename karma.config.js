var webpackConfig = require('./webpack.config.js');
var path = require('path');

module.exports = function (config) {
    var configuration = {
        browserNoActivityTimeout: 30000,
        frameworks: ["mocha", "chai"],
        files: [
            "test/*.spec.ts"
        ],
        preprocessors: {
            "test/*.spec.ts": ["webpack", "coverage"],
        },
        mime: {
            'text/x-typescript': ['ts']
        },
        webpack: webpackConfig[0],
        webpackMiddleware: {
            stats: "errors-only"
        },
        coverageReporter:{
            reporters:[
                { type: 'lcov', subdir: '' },
            ]
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        reporters: ["progress", "coverage"],
        browsers: ["Chrome"],
        plugins: [
            require('karma-webpack'),
            require("karma-mocha"),
            require("karma-chai"),
            require("karma-coverage"),
            require("karma-chrome-launcher")]
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};