
/*
========================================================
STACKS AND QUEUES IN JAVASCRIPT
========================================================

TOPICS:
1. Stack (LIFO)
2. Queue (FIFO)
3. Why shift() is inefficient for queues
4. Queue using a head index
5. Queue class with private fields
6. Array-based BFS queue
7. Time and space complexity
8. Interview revision

========================================================
1. STACK — LAST IN, FIRST OUT (LIFO)
========================================================

A stack follows LIFO:
Last In, First Out.

Example:
A pile of plates.

The last plate placed on top is removed first.

JavaScript arrays are suitable for stacks because
push() and pop() operate at the end of the array.

MAIN OPERATIONS:

push(value)  -> Add an element to the top.
pop()        -> Remove the top element.
peek         -> Read the top element without removing it.

TIME COMPLEXITY:
push()       -> Amortized O(1)
pop()        -> O(1)
peek         -> O(1)
*/

const stack = [];

stack.push(10);
stack.push(20);
stack.push(30);

console.log("Stack:", stack);
// [10, 20, 30]

// Remove the last inserted element.
const removedStackElement = stack.pop();

console.log("Removed:", removedStackElement);
// 30

console.log("Stack after pop:", stack);
// [10, 20]

// Read the top element without removing it.
const topElement = stack[stack.length - 1];

console.log("Top element:", topElement);
// 20

/*
DRY RUN:

Operation       Stack
push(10)        [10]
push(20)        [10, 20]
push(30)        [10, 20, 30]
pop()           [10, 20]

IMPORTANT:
pop() removes the last element.
It returns undefined when called on an empty array.
*/


/*
========================================================
2. QUEUE — FIRST IN, FIRST OUT (FIFO)
========================================================

A queue follows FIFO:
First In, First Out.

Example:
People standing in a ticket line.

The person who arrives first gets served first.

MAIN OPERATIONS:

enqueue(value) -> Add an element at the back.
dequeue()      -> Remove the front element.
peek()         -> Read the front element.

A simple queue can use:

push()  -> Add at the back.
shift() -> Remove from the front.

However, shift() is inefficient for large queues.
*/

const simpleQueue = [];

simpleQueue.push("A");
simpleQueue.push("B");
simpleQueue.push("C");

console.log("Queue:", simpleQueue);
// ["A", "B", "C"]

const removedQueueElement = simpleQueue.shift();

console.log("Removed:", removedQueueElement);
// "A"

console.log("Queue after shift:", simpleQueue);
// ["B", "C"]

/*
WHY IS shift() INEFFICIENT?

Before shift():

Index:   0    1    2    3
Array:  [A,   B,   C,   D]

After shift():

Index:   0    1    2
Array:  [B,   C,   D]

Conceptually, the remaining elements must occupy
the earlier positions.

TIME COMPLEXITY:

One shift()       -> O(n) in the general analysis
n shift() calls   -> O(n²) total

Avoid repeated shift() in performance-sensitive
queue and BFS problems.
*/


/*
========================================================
3. QUEUE USING A HEAD INDEX
========================================================

BETTER APPROACH:

Instead of removing the first element physically,
maintain a variable called head.

head represents the current front position.

During dequeue:
1. Read items[head].
2. Increase head by 1.
3. Do not shift the remaining elements.

This avoids moving all remaining elements.

ENQUEUE  -> push()
DEQUEUE  -> items[head++]
PEEK     -> items[head]
SIZE     -> items.length - head

TIME COMPLEXITY:
Enqueue       -> Amortized O(1)
Dequeue       -> O(1)
Peek          -> O(1)
Size          -> O(1)
*/

const items = ["A", "B", "C", "D"];

let head = 0;

console.log("Initial queue:", items);
console.log("Initial head:", head);

// First dequeue.
let removed = items[head];
head++;

console.log("Removed:", removed);
// A

console.log("New head:", head);
// 1

console.log("Current front:", items[head]);
// B

// Second dequeue.
removed = items[head];
head++;

console.log("Removed:", removed);
// B

console.log("Current front:", items[head]);
// C

