"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.stringToNumber = void 0;
function stringToNumber(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
}
exports.stringToNumber = stringToNumber;
function hash(key) {
    let hashCode = stringToNumber(key);
    return hashCode % 16;
}
exports.hash = hash;
