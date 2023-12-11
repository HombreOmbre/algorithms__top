class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  
  class Tree {
    constructor(arr) {
      this.arr = this.#sortArrayAndRemoveDuplicates(arr);
      this.root = this.#buildTree(this.arr);
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
  
    prettyPrint(node = this.root, prefix = '', isLeft = true) {
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

    find(value, root = this.root) {
      if (root === null || root.data === value) {
        return root;
      }

      if (value < root.data) {
        return this.find(value, root.left);
      }
      
      return this.find(value, root.right);
    }

    levelOrder(arr = [], queue = [], root = this.root) {
      if (root === null) {
        return;
      }
      arr.push(root.data);

      queue.push(root.left);
      queue.push(root.right);

      while (queue.length) {
        const level = queue[0];
        queue.shift();
        this.levelOrder(arr, queue, level);
      }

      return arr;
    }

    inOrder(arr = [], root = this.root) {
      if (root === null) {
        return;
      }

      if (root.left) {
        this.inOrder(arr, root.left);
      }

      arr.push(root.data);

      if (root.right) {
        this.inOrder(arr, root.right);
      }

      return arr;
    }

    preOrder(arr = [], root = this.root) {
      if (root === null) {
        return;
      }

      arr.push(root.data);

      if (root.left) {
        this.preOrder(arr, root.left);
      }

      if (root.right) {
        this.preOrder(arr, root.right);
      }

      return arr;
    }

    postOrder(arr = [], root = this.root) {
      if (root === null) {
        return;
      }

      if (root.left) {
        this.postOrder(arr, root.left);
      }

      if (root.right) {
        this.postOrder(arr, root.right);
      }

      arr.push(root.data);

      return arr;
    }

    height(root = this.root) {
      if (root === null) {
        return 0;
      }

      let lHeight = this.height(root.left);
      let rHeight = this.height(root.right);

      if (lHeight > rHeight) {
        return lHeight + 1;
      } else {
        return rHeight + 1;
      }
    }

    depth(node, root = this.root, depth = 0) {
      if (node === null || root === null) {
        return;
      }

      if (node === root) {
        return depth;
      }

      if (node.data < root.data) {
        return this.depth(node, root.left, depth += 1);
      } else {
        return this.depth(node,  root.right, depth += 1);
      }
    }

    isBalanced(root = this.root) {
      const lHeight = this.height(root.left);
      const rHeight = this.height(root.right);
      const difference = Math.abs(lHeight - rHeight);
      return difference < 2 ? 'true' : 'false';
    }

    rebalance(root = this.root) {
      let arr = this.levelOrder();

      return this.root = this.#buildTree(this.#sortArrayAndRemoveDuplicates(arr));
    }
  }
  
  const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  tree.prettyPrint();
  