export default class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    let bucketIndex = this.hash(key); // find bucket index using hash function
    const bucket = this.buckets[bucketIndex];

    for (let i = 0; i < bucket.length; i++) {
      let entry = bucket[i];

      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.size++; // increment size since we have a new key
  }

  get(key) {
    let bucketIndex = this.hash(key);

    const bucket = this.buckets[bucketIndex];
    for (let i = 0; i < bucket.length; i++) {
      let entry = bucket[i];

      if (entry.key === key) {
        return entry.value;
      }
    }

    return undefined;
  }

  has(key) {
    let bucketIndex = this.hash(key);
    let bucket = this.buckets[bucketIndex];

    for (let i = 0; i < bucket.length; i++) {
      let entry = bucket[i];

      if (entry.key === key) {
        return true;
      }
    }

    return false;
  }
}
