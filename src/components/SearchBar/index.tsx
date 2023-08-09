import React from 'react';
import * as S from './styles';
import { ReactComponent as Search } from '../../assets/search-icon.svg';

const SearchBar = () => {
  return (
    <S.Wrapper>
      <S.SearchInput type="search" placeholder="질환명을 입력해 주세요." />
      <Search width="30" height="30" fill="currentColor" preserveAspectRatio="none" />
    </S.Wrapper>
  );
};

export default SearchBar;
