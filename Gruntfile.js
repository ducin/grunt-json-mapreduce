/*
 * grunt-json-mapreduce
 * https://github.com/ducin/grunt-json-mapreduce
 *
 * Copyright (c) 2015 Tomasz Ducin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var examples = require('./examples');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    clean: {
      tmp: ['tmp'],
    },

    json_mapreduce: {
        arrays: {
            src: ['test/fixtures/arrays/**/*.json'],
            dest: 'tmp/arrays.json',
            options: {
                // map: function (currentValue, index, array)
                // let map be the default (examples.map.pass)
                // reduce: function (previousValue, currentValue, index, array)
                reduce: examples.reduce.concat,
                // debug: function (grunt, value)
                debug: examples.debug.log
            }
        },
        objects: {
            src: ['test/fixtures/objects/**/*.json'],
            dest: 'tmp/objects.json',
            options: {
                // map: function (currentValue, index, array)
                map: function (currentValue) {
                    return currentValue.map(function(el){
                        return { "name": el.firstname + " " + el.lastname };
                    });
                },
                // reduce: function (previousValue, currentValue, index, array)
                reduce: function (previousValue, currentValue) {
                    if (typeof previousValue === "undefined") {
                        return currentValue;
                    } else {
                        return previousValue.concat(currentValue);
                    }
                }
            }
        }

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the 'test' task is run, first run jshint, clean the placeholder,
  // then run this plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'json_mapreduce', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);
};
