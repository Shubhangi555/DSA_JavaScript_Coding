
/*
=========================================================
 JAVASCRIPT DSA — SPREAD, REST AND DESTRUCTURING
=========================================================

Topics:
1. Spread syntax with arrays
2. Shallow copy vs deep copy
3. Combining arrays and adding elements
4. Spread inside recursion — O(n²) trap
5. Efficient recursion using push and pop
6. Rest parameters
7. Spread vs Rest
8. Large argument limit — Math.max(...arr)
9. Array destructuring
10. Object destructuring
11. Default values — undefined vs null
12. Rest in array and object destructuring
13. Destructuring in function parameters
14. Variable swapping
15. Returning multiple values
16. Time and space complexity
17. Common interview mistakes

=========================================================
*/

// =======================================================
// 1. SPREAD SYNTAX — COPYING AN ARRAY
// =======================================================

// Spread (...) expands elements of an iterable.
//
// [...arr] creates a NEW array containing the elements
// of the original array.
//
// Important:
// - Original array is not modified.
// - New array has a different reference.
// - Copy is SHALLOW, not deep.

const original = [10, 20, 30];

const copied = [...original];

console.log(original); // [10, 20, 30]
console.log(copied);   // [10, 20, 30]

console.log(original === copied); // false

// Time complexity: O(n)
// Space complexity: O(n)


// =======================================================
// 2. SHALLOW COPY VS DEEP COPY
// =======================================================

// Spread copies only the outer array.
// Nested objects are still shared references.

const users = [
  10,
  20,
  { name: "Alex" }
];

const usersCopy = [...users];

// Changing a primitive element in the copied array
// does not affect the original array.
usersCopy[0] = 100;

console.log(users[0]);     // 10
console.log(usersCopy[0]); // 100

// But the nested object is shared.
usersCopy[2].name = "John";

console.log(users[2].name);     // John
console.log(usersCopy[2].name); // John

// Why?
// Both arrays reference the SAME nested object.
//
// Shallow copy:
// Outer array -> new reference
// Nested object -> shared reference
//
// For supported data structures, structuredClone()
// can create a deeper copy, including circular references.
// It has limitations for functions and some other values.


// =======================================================
// 3. COMBINING ARRAYS USING SPREAD
// =======================================================

const frontend = ["HTML", "CSS", "JavaScript"];
const backend = ["Node.js", "Java"];

const skills = [...frontend, ...backend];

console.log(skills);
// ["HTML", "CSS", "JavaScript", "Node.js", "Java"]

// Adding elements without modifying the original:

const numbers = [1, 2, 3];

const result = [...numbers, 4, 5];

console.log(result);  // [1, 2, 3, 4, 5]
console.log(numbers); // [1, 2, 3]


// =======================================================
// 4. SPREAD INSIDE RECURSION — O(n²) TRAP
// =======================================================

// Every recursive call creates a new array.
// It copies the existing path.
//
// For n recursive additions:
// 0 + 1 + 2 + ... + (n - 1)
// Total copying = O(n²)

function pathsSpread(n, path = []) {
  if (n === 0) {
    return [path];
  }

  return pathsSpread(n - 1, [...path, n]);
}

console.log(pathsSpread(3));
// [[3, 2, 1]]

// Dry run for pathsSpread(3):
//
// Call 1: [...[], 3]       -> [3]
// Call 2: [...[3], 2]      -> [3, 2]
// Call 3: [...[3, 2], 1]   -> [3, 2, 1]
// Call 4: n === 0          -> return [[3, 2, 1]]
//
// Total copying: 0 + 1 + 2 = 3 elements.
//
// Time complexity: O(n²)
// Auxiliary copying space across operations: O(n²) total
// Active recursion/path space: O(n)


// =======================================================
// 5. EFFICIENT RECURSION — MUTATE AND BACKTRACK
// =======================================================

// Instead of copying the path at every recursive call,
// reuse one array with push() and pop().
//
// Copy only when preserving the final result.

function pathsEfficient(n, path = []) {
  if (n === 0) {
    return [[...path]];
  }

  path.push(n);

  const result = pathsEfficient(n - 1, path);

  path.pop();

  return result;
}

console.log(pathsEfficient(3));
// [[3, 2, 1]]

// push() adds an element.
// pop() removes the last element.
//
// For this example:
// Time complexity: O(n)
// Auxiliary path and recursion space: O(n)
// Returned output also requires O(n) space.
//
// Remember:
// Backtracking restores the shared path before returning.


