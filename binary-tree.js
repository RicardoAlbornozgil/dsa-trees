/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
  
    function findMinDepth(node) {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
  
      if (!node.left) return findMinDepth(node.right) + 1;
      if (!node.right) return findMinDepth(node.left) + 1;
  
      return Math.min(findMinDepth(node.left), findMinDepth(node.right)) + 1;
    }
  
    return findMinDepth(this.root);
  }
  

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
  
    function findMaxDepth(node) {
      if (!node) return 0;
      return Math.max(findMaxDepth(node.left), findMaxDepth(node.right)) + 1;
    }
  
    return findMaxDepth(this.root);
  }
  

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = { max: 0 };
  
    function findMaxSum(node) {
      if (!node) return 0;
  
      let leftMax = Math.max(0, findMaxSum(node.left));
      let rightMax = Math.max(0, findMaxSum(node.right));
  
      result.max = Math.max(result.max, node.val + leftMax + rightMax);
  
      return node.val + Math.max(leftMax, rightMax);
    }
  
    findMaxSum(this.root);
    return result.max;
  }
  

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
  
    let closest = null;
  
    function traverse(node) {
      if (!node) return;
      if (node.val > lowerBound && (closest === null || node.val < closest)) {
        closest = node.val;
      }
  
      traverse(node.left);
      traverse(node.right);
    }
  
    traverse(this.root);
    return closest;
  }
  

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || node1 === this.root || node2 === this.root) return false;
  
    function getLevelAndParent(node, target, level = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { level, parent };
  
      return (
        getLevelAndParent(node.left, target, level + 1, node) ||
        getLevelAndParent(node.right, target, level + 1, node)
      );
    }
  
    const node1Info = getLevelAndParent(this.root, node1);
    const node2Info = getLevelAndParent(this.root, node2);
  
    return (
      node1Info &&
      node2Info &&
      node1Info.level === node2Info.level &&
      node1Info.parent !== node2Info.parent
    );
  }
  

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const result = [];
  
    function traverse(node) {
      if (node === null) {
        result.push(null);
      } else {
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
      }
    }
  
    traverse(tree.root);
    return JSON.stringify(result);
  }
  

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const values = JSON.parse(stringTree);

    function buildTree() {
      if (values.length === 0) return null;

      const value = values.shift();
      if (value === null) return null;

      const node = new BinaryTreeNode(value);
      node.left = buildTree();
      node.right = buildTree();
      return node;
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function findLCA(node, p, q) {
      if (!node) return null;
      if (node === p || node === q) return node;

      const left = findLCA(node.left, p, q);
      const right = findLCA(node.right, p, q);

      if (left && right) return node;
      return left ? left : right;
    }

    return findLCA(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
