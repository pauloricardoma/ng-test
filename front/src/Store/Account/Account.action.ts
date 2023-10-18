import { IAccount } from '../../Data/interface/Account/IAccount';
import { ICashOutRequest } from '../../Data/interface/Account/ICashOutRequest';
import { ICashOutResponse } from '../../Data/interface/Account/ICashOutResponse';
import { Action, ActionsUnion, createAction } from '../../Store/Base/actionHelper';

export enum AccountActionKeys {
  SHOW_ACCOUNT_REQUEST = 'SHOW_ACCOUNT_REQUEST',
  SHOW_ACCOUNT_SUCCESS = 'SHOW_ACCOUNT_SUCCESS',
  SHOW_ACCOUNT_FAILURE = 'SHOW_ACCOUNT_FAILURE',

  CASH_OUT_REQUEST = 'CASH_OUT_REQUEST',
  CASH_OUT_SUCCESS = 'CASH_OUT_SUCCESS',
  CASH_OUT_FAILURE = 'CASH_OUT_FAILURE',
}

export const AccountActions = {
  show: (): ShowAction =>
    createAction(AccountActionKeys.SHOW_ACCOUNT_REQUEST),
  showSuccess: (response: IAccount): ShowActionSuccess =>
    createAction(AccountActionKeys.SHOW_ACCOUNT_SUCCESS, response),
  showFailure: (error: string): ShowActionFailure =>
    createAction(AccountActionKeys.SHOW_ACCOUNT_FAILURE, error),

  cashOut: (request: ICashOutRequest): CashOutAction =>
    createAction(AccountActionKeys.CASH_OUT_REQUEST, request),
  cashOutSuccess: (response: ICashOutResponse): CashOutActionSuccess =>
    createAction(AccountActionKeys.CASH_OUT_SUCCESS, response),
  cashOutFailure: (error: string): CashOutActionFailure =>
    createAction(AccountActionKeys.CASH_OUT_FAILURE, error),
};

export type AccountActionUnion = ActionsUnion<typeof AccountActions>;

export type ShowAction =
  Action<AccountActionKeys.SHOW_ACCOUNT_REQUEST>;
export type ShowActionSuccess =
  Action<AccountActionKeys.SHOW_ACCOUNT_SUCCESS, IAccount>;
export type ShowActionFailure =
  Action<AccountActionKeys.SHOW_ACCOUNT_FAILURE, string>;

export type CashOutAction =
  Action<AccountActionKeys.CASH_OUT_REQUEST, ICashOutRequest>;
export type CashOutActionSuccess =
  Action<AccountActionKeys.CASH_OUT_SUCCESS, ICashOutResponse>;
export type CashOutActionFailure =
  Action<AccountActionKeys.CASH_OUT_FAILURE, string>;
