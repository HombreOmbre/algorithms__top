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
    prepend(data) {
        this.head = new Node(data, this.head);
    }

    // Insert last node
    append(data) {
        let current;

        // If empty, make head
        if (!this.head) {
            this.prepend(data);
        } else {
            current = this.head;

            while(current.nextNode) {
                current = current.nextNode;
            }

            current.nextNode = new Node(data);
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

            for (let i = -1; i < index; i++) {
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

        while (current.nextNode) {
            prev = current
            current = current.nextNode;
        }

        prev.nextNode = null;
    }

    // Returns true if the passed in value is in the list and otherwise returns false
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

    // Returns the index of the node containing value, or null if not found
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
}

let ll = new LinkedList();

ll.append(20);
ll.append(5);
ll.append(10);


console.log(ll.find(5));