//--------------------------------------------------------------------------------------Chaining methods vs using a loop--------------------------------------------------------------------------------------------

const numbers = [1,2,3,4,5,6];

// This looks complicated, but it performs three simple operations.
const result = numbers.filter((x) => x % 2 === 0).map((x) => x * x).reduce((sum, x) => sum + x, 0);
console.log(result); // 56

// Now look at the alternative: for...of loop
let sum = 0;

for(const num of numbers){
  if (num % 2 === 0){
    sum += num * num;
  }
}

console.log(sum); //56

//-------------------------Interview takeaway: Both are valid. Prefer chaining for readability, and consider a loop when performance or memory allocation matters.------------------------------------------------------------------
