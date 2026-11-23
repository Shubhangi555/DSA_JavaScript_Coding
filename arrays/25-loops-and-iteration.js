
/*
 * loops-and-iteration.js
 *
 * JavaScript interview notes: Loops, Iteration,
 * Array Iteration Methods, and Generators.
 *
 * Run:
 * node loops-and-iteration.js
 */

"use strict";

// ======================================================
// 1. TRADITIONAL FOR LOOP
// ======================================================

const numbers = [10, 20, 30, 40];

// Forward iteration
for (let i = 0; i < numbers.length; i++) {
  console.log("Index:", i, "Value:", numbers[i]);
}

// Reverse iteration
for (let i = numbers.length - 1; i >= 0; i--) {
  console.log("Reverse:", numbers[i]);
}

// Custom increment
for (let i = 0; i < 10; i += 2) {
  console.log("Step:", i);
}

// break and continue
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  if (i === 5) break;

  console.log(i);
}
// Output: 1, 2, 4

// Adjacent elements
for (let i = 0; i < numbers.length - 1; i++) {
  console.log(numbers[i], numbers[i + 1]);
}

/*
 * Use traditional for when:
 * - You need indexes.
 * - You need reverse traversal.
 * - You need custom increments.
 * - You need previous/next elements.
 * - You are implementing two-pointer algorithms.
 *
 * Time: O(n)
 * Extra space: O(1)
 */


// ======================================================
// 2. FOR...OF
// ======================================================

// for...of iterates over VALUES.

const fruits = ["Apple", "Mango", "Banana"];

for (const fruit of fruits) {
  console.log(fruit);
}

// Strings are iterable.
for (const char of "React") {
  console.log(char);
}

// break works with for...of.
for (const num of [10, 20, 30, 40]) {
  if (num === 30) break;

  console.log(num);
}
// Output: 10, 20

// Map iteration
const map = new Map([
  ["b", 2],
  ["a", 1]
]);

for (const [key, value] of map) {
  console.log(key, value);
}

/*
 * for...of works with:
 * - Arrays
 * - Strings
 * - Maps
 * - Sets
 * - Generators
 * - Other iterable objects
 *
 * It provides values, not indexes.
 */


// ======================================================
// 3. FOR...IN
// ======================================================

// for...in iterates over enumerable string KEYS.

const user = {
  name: "Alex",
  age: 25,
  city: "Mumbai"
};

for (const key in user) {
  console.log("Key:", key);
  console.log("Value:", user[key]);
}

// Bracket notation vs dot notation
const propertyName = "name";

console.log(user[propertyName]); // Alex
console.log(user.propertyName);  // undefined

// for...in with arrays
const array = [7, 8];

for (const key in array) {
  console.log(key, typeof key);
}

// Output:
// "0" string
// "1" string

// Inherited enumerable properties
const parent = {
  role: "Developer"
};

const employee = Object.create(parent);
employee.name = "Alex";

for (const key in employee) {
  console.log(key);
}

// Output:
// name
// role

// Filter only own properties
for (const key in employee) {
  if (Object.hasOwn(employee, key)) {
    console.log(key);
  }
}

// Output: name

// Better object iteration methods
console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));

// Iterate over keys and values together
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}

/*
 * IMPORTANT:
 *
 * for...in:
 * - Iterates over enumerable string keys.
 * - Includes inherited enumerable properties.
 * - Returns array indexes as strings.
 *
 * Avoid for...in with arrays.
 *
 * Prefer Object.keys(), Object.values(),
 * Object.entries() for own object properties.
 */


// ======================================================
// 4. FOREACH()
// ======================================================

const scores = [10, 20, 30];

scores.forEach((score, index, originalArray) => {
  console.log(score, index, originalArray);
});

/*
 * Callback parameters:
 *
 * score          -> Current element
 * index          -> Current index
 * originalArray  -> Original array
 */

// return only exits the current callback.
[10, 20, 30].forEach((num) => {
  if (num === 20) return;

  console.log(num);
});

// Output:
// 10
// 30

/*
 * IMPORTANT:
 *
 * forEach():
 * - Executes callback for every element.
 * - Returns undefined.
 * - Cannot use break or continue inside callback.
 * - return exits only the current callback.
 *
 * Use for...of, some(), every(), or find()
 * when early termination is required.
 */


// ======================================================
// 5. WHILE LOOP
// ======================================================

let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}

// Searching using while
const searchNumbers = [10, 20, 30, 40];

let index = 0;

while (
  index < searchNumbers.length &&
  searchNumbers[index] !== 30
) {
  index++;
}

console.log("Found index:", index); // 2

/*
 * while:
 * - Checks condition BEFORE execution.
 * - Can execute zero times.
 * - Useful when iteration count is unknown.
 *
 * Always update the condition variable
 * to avoid an infinite loop.
 */


// ======================================================
// 6. DO...WHILE LOOP
// ======================================================

let attempt = 1;

do {
  console.log(attempt);
  attempt++;
} while (attempt <= 3);

// Executes at least once.
let value = 10;

do {
  console.log("Executed once");
} while (value < 5);

/*
 * while:
 * Checks condition first.
 *
 * do...while:
 * Executes first, checks condition afterward.
 *
 * do...while always executes at least once.
 *
 * Remember the semicolon:
 * while (condition);
 */


// ======================================================
// 7. NESTED LOOPS, BREAK AND LABELS
// ======================================================

// Normal break exits only the nearest loop.

for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 3; j++) {
    if (j === 2) break;

    console.log(i, j);
  }
}

// Labelled break exits the labelled outer loop.

outer:
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    if (i === 2 && j === 2) {
      break outer;
    }

    console.log(i, j);
  }
}

// Labelled continue skips to the next outer iteration.

outerContinue:
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 3; j++) {
    if (j === 2) continue outerContinue;

    console.log(i, j);
  }
}

/*
 * break:
 * Exits nearest enclosing loop.
 *
 * break outer:
 * Exits labelled outer loop.
 *
 * continue:
 * Skips current iteration of nearest loop.
 *
 * continue outer:
 * Skips to next iteration of labelled outer loop.
 */


// ======================================================
// 8. SOME()
// ======================================================

// Checks whether AT LEAST ONE element matches.

const someNumbers = [10, 15, 20, 25];

const hasNumberAbove20 = someNumbers.some(
  num => num > 20
);

console.log(hasNumberAbove20); // true

/*
 * some():
 * - Returns boolean.
 * - Stops at first truthy predicate result.
 * - Empty array returns false.
 */


// ======================================================
// 9. EVERY()
// ======================================================

// Checks whether ALL elements match.

const evenNumbers = [2, 4, 6, 8];

const allEven = evenNumbers.every(
  num => num % 2 === 0
);

console.log(allEven); // true

const mixedNumbers = [10, 20, 3, 40];

const allAboveFive = mixedNumbers.every(num => {
  console.log("Checking:", num);

  return num > 5;
});

console.log(allAboveFive); // false

/*
 * every():
 * - Returns boolean.
 * - Stops at first falsy predicate result.
 * - Empty array returns true.
 */


// ======================================================
// 10
