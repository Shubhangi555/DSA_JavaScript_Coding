
// ========================================================
// SORTING, COMPARATORS AND SEARCHING BUILT-INS
// ========================================================
//
// TOPICS:
// 1. sort() method
// 2. Default sorting behavior
// 3. Numeric ascending and descending sorting
// 4. Comparator function
// 5. Incorrect boolean comparator
// 6. Handling Infinity and NaN
// 7. Stable sorting
// 8. Multi-key sorting
// 9. toSorted() — non-mutating sorting
// 10. lowerBound() — binary search
// 11. Time complexity
// 12. Interview questions
//
// ========================================================
// 1. sort() — UNDERSTANDING THE BASICS
// ========================================================
//
// sort() sorts array elements IN PLACE.
//
// It modifies the original array and returns the
// same array reference.
//
// IMPORTANT:
// Without a comparator, sort() converts elements
// to strings and compares them by UTF-16 code units.
//
// This means numbers are NOT sorted numerically by default.

const numbers = [10, 9, 1, 100];

const defaultSorted = numbers.sort();

console.log(defaultSorted);
// [1, 10, 100, 9]

console.log(numbers);
// [1, 10, 100, 9]

// WHY?
// String comparison:
// "1" < "10" < "100" < "9"
//
// Therefore, always provide a numeric comparator
// when sorting numbers.


// ========================================================
// 2. NUMERIC SORTING — ASCENDING
// ========================================================
//
// Syntax:
// array.sort((a, b) => a - b);
//
// COMPARATOR RULE:
//
// Negative number -> a comes before b.
// Zero            -> a and b are equal for sorting.
// Positive number -> a comes after b.
//
// ASCENDING:
// Smaller values come first.

const ascendingNumbers = [10, 9, 1, 100];

ascendingNumbers.sort((a, b) => a - b);

console.log(ascendingNumbers);
// [1, 9, 10, 100]


// DRY RUN:
//
// Compare 10 and 9:
// 10 - 9 = 1
// Positive -> 10 comes after 9.
//
// Compare 9 and 1:
// 9 - 1 = 8
// Positive -> 9 comes after 1.
//
// The engine determines the comparisons needed;
// it does not necessarily compare every adjacent pair.


// ========================================================
// 3. NUMERIC SORTING — DESCENDING
// ========================================================
//
// Syntax:
// array.sort((a, b) => b - a);
//
// DESCENDING:
// Larger values come first.

const descendingNumbers = [10, 9, 1, 100];

descendingNumbers.sort((a, b) => b - a);

console.log(descendingNumbers);
// [100, 10, 9, 1]


// REMEMBER:
//
// Ascending  -> (a, b) => a - b
// Descending -> (a, b) => b - a


// ========================================================
// 4. COMPARATOR FUNCTION — UNDERSTAND THE CONTRACT
// ========================================================
//
// A comparator is a function that tells sort()
// how two elements should be ordered.
//
// Example:
//
// (a, b) => a - b
//
// If a = 5 and b = 10:
//
// 5 - 10 = -5
//
// Negative result:
// a should come before b.
//
// COMPARATOR CONTRACT:
//
// Return value       Meaning
// Negative           a comes before b
// Zero               a and b compare equal
// Positive           a comes after b
//
// The comparator must be consistent.
//
// Same inputs should produce the same ordering result.
// The comparison must be transitive.
//
// Avoid random, boolean, or otherwise inconsistent
// comparator results.


// ========================================================
// 5. INCORRECT BOOLEAN COMPARATOR
// ========================================================
//
// WRONG:
//
// (a, b) => a > b
//
// Why is this wrong?
//
// It returns only true or false.
//
// true  becomes 1.
// false becomes 0.
//
// It never returns a negative number.
//
// Therefore, it does not correctly express all
// three comparator outcomes.
//
// Do not rely on the output of an inconsistent comparator.

const wrongNumbers = [5, 1, 4, 2, 3];

wrongNumbers.sort((a, b) => a > b);

console.log("Wrong comparator:", wrongNumbers);

// CORRECT:

const correctNumbers = [5, 1, 4, 2, 3];

correctNumbers.sort((a, b) => a - b);

console.log("Correct comparator:", correctNumbers);
// [1, 2, 3, 4, 5]


// ========================================================
// 6. SAFE COMPARATOR — INFINITY AND NaN
// ========================================================
//
// For ordinary finite numbers:
//
// (a, b) => a - b
//
// works correctly.
//
// However:
//
// Infinity - Infinity = NaN
//
// NaN is not a useful signed comparator result.
//
// If values may include Infinity, use an explicit
// three-way comparison.
//
// This comparator treats NaN as equal to NaN and
// places NaN after all non-NaN values.

function safeNumericCompare(a, b) {
  const aIsNaN = Number.isNaN(a);
  const bIsNaN = Number.isNaN(b);

  if (aIsNaN && bIsNaN) return 0;
  if (aIsNaN) return 1;
  if (bIsNaN) return -1;

  return a < b ? -1 : a > b ? 1 : 0;
}

const specialNumbers = [
  Infinity,
  1,
  -Infinity,
  Infinity,
  NaN
];

