//-------------------------------------------------------------------------join() – O(total string length)-----------------------------------------------------------------------
// join() converts an array into a string.

const names = ["React", "JavaScript", "Node"];
const result = names.join(", ");
console.log(result);

// Output:
// React, JavaScript, Node

// can also use:
[1, 2, 3].join("-"); // "1-2-3"

// Why is this useful?

// When you need to build a string from many array elements, join() is a convenient and efficient approach.
