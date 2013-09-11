module.exports = function (config) {
    config.set({
        basePath : '../',
        frameworks : ['mocha', 'requirejs'],
        browsers : ['Chrome_without_security'],
        files : ['test/test-main.js', {
            pattern : 'src/**/*.js',
            included : false
        }, {
            pattern : 'components/**/*.js',
            included : false
        }, {
            pattern : 'test/specs/**/*.js',
            included : false
        }],
        preprocessors : {
            'src/**/*.js' : 'coverage'
        },
        reporters : ['progress', 'junit', 'coverage'],
        junitReporter : {
            outputFile : 'test/test_out/test-results.xml'
        },
        coverageReporter : {
            type : 'html',
            dir : 'test/test_out/coverage/'
        },
        customLaunchers : {
            Chrome_without_security : {
                base : 'Chrome',
                flags : ['--disable-web-security']
            }
        }
    });
};
