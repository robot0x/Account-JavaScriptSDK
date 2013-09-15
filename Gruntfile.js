'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var pathsConfig = {
        app : 'src',
        dist : 'dist',
        tmp : '.tmp',
        test : 'test'
    };

    grunt.initConfig({
        paths : pathsConfig,
        watch : {
            jstest : {
                files : ['<%= paths.app %>/**/*.js'],
                tasks : ['jslint', 'karma:server:run']
            }
        },
        jslint : {
            sources : {
                src : [
                    'src/*.js'
                ],
                directives : {
                    sloppy : true,
                    vars : true,
                    nomen : true,
                    devel : true,
                    browser : true,
                    indent : 4,
                    unparam: true,
                    plusplus : true,
                    todo : true,
                    bitwise :  true,
                    stupid : true,
                    evil : true,
                    regexp : true,
                    ass : true,
                    predef : [
                        'define', 'require'
                    ]
                },
                options : {
                    errorsOnly : true
                }
            }
        },
        karma : {
            options : {
                configFile : '<%= paths.test %>/karma.conf.js',
                browsers : ['Chrome_without_security'/*, 'Firefox','Safari', 'Opera'*/]
            },
            server : {
                reporters : ['progress'],
                background : true
            },
            unit : {
                reporters : ['progress', 'junit', 'coverage'],
                preprocessors : {
                    'src/**/*.js' : 'coverage'
                },
                junitReporter : {
                    outputFile : 'test/test_out/test-results.xml'
                },
                coverageReporter : {
                    type : 'html',
                    dir : 'test/test_out/coverage/'
                },
                singleRun : true
            },
            travis : {
                browsers : ['PhantomJS'],
                reporters : ['progress'],
                singleRun : true
            }
        },
        clean : {
            dist : ['<%= paths.tmp %>', '<%= paths.dist %>']
        },
        uglify: {
            dist: {
                files: {
                    '<%= paths.dist %>/snappea-account-sdk.js': ['components/q/q.js', '<%= paths.app %>/snappea-account-sdk.js']
                }
            }
        }
    });

    grunt.registerTask('server', [
        'karma:server',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jslint',
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('test:travis', [
        'jslint',
        'karma:travis'
    ]);
};
