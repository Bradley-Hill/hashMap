interface node {
  content: null | string;
  nextNode: null | node;
}

export function createNode(content: string, nextNode: node | null): node {
  return {
    content,
    nextNode,
  };
}

interface linkedList {
  head: null | node;
  appendValue(value: string): node;
}

export function createLinkedList(): linkedList {
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
  };
}
