// map(), filter(), forEach(), reduce()

// map() – Transform every element
const numbers = [1, 2, 3, 4];
const result = numbers.map((x) => x * 2);
console.log(result); //[ 2, 4, 6, 8 ]
console.log(numbers); // [ 1, 2, 3, 4 ]

// filter() – Select matching elements
const result2 = numbers.filter((x) => x > 2);
console.log(result2); // [3, 4]
console.log(numbers); // [ 1, 2, 3, 4 ]

// forEach() – Execute an operation for every element
const result3 = numbers.forEach((x) => x < 2);
console.log(result3); // undefined

// why undefined?
// forEach() visits every element:
// Iteration	x	x < 2	Result
// 1	1	true	true
// 2	2	false	false
// 3	3	false	false
// 4	4	false	false

// You might expect [true, false, false, false], but forEach() doesn't collect callback return values.

// It simply executes the callback for each element.

// reduce() – Combine elements into one value
const result4 = numbers.reduce((sum, x) => sum + x, 0);
console.log(result4); // 10


// All four generally take O(n) time, multiplied by the cost of their callback operations.

// Important pitfalls:
// - map() creates a new array.
// - filter() creates a new array.
// - forEach() returns undefined and cannot be stopped using break.
// - reduce() can throw on an empty array without an initial value.
// - These methods skip empty array slots (holes).
