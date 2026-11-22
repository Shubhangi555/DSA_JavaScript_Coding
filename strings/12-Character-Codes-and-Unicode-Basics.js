// Character Codes and Unicode Basics
// three terms:
// 1. Code unit
// 2. Code point
// 3. Grapheme cluster
// They sound similar, but they represent three different ways of understanding text.

// 1. Code unit — charCodeAt()
// A JavaScript string uses UTF-16 encoding.

// A code unit is a 16-bit value used to represent text.

// JavaScript's length and normal indexing count UTF-16 code units, not necessarily visible characters.
const name = "Hello";

console.log(name.length);       // 5
console.log(name[0]);           // "H"
console.log(name.charCodeAt(0)); // 72


// Here:
// - "Hello" has 5 code units.
// - name[0] gives "H".
// - charCodeAt(0) gives the numeric UTF-16 code unit: 72.
// Let's try an emoji
const emoji = "😊";

console.log(emoji.length); // 2
console.log(emoji.charCodeAt(0)); // 55367
console.log(emoji.charCodeAt(1)); // 56842

// Why is the length 2?

// Because this emoji is represented using two UTF-16 code units called a surrogate pair.
// How one emoji is represented
// 😊
// One visible emoji
// 55357 High surrogateIndex 0
// 56842 Low surrogateIndex 1


// Together, these two code units represent the emoji 😊.

// Remember: charCodeAt() returns one code unit, not necessarily the complete Unicode character.

// 2. Code point — codePointAt()
// A code point is a number assigned to a character in Unicode.

// JavaScript provides codePointAt() to retrieve the complete code point when a character is represented by a surrogate pair.
const emoji2 = "😊";
console.log(emoji2.codePointAt(0)); // 128522

// Compare:
const emoji3 = "😊";
console.log(emoji3.charCodeAt(0));  // 55357
console.log(emoji3.codePointAt(0)); // 128522

// Method	Output	Meaning
// charCodeAt(0)	55357	First UTF-16 code unit
// codePointAt(0)	128522	Complete Unicode code point

// An important detail:
console.log(emoji.codePointAt(1)); // 56842

// Why doesn't it return 128522 again?

// Because index 1 points to the second code unit, the low surrogate. codePointAt() combines a surrogate pair when called at the high-surrogate position.
// Convert code points back into characters
// Use String.fromCodePoint():
const character = String.fromCodePoint(128522);
console.log(character); // 😊

// This is useful when working with Unicode values.

// 3. Grapheme cluster — Intl.Segmenter
// Now comes the most interesting part.

// A code point is not always the same as what a human sees as one character.

// For example, consider:
const text = "e\u0301";
console.log(text.length); // 2

// This consists of:
// - e — one code point.
// - \u0301 — combining acute accent, another code point.
// Together, they visually appear as:
// é
// One visible character, two Unicode code points
// This visible unit is called a grapheme cluster.

// Other examples include flags and family emojis.
// 🇮🇳
// Flag
// 👨‍👩‍👧‍👦
// Family emoji

// These can contain multiple code points but appear as one visible unit.
// How do we count visible characters?

// Use Intl.Segmenter.
const text2 = "👨‍👩‍👧‍👦";

const segmenter = new Intl.Segmenter("en", {
  granularity: "grapheme"
});

const characters = [...segmenter.segment(text2)];
console.log(characters.length); // 1

// This counts grapheme clusters rather than UTF-16 code units.

// 4. Three levels — comparison table
// Concept	What it counts	JavaScript
// Code unit	UTF-16 16-bit units	length, s[i], charCodeAt()
// Code point	Unicode code points	codePointAt(), [...s], for...of
// Grapheme cluster	User-perceived characters	Intl.Segmenter

// Very important interview distinction
const emoji4 = "😊";
console.log(emoji4.length);       // 2
console.log([...emoji4].length);  // 1


// Why?
// - length counts UTF-16 code units.
// - Spread syntax iterates Unicode code points.
// But for a family emoji:
const family = "👨‍👩‍👧‍👦";
console.log(family.length);       // 11
console.log([...family].length);  // 7

// It has 11 UTF-16 code units, 7 code points, but only 1 grapheme cluster.
