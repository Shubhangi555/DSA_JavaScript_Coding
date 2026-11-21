// These two methods are very important because they help us convert:
// - String → Array using split()
// - Array → String using join()

// 1. split() — Convert a string into an array
// Purpose: Divides a string into multiple parts based on a separator and returns an array.

// Syntax:
// string.split(separator, limit);


// - separator: Where to split the string.
// - limit: Optional maximum number of array elements to return.
// Example 1: Split using a space
const sentence = "I love JavaScript";
const result = sentence.split(" ");
console.log(result); // ["I", "love", "JavaScript"]

// Example 2: Split using a comma
const fruits = "apple,banana,mango";
console.log(fruits.split(",")); // ["apple", "banana", "mango"]

// Example 3: Split using an empty string
// This is an important example.
const word = "React";
console.log(word.split("")); // ["R", "e", "a", "c", "t"]

// Example 4: Using the limit parameter
const sentence2 = "I love JavaScript and React";
console.log(sentence2.split(" ", 2)); // ["I", "love"]
console.log(sentence2.split(" ", 3)); // ["I", "love", "JavaScript"]

// The limit controls how many pieces are included in the resulting array.

// Example 5: What if the separator is not found?
const word2 = "JavaScript";
console.log(word2.split(",")); // ["JavaScript"]
// If the separator doesn't exist, the entire original string becomes one array element.

// Example 6: Split without a separator
const sentence3 = "I love JavaScript";
console.log(sentence3.split());
// ["I love JavaScript"]

// Without a separator, you get an array containing the entire string as one element.

//------------------------------------------------------------------------ join() — Convert an array into a string --------------------------------------

// Purpose: Combines all array elements into a single string using a separator.
// Syntax:
// array.join(separator);
// The separator is optional. Its default value is a comma.

// Example 1: Join using a space
const words = ["I", "love", "JavaScript"];
const result2 = words.join(" ");
console.log(result2);
// "I love JavaScript"

// Example 2: Join using a comma
const fruits2 = ["apple", "banana", "mango"];
console.log(fruits2.join(","));
// "apple,banana,mango"

// Example 3: Join without a separator
const letters = ["J", "a", "v", "a"];
console.log(letters.join());
// "J,a,v,a"
console.log(letters.join(""));
// "Java"

// Remember:
// - join() without an argument uses ,.
// - join("") combines everything without separators.

// Example 4: Join with a custom separator
const words2 = ["React", "Node", "Express"];
console.log(words2.join(" - "));
// "React - Node - Express"





// 4. Important interview edge cases
// Case 1: Empty string
// const text = "";

// console.log(text.split("")); // []


// An empty string split using an empty separator returns an empty array.

// But:
// console.log("".split(",")); // [""]


// Different separator, different result!
// Case 2: Empty array
// const arr = [];

// console.log(arr.join(" ")); // ""


// Joining an empty array produces an empty string.
// Case 3: join() with null and undefined
// const values = ["React", null, undefined, "Node"];

// console.log(values.join("-"));
// // "React---Node"


// null and undefined become empty strings when joined.
// Case 4: Missing array elements
// const values = ["React", , "Node"];

// console.log(values.join("-"));
// // "React--Node"


// The empty slot also produces an empty part between separators.
