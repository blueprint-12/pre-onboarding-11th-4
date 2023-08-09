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

  /* &:focus-within input[type='search'] {
    outline: 2px solid blue;
  } */
`;

export const SearchInput = styled.input`
  /* all: unset; */
  border: none;
  padding: 0.625rem;
  font-size: 0.9rem;

  &::focus-visible {
    outline: none;
  }
`;
