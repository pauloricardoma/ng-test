import styled from 'styled-components';

interface IContainer {
  danger: boolean;
}

export const Overlay = styled.div`
  background:  ${({ theme }) => theme.opacity};
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div<IContainer>`
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => theme.background};
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  > h1 {
    font-size: 22px;
    color:${({ theme, danger }) => (
    danger ? theme.colors?.error.main : theme.text
  )}
  }

  .modal-body {
    margin-top: 32px;
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    margin: 0 40px;
    color: ${({ theme }) => theme.text};

    &[disabled] {
      cursor: default;
    }
  }
`;
