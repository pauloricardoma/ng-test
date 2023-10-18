import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 30px;

  span {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 6px;
  }

  small {
    color: ${({ theme }) => theme.colors?.error.main};
  }
`;
