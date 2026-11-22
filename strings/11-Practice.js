//practice

// 1. String immutability
"use strict";
const s = "hello";
let threw = false;

try {
  s[0] = "j";
} catch (e) {
  threw = e instanceof TypeError;
}

console.assert(threw && s === "hello");


// - Strings are immutable.
// - In strict mode, attempting to modify a character using an index throws TypeError.
// - The original string remains "hello".
// 2. Editing characters using an array
const chars = [...s];
chars[0] = "j";
console.assert(chars.join("") === "jello");


// Here:
// 1. [...s] converts the string into an array of characters (more precisely, Unicode code points).
// 2. We modify the first array item.
// 3. join("") converts the array back into a string.
// 3. Reversing a string
const reverse = (str) => [...str].reverse().join("");
console.assert(reverse("abc") === "cba");

// This combines three operations:
// - Spread syntax: string → array.
// - reverse(): reverses the array.
// - join(""): array → string.
// Note: This handles many Unicode characters better than split(""), but complex emoji sequences may still break.
// 4. Building large output

const parts = [];

for (let i = 0; i < 5; i++) {
  parts.push(String(i));
}

console.assert(parts.join(",") === "0,1,2,3,4");


// This demonstrates:
// - push() adds items to an array.
// - String(i) converts numbers into strings.
// - join(",") combines them.
// This is a clear approach when building large strings from many pieces.
// 5. String comparisons — our current topic
console.assert("Z" < "a");
console.assert(["b", "a", "C"].sort().join() === "C,a,b");
console.assert(
  ["b", "a", "C"]
    .sort((x, y) => x.localeCompare(y))
    .join() === "a,b,C"
);


// There are two different sorting approaches:
// Approach	Behaviour
// sort()	Default string sorting using UTF-16 code units
// sort((a,b) => a.localeCompare(b))	Locale-aware string comparison

// 6. replace() vs replaceAll()
"a-b-c".replace("-", "+");    // "a+b-c"
"a-b-c".replaceAll("-", "+"); // "a+b+c"


// replace() replaces the first matching occurrence; replaceAll() replaces every matching occurrence.
// 7. Number conversion and binary strings
(5).toString(2).padStart(8, "0"); // "00000101"
parseInt("101", 2); // 5

// - toString(2) converts a number into its binary representation.
// - padStart(8, "0") makes the string eight characters long.
// - parseInt("101", 2) converts binary "101" back to decimal 5.
