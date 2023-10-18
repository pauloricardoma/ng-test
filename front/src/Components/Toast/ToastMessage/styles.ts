import styled, { css } from 'styled-components';
import { IType } from './';

interface IContainer {
  type: IType
}

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.backgroundCard};
  `,
  success: css`
    background: ${({ theme }) => theme.colors?.confirmation.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors?.error.main};
  `,
};

export const Container = styled.div<IContainer>`
  padding: 16px 32px;
  background: ${({ theme }) => theme.background};
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ type }) => containerVariants[type] || containerVariants.default}

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }
`;
