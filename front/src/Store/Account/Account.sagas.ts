import { call, put } from 'redux-saga/effects';
import { AccountApi } from '../../Data/AccountApi';
import toast from '../../Utils/toast';
import { CashOutAction } from './Account.action';
import { AccountActions } from './Account.action';

export function* show() {
  try {
    const { data } = yield call(AccountApi.show);
    yield put(AccountActions.showSuccess(data.data));
  } catch (error: any) {
    toast({
      type: 'danger',
      text: error.error.message,
    });
    yield put(AccountActions.showFailure(error));
  }
}

export function* cashOut({ payload }: CashOutAction) {
  try {
    const { data } = yield call(AccountApi.cashOut, payload);
    yield put(AccountActions.cashOutSuccess(data));
    toast({
      type: 'success',
      text: 'Transferência concluída!',
    });
  } catch (error: any) {
    toast({
      type: 'danger',
      text: error.error.message,
    });
    yield put(AccountActions.cashOutFailure(error));
  }
}
