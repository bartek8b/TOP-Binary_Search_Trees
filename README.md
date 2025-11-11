### The Odin Project > JavaScript Course > Project: Binary Search Trees

[Project requirements](https://www.theodinproject.com/lessons/javascript-binary-search-trees)

---

#### Project description

An educational implementation of a classic Binary Search Tree (BST) in JavaScript, featuring all standard BST operations and rebalancing.

---

#### How to run

1. Clone the repository:
    ```bash
    git clone https://github.com/bartek8b/TOP-Binary_Search_Trees.git
    cd TOP-Binary_Search_Trees
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
    > (Dev dependency: [nodemon](https://www.npmjs.com/package/nodemon) ‒ for auto-reload during development, optional.)

3. Run the sample script with Node.js:
    ```bash
    node main.js
    ```

---

#### File structure

- `bst.js` — Binary Search Tree class and Node definition
- `main.js` — Demo/test script

---

#### Main methods (BST features)

**Tree class static:**
- `Tree.fromArray(array)` — build a balanced BST from an array (removes duplicates and sorts)

**Tree instance:**
- `insert(value)` — add new value
- `remove(value)` — remove value
- `find(value)` — get node by value
- `height(value)` — tree height from given node
- `depth(value)` — depth from root to node
- `isBalanced()` — check if the tree is balanced
- `rebalance()` — balance the tree in place if needed

**Traversals:**
- `inOrderForEach(callback)` — ascending in-order (LNR)
- `preOrderForEach(callback)`
- `postOrderForEach(callback)`
- `levelOrderForEach(callback)` — BFS/level order
- `prettyPrint(node)` — ASCII print tree  

---