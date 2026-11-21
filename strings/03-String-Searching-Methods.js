//---------------------------------------------------------------------1. indexOf() — Find the position of a string-----------------------------------------------------------------
// Purpose: Searches for a character or substring and returns the index of its first occurrence.

// Syntax:
// string.indexOf(searchValue, fromIndex);

const language = "JavaScript";

console.log(language.indexOf("J")); // 0
console.log(language.indexOf("a")); // 1 -> a is twice but it returns the first occurenece 

// Search for a word
const sentence = "I love JavaScript and React";

console.log(sentence.indexOf("JavaScript")); // 7
console.log(sentence.indexOf("React"));      // 22
console.log(sentence.indexOf("Python"));     // -1

// Using fromIndex
const text = "banana";

console.log(text.indexOf("a"));    // 1
console.log(text.indexOf("a", 2)); // 3
console.log(text.indexOf("a", 4)); // 5
console.log(text.indexOf("a", 10)); // -1 -> if fromIndex is larger than the string length

// The second parameter tells JavaScript where to start searching. It doesn't mean the position where the result must be returned.

// Empty string searching

console.log(text.indexOf(""));    // 0
console.log(text.indexOf("", 2)); // 2
console.log(text.indexOf("", 5)); // 5
console.log(text.indexOf("", 10));// 6

// Why?

// Searching for an empty string is considered a match at the starting position, limited to the string's length.

// Important: indexOf() vs lastIndexOf()

// It searches from the end and returns the index of the last occurrence.

console.log(text.indexOf("a"));     // 1
console.log(text.lastIndexOf("a")); // 5


//---------------------------------------------------------------------------------includes()---------------------------------------------------------------------------------------
// 1. What is includes()?
// Purpose: Checks whether a particular character or substring exists inside a string.

// It returns only a Boolean value:


console.log(sentence.includes("JavaScript")); // true
console.log(sentence.includes("reactjs"));      // false
console.log(sentence.includes("love"));       // true
console.log(sentence.includes("J")); // true -> works for character

const text2 = "JavaScript";
console.log(text2.includes("Script")); // true -> works for substring
console.log(text2.includes("Java", 1)); // false
console.log(text2.includes("Script", 4)); // true

// case sensitive
console.log(language.includes("Java")); // true
console.log(language.includes("java")); // false

// If you want a case-insensitive search, convert both strings to the same case:
const language2 = "JavaScript";
const search2 = "JAVASCRIPT";

console.log(
  language2.toLowerCase().includes(search2.toLowerCase())
); // true

// empty string cases 
console.log(text.includes(""));    // true
console.log(text.includes("", 2)); // true
console.log(text.includes("", 10));// true




//----------------------------------------------------------------------------------startsWith() and endsWith()------------------------------------------------------------------------
// startsWith()
// Checks whether a string begins with a particular substring.


const string = "JavaScript";

console.log(string.startsWith("Java")); // true
console.log(string.startsWith("Script")); // false
console.log(string.startsWith("J")); // true
console.log(string.startsWith("java")); // false

console.log(string.startsWith("Script", 4)); // true
console.log(string.startsWith("Java", 1));   // false

// Important: Unlike includes(), startsWith() checks for a match exactly at the specified position.


// endsWith()
// Checks whether a string finishes with a particular substring.

const filename = "resume.pdf";

console.log(filename.endsWith(".pdf")); // true
console.log(filename.endsWith(".jpg")); // false
console.log(filename.endsWith("pdf"));  // true

console.log(string.endsWith("Java", 4));   // true
console.log(string.endsWith("Script", 10)); // true
console.log(string.endsWith("Script", 9)); // false

// Important: endsWith() uses endPosition, not a starting index.
