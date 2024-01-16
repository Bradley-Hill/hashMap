import { Node } from "typescript";
import { hash } from "./hashFunction";
import { createLinkedList, linkedList, node } from "./linkedList";

//TOUSE----When accessing a bucket through an index, to artificially limit the number of array indexs in use
// if (index < 0 || index >= buckets.length) {
//  throw new Error("Trying to access index out of bound");
// }

interface hashMap {
  hash(key: string): number;
  rehash(): void;
  findNode(key: string, bucket: linkedList): node | null;
  set(key: string, value: string): void;
  get(key: string): string | null;
  has(key: string): boolean;
  remove(key: string): boolean;
  length(): number;
  clear(): void;
  keys(): string[];
  values(): string[];
  entries(): object[];
  buckets: linkedList[];
  logBucketValues(bucketIndex: number): void;
}

function createHashMap(): hashMap {
  let buckets = new Array(16).fill(null).map(() => createLinkedList());
  let _size: number = 0;

  return {
    hash,
    rehash() {
      let newBuckets = new Array(buckets.length * 2)
        .fill(null)
        .map(() => createLinkedList());
      for (let i = 0; i < buckets.length; i++) {
        let currentNode = buckets[i].head;
        while (currentNode !== null) {
          if (currentNode.content !== null) {
            let newIndex =
              this.hash(currentNode.content.key) % newBuckets.length;
            newBuckets[newIndex].appendValue(currentNode.content);
            currentNode = currentNode.nextNode;
          }
        }
      }
      buckets = newBuckets;
    },
    findNode(key: string, bucket: linkedList) {
      let bucketLinkedList = bucket;
      let currentNode = bucketLinkedList.head;
      while (currentNode !== null) {
        if (currentNode.content?.key === key) {
          return currentNode;
        }
        currentNode = currentNode.nextNode;
      }
      return null;
    },
    set(key: string, value: string) {
      let index = this.hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      let bucketLinkedList = buckets[index];
      let node = this.findNode(key, bucketLinkedList);
      if (node !== null) {
        if (node.content !== null) {
          node.content.value = value;
        }
      } else {
        bucketLinkedList.appendValue({ key, value });
        _size++;
      }

      //Rehash if load factor > 0.75
      if (_size / buckets.length > 0.75) {
        this.rehash();
      }
    },
    get(key: string) {
      let index = this.hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      let bucketLinkedList = buckets[index];
      let node = this.findNode(key, bucketLinkedList);
      if (node !== null) {
        if (node.content !== null) {
          return node.content.value;
        }
      }
      return null;
    },
    has(key: string) {
      let index = this.hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      let bucketLinkedList = buckets[index];
      let node = this.findNode(key, bucketLinkedList);
      return node !== null;
    },
    remove(key: string): boolean {
      let index = this.hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      let bucketLinkedList = buckets[index];
      let nodeIndex = bucketLinkedList.find({ key: key, value: "" });
      if (nodeIndex !== null) {
        bucketLinkedList.removeAt(nodeIndex);
        return true;
      } else {
        return false;
      }
    },
    length() {
      return _size;
    },
    clear() {
      this.buckets.forEach((_, index) => {
        this.buckets[index] = createLinkedList();
      });
    },
    keys() {
      const keyArray: string[] = [];
      this.buckets.forEach((bucket) => {
        let currentNode = bucket.head;
        while (currentNode !== null) {
          if (currentNode.content !== null) {
            keyArray.push(currentNode.content.key);
          }
          currentNode = currentNode.nextNode;
        }
      });
      return keyArray;
    },
    values() {
      const valueArray: string[] = [];
      this.buckets.forEach((bucket) => {
        let currentNode = bucket.head;
        while (currentNode !== null) {
          if (currentNode.content !== null) {
            valueArray.push(currentNode.content.value);
          }
          currentNode = currentNode.nextNode;
        }
      });
      return valueArray;
    },
    entries() {
      const entryArray: object[] = [];
      this.buckets.forEach((bucket) => {
        let currentNode = bucket.head;
        while (currentNode !== null) {
          if (currentNode.content !== null) {
            entryArray.push(currentNode.content);
          }
          currentNode = currentNode.nextNode;
        }
      });
      return entryArray;
    },
    buckets,
    logBucketValues(bucketIndex: number) {
      let bucketLinkedList = this.buckets[bucketIndex];
      let currentNode = bucketLinkedList.head;
      while (currentNode !== null) {
        console.log(
          `Key: ${currentNode.content?.key ?? "null"}, Value: ${
            currentNode.content?.value
          }`
        );
        currentNode = currentNode.nextNode;
      }
    },
  };
}
// Create a new hash map
let hashMap = createHashMap();
console.log("Created a new hash map.");

// Set some values
hashMap.set("Rupert", "Oranges");
hashMap.set("Cornelius", "Apples");
hashMap.set("Omegatron", "Pears");
hashMap.set("OptimusPrime", "Strawberries");
console.log("Set some values in the hash map.");

// Log the hash values of the keys
console.log("Hash of Rupert:", hashMap.hash("Rupert"));
console.log("Hash of Cornelius:", hashMap.hash("Cornelius"));
console.log("Hash of Omegatron:", hashMap.hash("Omegatron"));
console.log("Hash of OptimusPrime:", hashMap.hash("OptimusPrime"));

// Get some values
console.log("Value of Rupert:", hashMap.get("Rupert"));
console.log("Value of Cornelius:", hashMap.get("Cornelius"));
console.log("Value of Omegatron:", hashMap.get("Omegatron"));
console.log("Value of OptimusPrime:", hashMap.get("OptimusPrime"));

// Test has method
console.log("Does the hash map have Rupert?", hashMap.has("Rupert"));
console.log("Does the hash map have Jack?", hashMap.has("Jack"));

// Test remove method
console.log("Removing Rupert from the hash map:", hashMap.remove("Rupert"));
console.log("Does the hash map still have Rupert?", hashMap.has("Rupert"));

// Test length method
console.log("Length of the hash map:", hashMap.length());

// Test clear method
hashMap.clear();
console.log("Cleared the hash map.");
console.log("Length of the hash map after clearing:", hashMap.length());

// Test keys, values, and entries methods
hashMap.set("Rupert", "Oranges");
hashMap.set("Cornelius", "Apples");
console.log("Set some values in the hash map again.");
console.log("Keys in the hash map:", hashMap.keys());
console.log("Values in the hash map:", hashMap.values());
console.log("Entries in the hash map:", hashMap.entries());
