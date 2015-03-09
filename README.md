# grunt-json-mapreduce

Grunt task performing custom functions on JSON files

<p/>
<img src="https://nodei.co/npm/grunt-json-mapreduce.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/tkoomzaaskz/grunt-json-mapreduce.png" alt=""/>

## usage

The most important thing to define in this plugin is map and reduce functions
that will be applied to all JSON files. They have to conform to
[Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Map)
and [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
prototype functions.

### basic example

Reads all JSON files that are assumed to contain arrays. The original data is
unchanged (map function doesn't alter anything). The reduce function merges
elements of all arrays. And that's it.

    grunt.initConfig({
        'json-mapreduce': {
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
        'json-mapreduce': {
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
