interface node {
  content: null | string;
  nextNode: null | node;
}

export function createNode(content: string, nextNode: node | null) {
  //factory for nodes of linked-list
  return {
    content,
    nextNode,
  };
}

export interface linkedList {
  //
  head: null | node;
  appendValue(value: string): node;
  prependValue(value: string): node;
  size(): number;
  getHead(): null | node;
  getTail(): null | node;
  atIndex(index: number): null | node;
  pop(): null | node;
  contains(value: string): boolean;
  find(value: string): null | number;
  toString(): string | void;
  insertAt(value: string, index: number): void;
  removeAt(index: number): void;
}

export function createLinkedList(): linkedList {
  //
  return {
    head: null,
    appendValue(value: string) {
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
    prependValue(value: string) {
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
    contains(value: string): boolean {
      if (this.size() === 0) {
        return false;
      } else {
        let currentNode = this.head;
        while (currentNode !== null) {
          if (currentNode.content === value) {
            return true;
          } else {
            currentNode = currentNode.nextNode;
          }
        }
      }
      return false;
    },
    find(value: string): null | number {
      if (this.head === null) {
        return null;
      } else {
        let currentIndex = 0;
        let currentNode: null | node = this.head;
        while (currentNode !== null && currentNode.content !== value) {
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
          string += currentNode.content;
          if (currentNode.nextNode !== null) {
            string += ") -> (";
          }
          currentNode = currentNode.nextNode;
        }
        string += ") -> null";
        return string;
      }
    },
    insertAt(value: string, index: number) {
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
        this.head =
          this.head !== undefined && this.head !== null
            ? this.head.nextNode
            : null;
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
