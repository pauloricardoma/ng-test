import styled from 'styled-components';

interface ITransactionsContainer {
  filterOn: boolean;
}

interface IInputDate {
  isDark: boolean;
}

export const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 820px;
  flex-direction: column;
  height: 100vh;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 425px;
  padding: 24px;
  border-radius: 8px;
  border: 1.5px solid ${({ theme }) => theme.border};
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .balanceInfo {
    width: 80%;
    height: 36px;
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    background: ${({ theme }) => theme.backgroundCard};
    border: 1.5px solid ${({ theme }) => theme.border};
    font-size: 14px;
    font-weight: 600;
  }

  .actionButtons {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;

    .leftButton {
      height: 24px;
      font-size: 12px;
      font-weight: 600;
      margin-right: 4px;
    }

    .rightButton {
      height: 24px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 4px;
    }
  }

  .actionFilters {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 12px;

    .leftLabel {
      font-size: 14px;
      margin-right: 8px;

      .leftFilter {
        width: 100%;
        border-radius: 4px;
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        height: 24px;
        font-size: 12px;
        font-weight: 600;

      }

      input {

      }
    }

    .rightLabel {
      font-size: 14px;
      margin-left: 8px;

      .rightFilter {
        width: 100%;
        border-radius: 4px;
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        height: 24px;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
`;

export const TransactionsContainer = styled.div<ITransactionsContainer>`
  width: 80%;
  max-height: ${({ filterOn }) => filterOn ? '53vh' : '60vh'};
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  ::-webkit-scrollbar-thumb {
    width: 1px !important;
    background: ${({ theme }) => theme.text};
    border-radius: 16px;
  }

  ::-webkit-scrollbar {
    width: 6px;
    color: red;
    background: ${({ theme }) => theme.background};
  }
`;

export const InputDate = styled.input<IInputDate>`
  &::-webkit-calendar-picker-indicator {
    filter: ${({ isDark }) => isDark ? 'invert(1)' : 'invert'};
  }
`;
