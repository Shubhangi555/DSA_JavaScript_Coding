// s[i]
// s.at(i)
// s.charAt(i)

// All three are used to access a character at a particular position in a string.

// 1. s[i] — Bracket notation
// Think of a string as a sequence of characters, where each character has an index.

const language = "javascript";
console.log(language[0]); // j 
console.log(language[-1]); // undefined Because bracket notation doesn't treat negative indexes as positions counted from the end.
console.log(language[-10]); // undefined

// 2. s.at(i) — Access characters using positive or negative indexes
// This method works similarly to bracket notation, but it has one useful additional feature: negative indexing.

console.log(language.at(-1)); // t
console.log(language.at(1)); // a

// 3. s.charAt(i) — Another way to access characters
console.log(language.charAt(1)); // a

// But there's an important difference when the index is invalid.
const name = "React";

console.log(name[10]);       // undefined
console.log(name.at(10));    // undefined
console.log(name.charAt(10));// ""

// charAt() returns an empty string ("") when the index is out of range.
It also does not support negative indexing:
console.log(name[-1]);       // undefined
console.log(name.at(-1));    // t
console.log(name.charAt(-1));// ""
