import { PropsWithChildren } from 'react';
import * as S from './styles';

const SearchLayout = ({ children }: PropsWithChildren) => {
  return (
    <S.Wrapper>
      <S.Title>
        국내 모든 임상실험 검색하고 <br />
        온라인으로 참여하기
      </S.Title>
      <S.Container>{children}</S.Container>
    </S.Wrapper>
  );
};

export default SearchLayout;
