import { hash } from "./hashFunction";
import { createLinkedList, linkedList } from "./linkedList";

//TOUSE----When accessing a bucket through an index, to artificially limit the number of array indexs in use
// if (index < 0 || index >= buckets.length) {
//  throw new Error("Trying to access index out of bound");
// }

interface hashMap {
  hash(key: string): number;
  set(key: string, value: string): void;
  buckets: linkedList[];
  logBucketValues(bucketIndex: number): void;
}

function createHashMap(): hashMap {
  let buckets = new Array(16).fill(null).map(() => createLinkedList());
  let size = 0;

  return {
    hash,
    set(key: string, value: string) {
      let index = this.hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      let bucketLinkedList = buckets[index];
      bucketLinkedList.appendValue(value);
      size++;

      //Rehash if load factor > 0.75
      if (size / buckets.length) {
        let newBuckets = new Array(buckets.length * 2)
          .fill(null)
          .map(() => createLinkedList());
        for (let i = 0; i < buckets.length; i++) {
          let currentNode = buckets[i].head;
          while (currentNode !== null) {
            if (currentNode.content !== null) {
              let newIndex = this.hash(currentNode.content) % newBuckets.length;
              newBuckets[newIndex].appendValue(currentNode.content);
              currentNode = currentNode.nextNode;
            }
          }
          buckets = newBuckets;
        }
      }
    },
    buckets,
    logBucketValues(bucketIndex: number) {
      let currentNode = this.buckets[bucketIndex].head;
      while (currentNode !== null) {
        console.log(currentNode.content);
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
console.log(hashMap.hash("key1"));
console.log(hashMap.hash("key2"));
console.log(hashMap.hash("key3"));
console.log(hashMap.hash("key656"));

//Log the contents of bucket/linkedlist "key3"
hashMap.logBucketValues(4);

// Log the entire buckets array
console.log(hashMap.buckets);
