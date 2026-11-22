/*
=========================================================
JAVASCRIPT PRACTICE: OBJECTS vs MAP vs SET
=========================================================

KEY INTERVIEW IDEA:

Object -> Fixed-shape records and JSON-like data.
Map    -> Dynamic key-value data and frequency counting.
Set    -> Unique values, membership checks and de-duplication.
*/


/*
=========================================================
1. WHY COUNTING WITH A PLAIN OBJECT CAN BREAK
=========================================================
*/

// A normal object inherits properties from Object.prototype.
// Properties like "constructor" and "__proto__" can behave
// unexpectedly when used as arbitrary dictionary keys.

function countWordsObject(words) {
  const counts = {};

  for (const word of words) {
    counts[word] = (counts[word] || 0) + 1;
  }

  return counts;
}

const objCounts = countWordsObject([
  "constructor",
  "__proto__",
  "a"
]);

/*
constructor problem:

1. counts["constructor"] initially finds the inherited function.
2. The function is truthy, so (counts[word] || 0) uses it.
3. Adding 1 converts the function to a string.
4. Assignment creates an own "constructor" property containing
   that string.

Therefore, the resulting value is a string, not the count 1.
*/

console.assert(typeof objCounts.constructor === "string");

/*
__proto__ problem:

1. __proto__ is a legacy accessor inherited from Object.prototype.
2. Assigning a primitive value does not create a normal own property.
3. Therefore, Object.keys() does not include "__proto__".
*/

console.assert(
  !Object.keys(objCounts).includes("__proto__")
);


/*
=========================================================
2. SAFER FREQUENCY COUNTING WITH MAP
=========================================================
*/

// Map does not have inherited dictionary properties.
// It can also use values of any type as keys.
//
// get(key) returns undefined when the key is missing.
// ?? 0 uses zero only when the result is null or undefined.

function countWords(words) {
  const counts = new Map();

  for (const word of words) {
    counts.set(
      word,
      (counts.get(word) ?? 0) + 1
    );
  }

  return counts;
}

const m = countWords([
  "constructor",
  "__proto__",
  "a",
  "a"
]);

console.assert(m.get("constructor") === 1);
console.assert(m.get("__proto__") === 1);
console.assert(m.get("a") === 2);
console.assert(m.size === 3);

/*
Expected Map:

Map(3) {
  "constructor" => 1,
  "__proto__" => 1,
  "a" => 2
}

INTERVIEW TAKEAWAY:

Map is usually safer for frequency counting when keys
may be arbitrary strings or non-string values.
*/


/*
=========================================================
3. OBJECT.CREATE(NULL) — OBJECT WITHOUT A PROTOTYPE
=========================================================
*/

// If an interviewer specifically asks for an object-based
// dictionary, Object.create(null) creates an object without
// Object.prototype in its prototype chain.
//
// It does not inherit constructor, toString or the legacy
// __proto__ accessor.

const dict = Object.create(null);

dict["__proto__"] = 1;

console.assert(dict["__proto__"] === 1);

console.assert(
  Object.hasOwn(dict, "__proto__")
);


/*
=========================================================
4. NUMBER KEYS: OBJECT vs MAP
=========================================================
*/

// Ordinary object property keys are strings or symbols.
// A numeric key such as 1 is converted into the string "1".

const obj = {};

obj[1] = "x";

console.assert(obj["1"] === "x");

// Map preserves key types.
// Number 1 and string "1" are different Map keys.

const mp = new Map([
  [1, "x"]
]);

console.assert(mp.get("1") === undefined);
console.assert(mp.get(1) === "x");

/*
REMEMBER:

Object:
1 and "1" refer to the same property key.

Map:
1 and "1" are separate keys.
*/


/*
=========================================================
5. OBJECTS AND ARRAYS AS MAP/SET KEYS
=========================================================
*/

// Objects and arrays are compared by reference,
// not by their contents.
//
// Two separately created arrays with identical elements
// are different references.

const visited = new Set();

visited.add([0, 1]);

console.assert(
  !visited.has([0, 1])
);

// The second [0, 1] is a different array object.

/*
For grid problems, encode coordinates into a primitive key.

Option 1: String representation.
*/

const seen = new Set();

seen.add(`${0},${1}`);

console.assert(
  seen.has(`${0},${1}`)
);

