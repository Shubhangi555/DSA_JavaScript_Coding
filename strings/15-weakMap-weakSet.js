/*
=========================================================
JAVASCRIPT: WEAKMAP AND WEAKSET
Level: Intermediate (L3-L4)

TOPICS:
1. What is WeakMap?
2. Strong vs weak references
3. WeakMap methods and limitations
4. WeakMap use cases
5. Cycle-safe deep cloning
6. What is WeakSet?
7. WeakSet methods and limitations
8. Map vs WeakMap vs Set vs WeakSet
9. Interview revision
=========================================================
*/


/*
=========================================================
1. WHAT IS WEAKMAP?
=========================================================

WeakMap stores key-value pairs.

Unlike Map, WeakMap holds its keys weakly.

If nothing else references a key object, the garbage
collector may remove that object and its WeakMap entry.

IMPORTANT:
- WeakMap keys must be objects or non-registered symbols.
- WeakMap does not keep its keys alive by itself.
- Garbage collection timing is not predictable.
*/


// NORMAL MAP: STRONG REFERENCE

const normalMap = new Map();

let user1 = { name: "Alex" };

normalMap.set(user1, "User data");

// Removing this variable does not remove the object
// because normalMap still holds a strong reference.

user1 = null;


// WEAKMAP: WEAK REFERENCE

const weakMapExample = new WeakMap();

let user2 = { name: "John" };

weakMapExample.set(user2, "User data");

// Removing this variable allows the object to become
// eligible for garbage collection if no other strong
// references to it exist.

user2 = null;

// We cannot predict exactly when garbage collection happens.


/*
=========================================================
2. WEAKMAP METHODS
=========================================================

set(key, value) -> Add or update an entry.
get(key)        -> Retrieve the associated value.
has(key)        -> Check whether the key exists.
delete(key)     -> Remove an entry.

WeakMap does not have:
- size
- keys()
- values()
- entries()
- forEach()
- Symbol.iterator
*/


const weakMap = new WeakMap();

const user = { id: 101 };

weakMap.set(user, "Shubhangi");

console.log(weakMap.get(user));
// "Shubhangi"

console.log(weakMap.has(user));
// true

weakMap.delete(user);

console.log(weakMap.has(user));
// false


/*
=========================================================
3. WEAKMAP KEY LIMITATIONS
=========================================================

Valid keys:
- Objects
- Functions
- Non-registered symbols (ES2023+)

Invalid keys:
- Strings
- Numbers
- Booleans
- null
- undefined
- Registered symbols

For most interview problems, remember:
WeakMap keys must be objects.
*/


const wm = new WeakMap();

wm.set({ id: 1 }, "valid");

// Primitive keys throw TypeError.

let threw = false;

try {
  wm.set("str", 1);
} catch (error) {
  threw = error instanceof TypeError;
}

console.assert(threw, "Primitive keys are not allowed");


/*
=========================================================
4. WHY WEAKMAP HAS NO SIZE OR ITERATION
=========================================================

WeakMap entries may disappear whenever their keys become
unreachable and garbage collection occurs.

If JavaScript exposed size or iteration, the result
could depend on unpredictable garbage-collection timing.

Therefore, WeakMap does not support:

weakMap.size
weakMap.keys()
weakMap.values()
weakMap.entries()
weakMap.forEach()
for...of weakMap
*/


const weakMap2 = new WeakMap();

const person1 = { name: "Alex" };
const person2 = { name: "John" };

weakMap2.set(person1, 100);
weakMap2.set(person2, 200);

console.log(weakMap2.size);
// undefined

console.log(weakMap2[Symbol.iterator]);
// undefined


/*
=========================================================
5. WEAKMAP USE CASES
=========================================================

USE CASE 1: CACHING DATA PER OBJECT

WeakMap can store computed data associated with an object.

If the object becomes unreachable, the WeakMap does not
keep it alive just because it is used as a key.
*/


const cache = new WeakMap();

