# grunt-json-mapreduce v0.1.1 [![Build Status: Linux](https://travis-ci.org/tkoomzaaskz/grunt-json-mapreduce.svg?branch=master)](https://travis-ci.org/tkoomzaaskz/grunt-json-mapreduce)

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

<p/>
<img src="https://nodei.co/npm/grunt-json-mapreduce.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/tkoomzaaskz/grunt-json-mapreduce.png" alt=""/>

Provide the `map` and `reduce` options as functions that will be applied to all
JSON files, according to [http://en.wikipedia.org/wiki/MapReduce](MapReduce algorithm).
In the first phase, all input JSON files content are processed by `map` function.
In the second phase, their results are processed by `reduce` function to be
merged into the final result.

### Options

#### map
Type: `function`
Default: `function (el){ return el; }`
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

By default, the `map` function doesn't change the elements.

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
additional information about JSON input files to the console.

### basic example

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

### slightly advanced example

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
                    debug: function (value) {
                        grunt.log.oklns("Elements: " + value.length);
                    }
                }
            }
        }
    });

## Release History

 * 2015-03-09   v0.1.0   fully working mapreduce algorithm first official release

---

Task submitted by [Tomasz Ducin](http://ducin.it)

*This file was generated on Tue Mar 10 2015 12:26:49.*
