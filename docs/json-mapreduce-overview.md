Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

[![grunt-json-mapreduce npm module](https://nodei.co/npm/grunt-json-mapreduce.png?downloads=true&stars=true "grunt-json-mapreduce npm module")](https://www.npmjs.com/package/grunt-json-mapreduce)

[![Dependency Status](https://david-dm.org/ducin/grunt-json-mapreduce/status.svg)](https://david-dm.org/ducin/grunt-json-mapreduce)
[![devDependency Status](https://david-dm.org/ducin/grunt-json-mapreduce/dev-status.svg)](https://david-dm.org/ducin/grunt-json-mapreduce#info=devDependencies)

Provides the `map` and `reduce` options as functions that will be applied to all
JSON files, according to [MapReduce algorithm](http://en.wikipedia.org/wiki/MapReduce).
In the first phase, all input (grunt `src`) JSON files contents are processed by
`map` function. In the second phase, their results are processed by `reduce`
function to be merged into the final result, which is stored in the `dest`
grunt-specified file.

[![Map-Reduce example](/docs/map-reduce-example.png "Map-Reduce example")](https://twitter.com/stilkov/status/516320745950306305)
