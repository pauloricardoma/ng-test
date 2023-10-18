import styled from 'styled-components';

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

  h2 {
    color: ${({ theme }) => theme.text};
    font-size: 30px;
    line-height: 45px;
    font-weight: 600;
  }
`;

export const Info = styled.div`
  margin-top: 32px;
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
    margin: 24px 0;

    .leftButton {
      font-size: 12px;
      font-weight: 600;
      margin-right: 4px;
    }

    .rightButton {
      font-size: 12px;
      font-weight: 600;
      margin-left: 4px;
    }
  }

  .transactions {
    width: 80%;
    max-height: 46vh;
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
  }
`;
