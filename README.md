# pre-onboarding-11th-4

원티드 FE 인턴십 4주차 임상실험 검색 페이지
## 목차
1. [실행 방법](getting-started)  
2. [폴더 구조](폴더-구조)  
3. [구현 기능](구현-기능)  
4. [로컬 캐시 구현 전략]([로컬-캐시-구현-전략])  
5. [기타사항](Issue)  
## Skills & Tools
- `axios`, `TypeScript`, `styled-components`
- `Vite`, `json-server`
## Getting Started

**종속성 설치 및 dev모드 실행**

```bash
git clone https://github.com/blueprint-12/pre-onboarding-11th-4.git . #현재 경로에 클론
yarn && yarn dev #종속성 설치, port 3000
```

**서버 실행(mock api)**

> ⚠프론트와 서버는 각각 다른 터미널에서 실행시켜줘야 합니다.

```bash
yarn server #port 4000
```
## 폴더 구조
<details>
  <summary>src</summary>
  
  ```markdown
  📦src
 ┣ 📂assets # .svg 등 정적 에셋을 모아두는 폴더
 ┣ 📂components # css(css in js)와 컴포넌트를 분리하기 위해 컴포넌트를 폴더로 구분
 ┃ ┣ 📂SearchBar
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┗ 📂SearchResultList
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.ts # api 호출 최적화
 ┃ ┗ 📜useSearchResult.ts # 검색결과와 관련된 상태값을 저장하는 훅
 ┣ 📂layouts
 ┃ ┗ 📂SearchLayout # 검색페이지의 레이아웃
 ┃ ┃ ┣ 📜index.tsx 
 ┃ ┃ ┗ 📜styles.tsx
 ┣ 📂typings # 타입들을 모아두는 폴더입니다. 
 ┃ ┗ 📜sick.ts
 ┣ 📂utils # UI에 영향을 미치지않는 유틸리티 함수들
 ┃ ┣ 📂api # http 요청 api 관련 폴더
 ┃ ┃ ┣ 📜customAxios.ts
 ┃ ┃ ┗ 📜fetchSearchData.ts
 ┃ ┗ 📜cacheStorage.ts #로컬캐시관련 파일 class + Map으로 구현
  ```

</details>

 
## 구현 기능

> 구현 목표: [한국임상실험 검색페이지](https://clinicaltrialskorea.com/)

- [x] 질환명 검색시 api호출을 통해 검색어 추천 검색어, 최근 검색어 구현
- [x] API 호출별로 로컬 캐싱 구현 (캐싱 기능을 제공하는 라이브러리 사용없이 직접 구현)
  - [x] 검색어 없을 시, "검색어 없음" 표출
  - [x] 서버로부터 받아온 데이터마다 expire time 구현
  - [x] 디바운싱 적용 => 입력마다 API호출하지 않도록 API 호출
        횟수를 줄이는 전략
- [x] API 호출마다 console.info("calling api") 출력을 통해 api호출 횟수 확인
- [ ] (optional) 키보드만으로 추천 검색어들로 이동 가능하도록 구현
<hr/>

### [로컬 캐시 구현 전략]

: `class`와 `Map`을 활용하여 로컬 캐시를 구현하였습니다. 

1. class를 사용하여 **캐시 관리 로직을 구성**
2. Map을 활용하여 **데이터를 저장하고 검색하는 기능**을 추가
<details>
  <summary>cacheStorage.ts 코드보기</summary>

  ```typscript
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

```
</details>

3. 가져온 서버데이터에 expire_time를 추가하여 **로컬 데이터가 만료되면 삭제**하도록 구현
4. http 요청 함수(fetchSearchData)를 따로 만듦 => **관심사 분리**
   
<details>
  <summary>useSearchResult.ts 코드보기</summary>
  
  ```typescript
  import { useState, useCallback, useEffect } from 'react';
import { SickApiResponse, SickProps } from '../typings/sick';
import fetchSearchData from '../utils/api/fetchSearchData';
import { cacheStorage } from '../utils/cacheStorage';

const useSearchResult = (endPoint: string, expired: number) => {
  const [data, setData] = useState<SickApiResponse>({ data: [], expired: Date.now() });
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSearchList = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchSearchData(endPoint, query);
      const newData = { data: res.data as SickProps[], expired: Date.now() + expired };
      setData(newData);
      cacheStorage.add(query, newData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [expired, endPoint, query]);

  const removeCacheData = useCallback(() => {
    cacheStorage.remove(query);
    void getSearchList();
  }, [query, getSearchList]);

  const getCacheData = useCallback(() => {
    setData(cacheStorage.get(query) as SickApiResponse);
  }, [query]);

  useEffect(() => {
    if (query === '') {
      setData((prevData) => ({ ...prevData, data: [] }));
      console.log('첫번째: 쿼리가 없을 때');
      return;
    }

    if (!cacheStorage.find(query)) {
      void getSearchList();
      console.log('두번째: 캐시스토리지에서 쿼리값을 찾지 못했을 때');
      return;
    }

    if ((cacheStorage.get(query)?.expired as unknown as number) < Date.now()) {
      console.log('세번째: 캐시스토리지값이 만료된 값일 때');
      removeCacheData();
    } else {
      console.log('아무것도 해당하지 않는다면 캐시값을 가져온다.');
      getCacheData();
    }
  }, [getCacheData, getSearchList, query, removeCacheData]);

  return { data, query, setQuery, isLoading };
};

export default useSearchResult;

  ```
</details>

## Issue

- env.d.ts 에 관하여 공부( + declare 키워드)
- TS + React + vite 환경에서 svg를 컴포넌트로 활용하는 법 => [정리 포스팅](https://blueprint-12.tistory.com/411)
