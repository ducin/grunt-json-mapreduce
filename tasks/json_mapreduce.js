'use strict';

/**
 * grunt-json-mapreduce is a Grunt plugin for performing custom functions on JSON files
 *
 * @see https://github.com/tkoomzaaskz/grunt-json-mapreduce
 *
 * @author Tomasz Ducin <tomasz.ducin@gmail.com> (https://github.com/tkoomzaaskz)
 * @copyright © 2015 Tomasz Ducin
 * @license MIT https://raw.github.com/tkoomzaaskz/grunt-json-mapreduce/blob/master/LICENSE
 */

var path = require('path');

module.exports = function (grunt) {
    grunt.registerMultiTask('json_mapreduce', 'Performs custom functions on JSON files', function () {
        var options = this.options();
        this.files.forEach(function (f) {
            var cwd = path.normalize(f.orig.cwd || ''),
                cwdAbs = path.resolve(cwd || '.'),
                expand = !!f.orig.expand;
            var result = f.src.map(function (file) {
                file = path.normalize(file);
                return path.resolve(cwdAbs, (expand && cwd.length && (file.indexOf(cwd + path.sep) === 0)) ? file.substr(cwd.length + path.sep.length) : file);
            }).filter(function (file) {
                if (!grunt.file.exists(file)) {
                    grunt.log.warn('Source file "' + file + '" not found.');
                    return false;
                } else {
                    grunt.log.ok('Reading file ' + file + '.');
                    return true;
                }
            }).map(function(file){
                var content = grunt.file.readJSON(file);
                if (options.debug) {
                    options.debug(content);
                }
                return content;
            }).map(options.map).reduce(options.reduce);
            var destination = path.normalize(f.orig.dest);
            grunt.log.ok('Writing file ' + destination + '.');
            grunt.file.write(destination, JSON.stringify(result));
        });
    });
};
