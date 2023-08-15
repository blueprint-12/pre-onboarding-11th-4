import { SickApiResponse } from '../typings/sick';
class CacheStorage<K, V> {
  #storage: Map<K, V> = new Map();

  getStorage() {
    return this.#storage;
  }

  get(key: K) {
    return this.#storage.get(key);
  }

  add(key: K, value: V) {
    this.#storage.set(key, value);
    return this.#storage;
  }

  remove(key: K) {
    return this.#storage.has(key) ? this.#storage.delete(key) : null;
  }

  find(key: K) {
    return this.#storage.has(key);
  }

  size() {
    return this.#storage.size;
  }

  entries() {
    return this.#storage.entries();
  }

  getRecentKeywords(maxCount = 3) {
    return Array.from(this.#storage.keys()).reverse().slice(0, maxCount);
  }
}

export const cacheStorage = new CacheStorage<string, SickApiResponse>();
