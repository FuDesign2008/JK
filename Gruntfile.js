/*jshint node: true */
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: './.jshintrc'
            },
            source: ['./Gruntfile.js', './src/**/*.js']
        },

        githooks: {
            all: {
                'pre-commit': 'jshint:source'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-githooks');


    grunt.registerTask('default', [
        'jshint:source'
    ]);
};

