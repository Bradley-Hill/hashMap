"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashFunction_1 = require("./hashFunction");
const linkedList_1 = require("./linkedList");
function createHashMap() {
    let buckets = new Array(16).fill(null).map(() => (0, linkedList_1.createLinkedList)());
    return {
        hash: hashFunction_1.hash,
        set(key, value) {
            let index = this.hash(key);
            if (index < 0 || index >= buckets.length) {
                throw new Error("Trying to access index out of bound");
            }
            let bucketLinkedList = buckets[index];
            bucketLinkedList.appendValue(value);
        },
        buckets,
        logBucketValues(bucketIndex) {
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