// =======================================================
// 6. REST PARAMETERS
// =======================================================

// Rest parameters collect multiple function arguments
// into a real JavaScript array.
//
// Syntax: function name(...parameters)
//
// The rest parameter must ALWAYS be last.

function sum(...numbers) {
  console.log(numbers);

  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(10, 20, 30));
// [10, 20, 30]
// 60

console.log(sum());
// []
// 0

// Rest parameters collect zero or more arguments.
// The collected value is always an array.


// =======================================================
// 7. REST WITH NORMAL PARAMETERS
// =======================================================

function introduce(name, ...skills) {
  console.log(name);
  console.log(skills);
}

introduce("Alex", "React", "JavaScript", "Java");

// Alex
// ["React", "JavaScript", "Java"]

// name receives the first argument.
// skills collects all remaining arguments.
//
// Valid:
// function test(a, b, ...rest) {}
//
// Invalid:
// function test(...rest, b) {}
//
// Rest must be the final parameter.


// =======================================================
// 8. SPREAD VS REST
// =======================================================

// SPREAD:
// Expands elements.
//
// REST:
// Collects elements.

const arr = [10, 20, 30];

// Spread — expands array elements.
console.log(Math.max(...arr)); // 30

// Rest — collects function arguments.
function collect(...values) {
  return values;
}

console.log(collect(10, 20, 30));
// [10, 20, 30]

// Same syntax (...), different purpose.
//
// Spread examples:
// [...arr]
// Math.max(...arr)
// [...arr1, ...arr2]
//
// Rest examples:
// function test(...args)
// const [first, ...remaining] = arr
// const { name, ...details } = user


// =======================================================
// 9. LARGE ARGUMENT LIMIT — Math.max(...arr)
// =======================================================

// Math.max(...arr) expands every array element into
// a separate function argument.
//
// JavaScript engines have practical argument-count limits.
// The exact limit is engine-dependent.
//
// Very large arrays can cause a RangeError.
//
// Risky for huge arrays:
// Math.max(...largeArray);

// Safer approach: reduce()

function maxOf(arr) {
  return arr.reduce(
    (max, num) => (num > max ? num : max),
    -Infinity
  );
}

console.log(maxOf([10, 50, 20, 80])); // 80

console.log(maxOf([])); // -Infinity

// Why -Infinity?
// Every valid number is greater than -Infinity.
//
// Time complexity: O(n)
// Extra space: O(1)
//
// A loop can also be used to avoid argument limits.


// =======================================================
// 10. ARRAY DESTRUCTURING — BASIC
// =======================================================

// Array destructuring extracts values by POSITION.

const values = [10, 20, 30];

const [first, second, third] = values;

console.log(first);  // 10
console.log(second); // 20
console.log(third);  // 30

// Position matters.

const [a, b] = [100, 200];

console.log(a); // 100
console.log(b); // 200


// =======================================================
// 11. REST WITH ARRAY DESTRUCTURING
// =======================================================

// Rest collects all remaining elements into a new array.

const numbersArray = [10, 20, 30, 40, 50];

const [firstNumber, ...remainingNumbers] = numbersArray;

console.log(firstNumber);     // 10
console.log(remainingNumbers); // [20, 30, 40, 50]

// Rest can collect elements after multiple variables.

const skillsArray = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Java"
];

const [skill1, skill2, ...otherSkills] = skillsArray;

console.log(skill1);     // HTML
console.log(skill2);     // CSS
console.log(otherSkills);
// ["JavaScript", "React", "Java"]

// If no elements remain, rest becomes an empty array.

const [onlyValue, ...emptyRest] = [100];

console.log(onlyValue); // 100
console.log(emptyRest); // []
console.log(emptyRest.length); // 0

// Important:
// Rest must be the LAST element in a destructuring pattern.
//
// Valid:
// const [a, ...rest] = arr;
//
// Invalid:
// const [...rest, a] = arr;


// =======================================================
// 12. OBJECT DESTRUCTURING — BASIC
// =======================================================

// Object destructuring extracts values by PROPERTY NAME,
// not by position.

const user = {
  name: "Alex",
  age: 25,
  city: "Mumbai"
};

const { name, age } = user;

console.log(name); // Alex
console.log(age);  // 25

// Order does not matter.

const { city, name: userName } = user;

console.log(city);     // Mumbai
console.log(userName); // Alex

// Renaming:
// name: userName means:
// Read the "name" property and store it in userName.
//
// It does not rename the original object property.


