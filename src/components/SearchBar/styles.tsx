import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1.25rem;
  border-radius: 45px;
  box-shadow: 0px 2px 4px rgba(30, 32, 37, 0.1);
  cursor: pointer;

  /* 자식요소에 focus가 되면  */
  &:focus-within {
    outline: 2px solid var(--primary-blue);
  }
`;

export const SearchInput = styled.input`
  /* all: unset; */
  width: 90%;
  border: none;
  padding: 0.625rem;
  font-size: 0.9rem;

  &:focus-visible,
  &:focus {
    outline: none;
  }
`;
export const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--primary-blue);
  border-radius: 1.25rem;
`;