specialNumbers.sort(safeNumericCompare);

console.log(specialNumbers);
// [-Infinity, 1, Infinity, Infinity, NaN]


// ========================================================
// 7. STABLE SORTING
// ========================================================
//
// JavaScript sorting has been required to be stable
// since ECMAScript 2019.
//
// STABLE SORT:
//
// If two elements compare equal, their original
// relative order must be preserved.
//
// Example:

const students = [
  { name: "Asha", score: 90 },
  { name: "Ravi", score: 80 },
  { name: "Bala", score: 90 },
  { name: "Neha", score: 80 }
];

students.sort((a, b) => a.score - b.score);

console.log(students);

/*
Expected order:

Ravi  80
Neha  80
Asha  90
Bala  90

Ravi was before Neha originally.
They have equal scores, so their relative order
is preserved.

Asha was before Bala originally.
Their relative order is also preserved.
*/


// ========================================================
// 8. MULTI-KEY SORTING
// ========================================================
//
// Sometimes sorting depends on multiple conditions.
//
// Example:
//
// First: score descending.
// Second: name ascending.
//
// The OR (||) operator is useful here.
//
// y.score - x.score
//     -> Primary sorting condition.
//
// x.name.localeCompare(y.name)
//     -> Secondary sorting condition.
//
// If the first comparison returns 0,
// the second comparison is used.

const people = [
  { name: "Ravi", score: 90 },
  { name: "Asha", score: 95 },
  { name: "Bala", score: 90 },
  { name: "Neha", score: 95 }
];

people.sort((x, y) =>
  y.score - x.score ||
  x.name.localeCompare(y.name)
);

console.log(people);

/*
Expected order:

Asha  95
Neha  95
Bala  90
Ravi  90

FIRST CONDITION:
Higher score first.

SECOND CONDITION:
If scores are equal, alphabetical name order.
*/


// ========================================================
// 9. SORT STRINGS BY LENGTH
// ========================================================
//
// Example:
//
// First sort by string length.
// If lengths are equal, sort alphabetically.

const words = ["pear", "fig", "apple", "kiwi"];

words.sort((a, b) =>
  a.length - b.length ||
  a.localeCompare(b)
);

console.log(words);
// ["fig", "kiwi", "pear", "apple"]


// EXPLANATION:
//
// fig   -> length 3
// kiwi  -> length 4
// pear  -> length 4
// apple -> length 5
//
// kiwi and pear have the same length.
// localeCompare() sorts them alphabetically.


// ========================================================
// 10. toSorted() — NON-MUTATING SORTING
// ========================================================
//
// sort():
// Changes the original array.
//
// toSorted():
// Returns a new sorted array.
// Does not modify the original array.
//
// toSorted() is available in modern JavaScript
// environments (ES2023).

const originalArray = [5, 2, 8, 1];

const sortedArray = originalArray.toSorted(
  (a, b) => a - b
);

console.log("Original:", originalArray);
// [5, 2, 8, 1]

console.log("Sorted:", sortedArray);
// [1, 2, 5, 8]

// Equivalent non-mutating approach using slice():

const anotherOriginal = [5, 2, 8, 1];

const anotherSorted = anotherOriginal
  .slice()
  .sort((a, b) => a - b);

console.log(anotherOriginal);
// [5, 2, 8, 1]

console.log(anotherSorted);
// [1, 2, 5, 8]


// ========================================================
// 11. SEARCHING — BINARY SEARCH INTRODUCTION
// ========================================================
//
// JavaScript arrays do not have a built-in binary
// search method.
//
// Binary search works on SORTED data.
//
// It repeatedly divides the search range in half.
//
// TIME COMPLEXITY:
//
// Linear search  -> O(n)
// Binary search  -> O(log n)
//
// IMPORTANT:
// The input must already be sorted according to
// the same ordering used by the search comparison.


// ========================================================
// 12. LOWER BOUND
// ========================================================
//
// lowerBound() returns the FIRST index where:
//
// arr[index] >= target
//
// It uses a half-open search range:
//
// [lo, hi)
//
// This means:
// lo is included.
// hi is excluded.
//
// WHY hi = array.length?
//
// Because the answer might be array.length
// when the target is greater than every element.

function lowerBound(sorted, target) {
  let lo = 0;
  let hi = sorted.length;

  while (lo < hi) {
    // Find the middle index.
    const mid = lo + Math.floor((hi - lo) / 2);

    if (sorted[mid] < target) {
      // Middle value is too small.
      // Search the right half.
      lo = mid + 1;
    } else {
      // Middle value is large enough.
      // Search the left half, including mid.
      hi = mid;
    }
  }

  return lo;
}


// TEST CASES:

console.log(lowerBound([1, 3, 3, 5], 3));
// 1 — first occurrence of 3

console.log(lowerBound([1, 3, 3, 5], 4));
// 3 — first value greater than or equal to 4

console.log(lowerBound([1, 3], 9));
// 2 — target is greater than all elements

console.log(lowerBound([], 1));
// 0 — empty array