function calculateExpensiveData(user) {

  // Return cached result if it already exists.

  if (cache.has(user)) {
    return cache.get(user);
  }

  // Simulate an expensive calculation.

  const result = user.age * 100;

  // Store the result against the user object.

  cache.set(user, result);

  return result;
}

const cachedUser = { age: 25 };

console.log(calculateExpensiveData(cachedUser));
// 2500

console.log(calculateExpensiveData(cachedUser));
// 2500 (retrieved from cache)


/*
USE CASE 2: PRIVATE METADATA

WeakMap can store metadata separately from an object.

This helps keep internal implementation details
outside the object's public properties.
*/


const privateData = new WeakMap();

class User {

  constructor(name, password) {

    this.name = name;

    privateData.set(this, {
      password
    });
  }

  checkPassword(input) {

    return privateData.get(this).password === input;
  }
}

const privateUser = new User("Alex", "secret123");

console.log(privateUser.name);
// "Alex"

console.log(privateUser.checkPassword("secret123"));
// true

console.log(privateUser.password);
// undefined

// Note: This is an encapsulation example, not secure
// password storage. Never store real passwords this way.


/*
=========================================================
6. CYCLE-SAFE DEEP CLONE USING WEAKMAP
=========================================================

A circular reference occurs when an object eventually
references itself through another object.

Example:

root -> child -> root

A naive recursive clone can continue forever.

WeakMap remembers objects that have already been cloned.
*/


function deepClone(value, seen = new WeakMap()) {

  // Step 1:
  // Primitive values and null can be returned directly.

  if (value === null || typeof value !== "object") {
    return value;
  }

  // Step 2:
  // If this object has already been cloned,
  // return the existing clone.
  //
  // This prevents infinite recursion and preserves
  // shared references.

  if (seen.has(value)) {
    return seen.get(value);
  }

  // Step 3:
  // Create an empty object or array.

  const copy = Array.isArray(value) ? [] : {};

  // Step 4:
  // Store the original object and its clone BEFORE
  // recursively cloning child properties.
  //
  // This is critical for handling circular references.

  seen.set(value, copy);

  // Step 5:
  // Recursively clone enumerable own string-keyed properties.

  for (const key of Object.keys(value)) {

    copy[key] = deepClone(value[key], seen);
  }

  return copy;
}


// Create a circular object.

const node = {
  name: "root",
  children: []
};

node.children.push({
  name: "child",
  parent: node
});


// Clone the circular object.

const cloned = deepClone(node);


// Verify the clone.

console.assert(cloned !== node);

// The child's parent should point to the cloned root,
// not the original root.

console.assert(
  cloned.children[0].parent === cloned
);


/*
IMPORTANT LIMITATION:

This deepClone implementation is simplified.

It handles plain objects, arrays, shared references
and circular references.

It does not correctly preserve:
- Date objects
- Map and Set objects
- Object prototypes
- Symbol properties
- Property descriptors
- Other special object types

For general-purpose cloning, consider structuredClone()
where the data types are supported.
*/


/*
=========================================================
7. WHAT IS WEAKSET?
=========================================================

WeakSet is similar to Set, but stores objects weakly.

Features:
- Stores unique objects.
- Does not keep objects alive by itself.
- Does not support iteration.
- Does not have size.
- Supports add(), has() and delete().

WeakSet is useful when we only need to track whether
an object has been encountered or processed.
*/


const weakSet = new WeakSet();

const userA = { name: "Alex" };
const userB = { name: "John" };

weakSet.add(userA);
weakSet.add(userB);

console.log(weakSet.has(userA));
// true

console.log(weakSet.has(userB));
// true

weakSet.delete(userA);

console.log(weakSet.has(userA));
// false


/*
=========================================================
8. WEAKSET VALUE LIMITATIONS
=========================================================

Valid values:
- Objects
- Functions
- Non-registered symbols (ES2023+)

Invalid values:
- Strings
- Numbers
- Booleans
- null
- undefined
- Registered symbols

For most interview problems, remember:
WeakSet stores objects, not ordinary primitive values.
*/


const weakSet2 = new WeakSet();

let weakSetThrew = false;

