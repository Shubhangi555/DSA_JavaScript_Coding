// 1. toUpperCase()
// Converts all lowercase letters in a string into uppercase letters.

let language = "JavaScript";
let result = language.toUpperCase();
console.log(result);   // "JAVASCRIPT"
console.log(language); // "JavaScript"

// Important: It returns a new string. It does not modify the original string.

// 2. toLowerCase()
// Converts all uppercase letters into lowercase letters.

let language2 = "JAVASCRIPT";
let result2 = language2.toLowerCase();
console.log(result2);   // "javascript"
console.log(language2); // "JAVASCRIPT"

// 3. trim()
// This method removes whitespace from the beginning and end of a string.
// trim() removes leading and trailing whitespace, not whitespace between words.
let username = "   Shubhangi   ";
let result3 = username.trim();
console.log(result3);   // "Shubhangi"
console.log(username); // "   Shubhangi   "

// trim() removes more than ordinary spaces. It also removes tabs and newline characters at the beginning and end.
let text = "\n  Hello React  \t";
console.log(text.trim()); // "Hello React"

// But look at this:
let text2 = "Hello     React";
console.log(text2.trim()); // "Hello     React"
// The spaces between the words remain untouched.

// trimStart() and trimEnd()
// These are related methods worth knowing.
// Method	What it removes
// trim()	Both beginning and end
// trimStart()	Beginning only
// trimEnd()	End only

// Example:
let text = "   React Developer   ";
console.log(text.trimStart()); // "React Developer   "
console.log(text.trimEnd()); // "   React Developer"
console.log(text.trim()); // "React Developer"

// Combining methods
// You can chain string methods.
let username = "   ShUbHaNgI   ";
let result = username.trim().toLowerCase();
console.log(result); // "shubhangi"