// ========================================================
// 13. LOWER BOUND — DRY RUN
// ========================================================
//
// Array:  [1, 3, 3, 5]
// Target: 3
//
// Initial:
// lo = 0
// hi = 4
//
// Step 1:
// mid = 2
// sorted[2] = 3
//
// 3 < 3 is false.
// hi = 2
//
// Step 2:
// lo = 0
// hi = 2
// mid = 1
// sorted[1] = 3
//
// 3 < 3 is false.
// hi = 1
//
// Step 3:
// lo = 0
// hi = 1
// mid = 0
// sorted[0] = 1
//
// 1 < 3 is true.
// lo = 1
//
// Now lo = hi = 1.
// Loop stops.
//
// Return 1.
//
// LOWER BOUND = 1
//
// It returns the first position where value >= 3.


// ========================================================
// 14. UPPER BOUND — EXTRA IMPORTANT CONCEPT
// ========================================================
//
// lowerBound(target):
// First index where value >= target.
//
// upperBound(target):
// First index where value > target.
//
// JavaScript does not provide these as built-in
// array methods, but we can implement them.

function upperBound(sorted, target) {
  let lo = 0;
  let hi = sorted.length;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (sorted[mid] <= target) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo;
}

console.log(upperBound([1, 3, 3, 5], 3));
// 3 — first position where value > 3


// COUNT OCCURRENCES:
//
// Number of occurrences of target:
//
// upperBound(target) - lowerBound(target)

function countOccurrences(sorted, target) {
  return (
    upperBound(sorted, target) -
    lowerBound(sorted, target)
  );
}

console.log(countOccurrences([1, 3, 3, 3, 5], 3));
// 3


// ========================================================
// 15. TIME COMPLEXITY REVISION
// ========================================================
//
// Operation                   Complexity
//
// sort()                      Not specified by ECMAScript
// toSorted()                  Not specified by ECMAScript
// lowerBound()                O(log n)
// upperBound()                O(log n)
// Linear search               O(n)
//
// ENGINE NOTE:
//
// V8 uses TimSort for Array.prototype.sort().
//
// TimSort has O(n log n) worst-case time complexity
// and can perform in O(n) on already ordered data.
//
// However, ECMAScript does not mandate a particular
// sorting algorithm or complexity.
//
// Always distinguish language guarantees from
// JavaScript engine implementation details.


// ========================================================
// 16. COMMON INTERVIEW MISTAKES
// ========================================================
//
// 1. Using sort() without a numeric comparator.
//
// 2. Confusing ascending and descending:
//
//    Ascending:  (a, b) => a - b
//    Descending: (a, b) => b - a
//
// 3. Returning true/false from a comparator.
//
// 4. Forgetting sort() mutates the original array.
//
// 5. Assuming toSorted() changes the original array.
//
// 6. Forgetting sorting is stable.
//
// 7. Using binary search on an unsorted array.
//
// 8. Confusing lowerBound and upperBound.
//
// 9. Assuming the sorting algorithm is specified
//    by JavaScript itself.


// ========================================================
// 17. INTERVIEW QUESTIONS AND ANSWERS
// ========================================================
//
// Q1. What does sort() do?
//
// Answer:
// sort() sorts array elements in place and returns
// the same array reference.
//
// Q2. Why does [10, 2, 1].sort() give an unexpected
// numeric order?
//
// Answer:
// Without a comparator, sort() converts elements
// to strings and compares them lexicographically.
//
// Q3. What does a comparator return?
//
// Answer:
// A negative number, zero, or positive number
// to define the relative order of two elements.
//
// Q4. What is stable sorting?
//
// Answer:
// Equal elements retain their original relative
// order after sorting.
//
// Q5. Difference between sort() and toSorted()?
//
// Answer:
// sort() mutates the original array.
// toSorted() creates and returns a sorted copy.
//
// Q6. What is binary search?
//
// Answer:
// A searching technique that repeatedly divides
// a sorted search range in half. Its time complexity
// is O(log n).
//
// Q7. What does lowerBound() return?
//
// Answer:
// The first index where the array value is greater
// than or equal to the target.
//
// Q8. What is the difference between lowerBound()
// and upperBound()?
//
// Answer:
// lowerBound returns the first index with value >= target.
// upperBound returns the first index with value > target.
//
// Q9. Can binary search work on an unsorted array?
//
// Answer:
// Not reliably. Binary search requires sorted data
// according to the comparison being used.


// ========================================================
// 18. FINAL REVISION
// ========================================================
//
// DEFAULT SORT:
// String-based ordering.
//
// NUMERIC ASCENDING:
// (a, b) => a - b
//
// NUMERIC DESCENDING:
// (a, b) => b - a
//
// NON-MUTATING SORT:
// toSorted()
//
// STABLE SORT:
// Equal elements preserve relative order.
//
// LOWER BOUND:
// First index with value >= target.
//
// UPPER BOUND:
// First index with value > target.
//
// BINARY SEARCH:
// O(log n), requires sorted input.
//
// REMEMBER:
// sort() mutates.
// toSorted() does not.
//
// ========================================================
// END OF FILE
// ========================================================
