//----------------------------------------------------------------------------------------------------Negative indices----------------------------------------------------------------------------------------------------------------

const arr = [10, 20, 30, 40];
//normal indexing
console.log(arr[0]); // 10
console.log(arr[1]); // 20
console.log(arr[2]); // 30
console.log(arr[3]); // 40

// what if you want the last element?
// Traditionally:
console.log(arr[arr.length-1]); // 40

//using at()= at() supports negative indexing.
console.log(arr.at(-1)); // 40
console.log(arr.at(0));  // 10
console.log(arr.at(1));  // 20
console.log(arr.at(-2)); // 30
console.log(arr.at(-3)); // 20
console.log(arr[-1]);    // undefined
// Why does arr[-1] return undefined?
// Because JavaScript treats -1 as a property key, not as an instruction to access the last array element.

//------------------------------------------------------------------------------------Interview takeaway: Use .at(-1) to access the last element.--------------------------------------------------------------------------------------



