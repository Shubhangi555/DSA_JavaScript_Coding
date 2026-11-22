// All three store data, but they solve different problems.
// Object {}
// Stores data as key-value pairs.
// const user = {
//   name: "Shubhangi",
//   age: 25
// };
// Best for structured records and JSON.

// Map
// Stores key-value pairs with keys of any type.
// const scores = new Map();
// scores.set("Shubhangi", 90);
// scores.set(101, 85);
// Best for dynamic key-value data.

// Set
// Stores unique values.
// const skills = new Set();
// skills.add("React");
// skills.add("JavaScript");
// skills.add("React");
// Best for uniqueness and membership checking.

//-----------------------------------------------------------------------Plain Object {}
// An object stores information in key-value pairs.
const user = {
  name: "Shubhangi",
  age: 25,
  role: "Developer"
};

console.log(user.name);    // "Shubhangi"
console.log(user["age"]);  // 25

//----------------------------------------------------------------------------A. Object keys---------------------------------------------------------------------
// Plain objects support two types of property keys:
// - Strings
// - Symbols
// What happens when we use a number?
const data = {};
data[10] = "Hello";
console.log(data[10]);     // "Hello"
console.log(data["10"]);   // "Hello"
// The numeric key 10 is converted into the string "10".
// This is an important difference between objects and Maps.

//---------------------------------------------------------------------------------B. Object prototype keys------------------------------------------------------------------
const users = {};
console.log(users.toString);
console.log(users.constructor);
// Because ordinary objects inherit properties from Object.prototype.

// This is why objects have inherited properties.
// If you need an object without a prototype:
const data2 = Object.create(null);
console.log(data2.toString); // undefined
// This is useful for dictionaries where you don't want inherited prototype properties.

//----------------------------------------------------------------------------C. Object size-------------------------------------------------------------------------------------
// Objects don't have a built-in .size property.
const user2 = {
  name: "Shubhangi",
  age: 25,
  role: "Developer"
};
console.log(Object.keys(user2).length); // 3

// Object.keys() returns an array of the object's own enumerable string-keyed properties.
// Time complexity: O(n), where n is the number of such properties.


//-----------------------------------------------------------------Map
// A Map is a collection of key-value pairs, just like an object, but it has additional capabilities.

const scores = new Map();
scores.set("Shubhangi", 90);
scores.set("Rahul", 85);
console.log(scores.get("Shubhangi")); // 90
console.log(scores.size);        // 2

// A. Map accepts any type of key
// This is one of the most important differences.
const map = new Map();

map.set("name", "Shubhangi");
map.set(101, "Employee ID");
map.set(true, "Active");

console.log(map.get("name")); // "Shubhangi"
console.log(map.get(101));    // "Employee ID"
console.log(map.get(true));   // "Active"

// An object converts numeric keys into strings. A Map preserves their types.


// B. Objects can also be Map keys

const user3 = { name: "Shubhangi" };
const user4 = { name: "Rahul" };

const map2 = new Map();

map2.set(user3, "Frontend Developer");
map2.set(user4, "Backend Developer");

console.log(map2.get(user3)); // "Frontend Developer"
// This is useful when you need to associate additional information with an object.

// C. Map methods
// Method/property	Purpose
// set(key, value)	Add or update
// get(key)	Retrieve value
// has(key)	Check whether key exists
// delete(key)	Remove entry
// clear()	Remove all entries
// size	Number of entries

const map3 = new Map();

map3.set(25, "Shubhangi");
map3.set(28, "Rahul");
map3.set(23, "Karan");

console.log(map3.get(28)); // Rahul
console.log(map3.has(23)); // true
console.log(map3.delete(23)); // true
console.log(map3.size); // 2
console.log([...map3.values()]); // [ 'Shubhangi', 'Rahul' ]
console.log([...map3.keys()]); [ 25, 28 ]

// D. Map insertion order

const map4 = new Map();

map4.set(2, "c");
map4.set(3, "a");
map4.set(1, "b");

console.log([...map4.keys()]); // [ 2, 3, 1 ]
// Map maintains insertion order.

//----------------------------------------------------------------------------4. Set------------------------------------------------------------------
// A Set stores unique values.
// Unlike Object and Map, it doesn't store key-value pairs.

const numbers = new Set();
numbers.add(10);
numbers.add(20);
numbers.add(10);
console.log(numbers); // Set(2) {10, 20}

// Why are there only two values?
// Because duplicate values are automatically ignored.


// A. Set methods
// Method/property	Purpose
// add(value)	Add a value
// has(value)	Check whether value exists
// delete(value)	Remove a value
// clear()	Remove all values
// size	Number of unique values


// SameValueZero — how Map and Set compare keys/values
// Your table mentions SameValueZero.
// Map and Set use SameValueZero equality for keys and values.

// Important behaviours:
console.log(NaN === NaN); // false
const set = new Set();
set.add(NaN);
set.add(NaN);
console.log(set.size); // 1
// Even though NaN === NaN is false, Set treats the two NaN values as equal.

// Also:
const set = new Set();
set.add(0);
set.add(-0);
console.log(set.size); // 1

// And objects are compared by reference:
const set = new Set();
set.add({ name: "Riya" });
set.add({ name: "Riya" });
console.log(set.size); // 2

// Although both objects contain identical data, they are two different object references.
