import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { IGlobalReducerState } from '../../Store/Base/interface/IGlobalReducerState';
import Header from '../../Components/Header';
import { Container, Info, InputDate, Main, TransactionsContainer, Wrapper } from './styles';
import { TransactionActions } from '../../Store/Transaction/Transaction.action';
import { ITransactionListFilters } from '../../Data/interface/Transaction/ITransactionListFilters';
import { useNavigate } from 'react-router';
import Button from '../../Components/Button';
import { AccountActions } from '../../Store/Account/Account.action';
import TransactionsCard from '../../Components/TransactionsCard';
import Select from '../../Components/Select';
import { formatFilterByDate } from '../../Utils/Date';

function Transactions({ account, transactions, themeString }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderDate, setOrderDate] = useState('desc');
  const [filterBy, setFilterBy] = useState(0);
  const [filterByDate, setFilterByDate] = useState<string | null>(null);

  const dateOptions = [
    {value: 'desc', description: 'descendente'},
    {value: 'asc', description: 'ascendente'},
  ];

  const comonOptions = [
    {value: 1, description: 'enviados'},
    {value: 2, description: 'recebidos'},
    {value: 3, description: 'data'},
  ];

  useEffect(() => {
    dispatch(AccountActions.show());
  }, []);

  useEffect(() => {
    if (filterBy !== 3) {
      const filters: ITransactionListFilters = {
        orderBy: orderDate,
        filterByDebited: filterBy === 1 ? true : false,
        filterByCredited: filterBy === 2 ? true : false,
      };
      dispatch(TransactionActions.list(filters));
    }
    else {
      if (filterByDate) {
        const begin = formatFilterByDate(filterByDate, 'begin');
        const end = formatFilterByDate(filterByDate, 'end');

        const filters: ITransactionListFilters = {
          orderBy: orderDate,
          begin,
          end,
        };
        dispatch(TransactionActions.list(filters));
      }
    }
  }, [orderDate, filterBy, filterByDate]);

  function handleDateOrder(value: string) {
    setOrderDate(value);
  }

  function handleFilter(value: string) {
    setFilterBy(parseInt(value));
  }

  function handleFilterDate(value: string) {
    setFilterByDate(value);
  }

  function handleCashOut() {
    navigate('/cashaction');
  }

  function handleHome() {
    navigate('/home');
  }

  return (
    <Wrapper>
      <Header />
      <Container>

        <Main>
          <Info>
            <div className="actionButtons">
              <Button
                className="leftButton"
                onClick={handleHome}
              >
                HOME
              </Button>
              <Button
                className="rightButton"
                onClick={handleCashOut}
              >
                Nova Transação
              </Button>
            </div>

            <div className="actionFilters">
              <label
                className="leftLabel"
              >Ordenar data
                <Select
                  onChange={(e) => handleDateOrder(e.target.value)}
                  className="leftFilter"
                >
                  {dateOptions.map((item) => (
                    <option
                      key={item.value.toString()}
                      value={item.value}
                    >
                      {item.description}
                    </option>
                  ))}
                </Select>
              </label>
              <label
                className="rightLabel"
              >Filtrar por
                <Select
                  onChange={(e) => handleFilter(e.target.value)}
                  className="rightFilter"
                >
                  <option value="">sem filtro...</option>
                  {comonOptions.map((item) => (
                    <option
                      key={item.value.toString()}
                      value={item.value}
                    >
                      {item.description}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
            {filterBy === 3 && (
              <div className="actionFilters">
                <label
                  className="leftLabel"
                >Escolha uma data
                  <InputDate
                    isDark={themeString === 'dark' ? true : false}
                    onChange={(e) => handleFilterDate(e.target.value)}
                    className="leftFilter"
                    type="date"
                  />
                </label>
              </div>
            )}

            {transactions && (
              <TransactionsContainer
                filterOn={filterBy === 3 ? true : false}
              >
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
              </TransactionsContainer>
            )}
          </Info>
        </Main>
      </Container>
    </Wrapper>
  );
}

const mapState = (state: IGlobalReducerState) => ({
  ...state.account,
  ...state.transaction,
  themeString: state.theme.themeString,
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux;

export default connector(Transactions);
