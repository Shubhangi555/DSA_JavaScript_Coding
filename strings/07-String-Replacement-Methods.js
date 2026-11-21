// 1. replace()
// The replace() method is used to replace a part of a string with another value.
// string.replace(searchValue, newValue)

let message = "I love JavaScript";
let result = message.replace("JavaScript", "React");
console.log(result); // "I love React"

// Important: replace() does not modify the original string.

// Important behavior: replace() replaces only the first occurrence
let text = "apple banana apple mango apple";
let result2 = text.replace("apple", "orange");
console.log(result2); // "orange banana apple mango apple"

// What if the word does not exist?
let text2 = "I love React";
let result3 = text2.replace("Angular", "Vue");
console.log(result3); // "I love React"

// Is replace() case-sensitive?
// Yes!
let text3 = "I love JavaScript";
console.log(text3.replace("javascript", "React")); // "I love JavaScript"

// Practical example — Cleaning user input
// Imagine a user enters an unwanted character in a username.
let username = "Shubhangi@Developer";
let result4 = username.replace("@", "");
console.log(result4); // "ShubhangiDeveloper"

// replaceAll()?
// replaceAll() replaces every occurrence of the specified search value in a string.

// Syntax:
// string.replaceAll(searchValue, newValue)

let text = "cat dog cat bird cat";
let result = text.replaceAll("cat", "lion");
console.log(result); // "lion dog lion bird lion"

