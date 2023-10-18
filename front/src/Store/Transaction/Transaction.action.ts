import { ITransactionListFilters } from '../../Data/interface/Transaction/ITransactionListFilters';
import { ITransaction } from '../../Data/interface/Transaction/ITransactions';
import { Action, ActionsUnion, createAction } from '../../Store/Base/actionHelper';

export enum TransactionActionKeys {
  TRANSACTIONS_LIST_REQUEST = 'TRANSACTIONS_LIST_REQUEST',
  TRANSACTIONS_LIST_SUCCESS = 'TRANSACTIONS_LIST_SUCCESS',
  TRANSACTIONS_LIST_FAILURE = 'TRANSACTIONS_LIST_FAILURE',
}

export const TransactionActions = {
  list: (request: ITransactionListFilters): ListAction =>
    createAction(TransactionActionKeys.TRANSACTIONS_LIST_REQUEST, request),
  listSuccess: (response: ITransaction[]): ListActionSuccess =>
    createAction(TransactionActionKeys.TRANSACTIONS_LIST_SUCCESS, response),
  listFailure: (error: string): ListActionFailure =>
    createAction(TransactionActionKeys.TRANSACTIONS_LIST_FAILURE, error),
};

export type TransactionActionUnion = ActionsUnion<typeof TransactionActions>;

export type ListAction =
  Action<TransactionActionKeys.TRANSACTIONS_LIST_REQUEST, ITransactionListFilters>;
export type ListActionSuccess =
  Action<TransactionActionKeys.TRANSACTIONS_LIST_SUCCESS, ITransaction[]>;
export type ListActionFailure =
  Action<TransactionActionKeys.TRANSACTIONS_LIST_FAILURE, string>;
