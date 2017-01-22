module.exports = function(config) {
    var configuration = {
        browserNoActivityTimeout: 30000,
        frameworks: ["mocha", "karma-typescript", "chai"],
        files: [
            { pattern: "src/**/*.ts" },
            { pattern: "test/*.ts" }
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"], 
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        reporters: ["progress", "karma-typescript", "coverage"],
        browsers: ["Chrome"],
        coverageReporter: {
            type : 'lcov',
            dir : 'coverage'
        }   
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};