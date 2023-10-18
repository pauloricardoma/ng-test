import { all, takeLatest } from 'redux-saga/effects';
import { AccountActionKeys } from './Account/Account.action';
import { cashOut, show } from './Account/Account.sagas';
import { AuthActionKeys } from './Auth/Auth.action';
import { signin, login } from './Auth/Auth.sagas';
import { TransactionActionKeys } from './Transaction/Transaction.action';
import { list } from './Transaction/Transaction.sagas';

export function* rootSaga() {
  yield all([
    takeLatest(AuthActionKeys.AUTH_SIGNIN_REQUEST, signin),
    takeLatest(AuthActionKeys.AUTH_LOGIN_REQUEST, login),

    takeLatest(AccountActionKeys.SHOW_ACCOUNT_REQUEST, show),
    takeLatest(AccountActionKeys.CASH_OUT_REQUEST, cashOut),

    takeLatest(TransactionActionKeys.TRANSACTIONS_LIST_REQUEST, list),
  ]);
}
