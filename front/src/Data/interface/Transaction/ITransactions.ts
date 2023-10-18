import { IAccount } from '../Account/IAccount';

export interface ITransaction {
  id?: number;
  debitedAccountId: number;
  debitedAccount: IAccount | ITransactionAccountformat;
  creditedAccountId: number;
  creditedAccount: IAccount | ITransactionAccountformat;
  value: number;
  createdAt?: Date;
}

interface ITransactionAccountformat {
  user: {
    username: string;
  } | null;
}