try {
  weakSet2.add("hello");
} catch (error) {
  weakSetThrew = error instanceof TypeError;
}

console.assert(weakSetThrew);


/*
=========================================================
9. WEAKSET USE CASE: TRACKING VISITED OBJECTS
=========================================================

WeakSet can track objects that have already been visited.

This is useful when traversing object graphs.

It prevents processing the same object repeatedly.
*/


function visitObject(object, visited = new WeakSet()) {

  if (object === null || typeof object !== "object") {
    return;
  }

  // Stop if this object was already visited.

  if (visited.has(object)) {
    return;
  }

  // Mark the object as visited.

  visited.add(object);

  console.log(object.name);

  // Traverse child properties.

  for (const key of Object.keys(object)) {

    visitObject(object[key], visited);
  }
}


const root = {
  name: "root",
  children: []
};

const child = {
  name: "child",
  parent: root
};

root.children.push(child);

// This traversal handles the circular reference safely.

visitObject(root);


/*
=========================================================
10. MAP vs WEAKMAP vs SET vs WEAKSET
=========================================================

MAP:
- Stores key-value pairs.
- Keys can be any value.
- Strong references.
- Iterable.
- Has size.
- Useful for counting, grouping and dynamic lookup.

WEAKMAP:
- Stores key-value pairs.
- Keys must be objects or non-registered symbols.
- Keys are weakly held.
- Not iterable.
- No size.
- Useful for per-object caching and private metadata.

SET:
- Stores unique values.
- Values can be any type.
- Strong references.
- Iterable.
- Has size.
- Useful for removing duplicates and membership checks.

WEAKSET:
- Stores unique objects or non-registered symbols.
- Values are weakly held.
- Not iterable.
- No size.
- Useful for tracking visited objects.
*/


/*
=========================================================
11. DSA: WHEN TO USE WHICH DATA STRUCTURE?
=========================================================

FREQUENCY COUNTING:
Use Map.

Example:
const frequency = new Map();

for (const value of array) {
  frequency.set(
    value,
    (frequency.get(value) ?? 0) + 1
  );
}


REMOVE DUPLICATES:
Use Set.

Example:
const unique = [...new Set(array)];


CHECK OBJECT METADATA:
Use WeakMap.


TRACK VISITED OBJECTS:
Use WeakSet if you do not need iteration or size.


IMPORTANT:
Do not use WeakMap or WeakSet for normal DSA counting,
grouping, sorting or problems that require iteration.
*/


/*
=========================================================
12. QUICK INTERVIEW REVISION
=========================================================

Q1. What is WeakMap?

A WeakMap stores key-value pairs where keys are weakly
held references to objects (or non-registered symbols).

Q2. What happens when a WeakMap key becomes unreachable?

The garbage collector may remove the key object and its
associated WeakMap entry.

Q3. Why does WeakMap not have size?

Because entries can disappear during garbage collection.
Exposing size could reveal unpredictable garbage-collection
behavior.

Q4. Why is WeakMap not iterable?

Because its entries may disappear at unpredictable times.

Q5. Can WeakMap use strings or numbers as keys?

No. They throw TypeError.

Q6. What is WeakSet?

WeakSet stores unique objects using weak references.

Q7. What is the difference between Map and WeakMap?

Map supports any key, iteration and size.
WeakMap has weak keys, no iteration and no size.

Q8. What is the difference between Set and WeakSet?

Set stores any values and supports iteration and size.
WeakSet stores objects weakly and supports neither.

Q9. Where is WeakMap useful?

Per-object caching, private metadata and tracking objects
without keeping them alive unnecessarily.

Q10. Which is better for DSA frequency counting?

Map, because it supports primitive keys, iteration and size.


=========================================================
FINAL REMEMBER
=========================================================

Map     -> Dynamic key-value data.
WeakMap -> Metadata/cache associated with objects.
Set     -> Unique values.
WeakSet -> Track unique objects.

Use Map and Set for most DSA problems.
Use WeakMap and WeakSet when object lifetime matters.

=========================================================
*/
