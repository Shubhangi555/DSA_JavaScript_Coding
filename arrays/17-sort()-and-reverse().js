//--------------------------------------------------------------------------sort() and reverse() – O(n log n) and O(n)----------------------------------------------
// sort() – Sort elements
const numbers = [30, 10, 20];

const result = numbers.sort((a, b) => a-b);
console.log(result); // [10, 20, 30]
console.log(numbers); // [10, 20, 30]

// Important: sort() mutates the original array.

// Also, default sorting treats values as strings.
// const numbers = [1, 20, 3];
// numbers.sort();
// console.log(numbers);
// // [1, 20, 3]
// This happens because default sorting compares string representations.

// For numeric sorting, use:
// numbers.sort((a, b) => a - b);

// reverse() – Reverse the order

const nums = [1, 2, 3];
nums.reverse();
console.log(nums); // [3, 2, 1]

// It also modifies the original array.
