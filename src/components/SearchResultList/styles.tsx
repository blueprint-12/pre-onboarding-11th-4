import styled from 'styled-components';

export const ListContainer = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  border-radius: 20px;
  margin-top: 8px;
  padding: 24px 0 16px;
  box-shadow: rgba(30, 32, 37, 0.1) 0px 2px 10px;

  svg {
    width: 17px;
    height: 17px;
    fill: #a7afb7;
  }
`;

export const Item = styled.li`
  display: flex;
  padding: 8px 24px;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.6;
  cursor: pointer;
  gap: 0.4rem;

  &:hover {
    background-color: rgb(248, 249, 250);
  }
`;

export const ContentTitle = styled.span`
  display: flex;
  justify-content: start;
  padding: 0 24px;
  font-size: 13px;
  line-height: 1.6;
  color: #a7afb7;
`;

export const ItemSpan = styled(ContentTitle)`
  display: block;
  padding: 0;
  color: orange;
`;

export const InfoMsg = styled.p`
  color: var(--primary-blue);
`;
