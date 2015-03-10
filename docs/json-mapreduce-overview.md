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
