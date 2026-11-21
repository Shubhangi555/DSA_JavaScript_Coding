console.assert([NaN].indexOf(NaN)=== -1 && [NaN].includes(NaN) === true);

//----------------------------------------------------------------------------------Using indexOf()--------------------------------------------------------------------------
const arr = [NaN];

console.log(arr.indexOf(NaN)); // -1


// Normally, indexOf() returns the position of an element.

// But there's a special issue: NaN is not equal to itself when using strict equality.
console.log(NaN === NaN); // false

// So indexOf() cannot find it and returns -1

//-----------------------------------------------------------------------------------Using includes()-------------------------------------------------------------------------
console.log(arr.includes(NaN)); // true
// includes() uses a comparison algorithm called SameValueZero, which treats NaN as equal to NaN.

//     Method	           Result
// [NaN].indexOf(NaN)  	    -1
// [NaN].includes(NaN)	    true

// Remember: Use includes() when checking whether an array contains NaN.