/*
DRY RUN:

Items: [A, B, C, D]

Operation       Head       Front
Initial         0          A
dequeue()       1          B
dequeue()       2          C
dequeue()       3          D

Notice:
The array is not physically shifted.
Only the head index changes.
*/


/*
========================================================
4. COMPLETE QUEUE CLASS
========================================================

This implementation uses:

#items -> Private array storing queue elements.
#head  -> Private index pointing to the front.

enqueue() -> Add element.
dequeue() -> Remove front element.
peek()    -> Read front element.
size      -> Number of active elements.
isEmpty() -> Check whether queue is empty.

ADDITIONAL OPTIMIZATION:

Removed positions are assigned undefined to release
references to objects.

Occasional compaction prevents the internal array
from retaining too many unused positions.

Compaction copies the remaining elements into a new
array and resets head to zero.

Dequeue is amortized O(1), including occasional
compaction.
*/

class Queue {
  #items = [];
  #head = 0;

  // Add an element at the back.
  enqueue(value) {
    this.#items.push(value);
  }

  // Remove and return the front element.
  dequeue() {
    // Check whether the queue is empty.
    if (this.isEmpty()) {
      throw new Error("dequeue from empty queue");
    }

    const value = this.#items[this.#head];

    // Release the reference to the removed value.
    this.#items[this.#head] = undefined;

    // Move the front pointer forward.
    this.#head++;

    /*
    COMPACTION:

    Compact only when:
    1. At least 1025 positions have been consumed.
    2. More than half of the array is unused.

    This avoids unnecessary copying for small queues.
    */

    if (
      this.#head > 1024 &&
      this.#head * 2 > this.#items.length
    ) {
      this.#items = this.#items.slice(this.#head);
      this.#head = 0;
    }

    return value;
  }

  // Return the front without removing it.
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.#items[this.#head];
  }

  // Return the number of active elements.
  get size() {
    return this.#items.length - this.#head;
  }

  // Check whether the queue has no elements.
  isEmpty() {
    return this.size === 0;
  }
}

// TEST THE QUEUE CLASS

const queue = new Queue();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log("Queue size:", queue.size);
// 3

console.log("Queue front:", queue.peek());
// 10

console.log("Dequeue:", queue.dequeue());
// 10

console.log("Queue front:", queue.peek());
// 20

console.log("Queue size:", queue.size);
// 2

console.log("Is empty:", queue.isEmpty());
// false

queue.dequeue();
queue.dequeue();

console.log("Is empty after removals:", queue.isEmpty());
// true

// Empty queue should throw an error.
try {
  queue.dequeue();
} catch (error) {
  console.log(error.message);
  // dequeue from empty queue
}


/*
========================================================
5. QUEUE PERFORMANCE TEST
========================================================

The following test verifies that the head-index queue
returns all values in FIFO order.

It also checks the sum of removed values.

Do not rely on one benchmark run to establish exact
performance ratios. Timings depend on the JavaScript
engine and machine.
*/

const performanceQueue = new Queue();

let expectedSum = 0;

for (let i = 0; i < 5000; i++) {
  performanceQueue.enqueue(i);
  expectedSum += i;
}

let actualSum = 0;

while (!performanceQueue.isEmpty()) {
  actualSum += performanceQueue.dequeue();
}

console.assert(actualSum === expectedSum);
console.assert(performanceQueue.size === 0);

console.log("Queue test passed:", actualSum === expectedSum);


/*
========================================================
6. BFS-STYLE QUEUE USING AN ARRAY AND INDEX
========================================================

BFS = Breadth-First Search.

BFS processes elements level by level.

A queue is used because BFS follows FIFO order.

For many BFS problems, we do not need a separate
Queue class.

We can use:
1. An array to store pending elements.
2. An index to track the next element to process.
3. push() to add newly discovered elements.

IMPORTANT:

The loop condition uses frontier.length.

As new elements are pushed, the array grows.
The loop processes those elements too.

This avoids shift().
*/

const frontier = [1];
const order = [];

