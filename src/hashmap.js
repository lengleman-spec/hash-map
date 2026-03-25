export default class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = Array(this.capacity)
      .fill()
      .map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists
    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // Key not found → add new pair
    bucket.push([key, value]);
    this.size++;
  }

  // Retrieve value by key
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) return pair[1];
    }

    return undefined;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    return bucket.some((pair) => pair[0] === key);
  }

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

  values() {
    const valuesArray = [];

    for (const bucket of this.buckets) {
      if (!bucket || bucket.length === 0) continue; // skip empty buckets

      for (const [key, value] of bucket) {
        valuesArray.push(value);
      }
    }

    return valuesArray;
  }

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

  // Rehashing
  resize() {
    let oldBuckets = this.buckets;
    this.capacity *= 2;

    this.buckets = new Array(this.capacity).fill().map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      if (!bucket || bucket.length === 0) continue;

      for (const pair of bucket) {
        this.set(pair[0], pair[1]);
      }
    }
  }
}

module.exports = HashMap;
