# grunt-json-mapreduce v0.1.5 [![Build Status: Linux](https://travis-ci.org/tkoomzaaskz/grunt-json-mapreduce.svg?branch=master)](https://travis-ci.org/tkoomzaaskz/grunt-json-mapreduce)

> Grunt task performing custom functions on JSON files



## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-json-mapreduce --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-json-mapreduce');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-coffee/tree/grunt-0.3-stable).*


## Json-mapreduce task
_Run this task with the `grunt json-mapreduce` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

[![grunt-json-mapreduce npm module](https://nodei.co/npm/grunt-json-mapreduce.png?downloads=true&stars=true "grunt-json-mapreduce npm module")](https://www.npmjs.com/package/grunt-json-mapreduce)

![grunt-json-mapreduce dependency status](https://david-dm.org/tkoomzaaskz/grunt-json-mapreduce.png "grunt-json-mapreduce dependency status")

Provides the `map` and `reduce` options as functions that will be applied to all
JSON files, according to [MapReduce algorithm](http://en.wikipedia.org/wiki/MapReduce).
In the first phase, all input (grunt `src`) JSON files contents are processed by
`map` function. In the second phase, their results are processed by `reduce`
function to be merged into the final result, which is stored in the `dest`
grunt-specified file.

### Options

#### map
Type: `function`
Required

Each input JSON file content will be processed by `map` function. It has to conform to
[Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Map)
prototype function, i.e. it will rely on following declaration: `function (currentValue, index, array)`.

Given the `map` function:

    function name(currentValue) {
        return { "name": currentValue.firstname + " " + currentValue.lastname };
    }

the following JSON file:

    { "firstname": "Paul", "lastname": "McCartney" }

will be processed into:

    { "name": "Paul McCartney" }

In above example `index` and `array` function parameters are ignored. In other
examples, however, they might be used to perform more complex _mapreduce_
operations.

By default, the `map` function uses `examples.map.pass`, which doesn't change
the elements.

#### reduce
Type: `function`
Required

Having all elements processed by `map` function, they will be merged into final
result by the `reduce` function. It has to conform to
[Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
prototype function, i.e. it will rely on following declaration: `function (previousValue, currentValue, index, array)`.

Given the `reduce` function:

    function sum(previousValue, currentValue) {
        if (typeof previousValue === "undefined") {
            return currentValue;
        } else {
            return previousValue + currentValue;
        }
    }

the following elements (products of `map` processing):

    [ 1, 4, 10]

will be merged into:

    15

In above example `index` and `array` function parameters are ignored. In other
examples, however, they might be used to perform more complex _mapreduce_
operations.

There is no default `reduce` function.

#### debug
Type: `function`
Optional

The debug function, used only in development phase. It is used to output
additional information about JSON input files to the console. It accepts three
parameters:
 * `grunt`, the grunt environment object
 * `file`, absolute path to the file being processed
 * `value`, the single value:

The function header is:

    function(grunt, file, value)

Example function might just log the value to the grunt console:

    function (grunt, file, value) {
        grunt.log.ok("Value in " + file + ":" + value);
    }

### Usage Examples

If you want to leave input JSON files unmodified before reduce phase, use
following map function:

    function (el){ return el; }

#### basic example

Reads all JSON files that are assumed to contain arrays. The original data is
unchanged (map function doesn't alter anything). The reduce function merges
elements of all arrays. And that's it.

    grunt.initConfig({
        json_mapreduce: {
            target: {
                src: ['path/to/files/**/*.json'],
                dest: 'path/to/dest/file.json',
                options: {
                    map: function (currentValue, index, array) {
                        return currentValue;
                    },
                    reduce: function (previousValue, currentValue, index, array) {
                        if (typeof previousValue === "undefined") {
                            return currentValue;
                        } else {
                            return previousValue.concat(currentValue);
                        }
                    }
                }
            }
        }
    });

This grunt task comes bundled with example functions you may re-use. Simply,
require the `examples` module in your Gruntfile:

    var examples = require('./node_modules/grunt-json-mapreduce/examples');

and re-use the functions, according to the file structure:

    grunt.initConfig({
        json_mapreduce: {
            target: {
                src: ['path/to/files/**/*.json'],
                dest: 'path/to/dest/file.json',
                options: {
                    map: examples.map.pass,
                    reduce: examples.reduce.concat,
                    debug: examples.debug.log
                }
            }
        }
    });

You may also use the default `map` function, `examples.map.pass`, which doesn't
alter an element value:

    var examples = require('./node_modules/grunt-json-mapreduce/examples');
    grunt.initConfig({
        json_mapreduce: {
            target: {
                src: ['path/to/files/**/*.json'],
                dest: 'path/to/dest/file.json',
                options: {
                    reduce: examples.reduce.concat,
                    debug: examples.debug.log
                }
            }
        }
    });

#### slightly advanced example

This example also assumes JSON files to contain arrays of elements. There is an
`idAutoIncrement` variable outside the scope that will hold the current next
value of the id. So each element of each array will be modified inside map.
Additionally, there is debug function defined that displays pre-map array length.

    var idAutoIncrement = 0;
    grunt.initConfig({
        json_mapreduce: {
            target: {
                src: ['path/to/files/**/*.json'],
                dest: 'path/to/dest/file.json',
                options: {
                    map: function (currentValue, index, array) {
                        return currentValue.map(function (element) {
                            element.id = ++idAutoIncrement;
                            return element;
                        });
                    },
                    reduce: function (previousValue, currentValue, index, array) {
                        if (typeof previousValue === "undefined") {
                            return currentValue;
                        } else {
                            return previousValue.concat(currentValue);
                        }
                    },
                    debug: function (grunt, file, value) {
                        grunt.log.oklns("Elements in " + file + ": " + value.length);
                    }
                }
            }
        }
    });

## Release History

 * 2015-04-14   v0.1.5   file available in debug function
 * 2015-04-12   v0.1.4   Example functions documentation.
 * 2015-04-12   v0.1.3   Better console output. Example functions bundled with grunt task.
 * 2015-03-13   v0.1.2   Unified docs.
 * 2015-03-10   v0.1.1   Improved docs. Automatic tests added. Grunt-contrib-internal standard used to build.
 * 2015-03-08   v0.1.0   Fully working mapreduce algorithm. First official release.

---

Task submitted by [Tomasz Ducin](http://ducin.it)

*This file was generated on Tue Apr 14 2015 09:44:23.*
