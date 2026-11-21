// slice() vs substring()

// Both methods extract a portion of a string and return a new string.

// The biggest thing to understand is how their start and end parameters work.

// 1. slice(start, end)
// Purpose: Extract characters from a string between the specified indexes.

const language = "JavaScript";

console.log(language.slice(0, 4)); // Java
console.log(language.slice(4, 10)); // Script
console.log(language.slice(4)); // Script
console.log(language.slice(6, 2));// "" When the normalized start position is greater than or equal to the end position, it returns an empty string.

// 2. Negative indexes in slice()

console.log(language.slice(-1));    // t
console.log(language.slice(-6));   // Script
console.log(language.slice(-6, -1)); // Scrip

// substring(start, end)

console.log(language.substring(0, 4)); // Java
console.log(language.substring(4, 10)); // Script
console.log(language.substring(4)); // Script

// Difference 1: Negative indexes
// substring() treats negative indexes as 0.
console.log(language.slice(-6)); // Script
console.log(language.substring(-6)); // JavaScript -> substring(-6) converts -6 to 0.

// Difference 2: Reversed arguments
// This is an important interview trap.

const word = "JavaScript";

console.log(word.slice(6, 2));      // ""
console.log(word.substring(6, 2)); // vaSc -> Because if the first argument is greater than the second, substring() swaps them. it becomes word.substring(2, 6);
