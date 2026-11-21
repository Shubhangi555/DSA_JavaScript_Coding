//--------------------------------------------------------------shift() and unshift() – O(n)--------------------------------------------------------------
// These operate at the beginning.

// shift() removes the first element.

const arr = [10, 20, 30];
arr.shift();
console.log(arr); // [ 20, 30 ]

// unshift() adds an element at the beginning.
arr.unshift(4);
console.log(arr); //[ 4, 20, 30 ]


// O(n)
// Why?

// Because the remaining elements need to move to different indexes.

// DSA tip: Avoid repeatedly using shift() in a loop for queue operations on large arrays. A head pointer or proper queue structure is often more efficient.
