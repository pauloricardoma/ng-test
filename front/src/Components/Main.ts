import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 904px;
  padding: 45px 150px;
  background: ${({ theme }) => theme.background};

  h3 {
    color: ${({ theme }) => theme.text};
    font-size: 30px;
    font-weight: 600;
    line-height: 45px;
    letter-spacing: -0.8px;
    margin-bottom: 40px;
  }
`;
