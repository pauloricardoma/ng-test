import styled, { css } from 'styled-components';

interface IInput {
  danger?: boolean;
  confirm?: boolean;
}

export default styled.input<IInput>`
  width: 100%;
  height: 36px;
  border-radius: 3px;
  background: ${({ theme }) => theme.backgroundCard};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0 15px;
  font-size: 13px;
  line-height: 15px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;

  &:focus {
    background: ${({ theme }) => theme.background};
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.background};
    border: 2px solid ${theme.colors?.error.main};

    &::placeholder {
      color: ${theme.colors?.error.main};
    }
  `}

  ${({ theme, confirm }) => confirm && css`
    background: ${theme.background};
    border: 2px solid ${theme.colors?.confirmation.main};
    color: ${theme.colors?.confirmation.main};
  `}
`;
