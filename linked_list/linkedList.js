class Node {
    constructor(data, nextNode = null) {
        this.data = data;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor(head = null) {
      this.head = head;
    }

    // Insert first node
    prepend(value) {
        this.head = new Node(value, this.head);
    }

    // Insert last node
    append(value) {
        let current;

        // If empty, make head
        if (!this.head) {
            this.prepend(value);
        } else {
            current = this.head;

            while(current.nextNode) {
                current = current.nextNode;
            }

            current.nextNode = new Node(value);
        }
    }

    // Size of the linked list
    size() {
        let counter = 0;
        let current = this.head;

        while (current) {
            counter += 1;
            current = current.nextNode;
        }

        return counter;
    }

    // First node of the list
    firstNode() {
        let current = this.head;

        if (current) {        
            return current.data;
        } else {
            return current;
        }
    }

    // Last node in the list
    lastNode() {
        let current = this.head;
        let data;

        if (current) {
            while (current) {
                data = current.data;
                current = current.nextNode;
            }

            return data;
        } else {
            return this.head;
        }
    }

    // Find data at index
    at(index) {
        if (index <= this.size()) {
            let current = this.head;
            let data;

            for (let i = 0; i < index; i++) {
                data = current.data;
                current = current.nextNode;
            }

            return data;
        } else {
            return undefined;
        }
    }

    // Remove last node
    pop() {
        let current = this.head;
        let prev = null;

        if (current) {
            while (current.nextNode) {
                prev = current
                current = current.nextNode;
            }
            
            prev.nextNode = null;
        } else {
            return 'This node list is already empty';
        }
    }

    // Returns true if the value is in the list
    contains(value) {
        let current = this.head;
        let data;

        while (current) {
            data = current.data;
            if (value === data) {
                return true;
            }
            current = current.nextNode;
        }

        return false;
    }

    // Returns the index of the node
    find(value) {
        let current = this.head;
        let data;
        let index = 0;

        while (current) {
            data = current.data;
            if (value === data) {
                return index;
            }
            index += 1;
            current = current.nextNode;
        }

        return null;
    }

    // Clear list
    clear() {
        this.head = null;
    }

    // Print list data
    toString() {
        let current = this.head;
        let str = '';

        while (current) {
            str += `${current.data} -> `;
            current = current.nextNode;
        }

        return str + 'null'
    }

    // Insert new node at the given index
    insertAt(value, index) {
        let current = this.head;
        let i = 0;

        if (current) {
            while(i < (index - 1)) {
                current = current.nextNode;
                i += 1;
            }

            current.nextNode = new Node(value, current.nextNode);
        } else {
            return 'Linked list is empty';
        }
    }

    // Removes the node at the given index
    removeAt(index) {
        let current = this.head;
        let prev;
        let i = 0;

        if (current) {
            while (i < index) {
                prev = current;
                current = current.nextNode;
                i += 1
            }

            prev.nextNode = current.nextNode;
        } else {
            return 'Linked list is empty';
        }
    }
    
}
