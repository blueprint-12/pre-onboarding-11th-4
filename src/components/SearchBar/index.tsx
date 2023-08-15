import { useState, ChangeEvent, useEffect, useRef } from 'react';
import * as S from './styles';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import useDebounce from '../../hooks/useDebounce';
import SearchResultList from '../SearchResultList';
import useSearchResult from '../../hooks/useSearchResult';
import { cacheStorage } from '../../utils/cacheStorage';

const SearchBar = () => {
  const {
    data: { data },
    setQuery,
    query,
    isLoading,
  } = useSearchResult('/sick', 100000);
  const [searchWord, setSearchWord] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debouncedSearchWord = useDebounce(searchWord, 500);
  const [recentSearchKeys, setRecentSearchKeys] = useState<string[]>([]);

  useEffect(() => {
    const keys = cacheStorage.getRecentKeywords(3);
    setRecentSearchKeys(keys);
  }, [query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchWord) {
      setQuery(debouncedSearchWord);
    }
    if (!debouncedSearchWord) {
      setQuery('');
    }
  }, [debouncedSearchWord, setQuery]);

  return (
    <>
      <S.Wrapper>
        <S.SearchInput
          ref={inputRef}
          type="search"
          placeholder="질환명을 입력해 주세요."
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        <S.SvgWrapper>
          <SearchIcon width="20" height="20" fill="white" preserveAspectRatio="none" />
        </S.SvgWrapper>
      </S.Wrapper>

      {isFocused && (
        <SearchResultList
          sickList={data}
          isLoading={isLoading}
          recentSearchKeys={recentSearchKeys}
        />
      )}
    </>
  );
};

export default SearchBar;
