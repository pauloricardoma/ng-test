
import { call, put } from 'redux-saga/effects';
import { TransactionApi } from '../../Data/TransactionApi';
import toast from '../../Utils/toast';
import { ListAction, TransactionActions } from './Transaction.action';

export function* list({ payload }: ListAction) {
  try {
    const { data } = yield call(TransactionApi.list, payload);
    yield put(TransactionActions.listSuccess(data.data));
  } catch (error: any) {
    if (error.error.message !== 'Transactions not found.') {
      toast({
        type: 'danger',
        text: error.error.message,
      });
    }
    yield put(TransactionActions.listFailure(error));
  }
}
