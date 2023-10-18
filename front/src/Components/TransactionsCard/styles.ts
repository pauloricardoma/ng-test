import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  height: 86px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: ${({ theme }) => theme.backgroundCard};
  border: 1.5px solid ${({ theme }) => theme.border};

  &+div {
    margin-top: 8px;
  }

  p {
    font-size: 14px;
    line-height: 16px;
    font-weight: 600;
    margin: 4px 0;
  }

  small {
    font-size: 12px;
    text-align: end;
  }
`;
