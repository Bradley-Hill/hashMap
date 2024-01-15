interface KeyValuePair {
  key: string;
  value: string;
}

export interface node {
  content: null | KeyValuePair;
  nextNode: null | node;
}

export function createNode(content: KeyValuePair, nextNode: node | null) {
  //factory for nodes of linked-list
  return {
    content: content,
    nextNode: nextNode,
  };
}

export interface linkedList {
  //
  head: null | node;
  appendValue(value: KeyValuePair): node;
  prependValue(value: KeyValuePair): node;
  size(): number;
  getHead(): null | node;
  getTail(): null | node;
  atIndex(index: number): null | node;
  pop(): null | node;
  contains(value: KeyValuePair): boolean;
  find(value: KeyValuePair): null | number;
  toString(): string | void;
  insertAt(value: KeyValuePair, index: number): void;
  removeAt(index: number): void;
}

export function createLinkedList(): linkedList {
  //
  return {
    head: null,
    appendValue(value: KeyValuePair) {
      let node = createNode(value, null);
      if (this.head === null) {
        this.head = node;
      } else {
        let currentNode = this.head;
        while (currentNode.nextNode !== null) {
          currentNode = currentNode.nextNode;
        }
        currentNode.nextNode = node;
      }
      return node;
    },
    prependValue(value: KeyValuePair) {
      let node = createNode(value, this.head);
      this.head = node;
      return node;
    },
    size(): number {
      let numberOfNodes = 0;
      let currentNode = this.head;
      while (currentNode !== null) {
        currentNode = currentNode.nextNode;
        numberOfNodes++;
      }
      return numberOfNodes;
    },
    getHead() {
      return this.head;
    },
    getTail(): null | node {
      if (this.head === null) {
        return null;
      } else {
        let currentNode = this.head;
        while (currentNode.nextNode !== null) {
          currentNode = currentNode.nextNode;
        }
        return currentNode;
      }
    },
    atIndex(index: number): null | node {
      let currentIndex = 0;
      if (this.head === null || index < 0) {
        return null;
      } else {
        let currentNode: null | node = this.head;
        while (currentNode !== null && currentIndex !== index) {
          currentNode = currentNode.nextNode;
          currentIndex++;
        }
        return currentNode;
      }
    },
    pop(): null | node {
      if (this.size() === 0) {
        return null;
      } else {
        let currentNode = this.head;
        let previousNode: null | node = null;
        while (currentNode !== null && currentNode.nextNode !== null) {
          previousNode = currentNode;
          currentNode = currentNode.nextNode;
        }
        if (previousNode !== null) {
          previousNode.nextNode = null;
        }
        return currentNode;
      }
    },
    contains(value: KeyValuePair): boolean {
      if (this.size() === 0) {
        return false;
      } else {
        let currentNode = this.head;
        while (currentNode !== null) {
          if (currentNode.content?.key === value.key) {
            return true;
          } else {
            currentNode = currentNode.nextNode;
          }
        }
      }
      return false;
    },
    find(value: KeyValuePair): null | number {
      if (this.head === null) {
        return null;
      } else {
        let currentIndex = 0;
        let currentNode: null | node = this.head;
        while (currentNode !== null && currentNode.content?.key !== value.key) {
          currentIndex++;
          currentNode = currentNode.nextNode;
        }
        return currentIndex;
      }
    },
    toString(): string | void {
      if (this.size() === 0) {
        return "Empty List";
      } else {
        let string = "(";
        let currentNode: null | node = this.head;
        while (currentNode !== null) {
          string += `${currentNode.content?.key}:${currentNode.content?.value}`;
          if (currentNode.nextNode !== null) {
            string += ") -> (";
          }
          currentNode = currentNode.nextNode;
        }
        string += ") -> null";
        return string;
      }
    },
    insertAt(value: KeyValuePair, index: number): void {
      let node = createNode(value, null);

      if (index < 0 || index > this.size()) {
        throw new Error("Index out of bounds.");
      }
      if (index === 0) {
        node.nextNode = this.head;
        this.head = node;
      } else {
        let currentIndex = 0;
        let currentNode = this.head;
        let previousNode;
        while (currentIndex !== index) {
          previousNode = currentNode;
          if (currentNode !== null) {
            currentNode = currentNode.nextNode;
          }
          currentIndex++;
        }
        if (previousNode) {
          node.nextNode = currentNode;
          previousNode.nextNode = node;
        }
      }
    },
    removeAt(index: number) {
      if (index < 0 || index >= this.size()) {
        throw new Error("Index out of bounds.");
      }

      let currentIndex = 0;
      let currentNode = this.head;
      let previousNode: node | null = null;

      while (currentIndex !== index) {
        previousNode = currentNode;
        if (currentNode !== null) {
          currentNode = currentNode.nextNode;
        }
        currentIndex++;
      }

      if (index === 0) {
        this.head = this.head !== null ? this.head.nextNode : null;
      } else if (previousNode !== null && currentNode !== null) {
        if (currentNode.nextNode !== undefined) {
          previousNode.nextNode = currentNode.nextNode;
        } else {
          previousNode.nextNode = null;
        }
      }
    },
  };
}
