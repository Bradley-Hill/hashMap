"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashFunction_1 = require("./hashFunction");
const linkedList_1 = require("./linkedList");
function createHashMap() {
    let buckets = new Array(16).fill(null).map(() => (0, linkedList_1.createLinkedList)());
    let size = 0;
    return {
        hash: hashFunction_1.hash,
        rehash() {
            let newBuckets = new Array(buckets.length * 2)
                .fill(null)
                .map(() => (0, linkedList_1.createLinkedList)());
            for (let i = 0; i < buckets.length; i++) {
                let currentNode = buckets[i].head;
                while (currentNode !== null) {
                    if (currentNode.content !== null) {
                        let newIndex = this.hash(currentNode.content.key) % newBuckets.length;
                        newBuckets[newIndex].appendValue(currentNode.content);
                        currentNode = currentNode.nextNode;
                    }
                }
            }
            buckets = newBuckets;
        },
        findNode(key, bucket) {
            var _a;
            let bucketLinkedList = bucket;
            let currentNode = bucketLinkedList.head;
            while (currentNode !== null) {
                if (((_a = currentNode.content) === null || _a === void 0 ? void 0 : _a.key) === key) {
                    return currentNode;
                }
                currentNode = currentNode.nextNode;
            }
            return null;
        },
        set(key, value) {
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
            }
            else {
                bucketLinkedList.appendValue({ key, value });
                size++;
            }
            //Rehash if load factor > 0.75
            if (size / buckets.length > 0.75) {
                this.rehash();
            }
        },
        get(key) {
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
        has(key) {
            let index = this.hash(key);
            if (index < 0 || index >= buckets.length) {
                throw new Error("Trying to access index out of bound");
            }
            let bucketLinkedList = buckets[index];
            let node = this.findNode(key, bucketLinkedList);
            return node !== null;
        },
        buckets,
        logBucketValues(bucketIndex) {
            var _a, _b;
            let bucketLinkedList = this.buckets[bucketIndex];
            let currentNode = bucketLinkedList.head;
            while (currentNode !== null) {
                console.log(`Key: ${(_a = currentNode.content) === null || _a === void 0 ? void 0 : _a.key}, Value: ${(_b = currentNode.content) === null || _b === void 0 ? void 0 : _b.value}`);
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
    var _a, _b;
    console.log(`Bucket ${index}:`);
    let currentNode = bucket.head;
    while (currentNode !== null) {
        console.log(` Key: ${(_a = currentNode.content) === null || _a === void 0 ? void 0 : _a.key}, Value: ${(_b = currentNode.content) === null || _b === void 0 ? void 0 : _b.value}`);
        currentNode = currentNode.nextNode;
    }
});
