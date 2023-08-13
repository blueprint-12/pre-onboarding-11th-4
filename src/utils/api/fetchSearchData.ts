import api from './customAxios';
import { AxiosResponse } from 'axios';

// URL endPoint, query: 검색어
export default async function fetchSearchData(endPoint: string, query: string) {
  const res: AxiosResponse = await api.get(endPoint, {
    params: {
      q: query,
    },
  });

  console.info('calling api');
  return res;
}
