//--------------------------------------------------push() and pop() – O(1)*------------------------------------------------
// push() adds an element at the end.

const arr = [10, 20, 30];
arr.push(40);
console.log(arr);

// pop() removes the last element.
arr.pop();
console.log(arr);

// Both modify the original array.

// Why O(1)?

// Because JavaScript can generally add or remove an element at the end without shifting all the other elements.

// The asterisk means push() is amortized O(1): occasionally the underlying storage needs to grow, which takes more work.
