// String Comparison

// 1. <, >, <=, >= — lexicographical comparison.
// 2. === — checking whether two strings are equal.
// 3. localeCompare() — locale-aware string comparison.

// Comparing strings using < and >
// JavaScript compares strings lexicographically, character by character, using UTF-16 code units.

console.log("apple" < "banana"); // true
console.log("cat" > "bat");      // true
console.log("apple" > "apple");  // false

// JavaScript finds the first differing character and decides the result.

// It doesn't need to compare the remaining characters.
// Important: Case sensitivity
console.log("Apple" < "apple"); // true
console.log("A" < "a");         // true

// Why?

// Because uppercase and lowercase letters have different UTF-16 code unit values.
// - "A" = 65
// - "a" = 97
// Therefore, "A" < "a" is true.
// 2. Comparing strings using ===
// === checks whether two strings have the same characters in the same order.

console.log("React" === "React"); // true
console.log("React" === "react"); // false
console.log("React" === "Angular"); // false

// localeCompare()
// This method compares two strings according to locale-aware sorting rules.

// string1.localeCompare(string2);

// It returns:
// Result	Meaning
// Negative number	First string comes before second
// 0	Both compare as equivalent
// Positive number	First string comes after second

console.log("apple".localeCompare("banana")); // Negative
console.log("banana".localeCompare("apple")); // Positive
console.log("apple".localeCompare("apple"));  // 0


// Important: Don't depend on the exact negative or positive number. Check whether the result is less than, equal to, or greater than zero.
// Real-world example: Sorting names
let names = ["Riya", "Aman", "Priya", "Karan"];
names.sort((a, b) => a.localeCompare(b));
console.log(names); // ["Aman", "Karan", "Priya", "Riya"]


// localeCompare() is useful when sorting names and text according to language-specific ordering rules.
