export default class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity; // total number of buckets
    this.loadFactor = loadFactor; // when to resize
    this.size = 0; // number of key-value pairs
    this.buckets = Array(this.capacity)
      .fill()
      .map(() => []); // initialize each bucket as empty array
  }

  // Simple string hash function
  hash(key) {
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  // Add or update a key-value pair
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists
    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value; // update value
        return;
      }
    }

    // Key not found → add new pair
    bucket.push([key, value]);
    this.size++;

    // Optional: resize if load factor exceeded (not required yet)
    // if (this.size / this.capacity > this.loadFactor) {
    //   this.resize();
    // }
  }

  // Retrieve value by key
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) return pair[1];
    }

    return undefined; // key not found
  }

  // Check if key exists
  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    return bucket.some((pair) => pair[0] === key);
  }

  // Remove a key-value pair
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  // Return number of stored keys
  length() {
    return this.size;
  }

  // Clear all entries
  clear() {
    this.buckets = Array(this.capacity)
      .fill()
      .map(() => []);
    this.size = 0;
  }

  // Return array of all keys
  keys() {
    const keysArray = [];

    for (const bucket of this.buckets) {
      if (!bucket || bucket.length === 0) continue;

      for (const [key, value] of bucket) {
        keysArray.push(key);
      }
    }

    return keysArray;
  }

  // Return array of all values
  values() {
    const valuesArray = [];

    for (const bucket of this.buckets) {
      if (!bucket || bucket.length === 0) continue;

      for (const [key, value] of bucket) {
        valuesArray.push(value);
      }
    }

    return valuesArray;
  }

  // Return array of all [key, value] pairs
  entries() {
    const entriesArray = [];

    for (const bucket of this.buckets) {
      if (!bucket || bucket.length === 0) continue;

      for (const pair of bucket) {
        entriesArray.push(pair);
      }
    }

    return entriesArray;
  }

  // Optional: resizing logic for later
  // resize() { ... }
}

module.exports = HashMap;
