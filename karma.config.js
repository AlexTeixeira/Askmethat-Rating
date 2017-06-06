var webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
    var configuration = {
        basePath: './',
        browserNoActivityTimeout: 30000,
        frameworks: ["mocha", "chai", "karma-typescript"],
        files: [
            "test/amt-rating.spec.ts",
            "src/ts/amt-rating.ts"
        ],
        preprocessors: {
            'src/ts/amt-rating.ts': ['karma-typescript', "sourcemap", "coverage"],
            "test/amt-rating.spec.ts": ['karma-typescript', "sourcemap"]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: "errors-only"
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        reporters: ["progress", 'coverage', "karma-typescript"],
        coverageReporter: {
            dir: 'coverage',
            type: "lcov"
        },
        browsers: ["Chrome"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: true,
        concurrency: Infinity,
        plugins: [
            require("karma-mocha"),
            require("karma-chai"),
            require("karma-webpack"),
            require("karma-coverage"),
            require("karma-chrome-launcher"),
            require("karma-sourcemap-loader"),
            require("istanbul-instrumenter-loader"),
            require("karma-typescript")
        ]
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};