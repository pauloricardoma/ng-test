import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Text = styled.span`
  font-size: 38px;
  font-weight: 600;
  color: ${({ theme }) => theme.background};
  letter-spacing: -0.6px;
`;
