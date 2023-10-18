import { AccountActionKeys, AccountActionUnion } from './Account.action';
import { IAccountState } from './interface/IAccountState';

const initialState: IAccountState = {
  isLoading: false,
  user: undefined,
  account: undefined,
  transaction: undefined,
  error: undefined,
};

const accountReducer = (state = initialState, action: AccountActionUnion): IAccountState => {
  switch (action.type) {
  case AccountActionKeys.SHOW_ACCOUNT_REQUEST:
    return {
      ...state,
      account: undefined,
      user: undefined,
      isLoading: true,
      error: undefined,
    };
  case AccountActionKeys.SHOW_ACCOUNT_SUCCESS:
    return {
      ...state,
      account: action.payload,
      user: action.payload.user,
      isLoading: false,
      error: undefined,
    };
  case AccountActionKeys.SHOW_ACCOUNT_FAILURE:
    return {
      ...state,
      account: undefined,
      user: undefined,
      isLoading: false,
      error: action.payload,
    };

  case AccountActionKeys.CASH_OUT_REQUEST:
    return {
      ...state,
      account: undefined,
      transaction: undefined,
      isLoading: true,
      error: undefined,
    };
  case AccountActionKeys.CASH_OUT_SUCCESS:
    return {
      ...state,
      account: action.payload.account,
      transaction: action.payload.transaction,
      isLoading: false,
      error: undefined,
    };
  case AccountActionKeys.CASH_OUT_FAILURE:
    return {
      ...state,
      account: undefined,
      transaction: undefined,
      isLoading: false,
      error: action.payload,
    };

  default:
    return state;
  }
};

export default accountReducer;
