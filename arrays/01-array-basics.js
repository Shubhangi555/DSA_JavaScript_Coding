// creating an array 

//-----------------------------------------------------------------------creating array of size n -------------------------------------------
// array of length 5 with values 0
const zeros = new Array(5).fill(0);
console.log(zeros); // [ 0, 0, 0, 0, 0 ]

// sqaures of each array element of length 5
const squares = Array.from({length:5}, (_, i)=> i * i);
console.log(squares); // [ 0, 1, 4, 9, 16 ]


//------------------------------------------------------ Holes in array, empty slots are different from undefined---------------------------------------------------------
const holey = new Array(5);
console.log(holey); //[ <5 empty items> ], i.e [undefined undefined undefined]
console.log(holey.length); // 5
console.log(holey[0]); // undefined
console.log(0 in holey) // false

//forEach(), map() and filter skips the holes
let visits = 0;
holey.forEach(()=> visits++);
console.assert(visits===0);// nothing prints beacuse visiti is still 0 beacause holey contains no actual elements so this method skips the empty slots

const strArr = new Array(3);
strArr.forEach(()=> console.log("hello")); // nothing prints 

//A regular for loop checks every index from 0 to length - 1, even if the index is empty.
for(let i=0; i<strArr.length; i++){
  console.log(i) // 0 1 2
}

//------------------------------------------------------------------- console.assert() checks whether the condition is true--------------------------------------------------------
console.assert(zeros.join=== "0,0,0,0"); // Assertion failed

const numbers = [0,1,2,3,4];
console.assert(numbers.length === 5);// nothing prints on true
console.assert(numbers.length === 3); //Assertion failed


