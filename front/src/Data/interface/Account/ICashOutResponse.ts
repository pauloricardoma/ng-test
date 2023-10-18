import { IAccount } from './IAccount';
import { ITransaction } from '../Transaction/ITransactions';

export interface ICashOutResponse {
  account: IAccount;
  transaction: ITransaction;
}
