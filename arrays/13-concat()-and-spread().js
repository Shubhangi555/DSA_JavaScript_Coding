//--------------------------------------------------------------------------------concat() and spread operator – O(n + m)------------------------------------------
// Both combine arrays and create a new array.

// Using concat():
const a = [1, 2];
const b = [3, 4];
const c = a.concat(b);
console.log(c); // [ 1, 2, 3, 4 ]

// Using spread:
const d = [...a , ...b];
console.log(d); // [ 1, 2, 3, 4 ]

// Why O(n + m)?

// Because JavaScript needs to copy elements from both arrays into a new array.

// Neither modifies the original arrays.
