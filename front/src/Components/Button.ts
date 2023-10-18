import styled from 'styled-components';

export default styled.button`
  width: 100%;
  height: 37px;
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.background};
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  transition: background 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border: 1.5px solid ${({ theme }) => theme.border};
  }
`;
