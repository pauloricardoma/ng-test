import styled from 'styled-components';

export const OutButton = styled.button`
  background-color: ${({ theme }) => theme.background};
  border: none;
  border-radius: 3px;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 12px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  line-height: 17px;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
    border: 1.5px solid ${({ theme }) => theme.background};
  }
`;
