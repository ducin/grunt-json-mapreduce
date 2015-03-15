# Options

## map
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

By default, the `map` function doesn't change the elements.

## reduce
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

## debug
Type: `function`
Optional

The debug function, used only in development phase. It is used to output
additional information about JSON input files to the console.
