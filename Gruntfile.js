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
                tasks : ['jslint', 'karma:unit:run']
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
            unit : {
                configFile : '<%= paths.test %>/karma.conf.js',
                singleRun : true
            }
        }
    });

    grunt.registerTask('server', [
        'karma',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jslint',
        'karma:unit'
    ]);
};
