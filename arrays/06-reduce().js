//------------------------------------------------------------------------------------------reduce() with empty array---------------------------------------------------------------------------------------------------------------

// reduce() takes all array elements and combines them into one final value.
// The accumulator stores the result from the previous iteration.
// But what happens with an empty array?
  
// There are no elements.
// JavaScript doesn't know what initial value to use for the accumulator, so it throws a TypeError.

let threw = false;

try{
  [].reduce((a, b) => a+b)
}catch(error){
  // e instanceof TypeError checks whether the error is a TypeError.
  threw = error instanceof TypeError;
}
console.log(threw); // true 


// Correct approach: Provide an initial value

const result = [].reduce((a, b) => a + b, 0);
console.log(result); // 0

//------------------------------------------------------------------------------------------Understand the reduce syntax--------------------------------------------------------------------------------------------------------------
// array.reduce((accumulator, currentValue) => {
//     return accumulator + currentValue;
// }, initialValue);


// - accumulator: Stores the accumulated result.
// - currentValue: Current element being processed.
// - initialValue: Starting value.

//-------------------------------------------------------------------------Interview takeaway: Always consider providing an initial value to reduce(), especially when an array might be empty.-------------------------------------------
