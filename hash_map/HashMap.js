const Node = require('./Node');

class HashMap {
  #buckets;

  #size;

  constructor() {
    this.#buckets = Array(16).fill(null);
    this.#size = 0;
  }

  #hash(key) {
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = ((hashCode << 5) - hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.#hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (this.#buckets[index] === null) {
      this.#buckets[index] = new Node(key, value);
      this.#size += 1;
    }

    let current = this.#buckets[index];

    while (current.nextNode && current.key !== key) {
      current = current.nextNode;
    }

    if (current.key === key) {
      current.value = value;
    } else {
      current.nextNode = new Node(key, value);
      this.#size += 1;
    }
  }

  get(key) {
    const index = this.#hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (this.#buckets[index] === null) {
      return null;
    }

    let current = this.#buckets[index];

    while (current.nextNode && current.key !== key) {
      current = current.nextNode;
    }

    if (current.key === key) {
      return current.value;
    }

    return null;
  }

  has(key) {
    const index = this.#hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (this.#buckets[index] === null) {
      return false;
    }

    let current = this.#buckets[index];

    while (current.nextNode && current.key !== key) {
      current = current.nextNode;
    }

    if (current.key === key) {
      return true;
    }

    return false;
  }

  remove(key) {
    const index = this.#hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (this.#buckets[index] === null) {
      return false;
    }

    if (
      this.#buckets[index].key === key &&
      this.#buckets[index].nextNode === null
    ) {
      this.#buckets[index] = null;
      this.#size -= 1;
      return true;
    }
    if (
      this.#buckets[index].key === key &&
      this.#buckets[index].nextNode !== null
    ) {
      this.#buckets[index] = this.#buckets[index].nextNode;
      this.#size -= 1;
      return true;
    }

    let current = this.#buckets[index];
    let prev;

    while (current.nextNode && current.key !== key) {
      prev = current;
      current = current.nextNode;
    }

    if (current.key === key) {
      if (current.nextNode === null) {
        prev.nextNode = null;
      } else {
        prev.nextNode = current.nextNode;
      }
      this.#size -= 1;
      return true;
    }

    return false;
  }

  get length() {
    return this.#size;
  }

  clear() {
    for (let i = 0; i < this.#buckets.length; i++) {
      this.#buckets[i] = null;
    }
    this.#size = 0;
  }

  get keys() {
    let arrWithKeys = [];
    for (let i = 0; i < this.#buckets.length; i++) {
      if (this.#buckets[i] !== null) {
        let current = this.#buckets[i];

        while (current.nextNode) {
          arrWithKeys.push(current.key);
          current = current.nextNode;
        }

        arrWithKeys.push(current.key);
      }
    }

    return arrWithKeys;
  }

  get values() {
    let arrWithVals = [];
    for (let i = 0; i < this.#buckets.length; i++) {
      if (this.#buckets[i] !== null) {
        let current = this.#buckets[i];

        while (current.nextNode) {
          arrWithVals.push(current.value);
          current = current.nextNode;
        }

        arrWithVals.push(current.value);
      }
    }

    return arrWithVals;
  }

  get entries() {
    let arrWithEntries = [];

    for (let i = 0; i < this.#buckets.length; i++) {
      if (this.#buckets[i] !== null) {
        let current = this.#buckets[i];

        while (current.nextNode) {
          arrWithEntries.push([current.key, current.value]);
          current = current.nextNode;
        }

        arrWithEntries.push([current.key, current.value]);
      }
    }

    return arrWithEntries;
  }

  get bucket() {
    return this.#buckets;
  }
}
