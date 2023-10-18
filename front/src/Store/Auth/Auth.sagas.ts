import { AuthApi } from '../../Data/AuthApi';
import { call, put } from 'redux-saga/effects';
import { AuthActions, LoginAction, SigninAction } from './Auth.action';
import toast from '../../Utils/toast';

export function* signin({ payload }: SigninAction) {
  try {
    const { data } = yield call(AuthApi.signin, payload);
    yield put(AuthActions.signinSuccess(data.user));
  } catch (error: any) {
    toast({
      type: 'danger',
      text: error.error.message,
    });
    yield put(AuthActions.signinFailure(error.error.message));
  }
}

export function* login({ payload }: LoginAction) {
  try {
    const { data } = yield call(AuthApi.login, payload);
    localStorage.setItem('accessToken', data.token);
    yield put(AuthActions.loginSuccess(data.data));
  } catch (error: any) {
    toast({
      type: 'danger',
      text: error.error.message,
    });
    yield put(AuthActions.loginFailure(error.error.message));
  }
}
