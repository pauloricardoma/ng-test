import styled from 'styled-components';

export const Form = styled.form`
  width: 425px;

  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    div {
      margin-left: 18px;
    }
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`;
