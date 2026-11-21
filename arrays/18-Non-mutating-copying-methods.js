// These methods are particularly useful in React because they help avoid modifying existing arrays.

// Original method	Copying version
// sort()	        toSorted()
// reverse()	    toReversed()
// splice()	        toSpliced()

const numbers = [3, 1, 2];
const sorted = numbers.toSorted((a, b) => a - b);
console.log(numbers); // [3, 1, 2]
console.log(sorted);  // [1, 2, 3]


// Another method is with():
const numbers2 = [10, 20, 30];
const updated = numbers2.with(1, 99);
console.log(updated); // [10, 99, 30]
console.log(numbers2); // [10, 20, 30]

// It creates a new array with the specified index replaced.

const numbers3 = [3, 1, 2];
const sorted2 = numbers3.toReversed();
console.log(numbers3); // [3, 1, 2]
console.log(sorted2);  // [2, 1, 3]

const numbers4 = [3, 1, 2];
const sorted3 = numbers4.toSpliced(1, 2);
console.log(numbers4); // [3, 1, 2]
console.log(sorted3);  // [3] 1.Start at index 1 2. Delete 2 elements

// These methods take O(n) overall because they produce a new array, in addition to the underlying operation.