// =======================================================
// 13. DEFAULT VALUES IN DESTRUCTURING
// =======================================================

// A default value is used when the extracted value
// is undefined.
//
// It does NOT replace null, 0, false, or "".

const user1 = {
  name: "Alex"
};

const { name: extractedName, age = 25 } = user1;

console.log(extractedName); // Alex
console.log(age);           // 25

// Missing property -> undefined -> default applies.

const user2 = {
  age: undefined
};

const { age: age1 = 30 } = user2;

console.log(age1); // 30

// Explicit undefined -> default applies.

const user3 = {
  age: null
};

const { age: age2 = 30 } = user3;

console.log(age2); // null

// null does not trigger the default.

const user4 = {
  age: 0
};

const { age: age3 = 30 } = user4;

console.log(age3); // 0

// 0 does not trigger the default.

const user5 = {
  active: false
};

const { active = true } = user5;

console.log(active); // false

// false does not trigger the default.


// =======================================================
// 14. REST WITH OBJECT DESTRUCTURING
// =======================================================

// Object rest collects remaining own enumerable
// properties into a NEW object.

const employee = {
  name: "Alex",
  age: 25,
  role: "Developer",
  city: "Mumbai"
};

const { name: employeeName, ...details } = employee;

console.log(employeeName);
// Alex

console.log(details);
// {
//   age: 25,
//   role: "Developer",
//   city: "Mumbai"
// }

// Only name was extracted.
// Remaining properties are collected in details.
//
// The original employee object is not modified.
//
// Object rest creates a shallow copy of the remaining
// enumerable own properties.


// =======================================================
// 15. DESTRUCTURING IN FUNCTION PARAMETERS
// =======================================================

// Without destructuring:

function displayUser(user) {
  console.log(user.name);
  console.log(user.age);
}

displayUser({
  name: "Alex",
  age: 25
});

// With destructuring:

function displayUserDetails({ name, age }) {
  console.log(name);
  console.log(age);
}

displayUserDetails({
  name: "Alex",
  age: 25
});

// Both approaches produce the same output.
//
// Destructuring makes it convenient to access
// object properties directly.


// =======================================================
// 16. DEFAULT VALUES IN FUNCTION PARAMETERS
// =======================================================

// = {} provides a default empty object if no argument
// is passed.
//
// Individual property defaults handle undefined values.

function displayProfile({
  name = "Guest",
  age = 18
} = {}) {
  console.log(name, age);
}

displayProfile({ name: "Alex" });
// Alex 18

displayProfile({});
// Guest 18

displayProfile();
// Guest 18

// Without the outer = {}, calling displayProfile()
// without an argument would throw a TypeError.


// =======================================================
// 17. REACT PROPS DESTRUCTURING
// =======================================================

// React components commonly receive props as an object.
//
// Without destructuring:
//
// function UserCard(props) {
//   return <h2>{props.name}</h2>;
// }
//
// With destructuring:
//
// function UserCard({ name, role, city = "Mumbai" }) {
//   return (
//     <div>
//       <h2>{name}</h2>
//       <p>{role}</p>
//       <p>{city}</p>
//     </div>
//   );
// }
//
// Benefits:
// - Less repetitive props.name syntax.
// - Easier to read.
// - Default values can be declared directly.
//
// This is illustrative React JSX, not executable
// in a plain Node.js file without a JSX setup.


// =======================================================
// 18. SWAPPING VARIABLES USING DESTRUCTURING
// =======================================================

// Traditional approach using a temporary variable:

let x = 10;
let y = 20;

let temp = x;
x = y;
y = temp;

console.log(x, y); // 20 10

// Destructuring approach:

let i = 0;
let j = 1;

[i, j] = [j, i];

console.log(i, j); // 1 0

// How it works:
// 1. Evaluate the right-hand array [j, i].
// 2. Assign the first value to i.
// 3. Assign the second value to j.
//
// This creates a temporary array.
// Convenient for ordinary code.


// =======================================================
// 19. RETURNING MULTIPLE VALUES FROM A FUNCTION
// =======================================================

// JavaScript functions return one value.
// That value can be an array containing multiple results.

function minMax(numbers) {
  let min = Infinity;
  let max = -Infinity;

  for (const num of numbers) {
    if (num < min) {
      min = num;
    }

    if (num > max) {
      max = num;
    }
  }

  return [min, max];
}

const [minimum, maximum] = minMax([3, -1, 7, 5]);

console.log(minimum); // -1
console.log(maximum); // 7

// Another option: return an object.

