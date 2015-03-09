'use strict';

var grunt = require('grunt');

function readFile(file) {
  var contents = grunt.file.read(file);
  if (process.platform === 'win32') {
    contents = contents.replace(/\r\n/g, '\n');
  }
  return contents;
}

function assertFileEquality(test, pathToActual, pathToExpected, message) {
  var actual = readFile(pathToActual);
  var expected = readFile(pathToExpected);
  test.equal(expected, actual, message);
}

exports.json_mapreduce = {
  mapreduceArrays: function(test) {
    test.expect(1);

    assertFileEquality(test,
      'tmp/arrays.json',
      'test/expected/arrays.json',
      'Should join elements of all arrays into one array');

    test.done();
  },
  mapreduceObjects: function(test) {
    test.expect(1);

    assertFileEquality(test,
      'tmp/objects.json',
      'test/expected/objects.json',
      'Should rebuild all elements of all arrays (map phase) and join them into one array (reduce phase)');

    test.done();
  }
};
  