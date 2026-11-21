// These two are very important because their names look similar.
//---------------------------------------------------------------------------splice() – O(n)-------------------------------------------------------------------------------------------------
// It can:
// - Add elements.
// - Remove elements.
// - Replace elements.

const arr = [1,2,3,4];
arr.splice(1,2); // 1 = starting index. 2 = number of elements to remove.
console.log(arr); //[1,4]

const arr2 = [10,20,30];
arr2.splice(1, 1, 99); // It removes 20 and inserts 99.
console.log(arr2); // [ 10, 99, 30 ]

// Important: splice() changes the original array and returns the removed elements.



//-------------------------------------------------------------------------slice() – O(b − a)----------------------------------------------------------------------------------------------------
// It extracts a portion of an array without modifying the original.

const nums = [1, 2, 3,4];
const result = nums.slice(1, 4);
console.log(result); // [ 2, 3, 4 ]
console.log(nums); // [ 1, 2, 3, 4 ]

//---------------------------------------------------------------------------Remember the difference--------------------------------------------------------------------------------------------
// splice()
// Mutates

// Changes the original array.

// slice()
// Does not mutate

// Returns a shallow copy of the selected portion.

