// concat() — Combining strings
// The concat() method joins two or more strings and returns a new string.

// Syntax:
// string.concat(string2, string3, ...)

let firstName = "Shubhangi";
let lastName = "Bhosale";
let result = firstName.concat(" ", lastName);
console.log(result); // "Shubhangi Bhosale"

// Passing multiple arguments
// You can combine more than two strings.
let result2 = "I".concat(" love", " JavaScript", " programming");
console.log(result2); // "I love JavaScript programming"

// Interview tip: In everyday JavaScript, + and template literals are generally more commonly used for string concatenation than concat().


// repeat() — Repeating a string

// repeat() creates a new string by repeating the original string a specified number of times.

// Syntax:
// string.repeat(count)
// Here, count specifies how many times the string should repeat.

let word = "Hello ";
console.log(word.repeat(3)); // "Hello Hello Hello "

let text = "Hello";
console.log(text.repeat(-1));

// This throws a RangeError.
// The count cannot be negative.

// Can we use decimal numbers?
let text2 = "Hi";

console.log(text2.repeat(2.8)); // "HiHi"

// The decimal count is truncated toward zero. So 2.8 behaves like 2.

