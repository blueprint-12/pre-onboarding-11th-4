import { SickProps } from '../../typings/sick';
import * as S from './styles';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
type Props = {
  sickList: SickProps[];
  isLoading: boolean;
  recentSearchKeys: string[];
};

const SearchResultList = ({ sickList, isLoading, recentSearchKeys }: Props) => {
  const MAX_ITEM_TO_SHOW = 7;

  return (
    <S.ListContainer>
      {recentSearchKeys.length > 0 && (
        <>
          <S.ContentTitle>최근 검색어</S.ContentTitle>
          {recentSearchKeys.map((item, index) => (
            <S.Item key={index}>
              <SearchIcon />
              {item}
            </S.Item>
          ))}
        </>
      )}
      <S.ContentTitle>추천 검색어</S.ContentTitle>
      {isLoading ? (
        <S.InfoMsg>Loading...</S.InfoMsg>
      ) : (
        <>
          {sickList.length !== 0 ? (
            sickList.slice(0, MAX_ITEM_TO_SHOW).map((data, index) => (
              <S.Item key={index}>
                <S.ItemSpan>{data.sickCd}</S.ItemSpan>
                <span>{data.sickNm}</span>
              </S.Item>
            ))
          ) : (
            <S.InfoMsg>검색 결과가 없습니다.</S.InfoMsg>
          )}
        </>
      )}
    </S.ListContainer>
  );
};

export default SearchResultList;
