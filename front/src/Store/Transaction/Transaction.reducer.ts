import { ITransactionState } from './interface/ITransactionState';
import { TransactionActionKeys, TransactionActionUnion } from './Transaction.action';

const initialState: ITransactionState = {
  isLoading: false,
  transactions: undefined,
  error: undefined,
};

const transactionReducer = (state = initialState, action: TransactionActionUnion): ITransactionState => {
  switch (action.type) {
  case TransactionActionKeys.TRANSACTIONS_LIST_REQUEST:
    return {
      ...state,
      transactions: undefined,
      isLoading: true,
      error: undefined,
    };
  case TransactionActionKeys.TRANSACTIONS_LIST_SUCCESS:
    return {
      ...state,
      transactions: action.payload,
      isLoading: false,
      error: undefined,
    };
  case TransactionActionKeys.TRANSACTIONS_LIST_FAILURE:
    return {
      ...state,
      transactions: undefined,
      isLoading: false,
      error: action.payload,
    };

  default:
    return state;
  }
};

export default transactionReducer;
