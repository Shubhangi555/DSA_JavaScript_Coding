//---------------------------------------------------------------------------Searching methods – O(n)-------------------------------------------------
// These methods search through an array.

const numbers = [1, 2, 3, 4, 3, 7];
console.log(numbers.indexOf(3)); // 2 Find first index
console.log(numbers.includes(1)); // true check existence
console.log(numbers.lastIndexOf(3)); // 4 Find last matching index

// Why O(n)?

// Because JavaScript may need to check every element if the target is at the end or doesn't exist.

// [NaN].indexOf(NaN);  // -1
// [NaN].includes(NaN); // true

// That's an important interview distinction.