for (let i = 0; i < frontier.length; i++) {
  const current = frontier[i];

  order.push(current);

  if (current < 4) {
    frontier.push(current * 2, current * 2 + 1);
  }
}

console.log("BFS order:", order);
// [1, 2, 3, 4, 5, 6, 7]

/*
DRY RUN:

Initial frontier: [1]

Process 1:
Add 2, 3
Frontier: [1, 2, 3]

Process 2:
Add 4, 5
Frontier: [1, 2, 3, 4, 5]

Process 3:
Add 6, 7
Frontier: [1, 2, 3, 4, 5, 6, 7]

Process 4, 5, 6, 7:
No more elements added.

Final order:
[1, 2, 3, 4, 5, 6, 7]

For graph BFS, also maintain a visited Set
to avoid revisiting nodes and entering cycles.
*/


/*
========================================================
7. STACK vs QUEUE
========================================================

STACK:
LIFO = Last In, First Out
Add:    push()
Remove: pop()
Read:   arr[arr.length - 1]

QUEUE:
FIFO = First In, First Out
Add:    push()
Remove: head-index dequeue
Read:   items[head]

EXAMPLES:

Stack:
- Undo/redo operations
- Function call stack
- Browser navigation history patterns
- Parentheses validation

Queue:
- Task scheduling
- Request processing
- BFS
- Level-order tree traversal


========================================================
8. TIME COMPLEXITY REVISION
========================================================

Structure        Operation             Complexity

Stack            push()                Amortized O(1)
Stack            pop()                 O(1)
Stack            peek                  O(1)

Queue            enqueue()             Amortized O(1)
Queue            dequeue()             O(1) amortized
Queue            peek()                O(1)
Queue            size                  O(1)

Shift queue      shift()               O(n) general analysis
Shift queue      n removals            O(n²) total

BFS              Process each vertex   O(V + E)
BFS              Queue operations      O(1) amortized each

V = Number of vertices
E = Number of edges


========================================================
9. COMMON INTERVIEW MISTAKES
========================================================

1. Confusing LIFO and FIFO.

2. Using shift() repeatedly in large queue problems.

3. Forgetting to check whether the queue is empty.

4. Forgetting that head is an index, not an element.

5. Calculating queue size as items.length instead of:
   items.length - head

6. Forgetting to release references when implementing
   a long-lived queue of objects.

7. Forgetting to use a visited Set in graph BFS.

8. Assuming every queue implementation has exactly
   the same performance characteristics.


========================================================
10. INTERVIEW QUESTIONS
========================================================

Q1. What is a stack?

Answer:
A stack is a linear data structure that follows
LIFO (Last In, First Out). JavaScript arrays can
implement a stack using push() and pop().

Q2. What is a queue?

Answer:
A queue is a linear data structure that follows
FIFO (First In, First Out). Elements are added at
the back and removed from the front.

Q3. Why should we avoid shift() for large queues?

Answer:
shift() can require re-indexing the remaining array
elements. Repeated removals can therefore take O(n²)
total time. A head-index queue avoids this.

Q4. What is a head-index queue?

Answer:
It is a queue implementation that maintains a head
pointer to track the front element. Dequeue advances
the pointer instead of shifting the array.

Q5. What is amortized O(1)?

Answer:
An operation may occasionally take O(n), but when
its cost is averaged over a sequence of operations,
the average cost per operation is O(1).

Q6. Why is a queue used in BFS?

Answer:
BFS visits nodes level by level. A queue ensures
that the earliest discovered node is processed first.

Q7. What is the difference between peek() and pop()
or dequeue()?

Answer:
peek() reads the next element without removing it.
pop() and dequeue() remove and return an element.


========================================================
FINAL REVISION
========================================================

STACK:
LIFO
Array + push() + pop()

QUEUE:
FIFO
Array + push() + head index

AVOID:
Repeated shift() for large queues.

BFS:
Array + growing index.

REMEMBER:
Stack -> Last element comes out first.
Queue -> First element comes out first.

NEXT TOPICS:
Deque (double-ended queue)
Circular Queue
Priority Queue
Stack and Queue DSA problem patterns
========================================================
*/
