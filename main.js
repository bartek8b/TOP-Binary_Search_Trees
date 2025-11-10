import { Tree, prettyPrint } from './bst.js';

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
console.log(bst.height(67));
console.log(bst.depth(324));
prettyPrint(bst.root);
