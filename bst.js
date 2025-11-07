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

function binarySearchTree(array) {
  // Eliminate duplicates (Set)
  const noDuplicates = [...new Set(array)];
  const sorted = noDuplicates.sort((a, b) => a - b);
  const bst = new Tree();
  bst.root = buildTree(sorted);
  return bst;

  function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = start + Math.floor((end - start) / 2);
    const root = new Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
  }
}

function insert(value, tree) {
  if (!tree.root) {
    tree.root = new Node(value);
  }

  return insertIntoNode(value, tree.root);

  function insertIntoNode(value, node) {
    if (value === node.data) {
      console.log(`Value ${value} wasn't inserted as it's a duplicate`);
      return null;
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
      insertIntoNode(value, node.left);
    } else {
      if (!node.right) {
        node.right = new Node(value);
        return node;
      }
      insertIntoNode(value, node.right);
    }
  }
}

function remove(value, tree) {
  if (!tree.root) return null;

  return deleteItem(value, tree.root);

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
}

const bst = binarySearchTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

insert(359, bst);
insert(2, bst);
insert(359, bst);
remove(6345, bst);
remove(8, bst);
insert(6, bst);

prettyPrint(bst.root);
