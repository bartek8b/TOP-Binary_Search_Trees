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

function binarySearchTree(array) {
  // Sort copy of input, do not mutate it
  const sorted = [...array].sort((a, b) => a - b);

  function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = start + Math.floor((end - start) / 2);
    const root = new Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
  }

  return buildTree(sorted);
}