/*
Option 2: Numeric representation.

For a grid with a known number of columns:

key = row * cols + col

This gives a numeric key for each cell when the grid
dimensions and coordinate ranges are handled consistently.
*/

const row = 0;
const col = 1;
const cols = 5;

const gridKey = row * cols + col;

console.log(gridKey); // 1


/*
=========================================================
6. OBJECT PROPERTY ORDER
=========================================================
*/

// Ordinary own property keys are ordered in these groups:
//
// 1. Array-index keys in ascending numeric order.
// 2. Other string keys in insertion order.
// 3. Symbol keys in insertion order (for APIs that include them).
//
// Object.keys() returns enumerable own string keys only.

const orderedObject = {
  b: 1,
  2: 1,
  a: 1,
  1: 1
};

console.assert(
  Object.keys(orderedObject).join() === "1,2,b,a"
);

console.log(Object.keys(orderedObject));
// ["1", "2", "b", "a"]


/*
=========================================================
7. ITERATING OVER A MAP
=========================================================
*/

// A Map is iterable.
// Each iteration yields a [key, value] pair.
//
// Array destructuring extracts both values into variables.

let total = 0;

for (const [word, count] of m) {
  total += count;
}

console.assert(total === 4);

/*
Map iteration:

["constructor", 1]
["__proto__", 1]
["a", 2]

Total = 1 + 1 + 2 = 4
*/


/*
=========================================================
8. SET OPERATIONS — ES2025
=========================================================
*/

/*
ES2025 adds built-in Set methods:

union(b)
-> Values present in either set.

intersection(b)
-> Values present in both sets.

difference(b)
-> Values in the first set but not in the second.

symmetricDifference(b)
-> Values present in exactly one of the sets.

isSubsetOf(b)
-> Checks whether every value in the first set is also in b.

isSupersetOf(b)
-> Checks whether the first set contains every value in b.

isDisjointFrom(b)
-> Checks whether the sets have no values in common.

Check the Node.js/browser version in the interview environment.
Older environments may not support these methods.
*/

const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// UNION: all unique values from both sets.

console.log([...setA.union(setB)]);
// [1, 2, 3, 4, 5]


// INTERSECTION: values present in both sets.

console.log([...setA.intersection(setB)]);
// [3]


// DIFFERENCE: values in setA but not in setB.

console.log([...setA.difference(setB)]);
// [1, 2]


// SYMMETRIC DIFFERENCE: values in either set, but not both.

console.log([...setA.symmetricDifference(setB)]);
// [1, 2, 4, 5]


// SUBSET: Is every value of setA also in setB?

console.log(setA.isSubsetOf(setB));
// false


// SUPERSET: Does setA contain every value of setB?

console.log(setA.isSupersetOf(setB));
// false


// DISJOINT: Do the sets have no common values?

console.log(setA.isDisjointFrom(setB));
// false


/*
=========================================================
9. MANUAL INTERSECTION FOR OLDER ENVIRONMENTS
=========================================================
*/

// If Set.prototype.intersection() is unavailable,
// we can implement intersection using filter() and has().
//
// Steps:
// 1. Convert the first Set into an array.
// 2. Iterate through its values using filter().
// 3. Keep only values that exist in the second Set.

function intersection(a, b) {
  return [...a].filter(value => b.has(value));
}

console.log(intersection(setA, setB));
// [3]


/*
=========================================================
10. QUICK INTERVIEW REVISION
=========================================================

OBJECT:

- Keys are strings or symbols.
- Numeric property keys are converted to strings.
- Normal objects inherit from Object.prototype.
- Object.keys(obj).length counts enumerable own string keys.
- Object.keys() does not include inherited or symbol keys.
- Useful for fixed-shape records and JSON-like data.

MAP:

- Keys can be any value.
- Number 1 and string "1" are different keys.
- Preserves insertion order.
- Methods: set(), get(), has(), delete(), clear().
- Property: size.
- Useful for dynamic keyed data and frequency counting.

SET:

- Stores unique values.
- Preserves insertion order.
- Methods: add(), has(), delete(), clear().
- Property: size.
- Useful for de-duplication and membership checks.

REFERENCE COMPARISON:

- Objects and arrays are compared by reference in Map and Set.
- Two different arrays with the same contents are not equal keys.

COMPLEXITY:

- Do not claim JavaScript guarantees O(1) lookup for Map or Set.
- The specification requires average access to be sublinear.
- Actual performance depends on the JavaScript engine.
=========================================================
*/
