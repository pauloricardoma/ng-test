import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { IGlobalReducerState } from '../../Store/Base/interface/IGlobalReducerState';
import Header from '../../Components/Header';
import { ConfirmModal, Container, Info, Main, Wrapper } from './styles';
import { useNavigate } from 'react-router';
import Button from '../../Components/Button';
import { numberToMoney } from '../../Utils/Money';
import FormCash from '../../Components/FormCash';
import Modal from '../../Components/Modal';
import { ICashOutRequest } from '../../Data/interface/Account/ICashOutRequest';
import { AccountActions } from '../../Store/Account/Account.action';

function CashAction({ account, isLoading }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCashOutModal, setShowCashOutModal] = useState(false);
  const [cashOutData, setCashOutData] = useState<ICashOutRequest | null>(null);
  const [sentCash, setSentCash] = useState(false);

  useEffect(() => {
    if(sentCash && !isLoading) {
      handleCloseCashOutModal();
      setSentCash(false);
      navigate('/home');
    }
  }, [sentCash, isLoading]);

  function handleSubmit(data: ICashOutRequest) {
    setCashOutData(data);
    setShowCashOutModal(true);
  }

  function handleCashOut() {
    navigate('/home');
  }

  function handleTransactions() {
    navigate('/transactions');
  }

  function handleConfirmCashOutModal() {
    if (cashOutData) {
      dispatch(AccountActions.cashOut(cashOutData));
      setSentCash(true);
    }
  }

  function handleCloseCashOutModal() {
    setCashOutData(null);
    setShowCashOutModal(false);
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
                onClick={handleCashOut}
              >
                HOME
              </Button>
              <Button
                className="rightButton"
                onClick={handleTransactions}
              >
                Listar Transações
              </Button>
            </div>

            <div className="balanceInfo">
              <h4>Saldo disponível: </h4>
              <span>{numberToMoney(account?.balance || 0)}</span>
            </div>

            <div className="actionCashOut">
              <FormCash
                onSubmit={handleSubmit}
                loading={isLoading}
              />
            </div>
          </Info>
        </Main>
      </Container>

      {(showCashOutModal && cashOutData) && (
        <Modal
          visible={showCashOutModal}
          onCancel={handleCloseCashOutModal}
          onConfirm={handleConfirmCashOutModal}
          title="Confirme os dados novamente antes de enviar!"
          cancelLabel="Cancelar"
          confirmLabel="Confirmar Transferência"
        >
          <ConfirmModal>
            <p>Username: {cashOutData.creditedUsername}</p>
            <p>Valor: {numberToMoney(cashOutData.value)}</p>
          </ConfirmModal>
        </Modal>
      )}
    </Wrapper>
  );
}

const mapState = (state: IGlobalReducerState) => ({
  ...state.account,
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux;

export default connector(CashAction);
