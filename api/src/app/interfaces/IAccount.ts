import { ITransaction } from './ITransaction';

export interface IAccount {
  id?: number;
  balance: number | null;
  debitedTransactions?: ITransaction[];
  creditedTransactions?: ITransaction[];
}
