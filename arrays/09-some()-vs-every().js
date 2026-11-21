//---------------------------------------------------------------------------some() vs every() on empty arrays

// This is an interesting JavaScript behaviour.
const x = [];

console.assert(
  x.every((x) => x > 2)=== true &&
  x.some((x) => x > 2) === false
)

//------------------------------every()------------------------------------------------------

// Checks whether all elements satisfy a condition.
  const numbers = [2, 4, 6];

console.log(numbers.every((x) => x > 0));
// true


// All three numbers are greater than zero.

//-------------------------------some()---------------------------------------------------------

// Checks whether at least one element satisfies a condition.
const numbers = [2, -4, 6];

console.log(numbers.some((x) => x > 0));
// true

// At least one number is greater than zero.

  
//--------------------------------------------------But what happens with an empty array?------------------------------------------------------------------
// every() returns true because there is no element that violates the condition.

// some() returns false because there isn't even one element that satisfies the condition.
