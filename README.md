# Hash Map Implementation in TypeScript

This repository contains a simple implementation of a hash map data structure in TypeScript. The hash map uses separate chaining for collision resolution, with each bucket in the hash map being a linked list.

## Table of Contents

- [Hash Map Methods](#hash-map-methods)
- [Linked List](#linked-list)
- [Using TypeScript](#using-typescript)
- [Running the Hash Map](#running-the-hash-map)
- [Contributing](#contributing)

## Hash Map Methods

The hash map implementation includes the following methods:

- `set(key, value)`: Adds a new key-value pair to the hash map.
- `get(key)`: Retrieves the value associated with the given key.
- `has(key)`: Checks if the hash map contains the given key.
- `remove(key)`: Removes the key-value pair associated with the given key.
- `length()`: Returns the number of key-value pairs in the hash map.
- `clear()`: Removes all key-value pairs from the hash map.
- `keys()`: Returns an array of all keys in the hash map.
- `values()`: Returns an array of all values in the hash map.
- `entries()`: Returns an array of all key-value pairs in the hash map.

## Linked List

The linked list used for each bucket in the hash map has the following methods:

- `appendValue(value)`: Appends a new node with the given value at the end of the list.
- `prependValue(value)`: Prepends a new node with the given value at the beginning of the list.
- `size()`: Returns the number of nodes in the list.
- `getHead()`: Returns the head node of the list.
- `getTail()`: Returns the tail node of the list.
- `atIndex(index)`: Returns the node at the given index.
- `pop()`: Removes and returns the last node of the list.
- `contains(value)`: Checks if the list contains a node with the given value.
- `find(value)`: Returns the index of the first node with the given value, or null if not found.
- `toString()`: Returns a string representation of the list.
- `insertAt(value, index)`: Inserts a new node with the given value at the given index.
- `removeAt(index)`: Removes the node at the given index.

## Using TypeScript

This project was created with TypeScript to take advantage of static typing and other TypeScript features. To use this project, you will need to have TypeScript installed.

You can install TypeScript globally with npm:

```bash
npm install -g typescript
```
