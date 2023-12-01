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
  
    #findSmallestRoot(root) {
      let tmpData = root.data;
      let tmpRoot = root;

      while (tmpRoot.left !== null) {
        tmpData = root.left.data;
        tmpRoot = root.left;
      }

      return tmpData;
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
  
    insert(value, root = this.root) {
      if (root === null) {
        return new Node(value);
      }

      if (value < root.data) {
        root.left = this.insert(value, root.left);
      } else if (value > root.data) {
        root.right = this.insert(value, root.right);
      }

      return root;
    }

    delete(value, root = this.root) {
      if (root === null) {
        return root;
      }

      if (value < root.data) {
        root.left = this.delete(value, root.left);
      } else if (value > root.data) {
        root.right = this.delete(value, root.right);
      } else {
        if (root.left === null) {
          return root.right;
        } else if (root.right === null) {
          return root.left;
        } else {
          root.data = this.#findSmallestRoot(root.right);

          root.right = this.delete(root.data, root.right);
        }
      }
      return root;
    }
  }
  
  const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  tree.prettyPrint(tree.root);
  