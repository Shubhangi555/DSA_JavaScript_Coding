// sort() changes the original array.

// toSorted() creates a new sorted array without changing the original.

const original = [2, 1, 3];

const copy = original.sort((a, b)=> a-b);
console.log(copy); // [1, 2, 3]
console.log(original); // [1, 2, 3]

const original2 = [8, 7, 6];
const copy2 = original2.toSorted((a, b) => a-b);
console.log(copy2); // [6, 7, 8]
console.log(original2) // [8, 7, 6]

// But what does (a, b) => a - b mean?
// This is the sorting comparison function.
// (a, b) => a - b


// - Negative result: put a before b.
// - Positive result: put a after b.
// - Zero: their relative order is treated as equal by the comparator.


// For descending order:
const desc= [3, 1, 2].sort((a, b) => b - a);
console.log(desc); // [ 3, 2, 1 ]


//---------------------------------------------------Interview takeaway: sort() mutates; toSorted() returns a new array. toSorted() is available in modern JavaScript environments (ES2023).----------------------------------------------
