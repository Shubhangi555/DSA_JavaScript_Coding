// padStart() and padEnd()
// padStart()
// padStart() adds characters at the beginning of a string until the string reaches a specified length.

// string.padStart(targetLength, padString)


// Basic Usage

let number = "25";
let result = number.padStart(5, "0");
console.log(result); // 00025

let language = "JavaScript";
console.log(language.padStart(5, "0")); // "JavaScript"

// The original string already has 10 characters, which is longer than the target length of 5.

// Therefore, nothing is added.

// Important: targetLength is the desired final length, not the number of characters to add.

// What happens when padString is missing?
let num = "25";
console.log(num.padStart(5)); //"   25"

// JavaScript uses spaces by default.

// Padding with a multi-character string
// This is an important interview example.
let text = "JS";
console.log(text.padStart(8, "ABC")); // "ABCABCJS"

// If the padding pattern doesn't fit completely, JavaScript uses only the required portion from its repetition.
console.log("js".padStart(5, "ABC"));


// padEnd()
// padEnd() adds characters at the end of a string until it reaches the specified length.
// string.padEnd(targetLength, padString)

let nums = "25";

console.log(nums.padEnd(5, "0")); // "25000"
