/**
 * grunt-json-mapreduce is a Grunt plugin for performing custom functions on JSON files
 *
 * @see https://github.com/tkoomzaaskz/grunt-json-mapreduce
 *
 * @author Tomasz Ducin <tomasz.ducin@gmail.com> (https://github.com/tkoomzaaskz)
 * @copyright © 2015 Tomasz Ducin
 * @license MIT https://raw.github.com/tkoomzaaskz/grunt-json-mapreduce/blob/master/LICENSE
 */

'use strict';

module.exports = {
    map: {
        pass: function pass(currentValue/*, index, array*/) {
            return currentValue;
        }
    },
    reduce: {
        sum: function sum(previousValue, currentValue/*, index, array*/) {
            if (typeof previousValue === "undefined") {
                return currentValue;
            } else {
                return previousValue + currentValue;
            }
        },
        concat: function (previousValue, currentValue/*, index, array*/) {
            if (typeof previousValue === "undefined") {
                return currentValue;
            } else {
                return previousValue.concat(currentValue);
            }
        }
    },
    debug: {
        log: function (grunt, value) {
            grunt.log.oklns("Value:" + value);
        },
        logStringify: function (grunt, value) {
            grunt.log.oklns("Value:" + JSON.stringify(value));
        }
    }
};
