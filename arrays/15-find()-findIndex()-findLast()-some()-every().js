// find(), findIndex(), findLast(), some(), every()

// All these methods examine array elements against a condition.
const numbers = [10, 20, 30, 40, 50];

// find() – Returns the first matching element.
const result = numbers.find((x)=> x > 25);
console.log(result); //30

// findIndex() – Returns the index of the first match.
const result2 = numbers.findIndex((x) => x > 25);
console.log(result2); // 2

// findLast() – Returns the last matching element.
const result3= numbers.findLast((x) => x > 25);
console.log(result3); //50

// some() – Checks whether at least one element matches.
const result4 = numbers.some((x) => x > 25);
console.log(result4); //true

// every() – Checks whether all elements match.
const result5 = numbers.every((x) => x > 25);
console.log(result5); //false


// One-line differences
// Method	Returns
// find()	Element
// findIndex()	Index
// findLast()	Last matching element
// some()	Boolean
// every()	Boolean


// All have O(n) worst-case time complexity because they may need to inspect the entire array.

// However, they can stop early when they find a result.
