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
