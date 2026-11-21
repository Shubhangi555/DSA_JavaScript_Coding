//----------------------------------------------------------------------Unlike regular arrays, typed arrays are designed to store a fixed number of values of a particular numeric type.-----------------------------------------------------

// Here:
// - Int32Array means 32-bit signed integers.
// - 26 means 26 positions.
// - Every position starts at zero.
// - Its size cannot be changed like a regular array.

const counts = new Int32Array(26);
counts["c".charCodeAt(0) - 97]++;
console.log(counts)
// Int32Array(26) [
//   0, 0, 1, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0
// ]


// Why 26 positions?
// Because there are 26 English lowercase letters.

// Let's break this down:
// 1. "c".charCodeAt(0) returns 99.
// 2. 99 - 97 gives 2.
// 3. counts[2]++ increments the third position.
// Why 97?

// Because the ASCII code for lowercase a is 97.



function countCharacters(str){
  const counts = new Int32Array(26)

  for(const char of str){
    const index = char.charCodeAt(0) - 97;
    counts[index]++;
  }

  // return counts;
  
  // Print only characters that appear
  for (let i = 0; i < 26; i++) {
      if (counts[i] > 0) {
          console.log(String.fromCharCode(i + 97), counts[i]); 
        // a 3
        // b 1
        // n 2
      }
  }
}

// console.log(countCharacters("banana")) 
// Int32Array(26) [
//   3, 1, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 2, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0
// ]
