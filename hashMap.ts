import { hash } from "./hashFunction";
import { createNode, createLinkedList } from "./linkedList";

//TOUSE----When accessing a bucket through an index, to artificially limit the number of array indexs in use
// if (index < 0 || index >= buckets.length) {
//  throw new Error("Trying to access index out of bound");
// }

interface hashMap {
  hash(key: string): number;
}

function createHashMap(): hashMap {
  return {
    hash(key: string) {
      return hash(key);
    },
  };
}
