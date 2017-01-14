module.exports = function(config) {
    config.set({
        browserNoActivityTimeout: 30000,
        frameworks: ["mocha", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" },
            { pattern: "test/*.ts" }
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"], // *.tsx for React Jsx 
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Safari"]
    });
};