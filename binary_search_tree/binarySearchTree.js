class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  
  class Tree {
    constructor(arr) {
      this.root = this.#buildTree(this.#sortArrayAndRemoveDuplicates(arr));
    }
  
    #sortArrayAndRemoveDuplicates(arr) {
      let set = new Set(arr);
      return Array.from(set).sort((a, b) => a - b);
    }
  
    #buildTree(arr) {
      let mid = Math.floor(arr.length / 2);
      if (arr.length === 0) {
        return null;
      }
  
      const leftSide = this.#buildTree(arr.slice(0, mid));
      const rightSide = this.#buildTree(arr.slice(mid + 1));
  
      return new Node(arr[mid], leftSide, rightSide);
    }
  
    prettyPrint(node, prefix = '', isLeft = true) {
      if (node === null) {
        return;
      }
  
      if (node.right !== null) {
        this.prettyPrint(
          node.right,
          `${prefix}${isLeft ? '│   ' : '    '}`,
          false
        );
      }
  
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    }
  
    insert(value) {
      let node = this.root;
      let prev;
  
      while (node) {
        if (node.data > value) {
          prev = node;
          node = node.left;
        } else {
          prev = node;
          node = node.right;
        }
      }
  
      if (prev.data > value) {
        prev.left = new Node(value);
      } else {
        prev.right = new Node(value);
      }
    }
  
  }
  
  const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  tree.insert(100);
  tree.prettyPrint(tree.root);