function getUser() {
  return {
    name: "Alex",
    age: 25
  };
}

const { name: returnedName, age: returnedAge } = getUser();

console.log(returnedName); // Alex
console.log(returnedAge);  // 25

// When to use:
// Array -> results have clear positional meaning.
// Object -> named properties improve readability.


// =======================================================
// 20. TIME AND SPACE COMPLEXITY
// =======================================================

/*
Operation                         Time       Extra Space

[...arr]                          O(n)       O(n)
[...arr1, ...arr2]                O(n + m)   O(n + m)
Rest parameter collection         O(k)       O(k)
Array rest destructuring           O(n)       O(n)
Object rest destructuring          O(p)       O(p)
Swap using destructuring           O(1)       O(1)*
Math.max(...arr)                   O(n)       O(n)*
Reduce for maximum                 O(n)       O(1)
Binary recursion path copying      O(n²)      O(n²) total copying

* Destructuring swap creates a temporary array of
  constant size, so O(1) auxiliary space.

* Spread argument handling depends on engine
  implementation; avoid it for huge arrays.

O(n) = Linear
O(n²) = Quadratic
*/


// =======================================================
// 21. COMMON INTERVIEW MISTAKES
// =======================================================

/*
1. Thinking spread creates a deep copy.
   WRONG: Spread creates a shallow copy.

2. Thinking spread and rest are different syntax.
   WRONG: Both use ..., but their purposes differ.

3. Thinking rest can appear anywhere.
   WRONG: Rest must be last.

4. Thinking destructuring defaults replace null.
   WRONG: Defaults apply only to undefined.

5. Thinking array destructuring uses property names.
   WRONG: Array destructuring uses positions.

6. Thinking object destructuring uses positions.
   WRONG: Object destructuring uses property names.

7. Using Math.max(...hugeArray).
   RISKY: Can exceed practical argument limits.

8. Repeatedly copying an array inside recursion.
   RISKY: Can produce O(n²) copying.

9. Thinking object rest removes properties from
   the original object.
   WRONG: It creates a new object containing
   the remaining properties.
*/


// =======================================================
// 22. INTERVIEW QUICK REVISION
// =======================================================

/*
Q1. What is spread syntax?
A. It expands iterable elements into individual values.

Q2. What is a shallow copy?
A. A new outer container whose nested objects may
   still share references with the original.

Q3. What is a rest parameter?
A. It collects remaining function arguments into an array.

Q4. Can rest appear before another parameter?
A. No. Rest must be the final parameter.

Q5. What is the difference between spread and rest?
A. Spread expands; rest collects.

Q6. What is array destructuring?
A. Extracting array elements into variables by position.

Q7. What is object destructuring?
A. Extracting object properties into variables by name.

Q8. When do destructuring defaults apply?
A. When the extracted value is undefined.

Q9. Why is Math.max(...arr) risky for huge arrays?
A. It passes all elements as separate function arguments.

Q10. How can we swap two variables?
A. [a, b] = [b, a];

Q11. How can a function return multiple results?
A. Return an array or an object.

Q12. What is the complexity of [...arr]?
A. O(n) time and O(n) extra space.
*/


// =======================================================
// 23. PRACTICE QUESTIONS
// =======================================================

// Predict the output of each before running.

// Question 1:
const q1a = [10, 20, 30];
const q1b = [...q1a, 40];

console.log(q1a);
console.log(q1b);

// Question 2:
const q2 = [{ value: 10 }];
const q2copy = [...q2];

q2copy[0].value = 50;

console.log(q2[0].value);

// Question 3:
function test(...values) {
  return values.length;
}

console.log(test(10, 20, 30, 40));

// Question 4:
const q4 = [5, 10, 15, 20];

const [q4first, ...q4rest] = q4;

console.log(q4first);
console.log(q4rest);

// Question 5:
const q5 = {
  name: "Sam",
  role: "Developer",
  city: "Pune"
};

const { name: q5name, ...q5details } = q5;

console.log(q5name);
console.log(q5details);

// Question 6:
const { value = 100 } = { value: null };

console.log(value);

// Question 7:
let q7a = 10;
let q7b = 20;

[q7a, q7b] = [q7b, q7a];

console.log(q7a, q7b);

// Question 8:
function calculate(a, ...numbers) {
  return numbers.reduce((sum, num) => sum + num, a);
}

console.log(calculate(10, 20, 30));


// =======================================================
// END OF SPREAD, REST AND DESTRUCTURING
// =======================================================
