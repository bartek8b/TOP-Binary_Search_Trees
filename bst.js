class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  static fromArray(array) {
    // Eliminate duplicates and sort
    const noDuplicates = [...new Set(array)];
    const sorted = noDuplicates.sort((a, b) => a - b);
    const tree = new Tree();
    tree.root = buildTree(sorted);
    return tree;

    function buildTree(array, start = 0, end = array.length - 1) {
      if (start > end) return null;

      const mid = start + Math.floor((end - start) / 2);
      const root = new Node(array[mid]);

      root.left = buildTree(array, start, mid - 1);
      root.right = buildTree(array, mid + 1, end);

      return root;
    }
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Instance methods

Tree.prototype.insert = function (value) {
  if (!this.root) {
    this.root = new Node(value);
    return this.root;
  }

  return insertIntoNode(value, this.root);

  function insertIntoNode(value, node) {
    if (value === node.data) {
      console.log(`Value ${value} wasn't inserted as it's a duplicate`);
      return node;
    }
    if (!node.left && !node.right) {
      value < node.data
        ? (node.left = new Node(value))
        : (node.right = new Node(value));
      return node;
    }

    if (value < node.data) {
      if (!node.left) {
        node.left = new Node(value);
        return node;
      }
      return insertIntoNode(value, node.left);
    } else {
      if (!node.right) {
        node.right = new Node(value);
        return node;
      }
      return insertIntoNode(value, node.right);
    }
  }
};

Tree.prototype.remove = function (value) {
  if (!this.root) return null;

  return deleteItem(value, this.root);

  function deleteItem(value, node) {
    if (node === null) {
      return node;
    }
    if (value < node.data) {
      node.left = deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = deleteItem(value, node.right);
    } else {
      // Node with 0 or 1 child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      // Node with 2 children
      const succ = getSuccessor(node);
      node.data = succ.data;
      node.right = deleteItem(succ.data, node.right);
    }
    return node;
  }

  function getSuccessor(curr) {
    curr = curr.right;
    //Take the smallest from values higher than node
    while (curr !== null && curr.left !== null) curr = curr.left;
    return curr;
  }
};

Tree.prototype.find = function (value) {
  if (!this.root) return null;

  return findNode(value, this.root);

  function findNode(value, node) {
    if (!node) return null;
    if (value === node.data) return node;
    if (value < node.data) return findNode(value, node.left);
    if (value > node.data) return findNode(value, node.right);
  }
};

Tree.prototype.levelOrderForEach = function (callback) {
  if (typeof callback !== 'function') {
    throw new Error('A callback function is required');
  }
  if (!this.root) return;

  const q = [this.root];
  let head = 0;

  while (head < q.length) {
    const node = q[head++];
    callback(node);
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }
};

Tree.prototype.preOrderForEach = function (callback) {
  if (typeof callback !== 'function') {
    throw new Error('A callback function is required');
  }
  if (!this.root) return;

  recurse(this.root);

  function recurse(node) {
    if (node === null) return;
    callback(node);
    recurse(node.left);
    recurse(node.right);
  }
};

Tree.prototype.inOrderForEach = function (callback) {
  if (typeof callback !== 'function') {
    throw new Error('A callback function is required');
  }
  if (!this.root) return;

  recurse(this.root);

  function recurse(node) {
    if (node === null) return;
    recurse(node.left);
    callback(node);
    recurse(node.right);
  }
};

Tree.prototype.postOrderForEach = function (callback) {
  if (typeof callback !== 'function') {
    throw new Error('A callback function is required');
  }
  if (!this.root) return;

  recurse(this.root);

  function recurse(node) {
    if (node === null) return;
    recurse(node.left);
    recurse(node.right);
    callback(node);
  }
};

Tree.prototype.height = function (value) {
  if (!this.root) return null;

  const node = this.find(value);
  if (!node) return null;

  function calcHeight(curr) {
    if (!curr) return -1;
    const leftHeight = calcHeight(curr.left);
    const rightHeight = calcHeight(curr.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  return calcHeight(node);
};

Tree.prototype.depth = function (value) {};

Tree.prototype.isBalanced = function () {};

Tree.prototype.rebalance = function () {};

function double(input) {
  console.log(input.data * 2);
}

const bst = Tree.fromArray([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

bst.insert(359);
// Check detection of duplicate
bst.insert(359);
bst.insert(2);
bst.remove(6345);
bst.remove(8);
bst.insert(6);
bst.insert(8);

console.log(bst.find(359));
prettyPrint(bst.root);
