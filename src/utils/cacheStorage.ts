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
    const allKeys = Array.from(this.#storage.keys());
    return allKeys.slice(0, maxCount).reverse(); //최신 검색어가 위로가게
  }
}

export const cacheStorage = new CacheStorage<string, SickApiResponse>();
