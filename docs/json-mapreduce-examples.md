# Usage Examples

If you want to leave input JSON files unmodified before reduce phase, use
following map function:

    function (el){ return el; }

## basic example

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

## slightly advanced example

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