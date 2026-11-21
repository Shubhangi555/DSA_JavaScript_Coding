//---------------------------------------------------------------------------fill() – O(n)--------------------------------------------------------------

// It fills an array with a particular value.
const numbers = new Array(5).fill(0);
console.log(numbers); // [0, 0, 0, 0, 0]

// It mutates the original array.

// Important pitfall:
const grid = new Array(3).fill([0, 0, 0]);
grid[0][0] = 1;
console.log(grid);

// All rows appear changed because they share the same array reference.

// Correct approach:
const grid = Array.from(
    { length: 3 },
    () => new Array(3).fill(0)
);

// Array.from() – O(n)
// Creates a new array from an iterable or array-like object.

// Example 1: From a string.
const result = Array.from("hello");
console.log(result); // ["h", "e", "l", "l", "o"]

// Example 2: Create an array with 5 numbers.
const result = Array.from(
    { length: 5 },
    (_, i) => i
);
console.log(result); // [0, 1, 2, 3, 4]

// Here:
// - _ represents the current value (unused here).
// - i represents the current index.

// Example 3: Create a 2D array.
const grid = Array.from(
    { length: 3 },
    () => new Array(3).fill(0)
);

// This creates three independent rows.
