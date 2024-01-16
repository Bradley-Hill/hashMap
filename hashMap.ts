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
  buckets: linkedList[];
  logBucketValues(bucketIndex: number): void;
}

function createHashMap(): hashMap {
  let buckets = new Array(16).fill(null).map(() => createLinkedList());
  let size: number = 0;

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
        size++;
      }

      //Rehash if load factor > 0.75
      if (size / buckets.length > 0.75) {
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
      let length = 0;
      this.buckets.forEach((bucket) => {
        let currentNode = bucket.getHead();
        while (currentNode !== null) {
          length++;
          currentNode = currentNode.nextNode;
        }
      });
      return length;
    },
    clear() {
      this.buckets.forEach((bucket, index) => {
        while (bucket.getHead() !== null) {
          bucket.pop();
        }
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

// Set some values
hashMap.set("key1", "value1");
hashMap.set("key2", "value2");
hashMap.set("key3", "value3");
hashMap.set("key3", "Omegatron");
hashMap.set("key656", "RandyMarsh");

// Log the hash values of the keys
console.log("Hash of key1:", hashMap.hash("key1"));
console.log("Hash of key2:", hashMap.hash("key2"));
console.log("Hash of key3:", hashMap.hash("key3"));
console.log("Hash of key656:", hashMap.hash("key656"));

//Get some values
let getTestOne = hashMap.get("key3");
let getTestTwo = hashMap.get("key656");
console.log(getTestOne);
console.log(getTestTwo);

// Test has method
console.log(hashMap.has("key657"));

//Log the contents of bucket/linkedlist "key3"
console.log("Contents of bucket for key3:");
hashMap.logBucketValues(hashMap.hash("key3") % hashMap.buckets.length);

// Log the entire buckets array
console.log("Entire buckets array:");
hashMap.buckets.forEach((bucket, index) => {
  console.log(`Bucket ${index}:`);
  let currentNode = bucket.head;
  while (currentNode !== null) {
    console.log(
      ` Key: ${currentNode.content?.key}, Value: ${currentNode.content?.value}`
    );
    currentNode = currentNode.nextNode;
  }
});
