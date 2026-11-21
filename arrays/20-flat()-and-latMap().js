//----------------------------------------------------------------------------------flat() and flatMap()-----------------------------------------------------------------------------------------------------
// These methods work with nested arrays.

// flat() – Flatten nested arrays

const nums = [1, [2,3], [4,5]]
const result = nums.flat();
console.log(result); // [ 1, 2, 3, 4, 5 ]

// By default, flat() flattens one level.

// For deeper nesting:

const nums2 = [1, [2, [3, 4]]]
const result2= nums2.flat(2);
console.log(result2); // [ 1, 2, 3, 4 ]

// For all levels:
// numbers.flat(Infinity);

// flatMap() – Map and flatten one level

const numbers = [1, 2, 3];
const result = numbers.flatMap(x => [x, x * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]

// It first maps each element to an array and then flattens one level.
