//-------------------------------------------------------------------------------------------2D Array Trap - shared References---------------------------------------------------------------------------------------

const badGrid  = new Array(2).fill(new Array(2).fill(0));
console.log(badGrid );// [ [ 0, 0 ], [ 0, 0 ] ]
// fill() places the same inner array reference into all three positions.
badGrid [0][0] = 1;
// All three rows point to the same array!, All three rows appear changed
// why? beacause all three positions reference the same inner array in memory
console.log(badGrid )// [ [ 1, 0 ], [ 1, 0 ] ]

// correct Approach : Array.from()
const grid = Array.from({length: 2}, ()=> new Array(2).fill(0));
// Here, the callback creates a new array every time.
console.log(grid); //[ [ 0, 0 ], [ 0, 0 ] ]

grid[0][0] =1;
// Each row is independent.
console.log(grid);// [ [ 1, 0 ], [ 0, 0 ] ]

//----------------------------------------------------------------Interview takeaway: When creating 2D arrays, use Array.from() with a callback to avoid shared references.----------------------------------------------


