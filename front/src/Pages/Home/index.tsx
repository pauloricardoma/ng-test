import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { IGlobalReducerState } from '../../Store/Base/interface/IGlobalReducerState';
import Header from '../../Components/Header';
import { Container, Info, Main, Wrapper } from './styles';
import { TransactionActions } from '../../Store/Transaction/Transaction.action';
import { ITransactionListFilters } from '../../Data/interface/Transaction/ITransactionListFilters';
import { useNavigate } from 'react-router';
import Button from '../../Components/Button';
import { numberToMoney } from '../../Utils/Money';
import { AccountActions } from '../../Store/Account/Account.action';
import TransactionsCard from '../../Components/TransactionsCard';

function Home({ user, account, transactions }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const filters: ITransactionListFilters = {
      orderBy: 'desc',
      limit: 3,
    };
    dispatch(AccountActions.show());
    dispatch(TransactionActions.list(filters));
  }, []);

  function handleCashOut() {
    navigate('/cashaction');
  }

  function handleTransactions() {
    navigate('/transactions');
  }

  return (
    <Wrapper>
      <Header />
      <Container>

        <Main>
          <h2>
            Bem-vindo
            {' '}
            {user?.username}
          </h2>

          <Info>
            <div className="balanceInfo">
              <h4>Saldo disponível: </h4>
              <span>{numberToMoney(account?.balance || 0)}</span>
            </div>

            <div className="actionButtons">
              <Button
                className="leftButton"
                onClick={handleCashOut}
              >
                Nova Transação
              </Button>
              <Button
                className="rightButton"
                onClick={handleTransactions}
              >
                Listar Transações
              </Button>
            </div>

            {transactions && (
              <div className="transactions">
                {transactions.map(item => {
                  const isCashOut = item.debitedAccountId === account?.id;
                  return (
                    <TransactionsCard
                      key={item.id?.toString()}
                      isCashOut={isCashOut}
                      name={isCashOut
                        ? item.creditedAccount.user?.username
                        : item.debitedAccount.user?.username
                      }
                      value={item.value}
                      date={item.createdAt}
                    />
                  );
                })}
              </div>
            )}
          </Info>
        </Main>
      </Container>
    </Wrapper>
  );
}

const mapState = (state: IGlobalReducerState) => ({
  ...state.auth,
  ...state.account,
  ...state.transaction,
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux;

export default connector(Home);
