import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 820px;
  flex-direction: column;
  height: 100vh;
`;

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;


  .formWrapper {
    display: flex;
    flex-direction: column;
    align-self: center;
    max-width: 425px;
  }
`;

export const FormContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const LoginTitle = styled.div`
  h3 {
    font-size: 38px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    line-height: 46px;
    margin-bottom: 6px;
    letter-spacing: -1px;
  }

  p {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    line-height: 14px;
    margin-bottom: 70px;
    letter-spacing: -0.4px;
  }
`;

export const Footer = styled.div`
  margin-top: 40px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  letter-spacing: -0.8px;
  color: ${({ theme }) => theme.text};

  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.text};
  }
`;
