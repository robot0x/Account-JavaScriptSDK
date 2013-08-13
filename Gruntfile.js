'use strict';

var LIVERELOAD_PORT = 35729;

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app : 'src',
        dist : 'dist'
    };

    grunt.initConfig({
        yeoman : yeomanConfig,
        requirejs : {
            dist : {
                options : {
                    optimize : 'uglify',
                    uglify : {
                        toplevel : true,
                        ascii_only : false,
                        beautify : false
                    },
                    preserveLicenseComments : true,
                    useStrict : false,
                    wrap : true
                }
            },
            source : {
                options : {
                    appDir : '<%= yeoman.app %>',
                    dir :　'<%= yeoman.dist %>',
                    optimize : 'uglify',
                    uglify : {
                        toplevel : true,
                        ascii_only : false,
                        beautify : false
                    },
                    preserveLicenseComments : true,
                    useStrict : false,
                    wrap : true
                }
            }

        },
        mocha: {
          test: {
            src: [ 'test/index.html' ],
            options: {
              // Bail means if a test fails, grunt will abort. False by default.
              bail: true,

              // Pipe output console.log from your JS to grunt. False by default.
              log: true,

              // mocha options
              mocha: {
                ignoreLeaks: false,
                grep: 'food'
              },

              // Select a Mocha reporter
              // http://visionmedia.github.com/mocha/#reporters
              reporter: 'Nyan',

              // Indicates whether 'mocha.run()' should be executed in
              // 'bridge.js'. If you include `mocha.run()` in your html spec,
              // check if environment is PhantomJS. See example/test/test2.html
              run: false,

              // Override the timeout of the test (default is 5000)
              timeout: 10000
            }
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
                    predef: [ // array of pre-defined globals
                        'define', 'require'
                    ]
                },
                options : {
                    errorsOnly : true
                }
            }
        }
    });

    grunt.registerTask('build', [
    ]);

    grunt.registerTask('test', function () {
        grunt.task.run('mocha:test');
    });
};
