// Strings in JavaScript are immutable.

// Immutable means once a string is created, you cannot directly change its individual characters.

let language = "JavaScript";
language[0] = "P";
console.log(language); // "JavaScript"

// Then how do we change a string?
// We create a new string and assign it to the variable.

language = "js";
console.log(language);// js

let name = "react";
name = name.toUpperCase();
console.log(name); // "REACT"

// What happened?
// 1. Original string: "react".
// 2. toUpperCase() creates a new string: "REACT".
// 3. The new string is assigned to name.

// Important interview distinction:
// - String is immutable.
// - A variable declared with let can be reassigned.
// - A string's individual characters cannot be modified.


// + operator — String concatenation
// Purpose: Combines two or more strings into one string.

// Concatenation simply means joining strings together.

const firstName = "Shubhangi";
const lastName = "Bhosale";

const fullName = firstName + lastName;

console.log(fullName); // "ShubhangiBhosale"

// Important: String + Number

console.log("Age: " + 25); // "Age: 25"

console.log("10" + 20);// "1020"

console.log(10 + "20");// "1020"

// += operator — Append to an existing string
// The += operator adds new content to the existing string value and assigns the result back to the variable.
let message = "Hello";
message += " World";
console.log(message); // "Hello World"


// Example: Building a string using a loop
let result = "";

for (let i = 1; i <= 5; i++) {
  result += i;
}
console.log(result); // "12345"



// Template literals — Modern way to create strings
// Template literals allow you to insert variables and expressions directly inside a string.

// They use backticks (`), not single or double quotes.
const role = "React Developer";
const profile = `My name is ${fullName} and I am a ${role}.`;
console.log(profile); // My name is Shubhangi and I am a React Developer.

// Example: Expressions inside ${}
// You can also perform calculations.
const price = 500;
const quantity = 3;
console.log(`Total price: ${price * quantity}`); // "Total price: 1500"

// call functions:
const name2 = "react";
console.log(`Language: ${name2.toUpperCase()}`); // "Language: REACT"

// Example: Multiline strings
// With normal quotes:
const message2 = "Hello\nWelcome to JavaScript\nKeep learning";

// With template literals:
const message3 = `Hello
Welcome to JavaScript
Keep learning`;

console.log(message3);

// Template literals preserve line breaks without needing \n.
