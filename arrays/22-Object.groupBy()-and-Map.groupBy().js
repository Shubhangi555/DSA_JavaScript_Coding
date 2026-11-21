//---------------------------------------------------------------Object.groupBy() and Map.groupBy() – O(n)---------------------------------------
// These methods group array elements based on a condition.

const data = [
  {age: 28, name: "rahul"},
  {age: 24, name: "shubhangi"},
  {age: 24, name: "sonu"}
]

const result = Object.groupBy(data, data => data.age);
console.log(result); 
// [Object: null prototype] {
//   '24': [ { age: 24, name: 'shubhangi' }, { age: 24, name: 'sonu' } ],
//   '28': [ { age: 28, name: 'rahul' } ]
// }

// Map.groupBy() does something similar but returns a Map.

// Difference:
// - Object.groupBy() returns an object.
// - Map.groupBy() returns a Map.
// Both are useful for categorizing data without manually creating groups.
