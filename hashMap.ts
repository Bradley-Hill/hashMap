import { hash } from "./hashFunction";
import { createLinkedList, linkedList } from "./linkedList";

//TOUSE----When accessing a bucket through an index, to artificially limit the number of array indexs in use
// if (index < 0 || index >= buckets.length) {
//  throw new Error("Trying to access index out of bound");
// }

interface hashMap {
  hash(key: string): number;
  rehash(): void;
  set(key: string, value: string): void;
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
    set(key: string, value: string) {
      let index = this.hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      let bucketLinkedList = buckets[index];
      let currentNode = bucketLinkedList.head;
      while (currentNode !== null) {
        if (currentNode.content?.key === key) {
          currentNode.content.value = value;
          return;
        }
        currentNode = currentNode.nextNode;
      }
      bucketLinkedList.appendValue({ key, value });
      size++;

      //Rehash if load factor > 0.75
      if (size / buckets.length > 0.75) {
        this.rehash();
      }
    },
    buckets,
    logBucketValues(bucketIndex: number) {
      let bucketLinkedList = this.buckets[bucketIndex];
      let currentNode = bucketLinkedList.head;
      while (currentNode !== null) {
        console.log(
          `Key: ${currentNode.content?.key}, Value: ${currentNode.content?.value}`
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
